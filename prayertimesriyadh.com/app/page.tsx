import { Metadata } from "next";
import DailyPrayers from "./(components)/daily-prayers/dailyPrayers";
import PrayerTimeAnyDate from "./(components)/prayer-time-on-any-date/PrayerTimeAnyDate";
import TimeHanlder from "./(components)/timer-handler/time-handler";
import { AppConstants } from "./AppConstants";
import Image from "next/image";

export const metadata: Metadata = {
  title: "مواقيت الصلاة في الرياض | وقت الصلاة اليوم",
  description: "يتيح موقع مواقيت الصلاة لسكان الرياض إمكانية التحقق من شروق الشمس وغروبها وجميع مواقيت الصلاة لهذا اليوم. يمكنك أيضًا التحقق من توقيت صلاة الرياض في أي تاريخ محدد",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  openGraph: {

    url: 'https://prayertimesriyadh.com',
    siteName: 'اوقات الصلاة في الرياض',
    locale: 'ar_SA',
    type: 'website',
  }
};

export default async function Home() {

  const method = 4;
  const school = 0;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/prayer-times-monthly?method=${method}&school=${school}`, { next: { revalidate: 30 } })
  const data = await response.json()
  const map: any = AppConstants.prayerMap
  const today = new Date();
  const monthArabic: any = AppConstants.monthArabic
  return (
    <>

      <div className="bg-white text-black p-2 rounded-xl shadow-md flex flex-col">
        <h1 className="text-center text-md md:text-xl  font-bold text-gray-700 ">اوقات الصلاة في مدينة الرياض</h1>
        <TimeHanlder data={data}></TimeHanlder>

        <DailyPrayers data={data}></DailyPrayers>


        <div className="flex mt-5">
          <div>
            طريقة الحساب :{AppConstants.methods.get(method)}, {AppConstants.school.get(school)}
          </div>
        </div>

      </div>



      <div className="text-gray-600 my-5">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800 text-center">
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

            <h3>تحقق من أوقات الصلاة في الرياض</h3>
            <p>نماز هو الركن الأكثر أهمية في الإسلام بعد الإيمان. ومن الواجب على كل مسلم أداء الصلاة خمس مرات في اليوم. ومن الضروري أداء الصلاة في وقتها. يقول الله تعالى في القرآن:</p>
            <p className="text-center my-3"><strong>فَإِذَا قَضَيْتُمُ ٱلصَّلَوٰةَ فَٱذْكُرُوا۟ ٱللَّهَ قِيَـٰمًۭا وَقُعُودًۭا وَعَلَىٰ جُنُوبِكُمْ ۚ فَإِذَا ٱطْمَأْنَنتُمْ فَأَقِيمُوا۟ ٱلصَّلَوٰةَ ۚ إِنَّ ٱلصَّلَوٰةَ كَانَتْ عَلَى ٱلْمُؤْمِنِينَ كِتَـٰبًۭا مَّوْقُوتًۭا (سورة النساء 4:103) </strong> </p>

            <p>

              الوقت مهم جداً عند أداء الصلاة، حيث يجب أداء كل صلاة في وقتها المحدد. على سبيل المثال، يجب أداء صلاة الفجر قبل شروق الشمس، وصلاة المغرب بعد غروب الشمس. كما أن توقيت الصلوات الأخرى محدد أيضاً.

            </p>

            <p>بما أن توقيت الصلاة يعتمد على حركة الشمس التي تتغير بانتظام كل يوم، فإن وقت الصلاة يتغير أيضاً. كما أن توقيت الصلاة يختلف حسب الأماكن.
هذا الموقع مخصص لمشاركة أوقات الصلاة اليومية في الرياض. يمكنك التحقق من مواقيت الصلاة في الرياض يوميا</p>

            <h3>قائمة المساجد في الرياض</h3>
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
    <div className="font-bold text-xl mb-2">جامع الإمام تركي بن عبد الله</div>
    <div>جامع الإمام تركي بن عبد الله (بالإنجليزية: Imam Turki bin Abdullah Mosque)، المعروف أيضًا بالمسجد الكبير في الرياض، هو مسجد جامع ويقع في 2879 شارع الإمام تركي بن ​​عبدالله بن محمد، الرياض. تبلغ سعته 17,000 مصلٍ، وتبلغ مساحته 16,800 متر مربع. تُقام فيه جميع الفعاليات الدينية.</div>
  </div>
</div>

<div className="flex mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 flex-col lg:flex-row">
  <div className="me-5 w-full lg:w-[300px]">
    <Image className="object-contain w-full" width={300} height={300} src="/img/m2.webp" alt="مسجد حصة بنت نصر الراجحي" />
  </div>
  <div className="flex flex-col mt-3 md:mt-0">
    <div className="font-bold text-xl mb-2">مسجد حصة بنت نصر الراجحي</div>
    <div>يقع جامع الأحساء الراجحي في RHF7 + WMX ، حي القيروان ، الرياض 13533 ، ويتسع ل 3000 مصلي. يتميز المسجد بمرافق منفصلة ووضوء ومراحيض للرجال والنساء. تقام الصلوات المفروضة يوميا في الجماعة. بالإضافة إلى ذلك ، تقام صلاة العيد وصلاة الجمعة وصلاة التراويح في المناسبات المعنية.</div>
  </div>
</div>

<div className="flex mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 flex-col lg:flex-row">
  <div className="me-5 w-full lg:w-[365px]">
    <Image className="object-contain w-full" width={365} height={300} src="/img/m3.webp" alt="مسجد مركز الملك عبدالله المالي" />
  </div>
  <div className="flex flex-col mt-3 md:mt-0">
    <div className="font-bold text-xl mb-2">مسجد مركز الملك عبدالله المالي</div>
    <div>هذا المسجد الرائع، الواقع في حي قرطبة، الرياض 13248، يدعو الرجال والنساء والأطفال من جميع الأعمار لأداء صلاة العيد والجمعة. يشتهر المسجد بتفانيه في التنوع بالإضافة إلى هندسته المعمارية المذهلة. تُعرض جميع الخطب التي تُلقى خلال صلاة الجمعة على شاشة كبيرة لتمكين الجميع من الاستمتاع بها، مع توفر ترجمات باللغتين الإنجليزية والأردية وحتى بلغة الإشارة</div>
  </div>
</div>

<div className="flex mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 flex-col lg:flex-row">
  <div className="me-5 w-full lg:w-[310px]">
    <Image className="object-contain w-full" width={310} height={300} src="/img/m4.webp" alt="جامع والدة الأمير مقرن بن عبدالعزيز آل سعود" />
  </div>
  <div className="flex flex-col mt-3 md:mt-0">
    <div className="font-bold text-xl mb-2">جامع والدة الأمير مقرن بن عبدالعزيز آل سعود</div>
    <div>يعد مسجد الأمير مقرن الأم، الواقع غرب حي الملقا على طريق أنس بن مالك شمال الرياض، مثالا رئيسيا على البناء الحديث الممزوج بالتصميم الإسلامي التقليدي. القباب المنحوتة بشكل متقن والبوابات الضخمة هي مجرد أمثلة على روعتها الخارجية والداخلية. يتم أداء جميع الصلوات المفروضة والواجبة هنا في جماعة</div>
  </div>
</div>

<div className="flex mt-3 bg-white shadow-lg rounded-xl border border-gray-200 p-5 flex-col lg:flex-row">
  <div className="me-5 w-full lg:w-[460px]">
    <Image className="object-contain w-full" width={460} height={300} src="/img/m5.webp" alt="مسجد الأميرة موضي الأنقري الكبير" />
  </div>
  <div className="flex flex-col mt-3 md:mt-0">
    <div className="font-bold text-xl mb-2">مسجد الأميرة موضي الأنقري الكبير</div>
    <div>يقع مسجد الأميرة موضي الأنقري الكبير في QMGV+9CG، حي التعاون، الرياض 12477. يفتح المسجد أبوابه في الساعة 4 صباحًا ويغلق في الساعة 8 مساءً. هذا المسجد الواسع هو مثال رائع على العمارة الإسلامية. في الداخل، يُستقبل المصلون بمساحة فسيحة ونظيفة للغاية تفوح منها رائحة عطرة. تساهم دورات المياه التي تتم صيانتها جيدًا والمجهزة بموزعات مناديل إلكترونية في تعزيز الراحة العامة، كما أن نظام الصوت الممتاز يجعل الصلاة أكثر متعة</div>
  </div>
</div>







    </>



  );
}
