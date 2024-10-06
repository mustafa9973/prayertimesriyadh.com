"use client";
import { getNextPrayer } from "@/app/utility";
import { DateTime, Settings } from "luxon";
import { useEffect, useState } from "react";

const TimeHandler = (prayerData:any) => {
  const data = prayerData.data.formattedTodayData;
  const [currentTime, setCurrentTime] = useState<string>('');
  const [remainingTime, setRemainingTime] = useState<string>('');



  const map:any={"Fajr": {  "name":"الفجر","width":"38","height":"38","class":"ms-1","timeFormat":"ص"},"Sunrise": {"name":"الشروق","width":"50","height":"50","timeFormat":"ص"},"Dhuhr":{"name":"الظهر","width":"40","height":"40","class":"ms-1","timeFormat":"ص"},"Asr":{"name":"العصر","width":"45","height":"45","timeFormat":"ص"},"Maghrib":{"name":"المغرب","width":"50","height":"40","timeFormat":"م"},"Isha":{"name":"العشاء","width":"35","height":"35","class":"ms-1","timeFormat":"م"}}

  useEffect(() => {
    const updateClock = () => {

      const currentRiyadhTime=DateTime.now().setZone('Asia/Riyadh')
 
      setCurrentTime(currentRiyadhTime.toFormat('hh:mm:ss a'));
      const next=  getNextPrayer(data.timings)
   
      if (next.nextPrayerTime) {
 


       const currentRiyadhTime=DateTime.now().setZone('Asia/Riyadh')

   
       const currentPrayerTime=DateTime.fromMillis(next.nextPrayerTime).setZone('Asia/Riyadh')


       const diff=currentPrayerTime.diff(currentRiyadhTime,['hours','minutes','seconds'])
    

        if (diff.minutes>0 || diff.seconds > 0) {

          
          setRemainingTime(`${diff.toObject().hours}h ${diff.toObject().minutes}m ${diff.toObject().seconds?.toString().split(".")[0]}s`);
        } else {
      
          setRemainingTime(" ! الصلاة الصلاة الصلاة...");
        }
      }
    };

    updateClock(); // Initial call
    const intervalId = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [data.nextPrayerTime]);

  return (
    <>

 <div className="flex justify-end mt-3">
  <div >
    <span className="font-semibold xs:text-sm md:text-lg">الوقت الأن في الرياض</span> :  
    <span 
      dir="ltr" 
      className="xs:text-md md:text-lg font-bold text-gray-900 bg-green-200 py-1 px-2 rounded"
    >
      {currentTime}
    </span>
  </div>
</div>
      <div className="flex justify-end mt-4">
        <div >
        {
  data.nextPrayer === "sunrise" ? (
    <div>
    <span className="xs:text-sm  md:text-lg font-semibold" >   الوقت المتبقي  {map[data.nextPrayer].name} </span > : <span  className="xs:text-md md:text-lg  font-bold text-gray-900 bg-yellow-200 py-1 px-2 rounded">{remainingTime}</span>
    </div>
  ) : (
    <div>
    <span className="xs:text-sm  md:text-lg font-semibold">  الوقت المتبقي لآذان {map[data.nextPrayer].name} </span> : <span  className="xs:text-md md:text-lg  font-bold text-gray-900 bg-yellow-100 py-1 px-2 rounded">{remainingTime}</span>
    </div>
  )
}
        </div>
      </div>
    </>
  );
}

export default TimeHandler;
