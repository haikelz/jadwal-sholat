const ListSurah = ({ surah }: any) => {
  return (
    <div className="grid grid-cols-4 grid-rows-1">
      {surah.map((surat: any) => (
        <div className="flex flex-col p-4">
          <h1>{surat.number}</h1>
          <p>{surat.tafsir.id}</p>
        </div>
      ))}
    </div>
  );
};

export default ListSurah;
