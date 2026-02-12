import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, requestorName, recipientName } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error('Missing Twilio credentials');
      return NextResponse.json(
        { error: 'SMS service not configured' },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    const whoAccepted = recipientName ? `${recipientName} said YES! ` : 'They said YES! ';
    const messageBody = `💕 ${whoAccepted}Your Valentine's card was accepted! 💖`;

    const message = await client.messages.create({
      body: messageBody,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    return NextResponse.json({
      success: true,
      messageSid: message.sid,
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Error sending SMS:', error);
    return NextResponse.json(
      { error: err.message || 'Failed to send SMS' },
      { status: 500 }
    );
  }
}
