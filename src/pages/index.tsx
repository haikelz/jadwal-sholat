import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { hours } from "~lib/utils/constants";

const Time = dynamic(() => import("~components/molecules/Time"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="flex flex-col items-center justify-center">
          <Image src="/img/home.webp" width={100} height={100} alt="Al-Quran" loading="eager" />
          <div className="mt-3 flex flex-col items-center justify-center text-center">
            <h1>{`Selamat ${
              hours >= 12 && hours < 15
                ? "Siang"
                : hours >= 15 && hours < 18
                ? "Sore"
                : hours >= 18 && hours < 24
                ? "Malam"
                : "Pagi"
            }`}</h1>
            <p className="mb-1 mt-2 text-lg font-medium md:text-xl">
              &#34;Maka nikmat Tuhanmu yang manakah yang kamu dustakan&#34;
              <br />
              Ar-Rahman ayat 13
            </p>
            <Time />
          </div>
        </div>
      </div>
    </>
  );
}
