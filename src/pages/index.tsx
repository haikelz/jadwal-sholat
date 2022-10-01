import { memo } from "react";
import { hours } from "@/src/utils/date";
import Time from "@/src/components/molecules/time";
import Head from "next/head";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col text-center min-h-screen justify-center items-center gap-3 px-6">
        <div className="flex justify-center items-center flex-col">
          {/**
           * Sedikit catatan
           * buat nampilin waktu pagi, siang, sore, dan malam
           * jika hours >= 12 dan hours < 15, maka yang ditampilkan siang
           * jika hours >= 15 dan hours < 18, maka yang ditampilkan sore
           * jika hours >= 18 dan hours < 0, maka yang ditampilkan malam
           * setelah itu atau selain itu, akan menampilkan pagi
           **/}
          <Image
            src="/img/home.png"
            width="100px"
            height="100px"
            alt="Home Image"
            priority={true}
          />
          <div className="mt-3 flex flex-col justify-center items-center text-center">
            <h1 className="sm:text-4xl text-3xl font-bold">{`Selamat ${
              hours >= 12 && hours < 15
                ? "Siang"
                : hours >= 15 && hours < 18
                ? "Sore"
                : hours >= 18 && hours < 24
                ? "Malam"
                : "Pagi"
            }`}</h1>
            <p className="text-lg mb-0.5 mt-2 md:text-xl font-medium">
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
