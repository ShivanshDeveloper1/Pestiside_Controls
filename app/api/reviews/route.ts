// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { dbConnect } from "@/lib/dbConnect";
import Review from "@/models/Review";
import cloudinary from "@/lib/cloudinary";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: reviews }, { status: 200 });
  } catch (error) {
    console.error("Fetch Reviews Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, area, rating, quote, avatar } = body;

    // 1. Validation
    if (!name || !email || !area || !rating || !quote) {
      return NextResponse.json(
        { success: false, error: "Missing required review fields" },
        { status: 400 }
      );
    }

    let avatarUrl = "";

    // 2. Upload avatar image to Cloudinary if provided
    if (avatar && avatar.startsWith("data:image")) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(avatar, {
          folder: "customer_reviews",
          transformation: [
            { width: 200, height: 200, crop: "fill", gravity: "face" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });
        avatarUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
      }
    } else if (avatar && avatar.startsWith("http")) {
      avatarUrl = avatar;
    }

    // 3. Save review to MongoDB
    const review = await Review.create({
      name,
      email,
      area,
      rating: Number(rating),
      quote,
      avatar: avatarUrl,
    });

    // 4. Send Email Notification to Admin via Resend
    const toEmail = process.env.TO_EMAIL || "speedopestcontrol1@gmail.com";
    const fromEmail =
      process.env.FROM_EMAIL || "Speedo Pest Control <onboarding@resend.dev>";

    const starsHtml = "★".repeat(Number(rating)) + "☆".repeat(5 - Number(rating));

    try {
      await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: `⭐ New ${rating}-Star Review Received - ${name}`,
        text: `
New Review Submitted:

Name: ${name}
Email: ${email}
Rating: ${rating}/5 Stars
Area/Location: ${area}

Review:
"${quote}"

Image URL: ${avatarUrl || "No image uploaded"}
        `.trim(),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #e11d48; padding-bottom: 8px; margin-top: 0;">
              ⭐ New Customer Review Posted
            </h2>
            
            <div style="font-size: 20px; color: #e11d48; margin-bottom: 12px;">
              <strong>${starsHtml}</strong> (${rating}/5 Stars)
            </div>

            <p style="margin: 6px 0;"><strong>Customer Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 6px 0;"><strong>Customer Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p style="margin: 6px 0;"><strong>Location / Area:</strong> ${escapeHtml(area)}</p>

            <div style="margin-top: 16px;">
              <strong>Review:</strong>
              <blockquote style="background: #f8fafc; border-left: 4px solid #e11d48; margin: 8px 0; padding: 12px; font-style: italic; color: #334155;">
                "${escapeHtml(quote)}"
              </blockquote>
            </div>

            ${
              avatarUrl
                ? `
              <div style="margin-top: 16px;">
                <strong>Attached Photo:</strong><br />
                <img src="${avatarUrl}" alt="Customer Avatar" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-top: 8px; border: 1px solid #cbd5e1;" />
              </div>
            `
                : ""
            }

            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">
              This notification was generated automatically from your website review form.
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Resend Review Email Error:", emailErr);
    }

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    console.error("Create Review Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create review" },
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