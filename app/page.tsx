
import { Metadata } from "next";
import { cookies } from 'next/headers'
import { AppConstants } from "./AppConstants";
import Image from "next/image";
import dynamic from "next/dynamic";
import DailyPrayers from "./(components)/daily-prayers/dailyPrayers";
import MethodDialog from "./(components)/dialog/method-dialog";
import Faqs from "./(components)/faqs/faqs";
import AdSense from "./(components)/ad-widget/add";
import Link from "next/link";
// Client Components:
const TimeHanlder = dynamic(() => import('./(components)/timer-handler/time-handler'))

const PrayerTimeAnyDate = dynamic(() => import('./(components)/prayer-time-on-any-date/PrayerTimeAnyDate'))


export async function generateMetadata(

): Promise<Metadata> {


  const method = cookies().get('method')?.value || 4;
  const school = cookies().get('school')?.value || 0;

  const today = new Date();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/prayer-times-monthly?method=${method}&school=${school}`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return {
    title: `مواقيت الصلاة في الرياض |  ${today.getDate()} ${AppConstants.monthArabic[data?.formattedTodayData?.month]} ${today.getFullYear()} `,

    openGraph: {
      title: "مواقيت الصلاة في الرياض",
      images: ['https://prayertimesriyadh.com/img/prayer-times-riyadh.webp'],
      url: 'https://prayertimesriyadh.com',
      siteName: 'مواقيت الصلاة في الرياض',
      locale: 'ar_SA',
      type: 'website',
    },
    alternates: {
      canonical: 'https://prayertimesriyadh.com'
    },
    robots: "follow, index,nocache, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    description: `مواقيت الصلاة في الرياض اليوم تبدأ الساعة ${(data?.formattedTodayData?.timings.Fajr as string).split('(')[0]} صباحا مع أذان الفجر وتنتهي في الساعة ${(data?.formattedTodayData?.timings?.Isha as string).split('(')[0]} صباحا بصلاة العشاء.`,

  }
}


export default async function Home() {




  const method = cookies().get('method')?.value || 4;
  const school = cookies().get('school')?.value || 0;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/prayer-times-monthly?method=${method}&school=${school}`, {
    cache: 'no-store'
  })

  const dynamic = 'force-dynamic'
  const data = await response.json()
  const map: any = AppConstants.prayerMap
  const today = new Date();
  const monthArabic: any = AppConstants.monthArabic


  return (
    <>

      <div className="bg-white text-black p-2 rounded-xl shadow-md flex flex-col">
        
        <h1 className="text-center text-xl md:text-3xl  font-bold my-3 ">مواقيت الصلاة في الرياض</h1>
        <TimeHanlder data={data}></TimeHanlder>
        <div className="my-3 ad-slot">

      
        </div>
        <DailyPrayers data={data}></DailyPrayers>


        <MethodDialog  ></MethodDialog>


      </div>



      <div className="text-gray-600 my-5">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
         
              <h2 className="font-semibold text-lg md:text-xl text-gray-800 text-center ">
                مواقيت الصلاة في الرياض بقية الشهر- {`${monthArabic[data.formattedTodayData.month]} ${today.getFullYear()}`}
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold text-gray-400 bg-gray-50 sticky top-0 z-50">

                    <tr>
                      <th className="sticky right-0 bg-gray-100 z-50 ">
                        <div className="font-semibold">تاريخ</div>
                      </th>
                      <th className="">
                        <div className="font-semibold xs:ps-10 lg:ps-0 whitespace-nowrap">الفجر</div>
                      </th>
                      <th className="">
                        <div className="font-semibold xs:ps-10 lg:ps-0">الشروق</div>
                      </th>
                      <th className="">
                        <div className="font-semibold xs:ps-10 lg:ps-0">الظهر</div>
                      </th>
                      <th className="">
                        <div className="font-semibold xs:ps-10 lg:ps-0">العصر</div>
                      </th>
                      <th className="">
                        <div className="font-semibold xs:ps-10 lg:ps-0">المغرب</div>
                      </th>
                      <th className="">
                        <div className="font-semibold xs:ps-10 lg:ps-0">العشاء</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {data && data.formattedNextDaysData.map((nextDayData: any) => (
                      <tr key={nextDayData.date}>
                        <td className="p-2 whitespace-nowrap sticky right-0 bg-white z-50">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"></div>
                            <div className="font-medium text-gray-800">
                              {`${new Date(nextDayData.date).getDate()} ${monthArabic[nextDayData.month]} ${new Date(nextDayData.date).getFullYear()}`}
                            </div>
                          </div>
                        </td>
                        {nextDayData && Object.entries(nextDayData?.timings || {}).map(([prayer, time]) => {
                          const prayerInfo = map[prayer] || { name: 'Unknown', width: '0', height: '0', class: 'ms-0' };
                          return (
                            <td key={prayer} className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"></div>
                                <div className="font-medium text-gray-800">
                                  {`${prayerInfo.timeFormat} ${(time as string).split('(')[0]}`}
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>

            </div>


          </div>
        </div>
      </div>
      <PrayerTimeAnyDate></PrayerTimeAnyDate>

      <div className="w-full mx-auto p-4 my-4 bg-white shadow-lg rounded-xl border border-gray-200">
  {/* Header Section */}
  <div className="my-5 ">
    <h2 className="text-4xl font-bold text-blue-900 mb-4 text-center ">
      أذان الرياض
    </h2>
    <p className="text-gray-700 leading-relaxed text-lg bg-white p-6 rounded-xl shadow-sm">
      اذان الرياض هو الأذان الذي يعد جزءًا أساسيًا من الحياة اليومية، حيث يُسمع
      من المساجد خمس مرات يوميًا للإعلان عن وصول وقت الصلاة. يوفر موقع
      praytimesriyadh.com أوقات أذان الرياض حسب طريقة الحساب المختارة. يساعد
      المسلمين على أداء صلواتهم في الأوقات المحددة
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  
    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-400 relative">
      <div className="flex items-center gap-3 mb-4">
       
        <h3 className="text-xl font-bold text-blue-900">أذان الفجر الرياض</h3>
      </div>
      <p className="text-gray-600 mb-2">
        وقت أذان الفجر في الرياض : يبدأ مع طلوع الفجر الصادق، وهو أول صلاة
        النهار، حيث يستعد المسلمون ليومهم بالوضوء والصلاة.

        طلوع الفجر هو بداية نهاية الليل، وظهور أول بياض الفجر. في ذلك الوقت، يمتزج سواد الليل ببياض النهار، معلنًا بزوغ فجرٍ جديد.
      </p>

      <p className="mt-16 font-bold"> 
      حَدَّثَنَا عَبْدُ الرَّحْمَنِ بْنُ إِبْرَاهِيمَ الدِّمَشْقِيُّ، حَدَّثَنَا الْوَلِيدُ بْنُ مُسْلِمٍ، حَدَّثَنَا الأَوْزَاعِيُّ، حَدَّثَنَا يَحْيَى بْنُ أَبِي كَثِيرٍ، حَدَّثَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ، حَدَّثَنِي عِيسَى بْنُ طَلْحَةَ، حَدَّثَتْنِي عَائِشَةُ، قَالَتْ قَالَ رَسُولُ اللَّهِ ـ صلى الله عليه وسلم ـ ‏ "‏ لَوْ يَعْلَمُ النَّاسُ مَا فِي صَلاَةِ الْعِشَاءِ وَصَلاَةِ الْفَجْرِ لأَتَوْهُمَا وَلَوْ حَبْوًا ‏"‏ ‏.‏


<Link href="https://sunnah.com/ibnmajah:796">Sunan Ibn Majah 796</Link>

      </p>
      <div className="bg-blue-50 p-4 rounded-xl mt-12">
        <span> اليوم، وقت أذان الفجر في الرياض هو </span>
        <span className="text-2xl font-bold text-blue-700">
       
        {`${(data?.formattedTodayData?.timings.Fajr as string).split('(')[0]}  ص`}
        </span>
      </div>
    </div>
    <>
  {/* Dhuhr Card */}
  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-amber-400 hover:shadow-md transition-shadow duration-200 relative">
    <div className="flex items-center gap-3 mb-4">
   
      <h3 className="text-xl font-bold text-amber-900">أذان الظهر الرياض</h3>
    </div>
    <p className="text-gray-600 mb-2">
      
    يبدأ وقت الظهر عندما تزول الشمس عن كبد السماء ويستمر حتى يصبح ظل كل شيء مساويًا لطوله، باستثناء الظل عند الظهيرة، أي حتى يدخل وقت العصر. ومع ذلك، يُستحب تأخير صلاة الظهر عن أول وقتها في المسجد عندما يكون الطقس شديد الحرارة، حتى لا يكون ذلك مُشقًا على المصلين عند ذهابهم إلى المسجد

    </p>
    <p className="mt-10 font-bold">  

    حَدَّثَنَا أَبُو الْوَلِيدِ الطَّيَالِسِيُّ، حَدَّثَنَا شُعْبَةُ، أَخْبَرَنِي أَبُو الْحَسَنِ، - قَالَ أَبُو دَاوُدَ أَبُو الْحَسَنِ هُوَ مُهَاجِرٌ - قَالَ سَمِعْتُ زَيْدَ بْنَ وَهْبٍ، يَقُولُ سَمِعْتُ أَبَا ذَرٍّ، يَقُولُ كُنَّا مَعَ النَّبِيِّ صلى الله عليه وسلم فَأَرَادَ الْمُؤَذِّنُ أَنْ يُؤَذِّنَ الظُّهْرَ فَقَالَ ‏"‏ أَبْرِدْ ‏"‏ ‏.‏ ثُمَّ أَرَادَ أَنْ يُؤَذِّنَ فَقَالَ ‏"‏ أَبْرِدْ ‏"‏ ‏.‏ مَرَّتَيْنِ أَوْ ثَلاَثًا حَتَّى رَأَيْنَا فَىْءَ التُّلُولِ ثُمَّ قَالَ ‏"‏ إِنَّ شِدَّةَ الْحَرِّ مِنْ فَيْحِ جَهَنَّمَ فَإِذَا اشْتَدَّ الْحَرُّ فَأَبْرِدُوا بِالصَّلاَةِ ‏"‏ ‏.‏



   <Link href="https://sunnah.com/abudawud:401">Sunan Abi Dawud 401</Link> 

    </p>
    <div className="bg-amber-50 p-4 rounded-xl mt-3">
      <span>اليوم، وقت أذان الظهر في الرياض هو </span>
      <span className="text-2xl font-bold text-amber-700">
      {`${(data?.formattedTodayData?.timings.Dhuhr as string).split('(')[0]}  ص`}
        </span>
    </div>

  </div>
</>


<>
  {/* Asr Card */}
  <div className="bg-white relative p-6 rounded-2xl shadow-lg border-l-4 border-emerald-400 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center gap-3 mb-4">
  
      <h2 className="text-xl font-bold text-emerald-900">أذان العصر الرياض</h2>
    </div>
    <p className="text-gray-600 mb-2">
      وقت أذان العصر في الرياض: 
      
      يبدأ وقت العصر تقريبًا عندما تكون الشمس في منتصف الطريق بين الظهر والغروب. وتختلف المدارس الفقهية الإسلامية في تحديد بداية وقته؛ فبعضها يرى أنه يبدأ عندما يصبح ظل الشيء مساويًا لطوله الحقيقي بالإضافة إلى ظله عند الظهر، بينما يرى آخرون أنه يبدأ عندما يصبح طول الظل ضعف طول الشيء نفسه.
    </p>
    <p className="mt-5 font-bold">  



    حَدَّثَنَا قُتَيْبَةُ بْنُ سَعِيدٍ، حَدَّثَنَا اللَّيْثُ، عَنِ ابْنِ شِهَابٍ، عَنْ أَنَسِ بْنِ مَالِكٍ، أَنَّهُ أَخْبَرَهُ أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم كَانَ يُصَلِّي الْعَصْرَ وَالشَّمْسُ بَيْضَاءُ مُرْتَفِعَةٌ حَيَّةٌ وَيَذْهَبُ الذَّاهِبُ إِلَى الْعَوَالِي وَالشَّمْسُ مُرْتَفِعَةٌ ‏.‏

<Link href="https://sunnah.com/abudawud:404">Sunan Abi Dawud 404</Link>


</p>

    <div className="bg-emerald-50 p-4 rounded-xl mt-14">

    <span>اليوم، وقت أذان العصر في الرياض هو </span>

      <span className="text-2xl font-bold text-emerald-700">
        
      {`${(data?.formattedTodayData?.timings.Asr as string).split('(')[0]}  ص`}
        
        </span>
    </div>
  </div>
</>


<>
  {/* Maghrib Card */}
  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-orange-400 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center gap-3 mb-4">
  
      <h3 className="text-xl font-bold text-orange-900">أذان المغرب الرياض</h3>
    </div>
    <p className="text-gray-600 mb-2">

    وفقًا للمسلمين السنة، يبدأ وقت صلاة المغرب مباشرةً بعد غروب الشمس، وذلك بعد صلاة العصر، وينتهي عند بداية الليل، أي عند دخول وقت صلاة العشاء.


    </p>
    <p className="text-gray-600 text-sm italic mt-2">
      آذان المغرب مهم أيضًا لأنه وقت الإفطار خلال شهر رمضان المبارك.
    </p>

    <p className="mt-10 font-bold">  
    حَدَّثَنَا عَمْرُو بْنُ عَلِيٍّ، عَنْ صَفْوَانَ بْنِ عِيسَى، عَنْ يَزِيدَ بْنِ أَبِي عُبَيْدٍ، عَنْ سَلَمَةَ بْنِ الأَكْوَعِ، قَالَ كَانَ النَّبِيُّ صلى الله عليه وسلم يُصَلِّي الْمَغْرِبَ سَاعَةَ تَغْرُبُ الشَّمْسُ إِذَا غَابَ حَاجِبُهَا ‏.‏


<Link href="https://sunnah.com/abudawud:417">Sunan Abi Dawud 417</Link> 

    </p>
    <div className="bg-orange-50 p-4 rounded-xl mt-16">
    <span>اليوم، وقت أذان المغرب في الرياض هو </span>
      <span className="text-2xl font-bold text-orange-700">
        
      {`${(data?.formattedTodayData?.timings.Maghrib as string).split('(')[0]}  
م`}
        </span>
    </div>

  </div>
</>



<>
  {/* Isha Card */}
  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-indigo-400 hover:shadow-md transition-shadow duration-200">

  <div className="flex items-center gap-3 mb-4">
  
  <h3 className="text-xl font-bold text-orange-900">أذان العشاء الرياض</h3>
</div>

    <p className="text-gray-600 mb-2">
      وقت أذان العشاء في الرياض:
      
      بداية الوقت : وفقًا للمذهب الحنفي، يبدأ وقت العشاء عند حلول الظلام الكامل واختفاء الشفق الأبيض من السماء. أما وفقًا للمذاهب المالكية والشافعية والحنبلية، فيبدأ الوقت عند اختفاء الخيط الأحمر من السماء. يمكن تقدير هذه الأوقات باستخدام الشمس كمقياس، حيث يبدأ الوقت عندما تنخفض الشمس 12 درجة تحت الأفق.
    </p>


    <p className="mt-10 font-bold mb-3">

        حَدَّثَنَا مُسَدَّدٌ، حَدَّثَنَا أَبُو عَوَانَةَ، عَنْ أَبِي بِشْرٍ، عَنْ بَشِيرِ بْنِ ثَابِتٍ، عَنْ حَبِيبِ بْنِ سَالِمٍ، عَنِ النُّعْمَانِ بْنِ بَشِيرٍ، قَالَ أَنَا أَعْلَمُ النَّاسِ، بِوَقْتِ هَذِهِ الصَّلاَةِ صَلاَةِ الْعِشَاءِ الآخِرَةِ كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يُصَلِّيهَا لِسُقُوطِ الْقَمَرِ لِثَالِثَةٍ ‏.‏

        <Link href="https://sunnah.com/abudawud:419">Sunan Abi Dawud 419</Link>



        </p>

    <div className="bg-indigo-50 p-4 rounded-xl mb-4">
    <span>اليوم، وقت أذان العشاء في الرياض هو </span>
      <span className="text-2xl font-bold text-indigo-700">
        
      {`${(data?.formattedTodayData?.timings.Isha as string).split('(')[0]}  
م`}
        </span>
    </div>


  </div>
</>

  </div>
</div>



   

      <div className="text-gray-600 my-5 ">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-200 p-4">

            <h2 className="font-semibold text-lg md:text-xl">تحقق من مواقيت الصلاة في الرياض</h2>
            <h2 className="font-semibold text-lg md:text-xl">تحقق من مواقيت الصلاة في الرياض</h2>
            <p>نماز هو الركن الأكثر أهمية في الإسلام بعد الإيمان. ومن الواجب على كل مسلم أداء الصلاة خمس مرات في اليوم. ومن الضروري أداء الصلاة في وقتها. يقول الله تعالى في القرآن:</p>
            <p className="text-center my-3"><strong>فَإِذَا قَضَيْتُمُ ٱلصَّلَوٰةَ فَٱذْكُرُوا۟ ٱللَّهَ قِيَـٰمًۭا وَقُعُودًۭا وَعَلَىٰ جُنُوبِكُمْ ۚ فَإِذَا ٱطْمَأْنَنتُمْ فَأَقِيمُوا۟ ٱلصَّلَوٰةَ ۚ إِنَّ ٱلصَّلَوٰةَ كَانَتْ عَلَى ٱلْمُؤْمِنِينَ كِتَـٰبًۭا مَّوْقُوتًۭا (سورة النساء 4:103) </strong> </p>
            <div className="flex justify-center">


              <Image
                className="my-10"
                width={500}
                height={500}
                src='/img/prayer-times-riyadh.webp'
                alt='اوقات الصلاة في مدينة الرياض'
              />
            </div>
            <p>

              الوقت مهم جداً عند أداء الصلاة، حيث يجب أداء كل صلاة في وقتها المحدد. على سبيل المثال، يجب أداء صلاة الفجر قبل شروق الشمس، وصلاة المغرب بعد غروب الشمس. كما أن توقيت الصلوات الأخرى محدد أيضاً.

            </p>
            <p>
              بما أن توقيت الصلاة يعتمد على حركة الشمس التي تتغير بانتظام كل يوم، فإن وقت الصلاة يتغير أيضاً. كما أن توقيت الصلاة يختلف حسب الأماكن.
              أحد أكثر الطرق ملاءمة للتحقق من مواقيت الصلاة في الرياض هو استخدام موقع prayertimesriyadh.com، وهو موقع مخصص يوفر جداول صلاة دقيقة ومحدثة باستمرار



            </p>

            <div className="my-4">

              <h2 className="font-semibold text-xl ">لماذا تستخدم prayertimesriyadh.com؟</h2>
              <ul className="list-disc ps-4 " >
                <li><strong>دقة وتحديث مستمر:</strong> يتم تحديث المواقيت يوميًا لضمان الدقة.</li>
                <li>

                  <strong>سهولة التصفح:</strong> تصميم بسيط يسمح لأي شخص بالوصول إلى <strong>أذان الرياض</strong> بسرعة.</li>
                <li >


                  <strong>لا حاجة لتثبيت تطبيق:</strong> يمكن استخدامه على أي جهاز متصل بالإنترنت.</li>
                <li >


                  <strong>ميزات إضافية:</strong> مثل عرض <strong>تاريخ اليوم هجري</strong> واتجاه القبلة والتذكيرات.</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-3">كيفية معرفة مواقيت الصلاة في الرياض</h2>
            <ul className="list-disc ps-4 ">
              <li >زيارة الموقع: <a href="https://prayertimesriyadh.com" >prayertimesriyadh.com</a></li>
              <li >عرض جدول الصلاة اليومي لمواقيت الفجر، الظهر، العصر، <strong>أذان المغرب الرياض</strong>، والعشاء.</li>
              <li >متابعة التحديثات اليومية.</li>
              <li >حفظ الموقع في المتصفح للوصول السريع.</li>
              <li >تفعيل التذكيرات (إن وجدت).</li>
            </ul>


            <h2 className="font-semibold text-md md:text-xl my-3" >قائمة المساجد في الرياض</h2>
            <p>الصلاة في المسجد مع الآخرين مهمة جدًا في الإسلام لأنها تجلب مكافآت عظيمة وتساعد على بناء شعور قوي بالمجتمع. قال النبي محمد (صلى الله عليه وسلم):</p>
            <p className="text-center mt-3">
              <strong>عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَرْدِ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً (صحيح البخاري، الكتاب 11، الحديث 618)</strong>
            </p>

            <p>وهذا يعني أن صلاة الجماعة في المسجد لها فوائد أكبر بكثير من صلاة منفردة. إنه يقوي روابطنا مع المسلمين الآخرين ويذكرنا بإيماننا المشترك. ومن خلال الحضور إلى المسجد والصلاة في جماعة، لا نحصل على مكافآت إضافية فحسب، بل نساهم أيضًا في بناء مجتمع أقوى وأكثر اتحادًا.</p>

            <p>فيما يلي قائمة بالمساجد وعناوينها في الرياض، بحيث يمكنك العثور على مسجد قريب والانضمام إلى الصلاة هناك.</p>






          </div>
        </div>
      </div>


      <div className="flex mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 flex-col lg:flex-row">
        <div className="me-5 w-full lg:w-[300px]">
          <Image className="object-contain w-full" width={300} height={300} src="/img/m1.webp" alt="جامع الإمام تركي بن عبد الله" />
        </div>
        <div className="flex flex-col mt-3 md:mt-0">
          <div className="font-bold text-xl my-3">جامع الإمام تركي بن عبد الله</div>
          <div>جامع الإمام تركي بن عبد الله (بالإنجليزية: Imam Turki bin Abdullah Mosque)، المعروف أيضًا بالمسجد الكبير في الرياض، هو مسجد جامع ويقع في 2879 شارع الإمام تركي بن ​​عبدالله بن محمد، الرياض. تبلغ سعته 17,000 مصلٍ، وتبلغ مساحته 16,800 متر مربع. تُقام فيه جميع الفعاليات الدينية.</div>
        </div>
      </div>

      <div className="flex mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 flex-col lg:flex-row">
        <div className="me-5 w-full lg:w-[300px]">
          <Image className="object-contain w-full" width={300} height={300} src="/img/m2.webp" alt="مسجد حصة بنت نصر الراجحي" />
        </div>
        <div className="flex flex-col mt-3 md:mt-0">
          <div className="font-bold text-xl my-3">مسجد حصة بنت نصر الراجحي</div>
          <div>يقع جامع الأحساء الراجحي في RHF7 + WMX ، حي القيروان ، الرياض 13533 ، ويتسع ل 3000 مصلي. يتميز المسجد بمرافق منفصلة ووضوء ومراحيض للرجال والنساء. تقام الصلوات المفروضة يوميا في الجماعة. بالإضافة إلى ذلك ، تقام صلاة العيد وصلاة الجمعة وصلاة التراويح في المناسبات المعنية.</div>
        </div>
      </div>

      <div className="flex mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 flex-col lg:flex-row">
        <div className="me-5 w-full lg:w-[365px]">
          <Image className="object-contain w-full" width={365} height={300} src="/img/m3.webp" alt="مسجد مركز الملك عبدالله المالي" />
        </div>
        <div className="flex flex-col mt-3 md:mt-0">
          <div className="font-bold text-xl my-3">مسجد مركز الملك عبدالله المالي</div>
          <div>هذا المسجد الرائع، الواقع في حي قرطبة، الرياض 13248، يدعو الرجال والنساء والأطفال من جميع الأعمار لأداء صلاة العيد والجمعة. يشتهر المسجد بتفانيه في التنوع بالإضافة إلى هندسته المعمارية المذهلة. تُعرض جميع الخطب التي تُلقى خلال صلاة الجمعة على شاشة كبيرة لتمكين الجميع من الاستمتاع بها، مع توفر ترجمات باللغتين الإنجليزية والأردية وحتى بلغة الإشارة</div>
        </div>
      </div>

      <div className="flex mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 flex-col lg:flex-row">
        <div className="me-5 w-full lg:w-[310px]">
          <Image className="object-contain w-full" width={310} height={300} src="/img/m4.webp" alt="جامع والدة الأمير مقرن بن عبدالعزيز آل سعود" />
        </div>
        <div className="flex flex-col mt-3 md:mt-0">
          <div className="font-bold text-xl my-3">جامع والدة الأمير مقرن بن عبدالعزيز آل سعود</div>
          <div>يعد مسجد الأمير مقرن الأم، الواقع غرب حي الملقا على طريق أنس بن مالك شمال الرياض، مثالا رئيسيا على البناء الحديث الممزوج بالتصميم الإسلامي التقليدي. القباب المنحوتة بشكل متقن والبوابات الضخمة هي مجرد أمثلة على روعتها الخارجية والداخلية. يتم أداء جميع الصلوات المفروضة والواجبة هنا في جماعة</div>
        </div>
      </div>

      <div className="flex mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 flex-col lg:flex-row">
        <div className="me-5 w-full lg:w-[460px]">
          <Image className="object-contain w-full" width={460} height={300} src="/img/m5.webp" alt="مسجد الأميرة موضي الأنقري الكبير" />
        </div>
        <div className="flex flex-col mt-3 md:mt-0">
          <div className="font-bold text-xl my-3">مسجد الأميرة موضي الأنقري الكبير</div>
          <div>يقع مسجد الأميرة موضي الأنقري الكبير في QMGV+9CG، حي التعاون، الرياض 12477. يفتح المسجد أبوابه في الساعة 4 صباحًا ويغلق في الساعة 8 مساءً. هذا المسجد الواسع هو مثال رائع على العمارة الإسلامية. في الداخل، يُستقبل المصلون بمساحة فسيحة ونظيفة للغاية تفوح منها رائحة عطرة. تساهم دورات المياه التي تتم صيانتها جيدًا والمجهزة بموزعات مناديل إلكترونية في تعزيز الراحة العامة، كما أن نظام الصوت الممتاز يجعل الصلاة أكثر متعة</div>
        </div>
      </div>



      <div className=" mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 ">
        <h2 className="font-semibold text-md md:text-xl mb-4 text-gray-700">تاريخ الرياض الديني: منارة التأثير الإسلامي</h2>

        <p className="mb-6">تتمتع الرياض، عاصمة المملكة العربية السعودية، بتاريخ ديني غني يتداخل بشكل عميق مع تطور الإسلام في شبه الجزيرة العربية. باعتبارها مركزًا مركزيًا للأنشطة الدينية والسياسية، لعبت الرياض دورًا محوريًا في تشكيل العالم الإسلامي.</p>

        <section className="mb-6">

          <h3 className="font-semibold text-md md:text-xl text-gray-700 mb-4">الجذور الإسلامية المبكرة</h3>
          <p className="mb-4">كان سكان المنطقة المحيطة بالرياض من القبائل البدوية الرحل خلال العصر الجاهلي. شكل إدخال الإسلام في القرن السابع الميلادي نقطة تحول مهمة في تاريخ المنطقة. انتشرت توجيهات وتعاليم النبي محمد (صلى الله عليه وسلم) بسرعة، وأصبحت الرياض تدريجيًا مركزًا للتأثير الإسلامي.</p>

          <h3 className="font-semibold text-md md:text-xl text-gray-700"> صعود أسرة آل سعود:</h3>
          <p className=" mb-4">ظهرت عائلة آل سعود، التي أصبحت لاحقًا حكام المملكة العربية السعودية، كقوة قوية في المنطقة خلال القرن الثامن عشر. انضم محمد بن عبد الوهاب، عالم الدين الإسلامي البارز، إلى محمد بن سعود لتأسيس دولة تستند إلى الالتزام الصارم بتعاليم الإسلام. أدى هذا التحالف إلى تشكيل الدولة السعودية الثانية، مع كون الرياض عاصمتها. </p>
        </section>




        <div className="text-center text-xl font-bold">أسئلة مكررة </div>
      </div>

      <Faqs></Faqs>



    </>



  );
}
