import Layout from "src/components/layout";

export const getStaticProps = async () => {
  try {
    const response = await fetch(`https://api.myquran.com/v1/tafsir/quran/kemenag/id/1`); 
    const data = await response.json(); 

    console.log(data);
    return {
      props: {
        tafsir: data.data, 
      } 
    }
  } catch(err) {
    console.log(err)
  }
}

const Tafsir = ({ tafsir }: any) => {
  return (
    <Layout>
      <h1>Tafsir AL-Qur'an</h1> 
      <p>{tafsir.tafsir_id}</p>
    </Layout>
  )
}

export default Tafsir; 
