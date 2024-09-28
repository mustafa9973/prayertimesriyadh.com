import { DateTime } from "luxon";

export function compareDatesOnly(dateString: string): number {


    const inputDate = new Date(dateString); 
    inputDate.setHours(0)
    inputDate.setMinutes(0)
    inputDate.setSeconds(0)

    const timeZone = 'Asia/Riyadh';

// Get the current date and time in Riyadh time
    const riyadhDate = DateTime.now().setZone(timeZone).toJSDate();



   // Compare dates
     if (riyadhDate.getDate()===inputDate.getDate()) {
      return 0; // Dates are equal
  } else if (riyadhDate.getDate() > inputDate.getDate()) {
      return -1; // Riyadh date is less than input date
  } else {
      return 1; // Riyadh date is greater than input date
  }
  }

  export function getCurrentTimeInRiyadh(){
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Riyadh',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
   return new Intl.DateTimeFormat('en-US', options).format(now);

  }

  export function getNextPrayer(prayerTimes: PrayerTimes): { nextPrayer: string;nextPrayerTime:number } {

   const currentRiyadhTime=DateTime.now().setZone('Asia/Riyadh')
    // Convert prayer times to Date objects
    const prayerDates = Object.entries(prayerTimes).map(([key, timeStr]) => ({
        name: key,
        time:  DateTime.fromFormat(timeStr.split(' ')[0], 'HH:mm', { zone: 'Asia/Riyadh' })
        .set({
            year: currentRiyadhTime.year,
            month: currentRiyadhTime.month,
            day: currentRiyadhTime.day
        })  // Remove timezone info
    }));


    // Find the next prayer
    let nextPrayer: { name: string, time: DateTime<true> | DateTime<false> } | null = null;
    for (const prayer of prayerDates) {
        if (prayer.time > currentRiyadhTime) {
            nextPrayer = prayer;
            break;
        }
    }

    if (!nextPrayer) {
        // If no upcoming prayer today, it would be the first prayer of the next day
        nextPrayer = prayerDates[0];
        nextPrayer.time=nextPrayer.time.plus({days:1})
    }



    return { nextPrayer: nextPrayer.name, nextPrayerTime:nextPrayer.time.toMillis()};
}

type PrayerTimes = {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
};