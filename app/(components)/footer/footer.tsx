import Image from "next/image";
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
 
        <div className="flex justify-center my-10">
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
          
        </div>
      </div>
      <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
        <p       dir="ltr"  className="order-2 md:order-1 mt-8 md:mt-0 ">
        
          © {new Date().getFullYear()} <Link href="/ " className="text-white">prayerstimesriyadh.com</Link> 
        </p>
        <div className="order-1 md:order-2">
          <Link href="about-us" className="px-2 text-gray-400" >About us</Link>
          <Link href="disclaimer" className="px-2 border-l text-gray-400">Disclaimer</Link>
          <Link href="privacy-policy" className="px-2 border-l text-gray-400">Privacy Policy</Link>
        </div>
      </div>
    </div>
  </div>
</>

    );

}