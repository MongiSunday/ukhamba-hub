
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
    
    // Fetch images from Cloudflare Images API
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountHash}/images/v1?per_page=100`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    })

    console.log('Cloudflare API response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Cloudflare API error response:', errorText)
      throw new Error(`Cloudflare API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log('Cloudflare API response structure:', {
      success: data.success,
      hasResult: !!data.result,
      hasImages: !!data.result?.images,
      imageCount: data.result?.images?.length || 0,
      sampleImage: data.result?.images?.[0]
    })

    if (!data.success) {
      console.error('Cloudflare API returned error:', data.errors)
      throw new Error(`Cloudflare API error: ${JSON.stringify(data.errors)}`)
    }

    // Transform Cloudflare images to our format
    const images = (data.result?.images || []).map((image: any) => {
      // Extract category and title from filename
      let category = 'general'
      let title = image.filename || `Image ${image.id}`
      
      if (image.filename) {
        const filename = image.filename.toLowerCase()
        
        // Categorize based on filename patterns
        if (filename.includes('community') || filename.includes('multicultural') || filename.includes('celebrating')) {
          category = 'community-events'
        } else if (filename.includes('youth') || filename.includes('entertainment') || filename.includes('motivation')) {
          category = 'youth-programs'
        } else if (filename.includes('reaching') || filename.includes('providing') || filename.includes('introducing')) {
          category = 'rural-development'
        } else if (filename.includes('counseling') || filename.includes('counselling') || filename.includes('professional')) {
          category = 'faith-initiatives'
        } else if (filename.includes('virginity') || filename.includes('traditional') || filename.includes('culture')) {
          category = 'cultural-programs'
        } else if (filename.includes('sports') || filename.includes('gymnastics') || filename.includes('promoting')) {
          category = 'sports-recreation'
        }
        
        // Clean up title - remove file extension and improve formatting
        title = image.filename.replace(/\.[^/.]+$/, '').replace(/\d+$/, '').trim()
        title = title.replace(/&/g, 'and').replace(/_/g, ' ')
      }

      // Use the variants provided by Cloudflare with higher quality settings
      let thumbnailUrl = ''
      let fullUrl = ''
      
      if (image.variants && image.variants.length > 0) {
        // Find specific variants or use the provided URLs with better quality
        thumbnailUrl = image.variants.find((v: string) => v.includes('/thumbnail')) || image.variants[0]
        fullUrl = image.variants.find((v: string) => v.includes('/public')) || image.variants[image.variants.length - 1]
        
        // Enhance thumbnail quality by appending quality parameters
        if (thumbnailUrl && !thumbnailUrl.includes('?')) {
          thumbnailUrl = `${thumbnailUrl}?quality=90&fit=cover&width=600&height=400`
        }
      } else {
        // Fallback with higher quality settings
        thumbnailUrl = `https://imagedelivery.net/${accountHash}/${image.id}/w=600,h=400,fit=cover,q=90`
        fullUrl = `https://imagedelivery.net/${accountHash}/${image.id}/public`
      }
      
      console.log(`Processing image ${image.id}:`, {
        filename: image.filename,
        title,
        category,
        thumbnailUrl,
        fullUrl
      })

      return {
        id: image.id,
        cloudflareId: image.id,
        title: title,
        description: `${category.replace('-', ' ')} image`,
        alt: title,
        category: category,
        thumbnailUrl: thumbnailUrl,
        fullUrl: fullUrl,
        uploaded: image.uploaded,
        originalFilename: image.filename
      }
    })

    // Sort by category first, then by title for better organization
    images.sort((a: any, b: any) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category)
      }
      return a.title.localeCompare(b.title)
    })

    console.log(`Successfully processed ${images.length} images`)
    console.log('Sample processed image:', images[0])

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
