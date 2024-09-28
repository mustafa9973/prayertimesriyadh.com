import { DateTime, Settings } from "luxon";
import { NextResponse } from "next/server";

export async function GET() {
    
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Riyadh',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
    return NextResponse.json({formattedTime})
}