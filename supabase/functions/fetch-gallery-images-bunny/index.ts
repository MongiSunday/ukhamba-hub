
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
    const accessKey = Deno.env.get("BUNNY_STORAGE_ACCESS_KEY");
    const storageZone = Deno.env.get("BUNNY_STORAGE_ZONE") || "ukhamba-storage";
    const pullZone = Deno.env.get("BUNNY_PULL_ZONE");
    
    if (!accessKey || !storageZone) {
      console.error("Missing Bunny.net credentials");
      throw new Error("Missing Bunny.net credentials");
    }

    console.log(`Connecting to Bunny.net storage zone: ${storageZone}`);
    
    // Fetch the list of files from Bunny.net storage API
    const apiUrl = `https://storage.bunnycdn.com/${storageZone}/`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "AccessKey": accessKey,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Bunny.net API response status: ${response.status}`);
      throw new Error(`Failed to fetch from Bunny.net: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      console.error("No objects found in Bunny.net storage");
      throw new Error("No images found in the Bunny.net storage");
    }
    
    console.log(`Found ${data.length} objects in Bunny.net storage`);
    
    // Process the file structure
    const galleryItems: GalleryItem[] = data
      .filter(file => {
        // Filter out non-image/video files and directories
        const isFile = file.IsDirectory === false;
        const filename = file.ObjectName || "";
        return isFile && (
          filename.toLowerCase().endsWith('.jpg') || 
          filename.toLowerCase().endsWith('.jpeg') || 
          filename.toLowerCase().endsWith('.png') || 
          filename.toLowerCase().endsWith('.gif') || 
          filename.toLowerCase().endsWith('.webp') ||
          filename.toLowerCase().endsWith('.mp4') || 
          filename.toLowerCase().endsWith('.mov')
        );
      })
      .map(file => {
        const key = file.ObjectName || "";
        const pathParts = key.split('/');
        const filename = pathParts.pop() || "";
        
        // Get category from path or file structure
        const categoryId = pathParts[0] || 'uncategorized';
        const subcategoryId = pathParts.length > 1 ? pathParts.slice(1).join('/') : undefined;
        
        // Format title from filename
        const extension = filename.includes('.') ? filename.substring(filename.lastIndexOf('.')) : '';
        const filenameWithoutExtension = filename.replace(extension, '').replace(/_/g, ' ');
        const title = filenameWithoutExtension;
        
        // Generate public URL
        let imageUrl = "";
        if (pullZone) {
          // If pull zone is configured, use it
          imageUrl = `https://${pullZone}.b-cdn.net/${key}`;
        } else {
          // Direct storage URL (not recommended for production)
          imageUrl = `https://storage.bunnycdn.com/${storageZone}/${key}`;
        }
        
        return {
          id: key,
          title,
          description: '',
          imageUrl,
          categoryId,
          subcategoryId,
          type: (key.toLowerCase().endsWith('.mp4') || key.toLowerCase().endsWith('.mov')) ? 'video' : 'image',
          featured: false,
          date: file.DateCreated || new Date().toISOString()
        };
      });
    
    // Sort by category, subcategory, and then by filename
    galleryItems.sort((a, b) => {
      if (a.categoryId !== b.categoryId) {
        return a.categoryId.localeCompare(b.categoryId);
      }
      
      if (a.subcategoryId !== b.subcategoryId) {
        return (a.subcategoryId || '').localeCompare(b.subcategoryId || '');
      }
      
      return a.id.localeCompare(b.id);
    });
    
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
