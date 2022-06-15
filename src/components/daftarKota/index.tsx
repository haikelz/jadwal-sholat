// tes API dulu

import { useEffect, useState } from "react";


const DaftarKota = () => {
  const [kota, setKota] = useState([]); 
  const [waktuSholat, setWaktuSholat] = useState([]); 

  const getKota = async () => {
    const response = await fetch(`https://api.myquran.com/v1/sholat/jadwal/0907/2022/06/15`); 
    const data = await response.json(); 

    setKota(data.data); 
    setWaktuSholat(data.data.jadwal); 
  }

  useEffect(() => {
    getKota(); 
  }, [])
  return (
    <div className="flex justify-center items-center">
      <table className="border-2 border-black">
        <thead className="border-2 border-black p-4">
          <tr className="border-2 border-black">
            <th>ID</th>
            <th>Nama Kota</th>
            <th>Subuh</th>
            <th>Dzuhur</th>
            <th>Ashar</th>
            <th>Maghrib</th>
            <th>Isya</th>
          </tr> 
        </thead>

        <tbody className="border-2 border-black">
          <tr className="border-2 border-black">
            <td>{kota.id}</td>
            <td>{kota.lokasi}</td>
            <td>{waktuSholat.subuh}</td>
            <td>{waktuSholat.dzuhur}</td>
            <td>{waktuSholat.ashar}</td>
            <td>{waktuSholat.maghrib}</td>
            <td>{waktuSholat.isya}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
} 

export default DaftarKota; 
