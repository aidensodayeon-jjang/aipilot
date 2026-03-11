import { NextRequest, NextResponse } from 'next/server';
import { SolapiMessageService } from 'solapi';

// --- Initialize the client ONCE at the module level ---
const apiKey = process.env.SOLAPI_API_KEY;
const apiSecret = process.env.SOLAPI_API_SECRET;
const senderNumber = process.env.SOLAPI_SENDER_NUMBER;

// Create a single, reusable instance if credentials exist
const messageService = (apiKey && apiSecret) 
  ? new SolapiMessageService(apiKey, apiSecret) 
  : null;

if (!messageService || !senderNumber) {
  console.error('Missing SOLAPI credentials. SMS sending is disabled.');
}
// ---

export async function POST(req: NextRequest) {
  // Check if service was initialized
  if (!messageService || !senderNumber) {
    return NextResponse.json({ success: false, error: 'SMS service is not configured on the server.' }, { status: 500 });
  }

  try {
    const { studentName, parentPhone, time, className } = await req.json();

    const cleanTo = parentPhone.replace(/-/g, '');
    const cleanFrom = senderNumber.replace(/-/g, '');
    const text = `[D-LAB] ${studentName} 학생이 ${time}에 등원했습니다. (수업: ${className || '자습'})`;

    console.log(`Sending SMS via shared client... To: ${cleanTo}, From: ${cleanFrom}`);

    // Send using the single, shared instance
    const response = await messageService.sendOne({
      to: cleanTo,
      from: cleanFrom,
      text: text,
      autoTypeDetect: true,
    });

    console.log('Solapi Success:', response);
    return NextResponse.json({ success: true, result: response });

  } catch (error: any) {
    console.error('Solapi Error:', error);
    const errorMessage = error.message || 'Unknown SMS Error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
