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

    await transporter.sendMail({
      from: '"Your App" <yourapp@example.com>',
      to: email,
      subject: "Welcome to the Waitlist!",
      text: `Hello ${name},\n\nThank you for joining our waitlist. We'll keep you updated on our launch!`,
      html: `<b>Hello ${name},</b><p>Thank you for joining our waitlist. We'll keep you updated on our launch!</p>`,
    });

    return NextResponse.json({ message: "Successfully joined the waitlist!" });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to join the waitlist" }, { status: 500 });
  }
}
