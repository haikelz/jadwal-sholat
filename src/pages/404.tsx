import Layout from "~components/Layout";

export default function NotFoundPage() {
  return (
    <Layout title="404 Not Found!">
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold">404 😴</h1>
        <p className="mt-3 tracking-wide font-medium">Halaman yang kamu tuju tidak ditemukan! </p>
      </section>
    </Layout>
  );
}
