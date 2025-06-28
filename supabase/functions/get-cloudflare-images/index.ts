
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const accountHash = Deno.env.get('CLOUDFLARE_ACCOUNT_HASH')
    const apiToken = Deno.env.get('CLOUDFLARE_API_TOKEN')
    
    console.log('Environment check:', {
      hasAccountHash: !!accountHash,
      hasApiToken: !!apiToken,
      accountHashLength: accountHash?.length,
      apiTokenLength: apiToken?.length
    })
    
    if (!accountHash || !apiToken) {
      throw new Error('Cloudflare credentials not configured')
    }

    console.log('Fetching images from Cloudflare Images API...')
    console.log('Account Hash:', accountHash)
    console.log('API URL:', `https://api.cloudflare.com/client/v4/accounts/${accountHash}/images/v1`)
    
    // Fetch images from Cloudflare Images API
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountHash}/images/v1`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    })

    console.log('Cloudflare API response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Cloudflare API error response:', errorText)
      
      // Try to parse error response
      let errorData;
      try {
        errorData = JSON.parse(errorText);
        console.error('Parsed error data:', errorData);
      } catch (e) {
        console.error('Could not parse error response as JSON');
      }
      
      throw new Error(`Cloudflare API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log('Cloudflare API response structure:', {
      success: data.success,
      hasResult: !!data.result,
      hasImages: !!data.result?.images,
      imageCount: data.result?.images?.length || 0,
      errors: data.errors
    })

    if (!data.success) {
      console.error('Cloudflare API returned error:', data.errors)
      throw new Error(`Cloudflare API error: ${JSON.stringify(data.errors)}`)
    }

    // Transform Cloudflare images to our format
    const images = (data.result?.images || []).map((image: any) => {
      // Extract category from tags or filename
      let category = 'general'
      if (image.meta?.tags?.length > 0) {
        category = image.meta.tags[0]
      } else if (image.filename) {
        // Try to extract category from filename patterns
        const filename = image.filename.toLowerCase()
        if (filename.includes('community')) category = 'community-events'
        else if (filename.includes('youth')) category = 'youth-programs'
        else if (filename.includes('rural')) category = 'rural-development'
        else if (filename.includes('faith')) category = 'faith-initiatives'
        else if (filename.includes('gbv')) category = 'gbv-prevention'
      }

      return {
        id: image.id,
        cloudflareId: image.id,
        title: image.meta?.title || image.filename || `Image ${image.id}`,
        description: image.meta?.description || `Uploaded on ${new Date(image.uploaded).toLocaleDateString()}`,
        alt: image.meta?.alt || image.meta?.title || image.filename || `Image ${image.id}`,
        category: category,
        thumbnailUrl: `https://imagedelivery.net/${accountHash}/${image.id}/thumbnail`,
        fullUrl: `https://imagedelivery.net/${accountHash}/${image.id}/public`,
        uploaded: image.uploaded
      }
    })

    // Sort by upload date (newest first)
    images.sort((a: any, b: any) => new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime())

    console.log(`Successfully processed ${images.length} images`)

    return new Response(
      JSON.stringify({ images }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error fetching Cloudflare images:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        images: [] 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
