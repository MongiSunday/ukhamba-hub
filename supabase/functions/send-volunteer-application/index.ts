import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VolunteerApplicationRequest {
  fullName: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string;
  skills: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone, interests, availability, skills }: VolunteerApplicationRequest = await req.json();

    console.log('Sending volunteer application for:', { fullName, email });

    // Send notification email to organization
    const notificationResponse = await resend.emails.send({
      from: "Ukhamba <onboarding@resend.dev>",
      to: ["volunteers@ukhamba.org"], // Replace with your volunteer coordinator email
      subject: `New Volunteer Application: ${fullName}`,
      html: `
        <h2>New Volunteer Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Interests:</strong> ${interests.join(', ')}</p>
        <p><strong>Availability:</strong> ${availability}</p>
        <p><strong>Skills:</strong></p>
        <p>${skills.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Please follow up with ${fullName} at ${email} or ${phone}.</em></p>
      `,
    });

    // Send confirmation email to volunteer
    const confirmationResponse = await resend.emails.send({
      from: "Ukhamba <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for your volunteer application!",
      html: `
        <h1>Thank you for applying to volunteer, ${fullName}!</h1>
        <p>We're excited about your interest in joining the Ukhamba community and making a positive impact.</p>
        
        <h2>Your Application Details:</h2>
        <p><strong>Areas of Interest:</strong> ${interests.join(', ')}</p>
        <p><strong>Availability:</strong> ${availability}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        
        <p>Our volunteer coordinator will review your application and get back to you within 3-5 business days with next steps.</p>
        
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>Follow us on social media for updates</li>
          <li>Subscribe to our newsletter if you haven't already</li>
          <li>Learn more about our programs on our website</li>
        </ul>
        
        <p>Thank you for choosing to make a difference with Ukhamba!</p>
        <p>Best regards,<br>The Ukhamba Volunteer Team</p>
      `,
    });

    console.log("Volunteer application emails sent successfully:", { notificationResponse, confirmationResponse });

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
    console.error("Error in send-volunteer-application function:", error);
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