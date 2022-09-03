import { NextRouter, useRouter } from "next/router";
import { memo, useEffect } from "react";
import Image from "next/image";

const ErrorPage = () => {
  const Router: NextRouter = useRouter();

  useEffect(() => {
    setTimeout(() => {
      Router.push("/");
    }, 5000);
  }, [Router]);

  return (
    <div className="flex justify-center text-center min-h-screen items-center flex-col">
      <Image
        src="https://raw.githubusercontent.com/haikelz/jadwal-sholat/ecbd0a12066a5b7a47c2e32282e09f4c1db0bff7/public/img/void.svg"
        width="290px"
        height="270px"
        alt="404 Image"
      />
      <h1 className="font-bold mt-3 text-xl">
        Maaf, halaman yang kamu tuju tidak ditemukan
      </h1>
    </div>
  );
};

export default memo(ErrorPage);
