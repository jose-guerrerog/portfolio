"use server"
import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/app/templates/emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any, res: any) {
  const {
    firstName,
    lastName, 
    email,
    message,
  } = await req.json();

  const name = lastName ? `${firstName} ${lastName}` : firstName;
  const senderEmail: string = process.env.SENDER_EMAIL ?? '';
  const receiverEmail: string = process.env.RECEIVER_EMAIL ?? '';

  try {
    const data = await resend.emails.send({
      from: senderEmail,
      to: receiverEmail,
      subject: 'new email form',
      react: EmailTemplate({ email, name, message }),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}