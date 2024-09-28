// // components/AudioPlayer.js
// import { useEffect, useRef } from 'react';

// const AudioPlayer = ({ play = false }) => {
//   const audioRef:any = useRef(null);

//   useEffect(() => {
//     console.log("play",play)
//     if (play) {
//       audioRef?.current?.play();
//     }
//   }, [play]);

//   return (
//     <div>
//       <audio ref={audioRef} src="/azan.mp3" />

//     </div>
//   );
// };

// export default AudioPlayer;
