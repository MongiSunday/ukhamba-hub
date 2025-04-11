
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { S3Client, ListObjectsV2Command } from "https://esm.sh/@aws-sdk/client-s3@3.511.0";

// Define CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Interface definitions
interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  subcategoryId?: string;
  type: 'image' | 'video';
  featured?: boolean;
  date: string;
}

interface R2ObjectMetadata {
  Key?: string;
  LastModified?: Date;
  ETag?: string;
  Size?: number;
  StorageClass?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get R2 credentials from environment variables
    const accountId = Deno.env.get("CLOUDFLARE_R2_ACCOUNT_ID");
    const accessKeyId = Deno.env.get("CLOUDFLARE_R2_ACCESS_KEY_ID");
    const secretAccessKey = Deno.env.get("CLOUDFLARE_R2_SECRET_ACCESS_KEY");
    const bucketName = Deno.env.get("CLOUDFLARE_R2_BUCKET_NAME") || "ukhamba-gallery";
    
    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error("Missing Cloudflare R2 credentials");
    }

    console.log(`Connecting to R2 bucket: ${bucketName}`);

    // Create S3 client for R2
    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // List objects in the bucket
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    const r2Response = await s3Client.send(command);
    
    if (!r2Response.Contents || r2Response.Contents.length === 0) {
      console.error("No objects found in R2 bucket");
      throw new Error("No images found in the R2 bucket");
    }
    
    console.log(`Found ${r2Response.Contents.length} objects in R2 bucket`);

    // Process the file structure to reflect the directory hierarchy
    const galleryItems: GalleryItem[] = r2Response.Contents
      .filter(object => {
        // Filter out non-image/video files and directories
        const key = object.Key || "";
        return (
          (key.endsWith('.jpg') || 
          key.endsWith('.jpeg') || 
          key.endsWith('.png') || 
          key.endsWith('.gif') || 
          key.endsWith('.webp') ||
          key.endsWith('.mp4') || 
          key.endsWith('.mov')) &&
          !key.endsWith('/')  // Exclude directory markers
        );
      })
      .map((object: R2ObjectMetadata) => {
        const key = object.Key || "";
        const pathParts = key.split('/');
        const filename = pathParts.pop() || "";
        
        // Get category and subcategory from path
        let categoryId = '';
        let subcategoryId = '';
        
        if (pathParts.length > 0) {
          categoryId = pathParts[0];
          
          if (pathParts.length > 1) {
            // Join all middle path parts as the subcategory (in case subcategory names contain slashes)
            subcategoryId = pathParts.slice(1).join('/');
          }
        }

        // Format title from filename by removing file extension and replacing underscores
        const extension = filename.includes('.') ? filename.substring(filename.lastIndexOf('.')) : '';
        const filenameWithoutExtension = filename.replace(extension, '').replace(/_/g, ' ');
        let title = filenameWithoutExtension;
        
        // If the filename starts with the subcategory name, remove that part to avoid duplication
        if (subcategoryId && title.startsWith(subcategoryId)) {
          title = title.substring(subcategoryId.length).trim();
        }
        
        // Remove any leading numbers and spaces (like "1. ", "2 - ", etc.)
        title = title.replace(/^\d+[\s.-]*/, '').trim();
        
        // If title is empty or just a number, use the full filename
        if (!title || /^\d+$/.test(title)) {
          title = filenameWithoutExtension;
        }
        
        // Generate public URL
        const imageUrl = `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${key}`;
        
        return {
          id: key,
          title,
          description: '', // No description available from folder structure
          imageUrl,
          categoryId,
          subcategoryId: subcategoryId || undefined,
          type: (key.endsWith('.mp4') || key.endsWith('.mov')) ? 'video' : 'image',
          featured: false, // Default to false as we don't have this metadata
          date: object.LastModified ? object.LastModified.toISOString() : new Date().toISOString()
        };
      });
    
    // Sort by category, subcategory, and then by filename
    galleryItems.sort((a, b) => {
      // First sort by category
      if (a.categoryId !== b.categoryId) {
        return a.categoryId.localeCompare(b.categoryId);
      }
      
      // Then sort by subcategory
      if (a.subcategoryId !== b.subcategoryId) {
        return (a.subcategoryId || '').localeCompare(b.subcategoryId || '');
      }
      
      // Finally sort by the original filename which should maintain numeric ordering
      return a.id.localeCompare(b.id);
    });

    // Return gallery items as JSON response
    return new Response(JSON.stringify(galleryItems), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
    
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
