import React, { useState, useEffect } from 'react';
import { Clock, Moon, Sun } from 'lucide-react';
import { AppConstants } from '@/app/AppConstants';



const SeharIftarSection = async (prayerData:any) => {

  const data=prayerData.data.formattedTodayData
  const today=new Date();
  const monthArabic:any= AppConstants.monthArabic




  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md flex flex-col mt-5">
      <div className="text-center mb-8 mt-3">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          مواقيت السحور والإفطار في الرياض
        </h2>
        <p className="text-gray-600 text-lg">
          {`${data.hijriDate} ${data.hijriMonth} ${data.hijriYear}`} | {`${today.getDate()} ${monthArabic[data.month]} ${today.getFullYear()}`}
        </p>
        {/* <div className="flex items-center justify-center gap-2 mt-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span className="text-xl font-mono text-blue-600">
            {formatTime(currentTime)}
          </span>
        </div> */}
      </div>

      {/* Sehar and Iftar Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Sehar Card */}
        <div className="bg-white rounded-xl shadow-md p-6  border-t-[1px] border-gray-200 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Moon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">وقت السحور</h3>
                <p className="text-gray-600 text-sm">Sehar Time</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {(data?.timings.Fajr as string).split('(')[0]}
            </div>
            <div className="text-sm text-gray-500 mb-3">
              ينتهي عند أذان الفجر
            </div>
          
          </div>
        </div>

        {/* Iftar Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-t-[1px] border-gray-200 border-l-4  border-l-orange-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-full">
                <Sun className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">وقت الإفطار</h3>
                <p className="text-gray-600 text-sm">Iftar Time</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
           { (data?.timings.Maghrib as string).split('(')[0]}
            </div>
            <div className="text-sm text-gray-500 mb-3">
              عند أذان المغرب
            </div>
         
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="w-full mx-auto p-4 my-4 bg-white shadow-lg rounded-xl border border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-4">معلومات مهمة</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-700">السحور</p>
              <p className="text-sm text-gray-600">
                يُستحب تناول السحور قبل أذان الفجر بـ 2 دقيقة
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-700">الإفطار</p>
              <p className="text-sm text-gray-600">
                يبدأ وقت الإفطار مباشرة عند أذان المغرب
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeharIftarSection;