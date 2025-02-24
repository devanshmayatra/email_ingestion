import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-svh w-full flex justify-center items-center " >
      <div className="h-12 w-48 bg-white flex justify-center items-center text-black" >
      <Link  href="/email-config"> To Email Configuration</Link>
    </div>
    </div>
  );
}
