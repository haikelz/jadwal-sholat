import { hours } from "@/helpers/formatDate";
import Time from "@/molecules/time";
import dynamic from "next/dynamic";
import Head from "next/head";
import { memo } from "react";

const LazyLoadImage = dynamic(() => import("@/atoms/lazyLoadImage"));

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="flex flex-col items-center justify-center">
          {/**
           * Sedikit catatan
           * buat nampilin waktu pagi, siang, sore, dan malam
           * jika hours >= 12 dan hours < 15, maka yang ditampilkan siang
           * jika hours >= 15 dan hours < 18, maka yang ditampilkan sore
           * jika hours >= 18 dan hours < 0, maka yang ditampilkan malam
           * setelah itu atau selain itu, akan menampilkan pagi
           */}
          <LazyLoadImage src="/img/home.webp" width={100} height={100} alt="Home" />
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
            <p className="mb-0.5 mt-2 text-lg font-medium md:text-xl">
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
};

export default memo(Home);
