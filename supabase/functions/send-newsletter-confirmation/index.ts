import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    console.log('Sending newsletter confirmation for:', email);

    // Send confirmation email to user
    const emailResponse = await resend.emails.send({
      from: "Ukhamba <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Ukhamba Newsletter!",
      html: `
        <h1>Welcome to the Ukhamba Community!</h1>
        <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
        <ul>
          <li>Our community programs and initiatives</li>
          <li>Upcoming events and workshops</li>
          <li>Ways to get involved and make a difference</li>
          <li>Impact stories from our community</li>
        </ul>
        <p>We're excited to have you on this journey with us as we work together to create positive change across South Africa.</p>
        <p>Best regards,<br>The Ukhamba Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          You can unsubscribe from this newsletter at any time by contacting us.
        </p>
      `,
    });

    // Also notify organization about new subscriber
    await resend.emails.send({
      from: "Ukhamba <onboarding@resend.dev>",
      to: ["info@ukhamba.org"], // Replace with your organization email
      subject: "New Newsletter Subscription",
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>A new subscriber has joined the newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("Newsletter confirmation sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);