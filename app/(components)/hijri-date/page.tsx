import { Metadata } from "next";
import { AppConstants } from "@/app/AppConstants";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Calendar, Clock, Moon, Sun, ArrowRight, Search, Globe, BookOpen } from 'lucide-react';
import Image from "next/image";


const DateDropdowns = dynamic(() => import('../date-dropdown/date-dropdown'))

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
            images: ['https://prayertimesriyadh.com/img/prayer-times-riyadh.webp'],
            url: 'https://prayertimesriyadh.com/hijri-date',
            siteName: 'اوقات الصلاة في الرياض',
            locale: 'ar_SA',
            type: 'article',
        },
        alternates: {
            canonical: 'https://prayertimesriyadh.com/hijri-date'
        },
        robots: "follow, index,nocache, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
        description: `حوّل التواريخ من الهجري إلى الميلادي وبالعكس. تعرّف على التاريخ الهجري الحالي. خدمة مجانية ودقيقة.`,
        keywords:"تاريخ هجري, تحويل تاريخ, التقويم الهجري, التقويم الميلادي"

    }
}


export default async function HijriDate() {



    
      const islamicMonths = [
        'مُحَرَّم', 'صَفَر', 'رَبِيع الأَوَّل', 'رَبِيع الآخِر',
        'جُمَادَى الأُولَى', 'جُمَادَى الآخِرَة', 'رَجَب', 'شَعْبَان',
        'رَمَضَان', 'شَوَّال', 'ذُو القِعْدَة', 'ذُو الحِجَّة'
      ];

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hijri-date`,
        { cache: 'no-store' })
    const data = await response.json()
    return (
        <>

           {/* Header */}
           <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Moon className="w-8 h-8 text-white" />
            </div>
            <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-lg md:text-2xl  font-bold  "> تاريخ اليوم هجري  -  تحويل التاريخ</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            تحويل دقيق بين التاريخ الهجري والميلادي مع معلومات شاملة عن التقويم الإسلامي وأهميته في تحديد 
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold mx-1">أوقات الصلاة في الرياض </Link> 
            و
            <Link href="/#riyadh-azan" className="text-blue-600 hover:text-blue-800 font-semibold mx-1">مواعيد الأذان</Link>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>



        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">التاريخ اليوم</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-center mb-3">
                  <Moon className="w-6 h-6 text-blue-600 ml-2" />
                  <h3 className="text-lg font-semibold text-blue-800">التاريخ الهجري</h3>
                </div>
                <p className="text-2xl font-bold text-blue-900">{`${data?.todayData.hijri.day} ${data?.todayData.hijri.month.ar} ${data?.todayData.hijri.year}`}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-center mb-3">
                  <Sun className="w-6 h-6 text-green-600 ml-2" />
                  <h3 className="text-lg font-semibold text-green-800">التاريخ الميلادي</h3>
                </div>
                <p className="text-2xl font-bold text-green-900">{`${data?.todayData.gregorian.day} 
                    ${AppConstants.monthArabic[data?.todayData.gregorian.month.en]}
               
                    ${data?.todayData.gregorian.year}
                    `}</p>
              </div>
            </div>
          </div>
        </div>

            <div className="bg-white  xs:p-2 sm:p-4 rounded-xl shadow-md flex flex-col">
               
                <div className="mt-3 ">



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

            <Image
            
src="/img/hijri_date.webp"
width={500}
height={300}
alt=""

            />
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

 {/* Prayer Times Integration */}
 <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <Clock className="w-6 h-6 inline ml-2 text-green-600" />
            التقويم الهجري ومواقيت الصلاة
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            يعتبر التقويم الهجري أساساً مهماً في تحديد المواعيد الإسلامية والشعائر الدينية. في الرياض، تعتمد 
            <Link href="/" className="text-green-700 hover:text-green-900 font-semibold mx-1">مواقيت  الصلاة في الرياض</Link>
            على حسابات دقيقة تأخذ في الاعتبار الموقع الجغرافي والتاريخ الهجري.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">أهمية التقويم الهجري في:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                تحديد مواعيد الصيام والإفطار في رمضان
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                حساب 
                <Link href="/#azan-fajr" className="text-green-700 hover:text-green-900 font-semibold mx-1">أذان الفجر الرياض</Link>
                ومواعيد الصلوات الأخرى
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                تحديد مواسم الحج والعمرة
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                حساب الأعياد الإسلامية والمناسبات الدينية
              </li>
            </ul>
          </div>
        </div>

        {/* Islamic Months */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <BookOpen className="w-6 h-6 inline ml-2 text-blue-600" />
            الأشهر الهجرية
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {islamicMonths.map((month, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg text-center border border-blue-100">
                <div className="text-sm text-blue-600 font-medium mb-1">{index + 1}</div>
                <div className="text-gray-900 font-semibold">{month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comprehensive Article Content */}
        <article className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">دليل شامل للتقويم الهجري وأهميته</h2>
          
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">تاريخ وأصل التقويم الهجري</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              التقويم الهجري، المعروف أيضاً باسم التقويم الإسلامي، هو نظام تقويم قمري بدأ استخدامه منذ عام 622 ميلادية، 
              والذي يوافق السنة الأولى للهجرة النبوية الشريفة من مكة المكرمة إلى المدينة المنورة. هذا التقويم له أهمية 
              خاصة في الإسلام حيث يُستخدم لتحديد المناسبات الدينية والشعائر الإسلامية.
            </p>
            <p className="text-gray-700 leading-relaxed">
              يعتمد التقويم الهجري على دورة القمر حول الأرض، حيث يتكون الشهر القمري من 29 أو 30 يوماً، 
              مما يجعل السنة الهجرية تتكون من 354 أو 355 يوماً، وهي أقصر من السنة الميلادية بحوالي 10-12 يوماً.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">أهمية التقويم الهجري في الحياة الإسلامية</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              يحتل التقويم الهجري مكانة مركزية في الحياة الإسلامية، فهو ليس مجرد نظام لحساب الوقت بل هو جزء لا يتجزأ 
              من الهوية الإسلامية والممارسات الدينية. </p>
            <p className="text-gray-700 leading-relaxed">
              كما يُستخدم التقويم الهجري في تحديد بداية ونهاية شهر رمضان، وحساب زكاة المال، وتحديد مواعيد الحج والعمرة، 
              والاحتفال بالأعياد الإسلامية مثل عيد الفطر وعيد الأضحى. هذا التقويم يربط المسلمين بتاريخهم وتراثهم الديني.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">الفرق بين التقويم الهجري والميلادي</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">الخصائص الأساسية:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-blue-800 mb-2">التقويم الهجري:</h5>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• يعتمد على دورة القمر</li>
                    <li>• السنة 354-355 يوماً</li>
                    <li>• 12 شهر قمري</li>
                    <li>• يبدأ من الهجرة النبوية</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">التقويم الميلادي:</h5>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• يعتمد على دورة الشمس</li>
                    <li>• السنة 365-366 يوماً</li>
                    <li>• 12 شهر شمسي</li>
                    <li>• يبدأ من ميلاد المسيح</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">التقويم الهجري ومواقيت الصلاة</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              يلعب التقويم الهجري دوراً مهماً في حساب مواقيت الصلاة، خاصة في المملكة العربية السعودية. 
              ففي مدينة الرياض، تُحسب 
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold mx-1">اوقات اقامة الصلاة في الرياض </Link> 
              بناءً على الموقع الجغرافي والتاريخ الهجري، مما يضمن الدقة في تحديد أوقات الصلوات الخمس.
            </p>
          
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">كيفية تحويل التاريخ بين الهجري والميلادي</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              عملية تحويل التاريخ بين التقويمين الهجري والميلادي تتطلب معرفة الصيغ الرياضية المناسبة أو استخدام 
              أدوات التحويل المتاحة. الفرق الأساسي هو أن السنة الهجرية أقصر من الميلادية، مما يعني أن التواريخ 
              الهجرية تتحرك تدريجياً عبر السنة الميلادية.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">معادلة تحويل تقريبية:</h4>
              <p className="text-blue-900 font-mono text-sm">
                السنة الميلادية = السنة الهجرية × 0.970229 + 621.5643
              </p>
              <p className="text-blue-800 text-sm mt-2">
                هذه معادلة تقريبية، وللحصول على تحويل دقيق يُنصح باستخدام أدوات التحويل المتخصصة.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">التطبيقات العملية للتقويم الهجري</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              في العصر الحديث، يُستخدم التقويم الهجري في العديد من التطبيقات العملية، خاصة في الدول الإسلامية. 
              في المملكة العربية السعودية، على سبيل المثال، تُستخدم التواريخ الهجرية في الوثائق الرسمية، 
              والتقويم الأكاديمي، والمعاملات الحكومية.
            </p>
            <p className="text-gray-700 leading-relaxed">
              كما تعتمد تطبيقات الهواتف الذكية المختصة بالشؤون الإسلامية على التقويم الهجري في تقديم خدماتها
           
            </p>
          </section>
        </article>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">الأسئلة الشائعة</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">لماذا السنة الهجرية أقصر من الميلادية؟</h3>
              <p className="text-gray-700">
                لأن التقويم الهجري يعتمد على دورة القمر حول الأرض (29-30 يوم) بينما التقويم الميلادي 
                يعتمد على دورة الأرض حول الشمس (365-366 يوم).
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">كيف يؤثر التقويم الهجري على مواقيت الصلاة؟</h3>
              <p className="text-gray-700">
                التقويم الهجري مهم في تحديد المناسبات الدينية، بينما مواقيت الصلاة تُحسب بناءً على موقع الشمس 
                والموقع الجغرافي. في الرياض، تُحسب الأوقات بدقة لضمان أداء الصلاة في أوقاتها الصحيحة.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">هل يمكن تحويل أي تاريخ هجري إلى ميلادي؟</h3>
              <p className="text-gray-700">
                نعم، يمكن تحويل أي تاريخ هجري إلى ميلادي والعكس باستخدام المعادلات الرياضية المناسبة أو 
                أدوات التحويل الإلكترونية المتاحة.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">احصل على أوقات الصلاة الدقيقة</h2>
          <p className="text-blue-100 mb-6">
            تابع أوقات الصلاة في الرياض ومواعيد الأذان اليومية مع تنبيهات دقيقة
          </p>
          <Link
            href="/" 
            className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            <Clock className="w-5 h-5 ml-2" />
            مشاهدة أوقات الصلاة
          </Link>
        </div>

        {/* Related Links */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Globe className="w-6 h-6 inline ml-2 text-blue-600" />
            روابط ذات صلة
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/" className="group block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-blue-600 ml-2" />
                <h3 className="font-semibold text-blue-800">مواقيت الصلاة في الرياض </h3>
              </div>
              <p className="text-blue-700 text-sm">مواقيت الصلوات الخمس اليومية في الرياض مع التنبيهات</p>
            </Link>
            
            <Link href="/#azan-fajr" className="group block p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200">
              <div className="flex items-center mb-3">
                <Moon className="w-5 h-5 text-green-600 ml-2" />
                <h3 className="font-semibold text-green-800">أذان الرياض</h3>
              </div>
              <p className="text-green-700 text-sm">مواعيد الأذان ومواقيت الصلاة الدقيقة في الرياض</p>
            </Link>
            
            <Link href="/#azan-maghrib" className="group block p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl hover:from-amber-100 hover:to-amber-200 transition-all duration-200">
              <div className="flex items-center mb-3">
                <Sun className="w-5 h-5 text-amber-600 ml-2" />
                <h3 className="font-semibold text-amber-800">أذان المغرب الرياض</h3>
              </div>
              <p className="text-amber-700 text-sm">موعد أذان الفجر وصلاة الفجر في الرياض يومياً</p>
            </Link>
          </div>
        </div>
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "تاريخ اليوم هجري - تحويل التاريخ الهجري والميلادي",
          "description": "حوّل التواريخ من الهجري إلى الميلادي وبالعكس. تعرّف على التاريخ الهجري الحالي. خدمة مجانية ودقيقة.",
          "author": {
            "@type": "Organization",
            "name": "Prayer Times Riyadh"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Prayer Times Riyadh",
            "logo": {
              "@type": "ImageObject",
              "url": "https://prayertimesriyadh.com/img/logo.webp"
            }
          },
         
          "dateModified": "2025-06-14",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://prayertimesriyadh.com/hijri-date"
          },
          "keywords": "تاريخ هجري, تحويل تاريخ, تاريخ اليوم في الرياض, تاريخ اليوم ميلادي الرياض",
          "inLanguage": "ar"
        })}
      </script>

   
        </>
    )
}