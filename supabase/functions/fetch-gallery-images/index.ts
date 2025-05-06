
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
    const accountId = Deno.env.get("CLOUDFLARE_R2_ACCOUNT_ID");
    const accessKeyId = Deno.env.get("CLOUDFLARE_R2_ACCESS_KEY_ID");
    const secretAccessKey = Deno.env.get("CLOUDFLARE_R2_SECRET_ACCESS_KEY");
    const bucketName = Deno.env.get("CLOUDFLARE_R2_BUCKET_NAME") || "ukhamba-gallery";
    
    // Validate necessary environment variables with detailed logging
    if (!accountId) {
      console.error("Missing CLOUDFLARE_R2_ACCOUNT_ID environment variable");
      throw new Error("Missing Cloudflare R2 account ID");
    }
    
    if (!accessKeyId) {
      console.error("Missing CLOUDFLARE_R2_ACCESS_KEY_ID environment variable");
      throw new Error("Missing Cloudflare R2 access key ID");
    }
    
    if (!secretAccessKey) {
      console.error("Missing CLOUDFLARE_R2_SECRET_ACCESS_KEY environment variable");
      throw new Error("Missing Cloudflare R2 secret access key");
    }

    console.log(`Connecting to R2 bucket: ${bucketName} in account ${accountId}`);

    // Create S3 client for R2
    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // List objects in the bucket with pagination support
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 1000, // Adjust as needed for larger galleries
    });

    console.log("Sending ListObjectsV2Command to R2");
    const r2Response = await s3Client.send(command);
    
    if (!r2Response.Contents || r2Response.Contents.length === 0) {
      console.error("No objects found in R2 bucket");
      throw new Error("No images found in the R2 bucket");
    }
    
    console.log(`Found ${r2Response.Contents.length} objects in R2 bucket`);

    // Process the file structure to create gallery items
    const galleryItems: GalleryItem[] = r2Response.Contents
      .filter(object => {
        // Filter out non-image/video files and directories
        const key = object.Key || "";
        const isValidMedia = (
          key.toLowerCase().endsWith('.jpg') || 
          key.toLowerCase().endsWith('.jpeg') || 
          key.toLowerCase().endsWith('.png') || 
          key.toLowerCase().endsWith('.gif') || 
          key.toLowerCase().endsWith('.webp') ||
          key.toLowerCase().endsWith('.mp4') || 
          key.toLowerCase().endsWith('.mov')
        );
        
        const isNotDirectory = !key.endsWith('/');
        return isValidMedia && isNotDirectory;
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
            // Join all middle path parts as the subcategory
            subcategoryId = pathParts.slice(1).join('/');
          }
        }

        // Format title from filename
        const extension = filename.includes('.') ? filename.substring(filename.lastIndexOf('.')) : '';
        const filenameWithoutExtension = filename.replace(extension, '').replace(/_/g, ' ');
        let title = filenameWithoutExtension;
        
        // Clean up title - remove numbers and prefix
        if (subcategoryId && title.startsWith(subcategoryId)) {
          title = title.substring(subcategoryId.length).trim();
        }
        
        // Remove leading numbers, dots, dashes
        title = title.replace(/^\d+[\s.-]*/, '').trim();
        title = title.charAt(0).toUpperCase() + title.slice(1);
        
        // If title is empty or just a number, use the full filename
        if (!title || /^\d+$/.test(title)) {
          title = filenameWithoutExtension;
        }
        
        // Generate public URL with properly encoded path
        const encodedKey = key.split('/').map(part => encodeURIComponent(part)).join('/');
        const imageUrl = `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${encodedKey}`;
        
        // Determine content type
        const isVideo = key.toLowerCase().endsWith('.mp4') || key.toLowerCase().endsWith('.mov');
        
        return {
          id: key,
          title,
          description: '', // Will be enhanced by gallery service
          imageUrl,
          categoryId: categoryId || 'uncategorized',
          subcategoryId: subcategoryId || undefined,
          type: isVideo ? 'video' : 'image',
          featured: false, // Default value
          date: object.LastModified ? object.LastModified.toISOString() : new Date().toISOString()
        };
      });
    
    // Sort the items
    galleryItems.sort((a, b) => {
      // First sort by category
      if (a.categoryId !== b.categoryId) {
        return a.categoryId.localeCompare(b.categoryId);
      }
      
      // Then by subcategory
      if (a.subcategoryId !== b.subcategoryId) {
        return (a.subcategoryId || '').localeCompare(b.subcategoryId || '');
      }
      
      // Finally by filename (preserves numeric ordering)
      return a.id.localeCompare(b.id);
    });

    console.log(`Processed ${galleryItems.length} gallery items successfully`);
    
    // Return gallery items as JSON response with CORS headers
    return new Response(JSON.stringify(galleryItems), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
    
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    
    // Return a detailed error response
    return new Response(JSON.stringify({ 
      error: error.message,
      provider: "cloudflare",
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
