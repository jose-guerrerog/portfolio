"use server"
import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/app/templates/emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any, res: any) {
  const { email, subject, message } = await req.json();
  try {
    const data = await resend.emails.send({
      from: process.env.SENDER_EMAIL as string,
      to: process.env.RECEIVER_EMAIL as string,
      subject: 'asasas',
      react: EmailTemplate({email: 'joseguerrerog880@gmail.com',name: 'jose', message: 'sdasd'}),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}