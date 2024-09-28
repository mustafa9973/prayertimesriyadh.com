
import { AppConstants } from "@/app/AppConstants";
import Image from "next/image";

const DailyPrayers=async (prayerData:any)=>{


 const data=prayerData.data.formattedTodayData


  const map:any=AppConstants.prayerMap


 const monthArabic:any= AppConstants.monthArabic

    return(

        <>

<div className="flex justify-end mt-4">

</div>
<div className="overflow-x-auto mt-4">
<h2 className="text-lg font-semibold text-gray-700 mb-2">
    اوقات الصلاة في الرياض - {`${new Date().getDate()} ${monthArabic[data.month]} ${new Date().getFullYear()}`}
    </h2>
  <p>
    
   <strong> اوقات الصلاة في الرياض اليوم</strong>  تبدأ الساعة {(data?.timings.Fajr as string).split('(')[0]} صباحا مع أذان الفجر وتنتهي في الساعة 7:30 صباحا بصلاة العشاء. شروق الشمس الساعة 5:00 صباحا ، وغروب الشمس و<strong>  الأذان المغربي  </strong> الساعة 6:30 مساء.

بالتوقيت الحالي في الرياض ، ستكون الصلاة القادمة الظهر ، و الأذان سيكون الساعة 11:56 صباحا.


</p>


  <table className="table-auto mt-5 p-2 w-full">
<caption >تفاصيل جميع أوقات الصلاة اليوم في الرياض هي كما يلي</caption>
    <tbody>
      {data && Object.entries(data?.timings || {}).map(([prayer, time]) => {
        const prayerInfo = map[prayer] || { name: 'Unknown', width: '0', height: '0', class: 'ms-0' };

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
</div>

</>
    )
}

export default DailyPrayers