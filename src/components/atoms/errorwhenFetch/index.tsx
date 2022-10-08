import Head from "next/head";

const ErrorWhenFetch = () => {
  return (
    <>
      <Head>
        <title>Error when fetch!</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <p className="text-2xl font-bold">Error! Pastikan koneksimu lancar</p>
      </div>
    </>
  );
};

export default ErrorWhenFetch;
