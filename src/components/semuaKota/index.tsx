import Link from "next/link";

interface kotaProps {
  kota: [
    id: string,
    lokasi: string,
  ]
}

const SemuaKota = ({ kota }: kotaProps) => {
  return (
    <div className="grid grid-cols-6 text-center gap-5 grid-rows-1">
      {kota.map((loc: any) => (
        <Link href={`/kota/${loc.id}`}>
          <div className="cursor-pointer rounded-md bg-gradient-to-br from-sky-400 to-blue-500 p-10 border-2 border-black flex justify-center items-center" key={loc.id}> 
            <a className="font-semibold text-lg">{loc.lokasi}</a>
          </div> 
        </Link> 
      ))}
    </div>
  )
} 

export default SemuaKota; 
