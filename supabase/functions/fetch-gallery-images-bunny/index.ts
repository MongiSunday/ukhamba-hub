
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Cloudflare R2 credentials from environment variables
    const cfAccountId = Deno.env.get("CLOUDFLARE_R2_ACCOUNT_ID");
    const cfAccessKeyId = Deno.env.get("CLOUDFLARE_R2_ACCESS_KEY_ID");
    const cfSecretAccessKey = Deno.env.get("CLOUDFLARE_R2_SECRET_ACCESS_KEY");
    const cfBucketName = Deno.env.get("CLOUDFLARE_R2_BUCKET_NAME") || "ukhamba-gallery";
    
    if (!cfAccountId || !cfAccessKeyId || !cfSecretAccessKey) {
      throw new Error("Missing Cloudflare R2 credentials");
    }

    console.log(`Connecting to Cloudflare R2 bucket: ${cfBucketName}`);

    // Construct the base URL for Cloudflare R2 public access
    const publicUrlBase = `https://${cfBucketName}.${cfAccountId}.r2.cloudflarestorage.com`;
    
    // Fetch the list of objects using Cloudflare's R2 API
    const listObjectsUrl = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/r2/buckets/${cfBucketName}/objects`;
    
    const response = await fetch(listObjectsUrl, {
      headers: {
        "Authorization": `Bearer ${Deno.env.get("CLOUDFLARE_API_TOKEN")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Cloudflare API response status: ${response.status}`);
      console.error(`Failed to fetch from Cloudflare R2: ${response.status} ${errorText}`);
      throw new Error(`Failed to fetch from Cloudflare R2: ${response.status} - ${errorText}`);
    }

    const objects = await response.json();
    
    if (!objects.result || objects.result.length === 0) {
      console.error("No objects found in Cloudflare R2 bucket");
      throw new Error("No images found in the Cloudflare R2 bucket");
    }
    
    console.log(`Found ${objects.result.length} objects in Cloudflare R2 bucket`);

    // Process the file structure to extract gallery items
    const galleryItems: GalleryItem[] = objects.result
      .filter((object: any) => {
        // Filter out non-image/video files and directories
        const key = object.key || "";
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
      .map((object: any) => {
        const key = object.key || "";
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
        const imageUrl = `${publicUrlBase}/${key}`;
        
        return {
          id: key,
          title: title.charAt(0).toUpperCase() + title.slice(1), // Capitalize first letter
          description: '', // No description available from folder structure
          imageUrl,
          categoryId,
          subcategoryId: subcategoryId || undefined,
          type: (key.endsWith('.mp4') || key.endsWith('.mov')) ? 'video' : 'image',
          featured: false, // Default to false as we don't have this metadata
          date: object.uploaded || new Date().toISOString()
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

    console.log(`Successfully processed ${galleryItems.length} gallery items`);

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
