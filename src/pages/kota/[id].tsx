import Layout from "src/components/layout";

export const getStaticPaths = async () => {
  try {
    let response = await fetch(`https://api.myquran.com/v1/sholat/kota/semua`); 
    let data = await response.json(); 

    const paths = data.map((city: any) => {
      return {
        params: { id: city.id.toString() }, 
      }
    })

    return {
      paths, 
      fallback: false
    }
  } catch(err) {
    console.log(err); 
  }
}

export const getStaticProps = async (context: any) => {
  try {
    /* Ngakalin dikit di bagian tanggalnya, karena emang fungsi Date() bawaan JS ga terlalu akurat.
       Jadi awalnya tanggal 3, tapi sekarang saat ini dibuat adalah tanggal 15, jadi 3 + 12 = 15 :D 
    */
    let date = new Date(); 
    let tahun = date.getFullYear(); 
    let bulan = date.getMonth() + 1; 
    let tanggal = date.getDay() + 12; 
    let formatDate = `${tahun}/${bulan}/${tanggal}`;

    const id = context.params.id; 
    const response = await fetch(`https://api.myquran.com/v1/sholat/jadwal/${id}/${formatDate}`); 
    const data = await response.json(); 
    console.log(data); 

    return {
      props: {
        city: data.data, 
      }
    }
  } catch(err) {
    console.log(err);
  }
}

const KotaId = ({ city }: any) => {
  return (
    <Layout> 
      <h1 className="font-bold text-3xl">{city.lokasi}</h1>
      <div className="text-center flex gap-7">
        <p>Subuh: {city.jadwal.subuh}</p>
        <p>Dzuhur: {city.jadwal.dzuhur}</p>
        <p>Ashar: {city.jadwal.ashar}</p>
        <p>Maghrib: {city.jadwal.maghrib}</p>
        <p>Isya: {city.jadwal.isya}</p>
      </div>
    </Layout>
  )
} 

export default KotaId; 
