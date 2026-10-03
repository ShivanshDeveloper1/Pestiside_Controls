import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      postcode,
      propertyType,
      service,
      message,
    } = body;

    // Validation (Email aur Name zaroori hain)
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields (Name and Email).",
        },
        { status: 400 }
      );
    }

    const toEmail = process.env.TO_EMAIL || "speedopestcontrol1@gmail.com";
    const fromEmail =
      process.env.FROM_EMAIL || "Speedo Pest Control <onboarding@resend.dev>";

    // Resend email sending
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email, // Jab aap email ka Reply dabaoge, direct client ko mail jayegi
      subject: `New Pest Control Enquiry - ${name}${
        service ? ` (${service})` : ""
      }`,
      text: `
New Enquiry Received:

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Postcode: ${postcode || "Not provided"}
Property Type: ${propertyType || "Not provided"}
Selected Service: ${service || "Not specified"}

Message:
${message || "No additional message provided."}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #e11d48; border-bottom: 2px solid #e11d48; padding-bottom: 8px;">
            New Pest Control Enquiry
          </h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
          <p><strong>Postcode:</strong> ${escapeHtml(postcode || "Not provided")}</p>
          ${
            propertyType
              ? `<p><strong>Property Type:</strong> ${escapeHtml(propertyType)}</p>`
              : ""
          }
          ${
            service
              ? `<p><strong>Selected Service:</strong> ${escapeHtml(service)}</p>`
              : ""
          }
          ${
            message
              ? `
                <h3 style="margin-top: 20px;">Message:</h3>
                <p style="background: #f4f4f5; padding: 12px; border-radius: 8px;">
                  ${escapeHtml(message).replace(/\n/g, "<br />")}
                </p>
              `
              : ""
          }
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been sent successfully!",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact Form Server Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while sending your enquiry.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}