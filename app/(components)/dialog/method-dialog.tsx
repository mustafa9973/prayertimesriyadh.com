"use client"

import { AppConstants } from "@/app/AppConstants";
import { useState } from "react";
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from "next/navigation";


export default function MethodDialog() {
  const [isOpen, setOpen] = useState(false)

  const [method,setMethod] = useState(getCookie("method") || "4");
  const [school,setSchool] = useState(getCookie("school") || "0");
  const [newMethod,setNewMethod] = useState(method);
  const [newSchool,setNewSchool] = useState(school);
  const rotuer=useRouter();

  const saveCookie = () => {
   setCookie("school",school)
   setCookie("method",method);
    setMethod(newMethod)
    setSchool(newSchool)
   setOpen(false);
   rotuer.refresh()
  };
  return (

    <>
      <div className="flex justify-between mt-5 xs:text-xs sm:text-sm">
        <div>
          طريقة الحساب :{AppConstants.methods.get(parseInt(method))}, {AppConstants.school.get(parseInt(school))}
        </div>
        <div>
          <button onClick={() => setOpen(true)} className="bg-blue-600 xs:text-xs xs:px-2  py-2 md:px-5 rounded-lg text-white hover:bg-blue-800">تغيير الاعدادات</button>
        </div>
      </div>
      {isOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-index-200">

        <div className="bg-white border-2 border-gray-500 p-6 top-52 rounded-lg max-w-md w-full shadow-lg">
          <span className="text-2xl text-center font-bold mb-4 block">تغيير الاعدادات</span>
          <label className="block" htmlFor="prayer-method">اختر طريقة الحساب:</label>
          <select id="prayer-method" onChange={(e)=> setNewMethod(e.target.value)} value={newMethod} className="border w-4/6 border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500">

          {Array.from(AppConstants.methods).map(([key, value]) => (
    <option key={key} value={key}>
        {value}
    </option>
))}



          </select>

          <div className="my-4">
          <label className="block" htmlFor="school">اختر المدرسة:</label>
          <select id="school" onChange={(e)=> setNewSchool(e.target.value)} value={newSchool} className="border w-4/6 border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500">
          {Array.from(AppConstants.school).map(([key, value]) => (
    <option key={key} value={value}>
        {value}
    </option>
))}
 
    
          </select>
          </div>
          <div className="flex justify-center space-x-2">
          <button
              className="px-4 py-2 me-2 bg-blue-500 text-white rounded"
              onClick={()=>saveCookie()  }
            >
                 حفظ الإعداد
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={()=>  setOpen(false)}
            >
              إلغاء الأمر
            </button>
           
          </div>
        </div>

        
      </div>)}

    </>

  );
}
