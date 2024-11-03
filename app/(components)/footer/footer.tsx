import Link from "next/link";

export default function Footer(){

    return(
        <>
  {/* component */}
  {/* This is an example component */}
  <div className=" bg-gray-900">
    <div className="max-w-2xl mx-auto text-white py-10">
      <div className="text-center">
        <p className="text-3xl mb-3"> تعرف على مواقيت الصلاة اليومية لمدينة الرياض </p>
 
        <div className="flex justify-center  space-x-6  p-4  rounded-lg shadow-md">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/profile.php?id=61567027712899"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 mx-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.407.595 24 1.325 24H12.81v-9.294H9.692v-3.62h3.118V8.413c0-3.09 1.894-4.774 4.66-4.774 1.325 0 2.464.099 2.794.143v3.243h-1.917c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.62h-3.12V24h6.102C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
        </svg>
      </a>

      {/* X (Twitter) */}
      <a
        href="https://x.com/prayer_riyadh_1"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.954 4.569c-.885.394-1.83.659-2.825.776 1.014-.608 1.793-1.574 2.163-2.723-.949.564-2.003.974-3.127 1.194-.897-.957-2.178-1.554-3.594-1.554-2.717 0-4.918 2.204-4.918 4.917 0 .385.045.762.126 1.124-4.083-.205-7.699-2.161-10.124-5.136-.423.723-.666 1.561-.666 2.475 0 1.708.87 3.215 2.191 4.099-.807-.025-1.567-.248-2.229-.617v.062c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.317 0-.626-.03-.929-.087.631 1.953 2.445 3.376 4.6 3.417-1.685 1.319-3.809 2.107-6.102 2.107-.396 0-.788-.023-1.175-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.054 0 14-7.496 14-13.986 0-.213-.005-.425-.014-.637.961-.694 1.797-1.562 2.457-2.549z" />
        </svg>
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/watch?v=Jv79cnhNRjE"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-600 hover:text-red-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.499 6.203a2.997 2.997 0 00-2.108-2.108C19.521 3.498 12 3.498 12 3.498s-7.521 0-9.391.597A2.997 2.997 0 00.5 6.203C0 8.073 0 12 0 12s0 3.927.5 5.797a2.997 2.997 0 002.109 2.108c1.869.597 9.391.597 9.391.597s7.521 0 9.391-.597a2.997 2.997 0 002.108-2.108C24 15.927 24 12 24 12s0-3.927-.501-5.797zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>

      {/* Pinterest */}
      <a
        href="https://www.pinterest.com/ghmustafa9973/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-600 hover:text-red-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.372 0 0 5.372 0 12c0 4.991 3.063 9.259 7.419 11.072-.103-.943-.196-2.395.04-3.43.213-.904 1.369-5.748 1.369-5.748s-.349-.699-.349-1.731c0-1.623.941-2.833 2.111-2.833 1.002 0 1.486.752 1.486 1.654 0 1.007-.641 2.513-.972 3.911-.277 1.171.586 2.127 1.737 2.127 2.085 0 3.692-2.199 3.692-5.368 0-2.803-2.016-4.761-4.896-4.761-3.335 0-5.293 2.498-5.293 5.073 0 .991.382 2.056.86 2.633.094.116.108.217.08.335-.089.372-.288 1.174-.329 1.336-.051.204-.166.248-.387.151-1.447-.6-2.354-2.474-2.354-4.014 0-3.242 2.358-6.227 6.804-6.227 3.57 0 6.348 2.551 6.348 5.963 0 3.554-2.235 6.42-5.336 6.42-1.041 0-2.021-.538-2.355-1.172 0 0-.557 2.124-.694 2.632-.253.953-.937 2.145-1.399 2.878 1.051.323 2.162.499 3.322.499 6.627 0 12-5.372 12-12S18.627 0 12 0z" />
        </svg>
      </a>
    </div>

 
        {/* <div className="flex justify-center my-10">
          <div className="flex items-center border w-auto rounded-lg px-4 py-2  mx-2">
            <Image
              src="/img/playstore.webp"
              className="w-7 md:w-8"
              width={100}
              height={100}
              alt="goole play"
            />
            <div className="text-left ml-3">
              <p className="text-xs text-gray-200">Download on </p>
              <p className="text-sm md:text-base"> Google Play Store </p>
            </div>
          </div>
          
        </div> */}
      </div>
      <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
        <p       dir="ltr"  className="order-2 md:order-1 mt-8 md:mt-0 ">
        
          © {new Date().getFullYear()} <Link href="/ " className="text-white">prayerstimesriyadh.com</Link> 
        </p>
        <div className="order-1 md:order-2">
          <Link prefetch={true} href="about-us" className="px-2 text-gray-400" >About us</Link>
          <Link prefetch={true} href="disclaimer" className="px-2 border-l text-gray-400">Disclaimer</Link>
          <Link prefetch={true} href="privacy-policy" className="px-2 border-l text-gray-400">Privacy Policy</Link>
        </div>
      </div>
    </div>
  </div>
</>

    );

}