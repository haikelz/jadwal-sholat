import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "src/components/layout";

const SemuaKota = dynamic(() => import("src/components/semuaKota"), {
  suspense: true, 
}); 

export const getStaticProps = async () => {
  try {
    let response = await fetch(`https://api.myquran.com/v1/sholat/kota/semua`); 
    let data = await response.json(); 

    return {
      props: {
        kota: data, 
      }
    }
  } catch(err) {
    console.log(err)
  }
}

const Home = ({kota}: any) => {
  return (
    <Layout> 
      <h1 className="text-4xl font-bold">Jadwal Sholat</h1>
      <p className="font-medium text-xl">Berikut daftar kota yang tersedia</p> 
      <Suspense fallback={"Loading...."}>
        <SemuaKota kota={kota} /> 
      </Suspense>
    </Layout> 
  )
}

export default Home; 
