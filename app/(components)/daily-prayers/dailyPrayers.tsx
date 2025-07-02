
import { AppConstants } from "@/app/AppConstants";
import Image from "next/image";
import Link from "next/link";

const DailyPrayers=async (prayerData:any)=>{


 const data=prayerData.data.formattedTodayData


  const map:any=AppConstants.prayerMap
  const today=new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const dayName = today.toLocaleDateString('en-US', options);
  let day = today.getDate()<10?`0${today.getDate()}`:today.getDate();
  const month = today.getMonth()+1; // Get Arabic month name
  const year = today.getFullYear();
 const monthArabic:any= AppConstants.monthArabic

 const eventLd =    {
  "@context": "https://schema.org/",
  "@type": "Event",
  "name": `مواقيت الصلاة في الرياض  `,
  "description": `تعرف على مواقيت الصلاة في الرياض بدقة يومية، مع تحديثات مستمرة لأذان الرياض لجميع الصلوات الخمس. احصل على مواقيت صلاة الفجر، الظهر، العصر، المغرب، والعشاء`,

  "startDate": `${year}-${month}-${day}T${(data?.timings.Fajr as string).split('(')[0]}&#x2B;03:00`,
  "endDate": `${year}-${month}-${day}T${(data?.timings.Isha as string).split('(')[0]}&#x2B;03:00`,
  "location": "الرياض - السعودية",
  "address":"الرياض - السعودية",
  "image":"https://prayertimesriyadh.com/img/prayer-times-riyadh.webp",

  "eventSchedule":[
    {

      "@type":"schedule",
      "repeatFrequency":"P1M",
      "byDay":`${dayName}`,
      "scheduleTimezone":"Asia/Riyadh",

    } 

  ]
}

    return(

        <>

<div className="flex justify-end mt-4">

</div>
<div className="overflow-x-auto mt-4">
<h2 className="text-lg md:text-2xl font-semibold text-gray-700 mb-2 mx-4">
 اوقات الصلاة في الرياض - {`${today.getDate()} ${monthArabic[data.month]} ${today.getFullYear()}`} 
    </h2>
  <p className="mx-4">
    
   <strong><a href="https://prayertimesriyadh.com/"> مواقيت الصلاة في الرياض اليوم </a></strong> (الميلادي: {`${today.getDate()} ${monthArabic[data.month]} ${today.getFullYear()}`} ، <Link href='hijri-date'>الهجري</Link>: {`${data.hijriDate} ${data.hijriMonth} ${data.hijriYear}`})   تبدأ الساعة {(data?.timings.Fajr as string).split('(')[0]} صباحا مع أذان الفجر وتنتهي في الساعة {(data?.timings.Isha as string).split('(')[0]} صباحا بصلاة العشاء. شروق الشمس الساعة {(data?.timings.Sunrise as string).split('(')[0]} صباحا ، وغروب الشمس و<strong>  الأذان المغربي  </strong> الساعة {(data?.timings.Maghrib as string).split('(')[0]} مساء.

   وفقا لتوقيت الوقت الحالي في الرياض ، ستكون الصلاة القادمة  {map[(data?.nextPrayer as string)]?.name} ، وستكون الأذان الساعة {(data?.timings[data?.nextPrayer ] as string).split('(')[0]} صباحا.


</p>


  <table className="table-auto mt-5 p-2 w-full">
<caption className="mb-3">تفاصيل جميع أوقات الصلاة اليوم في الرياض هي كما يلي</caption>
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
                 alt= { prayerInfo.name=='الشروق'? 'الشروق' : `اذان ${prayerInfo.name}`}
              />
            </td>
            <td className='font-bold'>{ prayerInfo.name=='الشروق'? 'الشروق' : `اذان ${prayerInfo.name}`}</td>
            <td className='text-left font-semibold me-2 rounded-bl-lg rounded-tl-lg'>{`${prayerInfo.timeFormat} ${(time as string).split('(')[0]}`}</td>
          </tr>
        );
      })}
    </tbody>
  </table>

  <p className="mt-3 mx-4">


  تُعد  <strong>مواقيت الصلاة في الرياض</strong>  من أهم المعلومات التي يحتاجها المسلمون في العاصمة السعودية لأداء فريضة الصلاة في أوقاتها المحددة. في هذا الدليل الشامل، سنتعرف على جميع التفاصيل المتعلقة بـ اوقات الصلاة في الرياض وكيفية حساب مواقيت الأذان بدقة.
  </p>
</div>
<section>

  
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
      />
      {/* ... */}
    </section>
</>
    )
}

export default DailyPrayers