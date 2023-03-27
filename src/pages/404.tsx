import Image from "next/image";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">
      <Image src="/img/void.svg" width={290} height={270} alt="404 not found" />
      <p className="mt-3 text-xl font-bold">Maaf, halaman yang kamu tuju tidak ditemukan</p>
    </section>
  );
}
