import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    // Save to Firestore
    const docRef = await addDoc(collection(db, "waitlist"), {
      name,
      email,
      timestamp: new Date(),
    });

    console.log("User added to Firestore waitlist:", docRef.id);

    // Send confirmation email
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Cardia Team" <noreply@cardia.com>',
      to: email,
      subject: "Welcome to the Cardia Waitlist!",
      text: `Hello ${name},\n\nThank you for joining our waitlist. We're excited to have you on board!\n\nBest regards,\nThe Cardia Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <header style="background-color: #FFC671; padding: 20px; text-align: center;">
            <h1 style="color: #272626; margin: 0;">Welcome to Cardia!</h1>
          </header>
          <main style="padding: 20px; background-color: #FFF9F0;">
            <h2 style="color: #272626;">Hello ${name},</h2>
            <p style="color: #272626; line-height: 1.6;">
              Thank you for joining our waitlist. We're thrilled to have you on board and can't wait to share Cardia with you!
            </p>
            <p style="color: #272626; line-height: 1.6;">
              Here's what you can expect:
            </p>
            <ul style="color: #272626; line-height: 1.6;">
              <li>Early access to Cardia when we launch</li>
              <li>Exclusive updates on our progress</li>
              <li>Special offers for our waitlist members</li>
            </ul>
            <p style="color: #272626; line-height: 1.6;">
              Stay tuned for more information. We'll be in touch soon!
            </p>
          </main>
          <footer style="background-color: #272626; color: #FFF9F0; padding: 20px; text-align: center;">
            <p>&copy; 2024 Cardia. All rights reserved.</p>
            <p>
              <a href="#" style="color: #FFC671; text-decoration: none;">Privacy Policy</a> | 
              <a href="#" style="color: #FFC671; text-decoration: none;">Terms of Service</a>
            </p>
          </footer>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    return NextResponse.json({ message: "Successfully joined the waitlist!" });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to join the waitlist" }, { status: 500 });
  }
}