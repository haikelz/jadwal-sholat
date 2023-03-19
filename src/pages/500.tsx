import Image from "next/image";

const ErrorPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">
      <Image src="/img/void.svg" width={290} height={270} alt="500 error" />
      <p className="mt-3 text-xl font-bold">Maaf, sepertinya server sedang bermasalah!</p>
    </section>
  );
};

export default ErrorPage;
