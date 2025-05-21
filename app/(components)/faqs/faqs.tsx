"use client"

import Link from "next/link";
import { useState } from "react";


const Faqs = () => {
  const [currentlyExpanded, setCurrentlyExpanded] = useState<any>(null);
  const faqs=[
    {
      q: "لماذا تتقلب أوقات الصلاة يوميا؟",
      ans: `تتغير أوقات الصلاة قليلا كل يوم بسبب دوران الأرض ومدارها حول الشمس. تؤثر هذه العوامل على أوقات شروق الشمس وغروبها ، مما يؤدي إلى تعديل يومي في أوقات الصلاة. <br>
في  <a href="/">prayertimesriyadh.com </a>، 
يتم تحديث أوقات الصلاة يوميا لتعكس التغيرات في شروق الشمس وغروبها والعوامل الأخرى ذات الصلة. يتم إعداد جدول كل يوم لكل من    <a href='/hijri-date'>التاريخ الميلادي والهجري</a> ، باستخدام  البيانات الفلكية الخاصة بالرياض . <a href='/how-prayer-times-are-calculated-in-riyadh'>تعرف على التفاصيل الكاملة في هذا المقال المتخصص</a>`,
    },

    {
      q: " هل هناك طريقة لعرض أوقات الصلاة الشهرية ؟",
      ans: `مطلقا! نحن نقدم طاولة توفر أوقات الصلاة شهريا ل الرياض. يمكنك الوصول أيضا التحقق من أوقات الصلاة في أي تاريخ محدد`,
    },

    {
      q: "هل يمكنني عرض أوقات الصلاة لأماكن أخرى غير الرياض ؟",
      ans: `يركز موقعنا حاليا على توفير أوقات الصلاة الدقيقة لمدينة الرياض تحديدا. ومع ذلك ، قد نتوسع إلى مدن أخرى في التحديثات المستقبلية`,
    },

    {
      q: "ما هي الطريقة التي تستخدمها لصلاة العصر؟",
      ans: `نحن نستخدم الأساليب الحنفية أو الشافعية لحساب العصر ، اعتمادا على التفضيل الذي تحدده. بشكل افتراضي ، يتم تطبيق الطريقة الشافعية ، ولكن يمكنك تغييرها في الإعدادات.`,
    },

    {
      q: "هل مواقيت الصلاة دقيقة لجميع المناطق في الرياض؟",
      ans: `أوقاتنا دقيقة للمناطق المركزية في الرياض. ومع ذلك ، قد تحدث اختلافات طفيفة في المناطق أو الضواحي المحيطة. يمكنك ضبط الأوقات إذا لاحظت أي اختلافات ثابتة.`,
    },
    {
      q: " هل يمكنني تعيين طريقة الحساب والمدرسة المفضلة لدي؟",
      ans: `نعم ، يمكنك تخصيص طريقة الحساب واختيار مدرستك الفكرية المفضلة.`,
    },

    {
      q: " من أي مصدر تحصل على بيانات أوقات الصلاة؟",
      ans: `نحن نستمد أوقات الصلاة من <a href="https://aladhan.com">aladhan.com</a> ، وهي منصة موثوقة توفر بيانات دقيقة عن وقت الصلاة بناء على طرق حسابية عالمية مختلفة`,
    },
  ];
  function toggleIcon(index: number) {
    if (currentlyExpanded != null && currentlyExpanded != index) {
      const c = document.getElementById(`q${currentlyExpanded}`) as any;
      c.checked = false;
      document
        .getElementById(`icon${currentlyExpanded}`)
        ?.classList.add("rotate-180");
    }
    const checkbox = document.getElementById(`q${index}`) as any;
    const icon = document.getElementById(`icon${index}`);
    if (checkbox?.checked) {
      icon?.classList.remove("rotate-180");
    } else {
      icon?.classList.add("rotate-180");
    }
    setCurrentlyExpanded(index);
  }
  return (
    <div>
   

      {faqs.map((faq, index) => {
        return (
          <div key={index} className="flex flex-row rounded-2xl mt-3">
            <div className="flex-1 mt-3 px-4 xs:px-4 sm:px-6 md:px-8 ">
              <label>
                <input
                  id={`q${index}`}
                  className="peer/showLabel absolute scale-0 w-full"
                  type="checkbox"
                  onChange={() => toggleIcon(index)}
                />
                <span className="relative w-full block max-h-16 overflow-hidden rounded-2xl bg-white px-4  text-cyan-800 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                  <div className="flex justify-between mt-2 p-3">
                    <div className="font-bold">{faq.q}</div>
                    <div>
                      {" "}
                      <svg
                        id={`icon${index}`}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 ml-2 transform rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-3 color-484A56 mb-3" dangerouslySetInnerHTML={{ __html: faq.ans }}></div>

                </span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faqs;
