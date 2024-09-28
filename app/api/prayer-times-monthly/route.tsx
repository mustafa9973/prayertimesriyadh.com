import { AppConstants } from "@/app/AppConstants";
import { compareDatesOnly, getCurrentTimeInRiyadh, getNextPrayer } from "@/app/utility";
import { DateTime } from "luxon";
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest) {


  const {searchParams} = new URL(request.url);
  const method = searchParams.get("method") || "4";
  const school = searchParams.get("school") || "0";
  const timeZone = 'Asia/Riyadh';

      const riyadhDate = DateTime.now().setZone(timeZone).toJSDate();

    const res = await fetch(`https://api.aladhan.com/v1/calendarByCity/${riyadhDate.getFullYear()}/${ riyadhDate.getMonth()+1}?city=riyadh&country=saudia%20arab&method=${method}&school=${school}`)

  
    const json = await res.json()
    const data:[]=json.data
    let todaysData;
    const todayData:any = data.find((item:any) =>  compareDatesOnly(item.date.readable)==0); 
    const nextDaysData = data.filter((item:any) =>  compareDatesOnly(item.date.readable) >=0 );


    const formattedNextDaysData = nextDaysData.map((item:any) => ({
      timings: item.timings,
      date: item.date.readable,
      month: item.date.gregorian.month.en,
      hijriDate: item.date.hijri.day,
      hijriMonth: item.date.hijri.month.ar
    }));

    formattedNextDaysData.forEach(element => {
      delete  element.timings.Imsak
      delete  element.timings.Sunset
      delete  element.timings.Midnight
      delete  element.timings.Firstthird
      delete  element.timings.Lastthird
});
    
  

    delete  todayData.timings.Imsak
    delete  todayData.timings.Sunset
    delete  todayData.timings.Midnight
    delete  todayData.timings.Firstthird
    delete  todayData.timings.Lastthird

    const nextPrayer= getNextPrayer(todayData.timings)

    const formattedTodayData = todayData ? {
      timings: todayData.timings,
      date: todayData.date.readable,
      month: todayData.date.gregorian.month.en,
      hijriDate: todayData.date.hijri.day,
      hijriMonth: todayData.date.hijri.month.ar,
      hijriYear:todayData.date.hijri.year,
      nextPrayer:nextPrayer.nextPrayer,
      nextPrayerTime:nextPrayer.nextPrayerTime
    } : null;


   
  
  return NextResponse.json({formattedTodayData,formattedNextDaysData})
  }

  