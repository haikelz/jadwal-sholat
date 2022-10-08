import { NextRouter, useRouter } from "next/router";
import { memo, useEffect } from "react";
import Image from "next/image";

const ErrorPage = () => {
  const router: NextRouter = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">
      <Image
        src="https://raw.githubusercontent.com/haikelz/jadwal-sholat/ecbd0a12066a5b7a47c2e32282e09f4c1db0bff7/public/img/void.svg"
        width="290px"
        height="270px"
        alt="404 Image"
      />
      <p className="mt-3 text-xl font-bold">Maaf, halaman yang kamu tuju tidak ditemukan</p>
    </section>
  );
};

export default memo(ErrorPage);
