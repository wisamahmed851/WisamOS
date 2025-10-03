'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function sendEmail(formData: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data.',
    };
  }

  const { name, email, message } = validatedFields.data;

  // WARNING: Hardcoding credentials is not secure.
  // In a real application, use environment variables.
  const smtpSettings = {
    server: 'smtp.gmail.com',
    port: 587,
    senderEmail: 'wisamahmed851@gmail.com',
    senderName: 'PathSeeker',
    password: 'gxcx jwvf uafh icgh',
  };

  const transporter = nodemailer.createTransport({
    host: smtpSettings.server,
    port: smtpSettings.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpSettings.senderEmail,
      pass: smtpSettings.password,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${smtpSettings.senderName}" <${smtpSettings.senderEmail}>`,
      to: smtpSettings.senderEmail, // Sending to yourself
      replyTo: email,
      subject: `New message from ${name} via WisamOS Portfolio`,
      text: message,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return {
      success: true,
      message: 'Message sent successfully!',
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };
  }
}
