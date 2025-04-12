
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

interface BunnyImageMetadata {
  Key: string;
  LastModified?: string;
  Size?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Bunny.net credentials from environment variables
    const bunnyAccessKey = Deno.env.get("BUNNY_STORAGE_ACCESS_KEY");
    const bunnyStorageZone = Deno.env.get("BUNNY_STORAGE_ZONE");
    const bunnyPullZone = Deno.env.get("BUNNY_PULL_ZONE");
    const region = Deno.env.get("BUNNY_REGION") || "de";
    
    if (!bunnyAccessKey || !bunnyStorageZone || !bunnyPullZone) {
      console.error("Missing Bunny.net credentials:", {
        hasAccessKey: !!bunnyAccessKey,
        hasStorageZone: !!bunnyStorageZone,
        hasPullZone: !!bunnyPullZone
      });
      throw new Error("Missing Bunny.net credentials");
    }

    console.log(`Connecting to Bunny.net storage zone: ${bunnyStorageZone}, pull zone: ${bunnyPullZone}, region: ${region}`);

    // Fetch image list from Bunny.net storage with improved error handling
    const bunnyApiUrl = `https://storage.bunnycdn.com/${bunnyStorageZone}/gallery/`;
    console.log(`Fetching from Bunny.net API: ${bunnyApiUrl}`);
    
    const response = await fetch(bunnyApiUrl, {
      headers: {
        "AccessKey": bunnyAccessKey,
      },
    });

    console.log(`Bunny.net response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch from Bunny.net storage:", response.status, errorText);
      throw new Error(`Failed to fetch from Bunny.net storage: ${response.status} - ${errorText}`);
    }

    let bunnyFiles: BunnyImageMetadata[];
    try {
      bunnyFiles = await response.json();
      console.log(`Successfully parsed response. Found ${bunnyFiles?.length || 0} objects.`);
    } catch (parseError) {
      const responseText = await response.text();
      console.error("Failed to parse Bunny.net response:", parseError, "Response text:", responseText);
      throw new Error(`Failed to parse Bunny.net response: ${parseError.message}`);
    }
    
    // Check if we actually have files
    if (!bunnyFiles || bunnyFiles.length === 0) {
      console.error("No objects found in Bunny.net storage. Please check your storage zone configuration.");
      
      // Return a more helpful error response
      return new Response(JSON.stringify({ 
        error: "No images found in the Bunny.net storage",
        message: "Please check your storage zone configuration and ensure images are uploaded to the /gallery/ directory."
      }), {
        status: 404,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }
    
    console.log(`Found ${bunnyFiles.length} objects in Bunny.net storage`);

    // Process the file structure to reflect the directory hierarchy
    const galleryItems: GalleryItem[] = bunnyFiles
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
      .map((object) => {
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
        
        // Generate public URL through the CDN pull zone
        const imageUrl = `https://${bunnyPullZone}.b-cdn.net/gallery/${key}`;
        
        return {
          id: key,
          title,
          description: '', // No description available from folder structure
          imageUrl,
          categoryId,
          subcategoryId: subcategoryId || undefined,
          type: (key.endsWith('.mp4') || key.endsWith('.mov')) ? 'video' : 'image',
          featured: false, // Default to false as we don't have this metadata
          date: object.LastModified || new Date().toISOString()
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
    
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString(),
      note: "Please check that your Bunny.net credentials are correct and that the gallery folder exists in your storage zone."
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
