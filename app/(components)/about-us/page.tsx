import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(

): Promise<Metadata> {
  return {
  title: "من نحن",
  description: "من نحن" ,
  robots:"follow, index,nocache, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: 'https://prayertimesriyadh.com/about-us'
  },
  }
 }



export default function AboutUs(){

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
        <h1>من نحن</h1>
<p>مرحبًا بكم في <strong><Link href="/"> prayertimesriyadh.com </Link></strong>، منصتكم الموثوقة للوصول إلى مواقيت الصلاة الدقيقة والمحدثة في مدينة الرياض. تم تصميم موقعنا لمساعدة سكان وزوار المدينة على التحقق من مواقيت الصلاة الإسلامية الأساسية، بما في ذلك صلاة <strong>الفجر</strong>، <strong>الظهر</strong>، <strong>العصر</strong>، <strong>المغرب</strong>، <strong>العشاء</strong>، بالإضافة إلى مواقيت <strong>شروق الشمس</strong> و<strong>غروبها</strong> لأي يوم.</p>

<h2>الميزات الرئيسية</h2>
<ul>
  <li><strong>مواقيت الصلاة اليومية</strong>: نحن نوفر لك المواقيت الدقيقة لكل صلاة على مدار اليوم، مما يسهل عليك الحفاظ على جدولك الروحي اليومي.</li>
  <li><strong>جدول زمني للشهر</strong>: هل ترغب في التخطيط المسبق؟ يتيح لك موقعنا <strong>عرض مواقيت الصلاة للشهر بأكمله</strong> بدءًا من اليوم. سواء كنت تخطط لرحلة أو تنظيم جدول صلاتك، يوفر هذا الخيار لك الراحة والوضوح.</li>
  <li><strong>اختيار تاريخ مخصص</strong>: هل تحتاج إلى مواقيت الصلاة ليوم محدد في المستقبل أو الماضي؟ ببساطة استخدم أداة <strong>اختيار التاريخ</strong> للتحقق من المواقيت الدقيقة لأي يوم تختاره. تضمن هذه الأداة أنك لن تضطر إلى التخمين.</li>
</ul>

<h2>معلومات عن المساجد</h2>
<p>بالإضافة إلى مواقيت الصلاة، يقدم <strong>prayertimesriyadh.com</strong> أيضًا معلومات مفصلة عن بعض المساجد الرئيسية في الرياض. يشمل ذلك:</p>
<ul>
  <li><strong>العنوان</strong>: يمكنك بسهولة العثور على المساجد في الرياض لأداء الصلاة.</li>
  <li><strong>السعة</strong>: معرفة عدد المصلين الذين يمكن لكل مسجد استيعابهم.</li>
  <li><strong>تفاصيل إضافية</strong>: تعرّف على المزيد عن تصميم المساجد والمرافق الخاصة والخدمات لتتمكن من اختيار المكان الأفضل للصلاة أو صلاة الجمعة.</li>
</ul>

<p>مهمتنا هي جعل ممارستك الدينية أكثر سهولة وتنظيمًا. مع بيانات دقيقة وميزات سهلة الاستخدام، يضمن <strong>prayertimesriyadh.com</strong> أن مواقيت الصلاة ومعلومات المساجد تكون دائمًا في متناول يدك، بغض النظر عن مكان تواجدك.</p>

<p>شكرًا لاختيارك <strong>prayertimesriyadh.com</strong> كمصدر موثوق لمواقيت الصلاة ومعلومات المساجد في مدينة الرياض.</p>
</div>
    )
}