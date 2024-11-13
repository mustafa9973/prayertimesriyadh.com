import { AppConstants } from "@/app/AppConstants";
import { compareDatesOnly, getCurrentTimeInRiyadh, getNextPrayer } from "@/app/utility";
import { DateTime } from "luxon";
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest) {

  const timeZone = 'Asia/Riyadh';

      const riyadhDate = DateTime.now().setZone(timeZone).toJSDate();

    const res = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${ riyadhDate.getMonth()+1}/${riyadhDate.getFullYear()}?adjustment=0`, { 
     cache: 'no-store' })


    const json = await res.json()
    const data:[]=json.data
    const todayData:any = data.find((item:any) => 
    
        compareDatesOnly(item.gregorian.day+" "+item.gregorian.month.en.substr(0,3)+" "+item.gregorian.year)==0
    ); 



   
  
  return NextResponse.json({data,todayData})
  }

  