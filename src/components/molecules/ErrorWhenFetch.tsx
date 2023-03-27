import Head from "next/head";

export default function ErrorWhenFetch() {
  return (
    <>
      <Head>
        <title>Error when fetch!</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <p className="text-2xl font-bold">Error! Terjadi kesalahan saat Fetch data!</p>
      </div>
    </>
  );
}
