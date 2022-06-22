import { memo } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "src/components/footer";
import Time from "src/components/time";

const Home = () => {
  const buttonClassName = `bg-teal-600 hover:bg-teal-700 duration-300 transition-all text-white font-bold text-md md:text-xl px-3 py-2 md:px-4 md:py-3 rounded-md`;
  const date = new Date();
  const hours = date.getHours();

  return (
    <>
      <Head>
        <title>Info Jadwal Sholat dan Baca Al-Qur&#39;an</title>
      </Head>
      <div className="flex flex-col text-center h-screen px-4 justify-center items-center gap-3">
        {/* Sedikit catatan 
           -> buat nampilin waktu pagi, siang, sore, dan malam
                jika hours >= 12 dan hours < 15, maka yang ditampilkan siang
                jika hours >= 15 dan hours < 18, maka yang ditampilkan sore
                jika hours >= 18 dan hours < 0, maka yang ditampilkan malam
                setelah itu atau selain itu, akan menampilkan pagi
        */}
        <h1 className="sm:text-4xl text-3xl font-bold">{`Selamat ${
          hours >= 12 && hours < 15
            ? "siang"
            : hours >= 15 && hours < 18
            ? "sore"
            : hours >= 18 && hours < 24
            ? "malam"
            : "pagi"
        }`}</h1>
        <div className="flex justify-center items-center flex-col">
          <p className="text-lg md:text-xl font-medium">
            &#34;Demi masa, sesungguhnya manusia itu benar-benar berada dalam
            kerugian&#34;
          </p>
          <Time />
        </div>
        <div className="flex gap-4">
          <Link href="/jadwal-sholat">
            <button className={buttonClassName}>Jadwal Sholat</button>
          </Link>
          <Link href="/quran">
            <button className={buttonClassName}>Baca Al-Qur&#39;an</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(Home);
