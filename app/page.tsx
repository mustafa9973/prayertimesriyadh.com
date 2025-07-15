
import { Metadata } from "next";
import { cookies } from 'next/headers'
import { AppConstants } from "./AppConstants";
import Image from "next/image";
import dynamic from "next/dynamic";
import DailyPrayers from "./(components)/daily-prayers/dailyPrayers";
import MethodDialog from "./(components)/dialog/method-dialog";
import Faqs from "./(components)/faqs/faqs";
import SeharIftarSection from "./(components)/sehr-aftar-time/sehr-aftar-time";
import NawafilTimesSection from "./(components)/nawafil-time/nawafil-time";
import Link from "next/link";
import { Star, Clock, MapPin, Sun, Moon,Castle ,Building, Book, Heart, Users } from "lucide-react";
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
    title: `مواقيت الصلاة في الرياض `,

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
    description: `تعرف على مواقيت الصلاة في الرياض بدقة يومية، مع تحديثات مستمرة لأذان الرياض لجميع الصلوات الخمس. احصل على مواقيت صلاة الفجر، الظهر، العصر، المغرب، والعشاء`,

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
  const fridaySunnahs = [
    { arabic: "الاغتسال (الغسل)", english: "Take a Bath (Ghusl)" },
    { arabic: "استخدام السواك لتنظيف الأسنان", english: "Use Siwak to clean your teeth" },
    { arabic: "ارتداء ملابس نظيفة ومناسبة ويفضل أن تكون جديدة قبل صلاة الجمعة", english: "Wear clean, presentable and preferably new clothes before the Friday prayer" },
    { arabic: "وضع العطر/ العود", english: "Apply perfume/ Oud" },
    { arabic: "قص الأظافر", english: "Cut your nails" },
    { arabic: "قراءة سورة الكهف", english: "Read Surah Al-Kahf" },
    { arabic: "الإكثار من الصلاة والسلام على النبي محمد (صلى الله عليه وسلم)", english: "Send Durood and Blessings upon the Prophet Muhammad (S.A.W) abundantly" },
    { arabic: "الإكثار من الدعاء بين العصر والمغرب", english: "Make lots of duas between Asr and Maghreb" },
    { arabic: "الذهاب إلى المسجد مبكراً قدر الإمكان", english: "Go to the Masjid as early as you can" },
    { arabic: "المشي إلى المسجد بدلاً من أخذ السيارة", english: "Walk to the Masjid instead of taking the car" },
    { arabic: "عدم التفريق بين شخصين لعمل مكان لنفسك. اجلس في مكان فارغ", english: "Don't separate two people to make a space for yourself. Sit in an empty space" },
    { arabic: "الاستماع لخطبة الجمعة بانتباه", english: "Listen to the Khutbah of Jummah (Friday sermon) attentively" }
  ];

  return (
    <>

<div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="flex flex-wrap gap-8 transform rotate-12 scale-150">
            {[...Array(20)].map((_, i) => (
              <Star key={i} className="w-8 h-8" />
            ))}
          </div>
        </div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex items-center justify-center gap-4 mb-6">
        
            <div className="w-px h-12 bg-white/30"></div>
            <Clock className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-shadow-lg">
          مواقيت الصلاة في الرياض
          </h1>
          <div className="flex items-center justify-center gap-2 text-xl">
            <MapPin className="w-6 h-6 text-yellow-300" />
            <span>الرياض، المملكة العربية السعودية</span>
          </div>
        </div>

        <TimeHanlder data={data}></TimeHanlder>
      </div>

      <div className="bg-white text-black p-2 rounded-xl shadow-md flex flex-col mt-3">


    
       
        <div className="my-3 ad-slot">


        </div>
        <DailyPrayers data={data}></DailyPrayers>


        <MethodDialog  ></MethodDialog>


      </div>

      {/* <div className="bg-white text-black p-4 rounded-xl shadow-md flex flex-col mt-3">

        <h2 className="font-semibold text-lg md:text-xl text-gray-800 mt-3 ">

          أهمية معرفة مواقيت الصلاة</h2>
        <p className="mt-3" >
          تُعتبر الصلاة في أوقاتها المحددة من أركان الإسلام الأساسية، وقد قال الله تعالى: &quot;إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا &quot;. لذلك، فإن معرفة <Link href="/">مواقيت الصلاة في الرياض</Link> بدقة أمر ضروري لكل مسلم يعيش في هذه المدينة المقدسة.
          تُعتبر الصلاة في أوقاتها المحددة من أركان الإسلام الأساسية، وقد قال الله تعالى: &quot;إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا&quot;. لذلك، فإن معرفة <Link href="/">اوقات الصلاة الرياض</Link> بدقة أمر ضروري لكل مسلم يعيش في هذه المدينة المقدسة.
        </p>

        <p>
          تتميز مدينة الرياض بموقعها الجغرافي المتميز في وسط المملكة العربية السعودية، مما يؤثر على حساب أوقات الصلاة بطريقة خاصة. المدينة تقع على خط عرض 24.7136° شمالاً وخط طول 46.6753° شرقاً، وتتبع التوقيت المحلي السعودي (GMT+3).
        </p>
      </div> */}



<SeharIftarSection data={data}></SeharIftarSection>

<NawafilTimesSection data={data}>  </NawafilTimesSection>

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
      {/* متى تقام صلاة الجمعة في الرياض */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Timing Information */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2"> متى تقام صلاة الجمعة في الرياض</h2>
                <p className="text-gray-600">التوقيت والأحكام الشرعية</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-r-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-800 mb-3">الوقت الشرعي</h3>
                <p className="text-gray-700 leading-relaxed">
                  تصحّ صلاة الجمعة قبل زوال الشمس، لكن الأفضل والأحوط إقامتها بعد الزوال؛ خروجًا من خلاف العلماء. فقد ذهب جمهور العلماء إلى أن وقت الجمعة يبدأ بعد الزوال، وهو الرأي الراجح والمعتمد عند أكثر أهل العلم.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-r-4 border-green-500">
                <h3 className="text-lg font-bold text-green-800 mb-3">التوقيت في الرياض</h3>
                <div className="space-y-3 text-gray-700">
                  <p className="leading-relaxed">
                    تُقام صلاة الجمعة في الرياض عادة في وقت أذان الظهر، ولكن يتم تقديمها قليلاً مقارنة بصلاة الظهر العادية.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="font-semibold text-green-800">موعد الخطبة:</p>
                    <p>بين الساعة 11:45 صباحًا و12:15 ظهرًا</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-amber-600" />
                    <h4 className="font-bold text-amber-800">الصيف</h4>
                  </div>
                  <p className="text-sm text-gray-700">وقت أبكر قليلاً</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-blue-800">الشتاء</h4>
                  </div>
                  <p className="text-sm text-gray-700">أقرب إلى 12:00 ظهرًا</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-teal-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">ملاحظات مهمة</h3>
                <p className="text-gray-600">نصائح للحضور الأمثل</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-r-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-800 mb-1">الوصول المبكر</h4>
                    <p className="text-gray-700 text-sm">يُفضل الوصول إلى المسجد قبل الساعة 11:30 صباحًا لضمان الحصول على مكان والإنصات للخطبة من بدايتها.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4 border-r-4 border-red-500">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">المساجد الكبرى</h4>
                    <p className="text-gray-700 text-sm">بعض المساجد الكبرى في الرياض مثل مسجد الراجحي والجامع الكبير تشهد حضورًا كبيرًا، لذا ينصح بالحضور المبكر.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-6 h-6 text-yellow-300" />
                  <h4 className="font-bold text-lg">أهمية صلاة الجمعة</h4>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                  تُعد صلاة الجمعة من أهم الصلوات الأسبوعية، ويحظى حضورها في وقتها بأجر عظيم، لذا من الضروري معرفة توقيتها بدقة في كل أسبوع.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hadith Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-amber-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">حديث شريف عن صلاة الجمعة</h3>
              <p className="text-gray-600">فضل الحضور المبكر لصلاة الجمعة</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border-r-4 border-amber-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg leading-relaxed text-gray-800 mb-4">
                  حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، قَالَ أَخْبَرَنَا مَالِكٌ، عَنْ سُمَىٍّ، مَوْلَى أَبِي بَكْرِ بْنِ عَبْدِ الرَّحْمَنِ عَنْ أَبِي صَالِحٍ السَّمَّانِ، عَنْ أَبِي هُرَيْرَةَ ـ رضى الله عنه ـ أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ:
                </p>
                <div className="bg-white rounded-lg p-6 border border-amber-200 mb-4">
                  <p className="text-xl leading-relaxed text-gray-800 font-semibold">
                  &quot;مَنِ اغْتَسَلَ يَوْمَ الْجُمُعَةِ غُسْلَ الْجَنَابَةِ ثُمَّ رَاحَ فَكَأَنَّمَا قَرَّبَ بَدَنَةً، وَمَنْ رَاحَ فِي السَّاعَةِ الثَّانِيَةِ فَكَأَنَّمَا قَرَّبَ بَقَرَةً، وَمَنْ رَاحَ فِي السَّاعَةِ الثَّالِثَةِ فَكَأَنَّمَا قَرَّبَ كَبْشًا أَقْرَنَ، وَمَنْ رَاحَ فِي السَّاعَةِ الرَّابِعَةِ فَكَأَنَّمَا قَرَّبَ دَجَاجَةً، وَمَنْ رَاحَ فِي السَّاعَةِ الْخَامِسَةِ فَكَأَنَّمَا قَرَّبَ بَيْضَةً، فَإِذَا خَرَجَ الإِمَامُ حَضَرَتِ الْمَلاَئِكَةُ يَسْتَمِعُونَ الذِّكْرَ&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Friday Sunnahs */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">سنن يوم الجمعة</h3>
              <p className="text-gray-600">الآداب المستحبة ليوم الجمعة المبارك</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {fridaySunnahs.map((sunnah, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-800 mb-2 leading-relaxed">
                      {sunnah.arabic}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed" dir="ltr">
                      {sunnah.english}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="w-8 h-8 text-yellow-300" />
              <h3 className="text-2xl font-bold">بركات يوم الجمعة</h3>
              <Star className="w-8 h-8 text-yellow-300" />
            </div>
            <p className="text-lg opacity-90 leading-relaxed">
              اللهم بارك لنا في يوم الجمعة وتقبل منا صلاتنا وأعمالنا الصالحة
            </p>
          </div>
        </div>
      </div>
</div>

       {/* Factors Affecting Prayer Times */}
       <div className="w-full mx-auto p-4 my-4 bg-white shadow-lg rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
            العوامل المؤثرة على مواقيت الصلاة الرياض
          </h2>
  
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-right">
                الحسابات الفلكية
              </h3>
              <p className="text-gray-700 text-right leading-relaxed">
                تعتمد <strong className="text-blue-600">اوقات الصلاة في الرياض</strong> على حسابات فلكية دقيقة تأخذ في الاعتبار موقع الشمس بالنسبة للأفق والزوايا المحددة لكل صلاة.
              </p>
            </div>
  
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-right">
                التغيرات الموسمية
              </h3>
              <p className="text-gray-700 text-right leading-relaxed">
                تتأثر مواقيت الصلاة في الرياض بالفصول الأربعة، حيث يكون الفجر مبكراً في الصيف ومتأخراً في الشتاء.
              </p>
            </div>
          </div>
  
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 text-right">
              مقارنة الفصول
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded">
                <h4 className="font-semibold text-red-600 mb-2 text-right">في فصل الصيف:</h4>
                <ul className="text-gray-700 space-y-1 text-right text-sm">
                  <li>• الفجر مبكر جداً (حوالي 3:30 ص)</li>
                  <li>• النهار طويل</li>
                  <li>• العشاء متأخر (حوالي 9:00 م)</li>
                  <li>• فترة قصيرة بين المغرب والعشاء</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded">
                <h4 className="font-semibold text-blue-600 mb-2 text-right">في فصل الشتاء:</h4>
                <ul className="text-gray-700 space-y-1 text-right text-sm">
                  <li>• الفجر متأخر نسبياً (حوالي 5:45 ص)</li>
                  <li>• النهار قصير</li>
                  <li>• العشاء مبكر (حوالي 6:30 م)</li>
                  <li>• فترة طويلة بين المغرب والعشاء</li>
                </ul>
              </div>
            </div>
          </div>
        </div>



      {/* Calculation Methods */}
      <div className="w-full mx-auto p-4 my-4 bg-white shadow-lg rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
            كيفية حساب مواقيت الصلاة
          </h2>
  
          <div className="space-y-6">
            <div className="p-4 bg-amber-50 rounded-lg border-r-4 border-amber-500">
              <h3 className="text-lg font-semibold text-amber-800 mb-3 text-right">
                الطرق التقليدية
              </h3>
              <p className="text-gray-700 text-right leading-relaxed">
                استخدم المسلمون الأوائل طرقاً تقليدية مثل قياس الظل للعصر، ومراقبة الأفق للفجر والمغرب، وتتبع النجوم والقمر.
              </p>
            </div>
  
            <div className="p-4 bg-green-50 rounded-lg border-r-4 border-green-500">
              <h3 className="text-lg font-semibold text-green-800 mb-3 text-right">
                التقنيات الحديثة
              </h3>
              <p className="text-gray-700 text-right leading-relaxed">
                اليوم، نستخدم الخوارزميات الفلكية الدقيقة وتطبيقات الهواتف الذكية والمواقع الإلكترونية المتخصصة لحساب <strong className="text-green-600">مواقيت الصلاة في الرياض</strong>.
              </p>
            </div>
  
            <div className="p-4 bg-indigo-50 rounded-lg border-r-4 border-indigo-500">
              <h3 className="text-lg font-semibold text-indigo-800 mb-3 text-right">
                المصادر الرسمية
              </h3>
              <ul className="text-gray-700 space-y-2 text-right">
                <li>• الرئاسة العامة لشؤون الحرمين الشريفين</li>
                <li>• وزارة الشؤون الإسلامية والدعوة والإرشاد</li>
                <li>• أئمة المساجد المحلية</li>
                <li>• مراكز الفلك الإسلامي</li>
              </ul>
            </div>
          </div>
        </div>

  


      <div className="w-full mx-auto p-4 my-4 bg-white shadow-lg rounded-xl border border-gray-200">
        {/* Header Section */}
        <div className="my-5 ">
          <h2 className="text-4xl font-bold text-blue-900 mb-4 text-center " id="riyadh-azan">
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

              <h3 className="text-xl font-bold text-blue-900" id="azan-fajr">أذان الفجر الرياض</h3>
            </div>
            <p className="text-gray-600 mb-2">
              وقت أذان الفجر في الرياض : يبدأ مع طلوع الفجر الصادق، وهو أول صلاة
              النهار، حيث يستعد المسلمون ليومهم بالوضوء والصلاة.

              طلوع الفجر هو بداية نهاية الليل، وظهور أول بياض الفجر. في ذلك الوقت، يمتزج سواد الليل ببياض النهار، معلنًا بزوغ فجرٍ جديد.
            </p>

            <p className="mt-16 font-bold">
              حَدَّثَنَا عَبْدُ الرَّحْمَنِ بْنُ إِبْرَاهِيمَ الدِّمَشْقِيُّ، حَدَّثَنَا الْوَلِيدُ بْنُ مُسْلِمٍ، حَدَّثَنَا الأَوْزَاعِيُّ، حَدَّثَنَا يَحْيَى بْنُ أَبِي كَثِيرٍ، حَدَّثَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ، حَدَّثَنِي عِيسَى بْنُ طَلْحَةَ، حَدَّثَتْنِي عَائِشَةُ، قَالَتْ قَالَ رَسُولُ اللَّهِ ـ صلى الله عليه وسلم ـ &quot; لَوْ يَعْلَمُ النَّاسُ مَا فِي صَلاَةِ الْعِشَاءِ وَصَلاَةِ الْفَجْرِ لأَتَوْهُمَا وَلَوْ حَبْوًا &quot;


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

                حَدَّثَنَا أَبُو الْوَلِيدِ الطَّيَالِسِيُّ، حَدَّثَنَا شُعْبَةُ، أَخْبَرَنِي أَبُو الْحَسَنِ، - قَالَ أَبُو دَاوُدَ أَبُو الْحَسَنِ هُوَ مُهَاجِرٌ - قَالَ سَمِعْتُ زَيْدَ بْنَ وَهْبٍ، يَقُولُ سَمِعْتُ أَبَا ذَرٍّ، يَقُولُ كُنَّا مَعَ النَّبِيِّ صلى الله عليه وسلم فَأَرَادَ الْمُؤَذِّنُ أَنْ يُؤَذِّنَ الظُّهْرَ فَقَالَ  &quot; أَبْرِدْ &quot; ‏.‏ ثُمَّ أَرَادَ أَنْ يُؤَذِّنَ فَقَالَ &quot; أَبْرِدْ &quot; ‏.‏ مَرَّتَيْنِ أَوْ ثَلاَثًا حَتَّى رَأَيْنَا فَىْءَ التُّلُولِ ثُمَّ قَالَ &quot; إِنَّ شِدَّةَ الْحَرِّ مِنْ فَيْحِ جَهَنَّمَ فَإِذَا اشْتَدَّ الْحَرُّ فَأَبْرِدُوا بِالصَّلاَةِ &quot;


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

                <h3 className="text-xl font-bold text-emerald-900">أذان العصر الرياض</h3>
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

                <h3 className="text-xl font-bold text-orange-900" id="azan-maghrib">أذان المغرب الرياض</h3>
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

  
        {/* Website Service Section */}
        <div className="w-full mx-auto p-4 my-4 bg-white shadow-lg rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
            موقعنا وخدمة مواقيت الصلاة
          </h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
            <p className="text-gray-700 text-right leading-relaxed mb-6">
              نحن ملتزمون بتقديم <strong className="text-blue-600">اوقات الصلاة </strong> بأعلى دقة ممكنة من خلال:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-green-500">
                <h3 className="font-semibold text-green-700 mb-3 text-right">التحديث اليومي</h3>
                <ul className="text-gray-700 space-y-1 text-right text-sm">
                  <li>• جداول يومية محدثة</li>
                  <li>• تنبيهات فورية لمواقيت الأذان</li>
                  <li>• معلومات دقيقة عن طلوع وغروب الشمس</li>
                  <li>• <Link href="/hijri-date">التاريخ الهجري اليومي</Link></li>
                  <li>• <Link href="/hijri-date">تحويل التاريخ من الميلادي إلى الهجري</Link></li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-blue-500">
                <h3 className="font-semibold text-blue-700 mb-3 text-right">سهولة الاستخدام</h3>
                <ul className="text-gray-700 space-y-1 text-right text-sm">
                  <li>• تصميم مبسط وواضح</li>
                  <li>• إمكانية الطباعة والحفظ</li>
                  <li>• متوافق مع جميع الأجهزة</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-purple-500">
                <h3 className="font-semibold text-purple-700 mb-3 text-right">الموثوقية</h3>
                <ul className="text-gray-700 space-y-1 text-right text-sm">
                  <li>• اعتماد على حسابات فلكية دقيقة</li>
                  <li>• مراجعة مستمرة للبيانات</li>
                  <li>• مقارنة مع المصادر الرسمية</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  
        {/* Tips Section */}
        <div className="w-full mx-auto p-4 my-4 bg-white shadow-lg rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
            نصائح مهمة لمتابعة مواقيت الصلاة
          </h2>
  
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3 text-right">
                للمقيمين الجدد في الرياض
              </h3>
              <ul className="text-gray-700 space-y-2 text-right">
                <li>• احرص على ضبط ساعتك على التوقيت المحلي</li>
                <li>• تعرف على أقرب مسجد لمكان سكنك</li>
                <li>• احفظ مواقيت الصلاة الأساسية</li>
                <li>• استخدم التطبيقات المحلية الموثوقة</li>
              </ul>
            </div>
  
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3 text-right">
                للزوار والسياح
              </h3>
              <ul className="text-gray-700 space-y-2 text-right">
                <li>• حمّل تطبيق مواقيت الصلاة قبل الوصول</li>
                <li>• اسأل عن المساجد في الفنادق</li>
                <li>• احترم أوقات إغلاق المحلات للصلاة</li>
                <li>• تعلم بعض العبارات العربية المتعلقة بالصلاة</li>
              </ul>
            </div>
          </div>
        </div>


        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-emerald-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">أهمية الصلاة في الإسلام</h2>
              <p className="text-gray-600">الركن الأكثر أهمية بعد الإيمان</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <p className="text-lg mb-6">
              نماز هو الركن الأكثر أهمية في الإسلام بعد الإيمان. ومن الواجب على كل مسلم أداء الصلاة خمس مرات في اليوم. ومن الضروري أداء الصلاة في وقتها. يقول الله تعالى في القرآن:
            </p>
          </div>

          {/* Quranic verse */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border-r-4 border-emerald-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xl leading-relaxed text-gray-800 mb-4 font-semibold">
                  فَإِذَا قَضَيْتُمُ ٱلصَّلَوٰةَ فَٱذْكُرُوا۟ ٱللَّهَ قِيَـٰمًۭا وَقُعُودًۭا وَعَلَىٰ جُنُوبِكُمْ ۚ فَإِذَا ٱطْمَأْنَنتُمْ فَأَقِيمُوا۟ ٱلصَّلَوٰةَ ۚ إِنَّ ٱلصَّلَوٰةَ كَانَتْ عَلَى ٱلْمُؤْمِنِينَ كِتَـٰبًۭا مَّوْقُوتًۭا
                </p>
                <p className="text-emerald-700 font-medium">سورة النساء 4:103</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-800">التوقيت المحدد</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                الوقت مهم جداً عند أداء الصلاة، حيث يجب أداء كل صلاة في وقتها المحدد. على سبيل المثال، يجب أداء صلاة الفجر قبل شروق الشمس، وصلاة المغرب بعد غروب الشمس.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-8 h-8 text-amber-600" />
                <h3 className="text-xl font-bold text-amber-800">حركة الشمس</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                بما أن توقيت الصلاة يعتمد على حركة الشمس التي تتغير بانتظام كل يوم، فإن وقت الصلاة يتغير أيضاً. كما أن توقيت الصلاة يختلف حسب الأماكن.
              </p>
            </div>
          </div>

          {/* Website recommendation */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">الموقع الموصى به</h3>
            </div>
            <p className="text-lg leading-relaxed opacity-90">
              أحد أكثر الطرق ملاءمة للتحقق من مواقيت الصلاة في الرياض هو استخدام موقع prayertimesriyadh.com، وهو موقع مخصص يوفر جداول صلاة دقيقة ومحدثة باستمرار
            </p>
          </div>
        </div>

      
      

        {/* Mosque section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-teal-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
            <Building className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">قائمة المساجد في الرياض</h2>
              <p className="text-gray-600">أهمية صلاة الجماعة</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
            <p className="text-lg mb-6">
              الصلاة في المسجد مع الآخرين مهمة جدًا في الإسلام لأنها تجلب مكافآت عظيمة وتساعد على بناء شعور قوي بالمجتمع. قال النبي محمد (صلى الله عليه وسلم):
            </p>
          </div>

          {/* Hadith */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 mb-8 border-r-4 border-teal-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xl leading-relaxed text-gray-800 mb-4 font-semibold">
                  عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَرْدِ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً
                </p>
                <p className="text-teal-700 font-medium">صحيح البخاري، الكتاب 11، الحديث 618</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-green-800 mb-4">فوائد صلاة الجماعة</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              وهذا يعني أن صلاة الجماعة في المسجد لها فوائد أكبر بكثير من صلاة منفردة. إنه يقوي روابطنا مع المسلمين الآخرين ويذكرنا بإيماننا المشترك.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ومن خلال الحضور إلى المسجد والصلاة في جماعة، لا نحصل على مكافآت إضافية فحسب، بل نساهم أيضًا في بناء مجتمع أقوى وأكثر اتحادًا.
            </p>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-gray-600" />
              <h4 className="text-lg font-semibold text-gray-800">قائمة المساجد</h4>
            </div>
            <p className="text-gray-600">
              فيما يلي قائمة بالمساجد وعناوينها في الرياض، بحيث يمكنك العثور على مسجد قريب والانضمام إلى الصلاة هناك.
            </p>
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
