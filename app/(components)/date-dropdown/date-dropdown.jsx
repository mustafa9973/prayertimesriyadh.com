"use client"
import { AppConstants } from "@/app/AppConstants";
import React, { useEffect, useState } from "react";

const DateDropdowns = ({data, hijri}) => {


    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedDate, setSelectedDate] = useState(data.todayData)



    const days = Array.from({ length: 31 }, (_, i) => i + 1);


    const convert = async () => {

        const baseUrl=hijri===true?"https://api.aladhan.com/v1/gToH":"https://api.aladhan.com/v1/hToG"
    
        const response = await fetch(`${baseUrl}/${selectedDay}-${selectedMonth + 1}-${selectedYear}?   adjustment=${hijri===true?1:-1}`)
        const data = await response.json()
        setSelectedDate(data.data)

    }

    const years = hijri===true? Array.from({ length: 2050 - 1900 + 1 }, (_, i) => 2050 - i):
    Array.from({ length: 1550 - 1400 + 1 }, (_, i) => 1550 - i);

    useEffect(() => {
 
        if (selectedDate) {
      
            if(hijri===true){

                setSelectedDay(selectedDate.gregorian.day)
                setSelectedMonth(parseInt(selectedDate.gregorian.month.number) - 1)
                setSelectedYear(selectedDate.gregorian.year)
            }else{
                setSelectedDay(selectedDate.hijri.day)
                setSelectedMonth(parseInt(selectedDate.hijri.month.number) - 1)
                setSelectedYear(selectedDate.hijri.year)

            }
        }

    }, [selectedDate])
    return (
        <>
            <div className="flex justify-center">
                {/* Days Dropdown */}
                <div className="flex flex-col mx-2">
                    <label htmlFor="days" className="text-gray-700 text-center font-medium">
                        يوم:
                    </label>
                    <select
                        id="days"
                        name="days"
                        className="border xs:w-16 md:w-24 border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                    >

                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Months Dropdown */}
                <div className="flex flex-col mx-2 px-2">
                    <label htmlFor="months" className="text-gray-700 font-medium text-center">
                        شهر:
                    </label>
                    <select
                        id="months"
                        name="months"
                        className="border xs:w-20 md:w-28 border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 text-center"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >

                        { hijri===true?  (AppConstants.months.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        ))):(AppConstants.islamicMonths.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        )))}
                    </select>
                </div>

                {/* Years Dropdown */}
                <div className="flex flex-col">
                    <label htmlFor="years" className="text-gray-700 font-medium text-center">
                        سنة:
                    </label>
                    <select
                        id="years"
                        name="years"
                        className="border  xs:w-24 md:w-32  border-gray-300 rounded-md
           p-2  focus:outline-none focus:ring focus:border-blue-500 text-center"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >

                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex justify-center my-5">
                <button onClick={() => convert()} className="bg-blue-600 py-2 px-10 rounded-lg text-white hover:bg-blue-800">تحويل</button>
            </div>
            <div className="flex flex-col justify-center  text-xl">
                <div className="text-center font-bold">

                {
                    hijri===true?    `${selectedDate?.hijri.day} ${selectedDate?.hijri.month.ar} ${selectedDate?.hijri.year}`:    `${selectedDate?.gregorian.day} ${AppConstants.monthArabic[selectedDate?.gregorian.month.en]} ${selectedDate?.gregorian?.year}`
                }
                </div>
                <div className="text-center mt-2">
                    {selectedDate?.hijri?.weekday?.ar}
                </div>
        
            </div>





        </>
    );
};

export default DateDropdowns;
