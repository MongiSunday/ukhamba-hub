import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DonationRequest {
  firstName: string;
  lastName: string;
  email: string;
  amount: string;
  isMonthly: boolean;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, amount, isMonthly, message }: DonationRequest = await req.json();

    console.log('Sending donation confirmation for:', { firstName, lastName, email, amount });

    const donationType = isMonthly ? 'monthly recurring' : 'one-time';
    const fullName = `${firstName} ${lastName}`;

    // Send notification email to organization
    const notificationResponse = await resend.emails.send({
      from: "Ukhamba <onboarding@resend.dev>",
      to: ["realvisionstreaming@gmail.com"], // Replace with your donations email
      reply_to: email,
      subject: `New Donation: R${amount} (${donationType})`,
      html: `
        <h2>New Donation Received</h2>
        <p><strong>Donor:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Amount:</strong> R${amount}</p>
        <p><strong>Type:</strong> ${donationType}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><em>Please process this donation and send receipt if needed.</em></p>
      `,
    });

    // Send thank you email to donor
    const confirmationResponse = await resend.emails.send({
      from: "Ukhamba <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for your generous donation!",
      html: `
        <h1>Thank you, ${firstName}!</h1>
        <p>Your ${donationType} donation of <strong>R${amount}</strong> has been received and will make a meaningful impact in our community.</p>
        
        <h2>Donation Details:</h2>
        <p><strong>Amount:</strong> R${amount}</p>
        <p><strong>Type:</strong> ${donationType}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        ${message ? `<p><strong>Your message:</strong> ${message}</p>` : ''}
        
        <h2>How Your Donation Helps:</h2>
        <ul>
          <li>Supports our youth development programs</li>
          <li>Funds community outreach initiatives</li>
          <li>Provides resources for skills training</li>
          <li>Enables us to reach more communities in need</li>
        </ul>
        
        ${isMonthly ? `
        <p><strong>Monthly Giving:</strong> Your recurring donation will automatically process each month. You can modify or cancel your monthly giving at any time by contacting us.</p>
        ` : ''}
        
        <p>We'll keep you updated on the impact your donation is making through our newsletter and impact reports.</p>
        
        <p>With gratitude,<br>The Ukhamba Team</p>
        
        <hr>
        <p style="font-size: 12px; color: #666;">
          This email serves as your donation receipt. Please keep it for your records.
          Tax deductible receipts will be sent separately if applicable.
        </p>
      `,
    });

    console.log("Donation confirmation emails sent successfully:", { notificationResponse, confirmationResponse });

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
    console.error("Error in send-donation-confirmation function:", error);
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