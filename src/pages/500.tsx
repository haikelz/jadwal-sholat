import { memo } from "react";
import Image from "next/image";

const ErrorPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">
      <Image
        src="https://raw.githubusercontent.com/haikelz/jadwal-sholat/ecbd0a12066a5b7a47c2e32282e09f4c1db0bff7/public/img/void.svg"
        width={290}
        height={270}
        alt="500 Image"
        priority
      />
      <p className="mt-3 text-xl font-bold">Maaf, sepertinya server sedang bermasalah!</p>
    </section>
  );
};

export default memo(ErrorPage);
