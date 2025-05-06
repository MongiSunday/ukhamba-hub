
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

    // Direct fetch to Cloudflare R2 API instead of using the AWS SDK
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;
    const region = 'auto';
    const isoDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const date = isoDate.substring(0, 8);
    
    // Create AWS Signature Version 4 headers
    const method = 'GET';
    const canonicalUri = `/${bucketName}`;
    const canonicalQueryString = 'list-type=2';
    const host = `${accountId}.r2.cloudflarestorage.com`;
    
    const canonicalHeaders = 
      `host:${host}\n` + 
      `x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\n` +
      `x-amz-date:${isoDate}\n`;
    
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${date}/${region}/s3/aws4_request`;
    
    // Create canonical request
    const canonicalRequest = 
      `${method}\n` +
      `${canonicalUri}\n` +
      `${canonicalQueryString}\n` +
      `${canonicalHeaders}\n` +
      `${signedHeaders}\n` +
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    
    // Function to sign with HMAC-SHA256
    async function sign(key: ArrayBuffer, msg: string): Promise<ArrayBuffer> {
      const encoder = new TextEncoder();
      const keyObj = await crypto.subtle.importKey(
        'raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
      );
      return await crypto.subtle.sign('HMAC', keyObj, encoder.encode(msg));
    }
    
    // Generate the signature
    async function getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string): Promise<ArrayBuffer> {
      const encoder = new TextEncoder();
      const kDate = await sign(encoder.encode(`AWS4${key}`), dateStamp);
      const kRegion = await sign(kDate, regionName);
      const kService = await sign(kRegion, serviceName);
      const kSigning = await sign(kService, 'aws4_request');
      return kSigning;
    }
    
    // Hash the canonical request
    const encoder = new TextEncoder();
    const hash = await crypto.subtle.digest('SHA-256', encoder.encode(canonicalRequest));
    const hashHex = Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Create string to sign
    const stringToSign = 
      `${algorithm}\n` +
      `${isoDate}\n` +
      `${credentialScope}\n` +
      `${hashHex}`;
    
    // Calculate signature
    const signingKey = await getSignatureKey(secretAccessKey, date, region, 's3');
    const signature = await crypto.subtle.sign(
      'HMAC', 
      await crypto.subtle.importKey('raw', signingKey, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']),
      encoder.encode(stringToSign)
    );
    const signatureHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Create authorization header
    const authorizationHeader = 
      `${algorithm} ` +
      `Credential=${accessKeyId}/${credentialScope}, ` +
      `SignedHeaders=${signedHeaders}, ` +
      `Signature=${signatureHex}`;
    
    // Make the request to list objects
    const url = `${endpoint}/${bucketName}?list-type=2`;
    console.log("Making direct fetch request to R2");

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Host': host,
        'X-Amz-Content-SHA256': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        'X-Amz-Date': isoDate,
        'Authorization': authorizationHeader
      }
    });

    if (!response.ok) {
      console.error(`R2 API responded with status: ${response.status}`);
      const errorText = await response.text();
      console.error(`Error response: ${errorText}`);
      throw new Error(`Failed to list objects from R2: ${response.status} ${response.statusText}`);
    }

    const xmlData = await response.text();
    console.log("Received XML response from R2");
    
    // Basic XML parsing function for ListObjectsV2 response
    function parseXml(xml: string) {
      const contents: any[] = [];
      
      // Extract all objects/items
      const keyRegex = /<Key>(.+?)<\/Key>/g;
      const lastModifiedRegex = /<LastModified>(.+?)<\/LastModified>/g;
      const etагRegex = /<ETag>"(.+?)"<\/ETag>/g;
      const sizeRegex = /<Size>(\d+)<\/Size>/g;
      
      const keys: string[] = [];
      const lastModified: string[] = [];
      const etags: string[] = [];
      const sizes: string[] = [];
      
      let match;
      
      // Extract all keys
      while ((match = keyRegex.exec(xml)) !== null) {
        keys.push(match[1]);
      }
      
      // Extract last modified dates
      while ((match = lastModifiedRegex.exec(xml)) !== null) {
        lastModified.push(match[1]);
      }
      
      // Extract ETags
      while ((match = etагRegex.exec(xml)) !== null) {
        etags.push(match[1]);
      }
      
      // Extract sizes
      while ((match = sizeRegex.exec(xml)) !== null) {
        sizes.push(match[1]);
      }
      
      // Combine all data into objects
      for (let i = 0; i < keys.length; i++) {
        contents.push({
          Key: keys[i],
          LastModified: new Date(lastModified[i] || ''),
          ETag: etags[i] || '',
          Size: parseInt(sizes[i] || '0'),
          StorageClass: 'STANDARD'
        });
      }
      
      return { Contents: contents };
    }
    
    const r2Response = parseXml(xmlData);
    
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
      .map((object: any) => {
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
