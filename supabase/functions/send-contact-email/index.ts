import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    console.log('Sending contact email for:', { name, email, subject });

    // Send notification email to organization
    const notificationResponse = await resend.emails.send({
      from: "Ukhamba <onboarding@resend.dev>",
      to: ["realvisionstreaming@gmail.com"], // Replace with your organization email
      reply_to: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Reply to this message by contacting ${email} directly.</em></p>
      `,
    });

    // Send confirmation email to user
    const confirmationResponse = await resend.emails.send({
      from: "Ukhamba <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Ukhamba",
      html: `
        <h1>Thank you for reaching out, ${name}!</h1>
        <p>We have received your message about "${subject}" and will get back to you as soon as possible.</p>
        <p>Your message:</p>
        <blockquote style="border-left: 3px solid #ddd; padding-left: 15px; margin: 20px 0; color: #666;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>The Ukhamba Team</p>
      `,
    });

    console.log("Emails sent successfully:", { notificationResponse, confirmationResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      notificationId: notificationResponse.data?.id,
      confirmationId: confirmationResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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