
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
    
    if (!accountHash) {
      throw new Error('Cloudflare credentials not configured')
    }

    const config = {
      accountHash,
      deliveryUrl: 'https://imagedelivery.net',
      variants: {
        thumbnail: 'thumbnail',
        full: 'public',
        medium: 'medium'
      }
    }

    return new Response(
      JSON.stringify(config),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
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
