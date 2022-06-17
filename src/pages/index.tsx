import Link from "next/link";
import Head from "next/head";
import Footer from "src/components/footer";

export const getStaticProps = async () => {
  try {
    let response = await fetch(`https://api.myquran.com/v1/sholat/kota/semua`);
    let data = await response.json();

    return {
      props: {
        kota: data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const Home = ({ kota }: any) => {
  const buttonClassName = `bg-teal-600 hover:bg-teal-700 duration-300 transition-all text-white font-bold text-xl px-4 py-3 rounded-md`;
  return (
    <>
      <Head>
        <title>Ngajiku</title>
      </Head>
      <div className="flex flex-col text-center h-screen px-4 justify-center items-center gap-3">
        <h1 className="sm:text-4xl text-3xl font-bold">
          Selamat Datang! Mau lihat apa?
        </h1>
        <p className="">
          "Demi masa, sesungguhnya manusia itu benar-benar berada dalam
          kerugian"
        </p>

        <div className="flex gap-4">
          <Link href="/jadwal-sholat">
            <button className={buttonClassName}>Jadwal Sholat</button>
          </Link>
          <Link href="/quran">
            <button className={buttonClassName}>Baca Al-Qur'an</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
