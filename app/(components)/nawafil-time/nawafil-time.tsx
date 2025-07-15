"use client";
import React, { useState, useEffect } from "react";
import { Star, Clock, Calendar } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface Props {
  data: {
    formattedTodayData: {
      timings: {
        Fajr: string;
        Sunrise: string;
        Dhuhr: string;
        Asr: string;
        Maghrib: string;
        Isha: string;
      };
    };
  };
}

interface NawafilPrayer {
  name: string;
  englishName: string;
  startTime: string;
  endTime: string;
  bestTime: string;
  rakats: string;
  description: string;
  color: "indigo" | "yellow" | "amber" | "purple";
  icon: string;
}

interface ColorClasses {
  bg: string;
  text: string;
}

const NawafilTimesSection = (data:any) => {
  const { Fajr, Sunrise, Dhuhr, Maghrib, Isha } = data.data.formattedTodayData.timings;

  const parseTime = (timeStr: string) => dayjs(timeStr.split(" ")[0], "HH:mm");

  const fajr = parseTime(Fajr);
  const sunrise = parseTime(Sunrise);
  const dhuhr = parseTime(Dhuhr);
  const maghrib = parseTime(Maghrib);
  const isha = parseTime(Isha);

  const tahajjudStart = isha;
  const tahajjudEnd = fajr;
  const nightDuration = fajr.isBefore(maghrib)
    ? fajr.add(1, 'day').diff(maghrib, 'minute')
    : fajr.diff(maghrib, 'minute');
  const lastThirdStart = fajr.subtract(nightDuration / 3, 'minute');

  const ishraqStart = sunrise.add(15, 'minute');
  const ishraqEnd = sunrise.add(45, 'minute');

  const duhaStart = ishraqEnd;
  const duhaEnd = dhuhr.subtract(10, 'minute');
  const duhaBest = dayjs.unix((duhaStart.unix() + duhaEnd.unix()) / 2);

  const awwabinStart = maghrib;
  const awwabinEnd = isha;

  const format = (d: dayjs.Dayjs) => d.format("hh:mm A");

  const nawafilTimes: NawafilPrayer[] = [
    {
      name: "تهجد",
      englishName: "Tahajjud",
      startTime: format(tahajjudStart),
      endTime: format(tahajjudEnd),
      bestTime: format(lastThirdStart),
      rakats: "يمكن أداء صلاة التهجد ركعتين، أو أربع، أو ست، أو ثمان، أو اثنتي عشرة ركعة - ولكن يمكنك القيام بها قدر الإمكان حسب قدرتك.",
      description: "أفضل وقت هو الثلث الأخير من الليل",
      color: "indigo",
      icon: "🌙",
    },
    {
      name: "إشراق",
      englishName: "Ishraq",
      startTime: format(ishraqStart),
      endTime: format(ishraqEnd),
      bestTime: format(ishraqStart),
      rakats: "2",
      description: "بعد شروق الشمس بـ 15 إلى 20 دقيقة",
      color: "yellow",
      icon: "🌅",
    },
    {
      name: "چاشت",
      englishName: "Chasht",
      startTime: format(duhaStart),
      endTime: format(duhaEnd),
      bestTime: format(duhaBest),
      rakats: "2 to 8",
      description: "أفضل وقت عندما تشتد حرارة الشمس",
      color: "amber",
      icon: "☀️",
    },
    {
      name: "أوابين",
      englishName: "Awwabin",
      startTime: format(awwabinStart),
      endTime: format(awwabinEnd),
      bestTime: format(awwabinStart.add(10, 'minute')),
      rakats: "6",
      description: "أفضل وقت مباشرة بعد صلاة المغرب",
      color: "purple",
      icon: "🌆",
    },
  ];

  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNow = (time: Date): string =>
    time.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const isCurrentlyActive = (startTime: string, endTime: string): boolean => {
    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();

    const parse = (timeStr: string): number => {
      const [time, period] = timeStr.split(" ");
      const [h, m] = time.split(":").map(Number);
      let total = h * 60 + m;
      if (period === "PM" && h !== 12) total += 720;
      else if (period === "AM" && h === 12) total = m;
      return total;
    };

    const start = parse(startTime);
    const end = parse(endTime);
    return start > end ? current >= start || current <= end : current >= start && current <= end;
  };

  const getColorClasses = (color: NawafilPrayer["color"], isActive: boolean): ColorClasses => {
    const base: Record<NawafilPrayer["color"], string> = {
      indigo: isActive ? "bg-indigo-100 border-indigo-500" : "bg-white border-indigo-200",
      yellow: isActive ? "bg-yellow-100 border-yellow-500" : "bg-white border-yellow-200",
      amber: isActive ? "bg-amber-100 border-amber-500" : "bg-white border-amber-200",
      purple: isActive ? "bg-purple-100 border-purple-500" : "bg-white border-purple-200",
    };
    const text: Record<NawafilPrayer["color"], string> = {
      indigo: isActive ? "text-indigo-700" : "text-indigo-600",
      yellow: isActive ? "text-yellow-700" : "text-yellow-600",
      amber: isActive ? "text-amber-700" : "text-amber-600",
      purple: isActive ? "text-purple-700" : "text-purple-600",
    };
    return { bg: base[color], text: text[color] };
  };

  const activeNafil = nawafilTimes.find((n) => isCurrentlyActive(n.startTime, n.endTime));

  return (
    <div className=" mt-5 bg-white shadow-lg rounded-xl border border-gray-200 p-5 ">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star className="w-8 h-8 text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-800">مواقيت صلاة النوافل في الرياض</h2>
          <Star className="w-8 h-8 text-yellow-500" />
        </div>
        <p className="text-gray-600 text-lg mb-4">Nawafil Prayer Times - Voluntary Prayers</p>
     
      </div>

      {activeNafil && (
        <div className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{activeNafil.icon}</div>
              <div>
                <h3 className="text-xl font-bold">الآن وقت صلاة {activeNafil.name}</h3>
                <p className="text-sm opacity-90">{activeNafil.englishName} Prayer Time is Active</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">ينتهي في</div>
              <div className="text-lg font-bold">{activeNafil.endTime}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {nawafilTimes.map((nafil, index) => {
          const isActive = isCurrentlyActive(nafil.startTime, nafil.endTime);
          const colors = getColorClasses(nafil.color, isActive);
          return (
            <div
              key={index}
              className={`${colors.bg} rounded-xl shadow-md p-6 border-2 transition-all duration-300 hover:shadow-lg`}
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{nafil.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{nafil.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{nafil.englishName}</p>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">البداية:</span>
                    <span className={`font-bold ${colors.text}`}>{nafil.startTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">النهاية:</span>
                    <span className={`font-bold ${colors.text}`}>{nafil.endTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">أفضل وقت:</span>
                    <span className={`font-bold ${colors.text}`}>{nafil.bestTime}</span>
                  </div>
               
                </div>
                <p className="text-xs text-gray-500 mb-3">{nafil.description}</p>
                {isActive && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">نشط الآن</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NawafilTimesSection;
