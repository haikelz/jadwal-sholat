import Layout from "~components/Layout";

export default function OfflinePage() {
  return (
    <Layout title="503 Offline!">
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold">503 📡</h1>
        <p className="mt-3 tracking-wide font-semibold">
          Sepertinya kamu sedang offline, mohon nyalakan koneksi internetmu!{" "}
        </p>
      </section>
    </Layout>
  );
}
