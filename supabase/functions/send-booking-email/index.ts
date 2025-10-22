import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  type: "booking" | "corporate";
  data: {
    name: string;
    email: string;
    phone: string;
    // Booking specific
    carName?: string;
    pickupLocation?: string;
    dropoffLocation?: string;
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
    totalDays?: number;
    totalPrice?: string;
    // Corporate specific
    location?: string;
    numCars?: string;
    numDays?: string;
    purpose?: string;
    details?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: BookingEmailRequest = await req.json();
    console.log(`Processing ${type} email request for:`, data.email);

    let emailSubject = "";
    let emailHtml = "";

    if (type === "booking") {
      emailSubject = `New Car Booking Request - ${data.carName}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #dc2626; }
              .section-title { color: #dc2626; font-weight: bold; margin-bottom: 15px; font-size: 18px; }
              .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
              .info-label { font-weight: 600; color: #4b5563; }
              .info-value { color: #1f2937; }
              .highlight { background: #dc2626; color: white; padding: 15px; border-radius: 6px; text-align: center; font-size: 20px; font-weight: bold; margin: 20px 0; }
              .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🚗 New Booking Request</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Car Rental Booking Details</p>
              </div>
              
              <div class="content">
                <div class="section">
                  <div class="section-title">👤 Customer Information</div>
                  <div class="info-row">
                    <span class="info-label">Full Name:</span>
                    <span class="info-value">${data.name}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${data.email}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value">${data.phone}</span>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">🚘 Vehicle Details</div>
                  <div class="info-row">
                    <span class="info-label">Car Model:</span>
                    <span class="info-value">${data.carName}</span>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">📍 Location Details</div>
                  <div class="info-row">
                    <span class="info-label">Pick-up Location:</span>
                    <span class="info-value">${data.pickupLocation}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Drop-off Location:</span>
                    <span class="info-value">${data.dropoffLocation}</span>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">📅 Rental Period</div>
                  <div class="info-row">
                    <span class="info-label">Pick-up Date & Time:</span>
                    <span class="info-value">${data.pickupDate} at ${data.pickupTime}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Drop-off Date & Time:</span>
                    <span class="info-value">${data.returnDate} at ${data.returnTime}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Total Duration:</span>
                    <span class="info-value">${data.totalDays} ${Number(data.totalDays) === 1 ? "day" : "days"}</span>
                  </div>
                </div>

                <div class="highlight">
                  💰 Total Price: Rs ${data.totalPrice}
                </div>

                <div class="footer">
                  <p>This is an automated notification from your car rental booking system.</p>
                  <p>Please respond to the customer promptly at ${data.email}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
    } else if (type === "corporate") {
      emailSubject = `New Corporate Enquiry - ${data.purpose}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #dc2626; }
              .section-title { color: #dc2626; font-weight: bold; margin-bottom: 15px; font-size: 18px; }
              .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
              .info-label { font-weight: 600; color: #4b5563; }
              .info-value { color: #1f2937; }
              .details-box { background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 15px; border: 1px solid #e5e7eb; }
              .badge { display: inline-block; background: #dc2626; color: white; padding: 6px 12px; border-radius: 4px; font-size: 14px; font-weight: bold; }
              .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🏢 New Corporate Enquiry</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Corporate Car Rental Request</p>
              </div>
              
              <div class="content">
                <div class="section">
                  <div class="section-title">👤 Contact Information</div>
                  <div class="info-row">
                    <span class="info-label">Full Name:</span>
                    <span class="info-value">${data.name}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${data.email}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value">${data.phone}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Location:</span>
                    <span class="info-value">${data.location}</span>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">📊 Requirement Details</div>
                  <div class="info-row">
                    <span class="info-label">Number of Cars:</span>
                    <span class="info-value"><span class="badge">${data.numCars}</span></span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Number of Days:</span>
                    <span class="info-value"><span class="badge">${data.numDays}</span></span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Purpose:</span>
                    <span class="info-value">${data.purpose}</span>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">📝 Additional Details</div>
                  <div class="details-box">
                    ${data.details}
                  </div>
                </div>

                <div class="footer">
                  <p><strong>⚡ Priority:</strong> Corporate enquiries require prompt attention</p>
                  <p>Please respond to ${data.name} at ${data.email}</p>
                  <p style="margin-top: 15px; color: #9ca3af;">This is an automated notification from your corporate enquiry system.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Car Rental <onboarding@resend.dev>",
      to: ["oacreatives951@gmail.com"],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
