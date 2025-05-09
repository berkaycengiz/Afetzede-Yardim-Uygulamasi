import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

export const sendOTP = async (phone: string) => {
  const verification = await client.verify.v2
    .services(serviceSid)
    .verifications.create({
      to: phone,
      channel: 'sms',
    });

  return verification.status;
};

export const verifyOTP = async (phone: string, code: string) => {
  const verificationCheck = await client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({
      to: phone,
      code,
    });

  return verificationCheck.status === 'approved';
};