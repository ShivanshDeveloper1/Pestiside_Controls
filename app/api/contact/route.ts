import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      postcode,
      propertyType,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete the required fields.",
        },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error("Missing Gmail environment variables.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Speedy Pest Control Website" <${gmailUser}>`,
      to: "speedopestcontrol1@gmail.com",
      replyTo: email,
      subject: `New Pest Control Enquiry${name ? ` - ${name}` : ""}`,
      text: `
New enquiry from Speedy Pest Control website

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Postcode: ${postcode || "Not provided"}
Property Type: ${propertyType || "Not provided"}

Message:
${message}
      `.trim(),
      html: `
        <h2>New Pest Control Enquiry</h2>

        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Postcode:</strong> ${escapeHtml(postcode || "Not provided")}</p>
        <p><strong>Property Type:</strong> ${escapeHtml(
          propertyType || "Not provided"
        )}</p>

        <h3>Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form email error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "We could not send your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}