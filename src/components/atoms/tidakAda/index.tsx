type Title = {
  title: string;
};

export const TidakAda = ({ title }: Title) => {
  return <p className="text-xl font-bold">Input {title} yang kamu masukkan kurang tepat!</p>;
};
