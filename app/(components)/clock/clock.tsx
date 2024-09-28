// "use client"
// import React, { useState, useEffect } from 'react';

// const RiyadhClock: React.FC = () => {
//   const [time, setTime] = useState<string>('');
//   const [date, setDate] = useState<string>('');



//   useEffect(() => {
//     const updateClock = () => {
//       const now = new Date();
//       const options: Intl.DateTimeFormatOptions = {
//         timeZone: 'Asia/Riyadh',
//         hour12: true,
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//       };
//       const currentTime = new Intl.DateTimeFormat('en-US', options).format(now);
//       setTime(currentTime);

//       const dateOptions: Intl.DateTimeFormatOptions = {
//         timeZone: 'Asia/Riyadh',
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       };
//       const currentDate = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
//       setDate(currentDate);


   
//     };

//     updateClock(); // Initial call
//     const intervalId = setInterval(updateClock, 1000); // Update every second

//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);



//   return (
//   <>
     
//      <div className="flex flex-col">

//       <div className="text-xl">الوقت الأن في الرياض : {time}</div>
//       {/* <div className="text-lg">{date}</div> */}
//      </div>

//   </>
  
//   );
// };

// export default RiyadhClock;
