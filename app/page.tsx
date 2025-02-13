
import { Metadata } from "next";
import { cookies } from 'next/headers'
import { AppConstants } from "./AppConstants";
import Image from "next/image";
import dynamic from "next/dynamic";
import DailyPrayers from "./(components)/daily-prayers/dailyPrayers";
import MethodDialog from "./(components)/dialog/method-dialog";
import Faqs from "./(components)/faqs/faqs";
// Client Components:
const TimeHanlder = dynamic(() => import('./(components)/timer-handler/time-handler'))

const PrayerTimeAnyDate = dynamic(() => import('./(components)/prayer-time-on-any-date/PrayerTimeAnyDate'))


export async function generateMetadata(

): Promise<Metadata> {

 
  const method =cookies().get('method')?.value || 4;
  const school = cookies().get('school')?.value || 0;
 
  const today=new Date();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/prayer-times-monthly?method=${method}&school=${school}`,{ 
    cache: 'no-store' })
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


  
 
  const method =cookies().get('method')?.value || 4;
  const school = cookies().get('school')?.value || 0;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/prayer-times-monthly?method=${method}&school=${school}`,{ 
    cache: 'no-store' })

  const dynamic = 'force-dynamic'
  const data = await response.json()
  const map: any = AppConstants.prayerMap
  const today = new Date();
  const monthArabic: any = AppConstants.monthArabic


  return (
    <>

      <div className="bg-white text-black p-2 rounded-xl shadow-md flex flex-col">
        <h1 className="text-center text-lg md:text-2xl  font-bold ">مواقيت الصلاة في الرياض</h1>
        <TimeHanlder data={data}></TimeHanlder>

        <DailyPrayers data={data}></DailyPrayers>


  <MethodDialog  ></MethodDialog>

      </div>



      <div className="text-gray-600 my-5">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-md md:text-xl text-gray-800 text-center ">
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
      <div className="text-gray-600 my-5 ">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-200 p-4">

            <h2 className="font-semibold text-md md:text-xl">تحقق من مواقيت الصلاة في الرياض</h2>
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
أحد أكثر الطرق ملاءمة للتحقق من مواقيت الصلاة في الرياض هو استخدام موقع PrayerTimesRiyadh.com، وهو موقع مخصص يوفر جداول صلاة دقيقة ومحدثة باستمرار
        
             
           
              </p>

              <h2 className="font-semibold text-md md:text-xl my-3">لماذا تستخدم PrayerTimesRiyadh.com؟</h2>
        <ul className="mt-2 space-y-2">
            <li className="bg-gray-200 p-2 rounded-md"><strong>دقة وتحديث مستمر:</strong> يتم تحديث المواقيت يوميًا لضمان الدقة.</li>
            <li className="bg-gray-200 p-2 rounded-md"><strong>سهولة التصفح:</strong> تصميم بسيط يسمح لأي شخص بالوصول إلى <strong>أذان الرياض</strong> بسرعة.</li>
            <li className="bg-gray-200 p-2 rounded-md"><strong>لا حاجة لتثبيت تطبيق:</strong> يمكن استخدامه على أي جهاز متصل بالإنترنت.</li>
            <li className="bg-gray-200 p-2 rounded-md"><strong>ميزات إضافية:</strong> مثل عرض <strong>تاريخ اليوم هجري</strong> واتجاه القبلة والتذكيرات.</li>
        </ul>

        <h2 className="text-xl font-semibold text-blue-500 mt-4">كيفية معرفة مواقيت الصلاة في الرياض</h2>
        <ul className="mt-2 space-y-2">
            <li className="bg-gray-200 p-2 rounded-md">زيارة الموقع: <a href="https://PrayerTimesRiyadh.com" className="text-blue-500 font-semibold">PrayerTimesRiyadh.com</a></li>
            <li className="bg-gray-200 p-2 rounded-md">عرض جدول الصلاة اليومي لمواقيت الفجر، الظهر، العصر، <strong>أذان المغرب الرياض</strong>، والعشاء.</li>
            <li className="bg-gray-200 p-2 rounded-md">متابعة التحديثات اليومية.</li>
            <li className="bg-gray-200 p-2 rounded-md">حفظ الموقع في المتصفح للوصول السريع.</li>
            <li className="bg-gray-200 p-2 rounded-md">تفعيل التذكيرات (إن وجدت).</li>
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
    <Image className="object-contain w-full" width={300} height={300} src="/img/m1.webp" alt="جامع الإمام تركي بن عبد الله"  />
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
