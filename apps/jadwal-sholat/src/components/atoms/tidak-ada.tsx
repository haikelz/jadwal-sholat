export function TidakAda({ title }: { title: string }) {
  return (
    <p id="not-found-text" className="text-lg font-medium">
      Input {title} yang kamu masukkan tidak ditemukan!
    </p>
  );
}
