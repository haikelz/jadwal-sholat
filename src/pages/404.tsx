import PriorityImage from "~atoms/PriorityImage";

const NotFoundPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">
      <PriorityImage src="/img/void.svg" width={290} height={270} alt="Void Image" />
      <p className="mt-3 text-xl font-bold">Maaf, halaman yang kamu tuju tidak ditemukan</p>
    </section>
  );
};

export default NotFoundPage;
