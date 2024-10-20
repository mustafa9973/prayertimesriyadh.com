import { Metadata } from "next";
import DateDropdowns from '../date-dropdown/date-dropdown'
import { AppConstants } from "@/app/AppConstants";
import Link from "next/link";
export async function generateMetadata(

): Promise<Metadata> {


    const method = 4;
    const school = 0;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/prayer-times-monthly?method=${method}&school=${school}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return {
        title: "تاريخ اليوم هجري |  تحويل التاريخ الهجري إلى الميلادي والعكس ",

        openGraph: {
            title: "تاريخ اليوم هجري |  تحويل التاريخ من هجري الى ميلادي",
            images: ['/img/prayer-times-riyadh.webp'],
            url: 'https://prayertimesriyadh.com/hijri-date',
            siteName: 'اوقات الصلاة في الرياض',
            locale: 'ar_SA',
            type: 'website',
        },
        alternates: {
            canonical: 'https://prayertimesriyadh.com/hijri-date'
        },
        robots: "follow, index,nocache, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
        description: `يقدم موقع https://prayertimesriyadh.com خدمة تحويل التاريخ الهجري إلى الميلادي والعكس. استخدم أداة تحويل التاريخ للتحويل بسهولة بين التقويم الهجري والميلادي`,

    }
}


