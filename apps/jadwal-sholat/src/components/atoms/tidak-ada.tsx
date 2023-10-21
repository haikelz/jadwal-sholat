export function TidakAda({ title }: { title: string }): JSX.Element {
  return (
    <p data-cy="not-found-text" className="text-lg font-medium">
      Input {title} yang kamu masukkan tidak ditemukan!
    </p>
  );
}
