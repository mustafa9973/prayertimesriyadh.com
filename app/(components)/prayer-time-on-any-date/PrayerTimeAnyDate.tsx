"use client"

import { AppConstants } from "@/app/AppConstants";
import { DateTime } from "luxon";
import Image from "next/image";
import { useEffect, useState } from "react";

const PrayerTimeAnyDate = () => {

    const [data,setData]=useState<any>(null);
    const [selectedDate,setSelectedDate]=useState<Date>();

    const fetchPrayerTime=async (e:any)=>{
        const method ="4";
        const school =  "0";

        const date = new Date(e.target.value);
        const day = String(date.getDate()).padStart(2, '0');     // Get day with leading zero
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month with leading zero (months are 0-indexed)

     
        const year = date.getFullYear();                         // Get full year
        const formatted = `${day}-${month}-${year}`; 
        setSelectedDate(date)

     
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity/${formatted}?city=riyadh&country=saudia%20arab&method=${method}&school=${school}`)

        const data = await res.json()

        let prayerData=data.data
        console.log(prayerData)
        delete  prayerData.timings.Imsak
        delete  prayerData.timings.Sunset
        delete  prayerData.timings.Midnight
        delete  prayerData.timings.Firstthird
        delete  prayerData.timings.Lastthird

        setData(prayerData)
    }
    return (
        <>
            <div className="flex  flex-col mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 ">
                <div className="flex">
                    <h3 className="font-semibold text-md md:text-xl">تحقق من أوقات الصلاة في أي تاريخ في الرياض</h3>
                </div>


                <div className="flex justify-center mt-5">
        
                        <input
                            type="date"
                            className="p-3 w-3/4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                            onChange={(e)=>fetchPrayerTime(e)}
                            onClick={(e: any) => e.target.showPicker()}
                        />


               


                </div>
                {data && data.timings && (
  <table className="table-auto mt-5 p-2 w-full">
    <caption>  أوقات الصلاة في {`${selectedDate?.getDate()} ${AppConstants.monthArabic[data.date.gregorian.month.en]} ${data.date.gregorian.year}`} </caption>
    <tbody>
      {Object.entries(data.timings).map(([prayer, time]) => {
        const prayerInfo = AppConstants.prayerMap[prayer] || { name: 'Unknown', width: '0', height: '0', class: 'ms-0' };

        return (
          <tr key={prayer} id={prayer} className={prayer === data.nextPrayer ? "bg-gray-400" : "bg-white border-b-2 border-gray-100 text-black relative"}>
            <td className='rounded-br-lg rounded-tr-lg'>
              <Image
                className={prayerInfo.class}
                width={parseInt(prayerInfo.width, 10)} // Convert to number
                height={parseInt(prayerInfo.height, 10)} // Convert to number
                src={`/img/${prayer.toLowerCase()}.webp`}
                alt={`${prayerInfo.name} أذان`}
              />
            </td>
            <td className='font-bold'>{prayerInfo.name}</td>
            <td className='text-left font-semibold me-2 rounded-bl-lg rounded-tl-lg'>{`${prayerInfo.timeFormat} ${(time as string).split('(')[0]}`}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
)}


            </div>
        </>
    )
}
export default PrayerTimeAnyDate 