export default async function HijriDate() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hijri-date`,
        { cache: 'no-store' })
    const data = await response.json()
    return (
        <>
            <div className="bg-white  xs:p-2 sm:p-4 rounded-xl shadow-md flex flex-col">
                <h1 className="text-lg md:text-2xl  font-bold  "> تاريخ اليوم هجري  -  تحويل التاريخ</h1>
                <div className="mt-3 ">


                    التاريخ الهجري اليوم في الرياض، المملكة العربية السعودية هو <span className="font-semibold text-xl">{`${data?.todayData.hijri.day} ${data?.todayData.hijri.month.ar} ${data?.todayData.hijri.year}`}</span>، ويوافق <span className="font-semibold text-xl">
                        {`${data?.todayData.gregorian.day} 
                    ${AppConstants.monthArabic[data?.todayData.gregorian.month.en]}
               
                    ${data?.todayData.gregorian.year}
                    `}</span>. {data?.todayData.hijri.month.ar} هو الشهر {AppConstants.numberMap[data?.todayData.hijri.month.number]} في التقويم الإسلامي.

موقع <Link href="/"> https://prayertimesriyadh.com </Link>يقدم خدمة تحويل التاريخ الهجري إلى ميلادي والعكس، بالإضافة إلى عرض تاريخ اليوم الهجري مع تقويم كامل للشهر يظهر التواريخ الهجرية والميلادية المقابلة. استخدم أداة تحويل التاريخ بسهولة لتحويل بين التقويم الهجري والميلادي.


                    <h2 className="text-center mt-10 mb-4 font-semibold text-md md:text-xl text-gray-800">
                    تحويل التاريخ الميلادي إلى التاريخ الهجري 
                    </h2>
                    <DateDropdowns data={data} hijri={true}></DateDropdowns>
                
                </div>


            </div>

            <div className="bg-white  xs:p-2 sm:p-4 rounded-xl shadow-md flex flex-col mt-5">
            <h2 className="text-center my-4 font-semibold text-md md:text-xl text-gray-800">
            تحويل التاريخ من هجري الى ميلادي
                    </h2>


                    <DateDropdowns data={data} hijri={false}></DateDropdowns>        <div className="text-center text-sm mt-2">هناك احتمال ضئيل لحدوث خطأ ليوم واحد</div>
            </div>
            <div className="text-gray-600 my-5">
                <div className="flex flex-col justify-center h-full">
                    <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-md md:text-xl text-gray-800 text-center ">
                                التاريخ الهجري للشهر الكامل
                            </h2>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold text-gray-400 bg-gray-300 sticky top-0 z-50">

                                        <tr>
                                            <th className="sticky right-0 ps-2 z-50 ">
                                                <div className="flex items-center">
                                                    <div className=" h-10 flex-shrink-0 mr-2 sm:mr-3"></div>
                                                    <div className="font-bold text-gray-800 text-lg">
                                                        اليوم
                                                    </div>
                                                </div>

                                            </th>
                                            <th className="ps-4">
                                                <div className="flex items-center">
                                                    <div className=" h-10 flex-shrink-0 mr-2 sm:mr-3 text-center"></div>
                                                    <div className="font-bold text-gray-800 text-lg">
                                                        الهجري
                                                    </div>
                                                </div>

                                            </th>
                                            <th className="ps-4 ">
                                                <div className="flex items-center ">
                                                    <div className=" h-1 flex-shrink-0 mr-2 sm:mr-3 text-center"></div>
                                                    <div className="font-bold text-gray-800 text-lg ">
                                                        الميلادي
                                                    </div>
                                                </div>

                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="text-md divide-y divide-gray-100">
                                        {data && data.data.map((record: any) => (
                                            <tr key={record.hijri.date}>
                                                <td className="p-2 whitespace-nowrap sticky right-0 bg-white z-50">
                                                    <div className="flex items-center">
                                                        <div className=" h-10 flex-shrink-0 mr-2 sm:mr-3"></div>
                                                        <div className="font-medium text-gray-800">
                                                            {record.hijri.weekday.ar}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap sticky right-0 bg-white z-50">
                                                    <div className="flex items-center">
                                                        <div className=" h-10 flex-shrink-0 mr-2 sm:mr-3"></div>
                                                        <div className="font-medium text-gray-800">
                                                            {`${record.hijri.day} ${record.hijri.month.ar} ${record.hijri.year} `}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="p-2 whitespace-nowrap sticky right-0 bg-white z-50">
                                                    <div className="flex items-center">
                                                        <div className=" h-10 flex-shrink-0 mr-2 sm:mr-3"></div>
                                                        <div className="font-medium text-gray-800">
                                                            {`${record.gregorian.day} 
                    ${AppConstants.monthArabic[record.gregorian.month.en]}
               
                    ${record.gregorian.year}
                    `}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>


                    </div>
                </div>
            </div>



            <div className="bg-white  p-8 rounded-xl shadow-md flex flex-col">

                <h2 className="font-semibold text-md md:text-xl text-gray-800">فهم التقويم الهجري: المفهوم، البنية، والأهمية</h2>

                <p>

                    التقويم الهجري، المعروف أيضًا باسم التقويم الإسلامي، هو نظام قمري يستخدمه المسلمون حول العالم لتحديد مواعيد الأعياد والمناسبات والشعائر الإسلامية. يعود أصله إلى هجرة النبي محمد (صلى الله عليه وسلم) من مكة إلى المدينة في عام 622 م، والتي تمثل بداية العصر الإسلامي. هذه الهجرة تشكل حجر الزاوية في التقويم وتمثل بداية السنة الأولى في النظام الهجري.
                </p>

                <h3 className="font-semibold text-md md:text-xl my-4">الأساس القمري للتقويم الهجري</h3>
                <p>على عكس التقويم الميلادي الذي يعتمد على الشمس، يعتمد التقويم الهجري على مراحل القمر. الشهر القمري هو الفترة التي يستغرقها القمر لإكمال دورة واحدة حول الأرض، وعادةً ما يستغرق حوالي <b>29 أو 30 يومًا</b>. ونتيجة لذلك، يتكون العام الهجري من <b> 354 أو    355 يومًا</b>، وهو أقصر بحوالي 10 إلى 12 يومًا من السنة الميلادية</p>

                <p>هذا يعني أن الأشهر والمناسبات الإسلامية تتنقل كل عام بحوالي 10 أيام مقارنة بالتقويم الميلادي، مما يؤدي إلى حدوث المناسبات الإسلامية في فصول مختلفة بمرور الوقت</p>

                <h3 className="font-semibold text-md md:text-xl my-4">بنية التقويم الهجري</h3>
                <p>يتألف التقويم الهجري من <strong>12 شهرًا</strong>، يبدأ كل شهر منها برؤية الهلال. والشهور هي كما يلي:</p>
                <ul className="list-disc">
                    <li>محرم – الشهر الأول ويُعتبر من الأشهر الحرم.</li>
                    <li>صفر</li>
                    <li>ربيع الأول – الشهر الذي ولد فيه النبي محمد (صلى الله عليه وسلم).</li>
                    <li>ربيع الآخر</li>
                    <li>جمادى الأولى</li>
                    <li>جمادى الآخرة</li>
                    <li>رجب – من الأشهر الحرم التي يُحرم فيها القتال.</li>
                    <li>شعبان</li>
                    <li>رمضان – الشهر الأهم الذي يصوم فيه المسلمون من الفجر حتى غروب الشمس.</li>
                    <li>شوال – يحتفل فيه بعيد الفطر بعد انتهاء رمضان.</li>
                    <li>ذو القعدة – من الأشهر الحرم.</li>
                    <li>ذو الحجة – شهر الحج وعيد الأضحى.</li>
                </ul>

                <h3 className="font-semibold text-md md:text-xl my-4">التقويم الهجري وجدول أوقات الصلاة</h3>
                <p>
                    يستخدم التقويم الهجري في العديد من برامج <strong>الجدولة لتحديد أوقات الصلاة</strong> ، خاصة في المملكة العربية السعودية. على سبيل المثال ، غالبا ما تعتمد  <Link href="/">مواعيد الصلاة في الرياض</Link> ومكة على التاريخ الهجري. لذلك ، من الضروري معرفة التاريخ الهجري الذي يتوافق مع التاريخ الميلادي لضمان الالتزام الصارم بأوقات الصلاة.
                </p>
                <h3 className="font-semibold text-md md:text-xl my-4">أهمية التقويم الهجري في الإسلام</h3>
                <p>يعتبر التقويم الهجري أمرًا حيويًا لتحديد مواعيد الممارسات الإسلامية، خاصة فيما يتعلق بـ:</p>

                <ul className="list-disc">
                    <li>رمضان: الشهر التاسع، الذي يصوم فيه المسلمون خلال ساعات النهار.</li>
                    <li>الحج: فريضة الحج إلى مكة، وهي أحد أركان الإسلام الخمسة.</li>
                    <li>عيد الفطر: يحتفل به بعد نهاية شهر رمضان.</li>
                    <li>عيد الأضحى: يُحتفل به بعد إتمام فريضة الحج.</li>
                    <li>عاشوراء: يُحتفل به في العاشر من محرم.</li>
                </ul>

                <h3 className="font-semibold text-md md:text-xl my-4">التقويم الهجري مقابل التقويم الميلادي: الفروقات والتعديلات</h3>

                <p>نظرًا لأن التقويم الهجري أقصر من التقويم الميلادي بحوالي 10-12 يومًا كل عام، فإن التواريخ الإسلامية تتنقل باستمرار للخلف في السنة الميلادية. على سبيل المثال، قد يصادف رمضان في الصيف في إحدى السنوات، ثم في الشتاء بعد عدة عقود</p>

                <p>لتنظيم المناسبات الدينية، يجب على المسلمين الرجوع إلى كل من التقويم الهجري و التقويم الميلادي. في البلدان التي تستخدم التقويم الميلادي للأغراض المدنية، يتم متابعة الأحداث الإسلامية عادةً باستخدام نظام التواريخ المزدوجة</p>

                <h3 className="font-semibold text-md md:text-xl my-4">الاستخدام الثقافي والإقليمي</h3>

                <p>لا يزال التقويم الهجري هو التقويم الرسمي في عدة دول إسلامية، مثل المملكة العربية السعودية. ومع ذلك، تستخدم العديد من الدول ذات الأغلبية المسلمة التقويم الميلادي للأمور الرسمية، لكنها تعتمد على التقويم الهجري في المناسبات الدينية. على سبيل المثال، يتم تنظيم جداول الصيام في رمضان وترتيبات الحج وفقًا للأشهر القمرية، بينما قد تتبع الأعمال اليومية التقويم الشمسي الميلادي</p>

                <h3 className="font-semibold text-md md:text-xl my-4"> المفاهيم الرئيسية</h3>

                <ul className="list-disc">
                    <li><b>الشهر القمري</b>: يعتمد على دورات القمر، ويبدأ كل شهر هجري برؤية الهلال</li>
                    <li><b>السنة الكبيسة</b>: كل 30 سنة، هناك 11 سنة كبيسة في التقويم الهجري، حيث يُضاف يوم إضافي إلى الشهر الأخير، ليصبح 355 يومًا.</li>
                    <li><b>الأهمية</b>: ترتبط العديد من الممارسات الإسلامية المهمة بالتقويم الهجري، مما يبرز أهمية القمر في التقاليد الإسلامية</li>

                </ul>
            </div>
        </>
    )
}