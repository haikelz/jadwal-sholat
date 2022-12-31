import dynamic from "next/dynamic";

const LazyLoadImage = dynamic(() => import("@/atoms/lazyLoadImage"));

const ErrorPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">
      <LazyLoadImage src="/img/void.svg" width={290} height={270} alt="Void Image" />
      <p className="mt-3 text-xl font-bold">Maaf, sepertinya server sedang bermasalah!</p>
    </section>
  );
};

export default ErrorPage;
