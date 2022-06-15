

export const getStaticPaths = async () => {
  try { 
    let i = 1; 
    const response = await fetch(`https://api.myquran.com/v1/tafsir/quran/kemenag/id/${i}`); 
    const data = await response.json(); 

    const paths = data.map((tafsir: any) => {
      return {
        params: { id: tafsir.tafsir_id.toString() }
      } 
    })

    return {
      paths, 
      fallback: false, 
    }
  } catch(err) {
    console.log(err); 
  }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id; 
  const response = await fetch(`https://api.myquran.com/v1/tafsir/quran/kemenag/id/${id}`); 
  const data = await response.json();

  return {
    props: {
      tafsir: data.data
    }
  }

}
const SuratId = ({ tafsir }: any) => {
    return (
      <>
        <p>{tafsir.text}</p>
      </>
    )
}

export default SuratId; 
