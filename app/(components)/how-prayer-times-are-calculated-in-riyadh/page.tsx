// pages/how-prayer-times-are-calculated-in-riyadh.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function PrayerTimesCalculation() {
  return (
    <>
      <Head>
        <title>كيف يتم حساب أوقات الصلاة في الرياض ولماذا تتغير يومياً</title>
        <meta
          name="description"
          content="تعرف على كيفية حساب أوقات الصلاة في الرياض ولماذا تتغير يوميًا، ولماذا مواقيت الصلاة وتاريخ اليوم الهجري مهمان للمسلمين."
        />
      </Head>

      <main className=" mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 leading-snug">
          كيف يتم حساب أوقات الصلاة في الرياض <br /> (ولماذا تتغير يومياً)
        </h1>
        <div className="flex justify-center">

              </div>
        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <p>
            يصلي المسلمون خمس مرات يوميًا، ولكل صلاة وقتها الخاص. ولكن هل لاحظتم أن أوقات الصلاة تتغير يوميًا في الرياض؟ قد تتساءلون عن سبب ذلك. في هذه المقالة، سنشرح كيفية حساب أوقات الصلاة وسبب تغيرها يوميًا.
            </p>
            <h2 className="mt-4 text-2xl font-bold text-gray-800 mb-4">لماذا أوقات الصلاة مهمة؟</h2>
            <p>
              الصلاة هي أحد أركان الإسلام الخمسة. يجب على كل مسلم أن يؤديها في وقتها. لذلك، معرفة
              <Link href="/" className="text-blue-600 font-semibold"> مواقيت الصلاة في الرياض </Link> بدقة أمر ضروري.
              هذه الأوقات تعتمد على موقع الشمس في السماء.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">العوامل التي تؤثر على أوقات الصلاة</h2>
            <ul className="list-disc pr-5 space-y-2 text-lg">
              <li>موقع الشمس</li>
              <li>موقع المدينة (خط العرض والطول)</li>
            </ul>
            <p className="mt-2">
            تقع الرياض في نقطة محددة على الأرض. ومع دوران الأرض حول الشمس، يتغير موقع الشمس يوميًا. وبالتالي، تتغير أوقات الصلاة يوميًا أيضًا.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">الصلوات الخمس وطريقة حسابها</h2>
            <div className="space-y-3">
            <h3 className="text-green-600 text-xl font-bold">الفجر (قبل شروق الشمس)</h3>
        
              <p> يبدأ الفجر مع بزوغ الفجر الصادق. في الرياض، يعتمد الوقت على طلوع الشمس مبكرًا. ومع تغير الفصول، يتغير وقت شروق الشمس، وبالتالي يتغير وقت الفجر.</p>
            
           
              <h3 className="text-green-600 text-xl font-bold">الظهر</h3>
              <p> يبدأ وقت الظهر عندما تعبر الشمس أعلى نقطة في السماء. يُسمى هذا ذروة الأفق. يحدث عادةً عند الظهر تقريبًا، ولكنه يتغير قليلاً كل يوم.</p>

              <h3 className="text-green-600 text-xl font-bold">العصر</h3>
              <p> يبدأ وقت العصر عندما يصبح ظل الجسم مساويًا لطوله (أو ضعفه)، وذلك حسب المذهب. ولأن الظلال تنمو أسرع أو أبطأ بناءً على زاوية الشمس، فإن وقت العصر يتغير يوميًا.</p>
              <h3 className="text-green-600 text-xl font-bold">المغرب (بعد غروب الشمس مباشرة)</h3>
              <p> يبدأ وقت المغرب فور غروب الشمس. ويتغير وقت غروب الشمس يوميًا، وبالتالي يتغير وقت المغرب أيضًا.</p>

              <h3 className="text-green-600 text-xl font-bold">العشاء (الليل)</h3>
              <p>يبدأ العشاء عندما يختفي الضوء الأحمر من السماء تمامًا - وهذا ما يُسمى الظلام الحقيقي. ويحدث هذا في وقت مختلف كل مساء، حسب زاوية الشمس.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">لماذا تتغير أوقات الصلاة يوميًا في الرياض؟</h2>
            <p>تقع الرياض في المنطقة الصحراوية بالمملكة العربية السعودية. إليك سبب تغير الأوقات يوميًا:</p>
            <ul className="list-disc pr-5 space-y-2 text-lg">
              <li> <strong>دوران الأرض</strong>: تدور الأرض يوميًا، مما يؤدي إلى تغيير موقع الشمس.</li>
              <li><strong>الفصول </strong>: في الصيف تكون الأيام أطول، وفي الشتاء تكون أقصر.</li>
              <li><strong>شروق الشمس وغروبها</strong> : تختلف هذه الأوقات يوميًا، مما يؤثر بشكل مباشر على أوقات الصلاة. </li>
            </ul>
            <p className="mt-4">حتى دقيقة واحدة يمكن أن تؤثر على وقت الفجر أو المغرب.</p>
          </section>

          {/* Section 5 */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">كيف يتم حساب أوقات الصلاة حاليًا؟</h2>
      <p>نستخدم الآن التقويمات الإسلامية، تطبيقات الهاتف، جداول المساجد، وأدوات إلكترونية
      لحساب المواقيت بدقة</p> 
          </section>

          {/* Section 6 */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">من يحدد الأوقات الرسمية للصلاة؟</h2>
            <p>
              يتم تحديد الأوقات من قبل وزارة الشؤون الإسلامية، المساجد المحلية، وتطبيقات معروفة.
              تعتمد أغلبها على تقويم أم القرى، الذي يعرض أيضًا
              <Link href="/hijri-date" className="text-blue-600 font-semibold"> تاريخ اليوم هجري </Link>.
            </p>
          </section>

          {/* Conclusion */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">الخاتمة</h2>
            <p>
              تتغير أوقات الصلاة يومياً في الرياض بسبب حركة الشمس. يمكنك متابعة
              مواقيت
              <Link href="/" className="text-blue-600 font-semibold">    اذان الرياض </Link> بسهولة
              عبر التطبيقات أو المواقع. ولا تنسَ متابعة
              <Link href="/hijri-date" className="text-blue-600 font-semibold"> تاريخ اليوم في الرياض </Link> لتنظيم عبادتك.
            </p>
            <p className="font-semibold text-green-700 mt-4">ابقَ على اتصال. صلِّ في وقتك. تقبل الله طاعاتك.</p>
          </section>
        </div>
      </main>
    </>
  );
}
