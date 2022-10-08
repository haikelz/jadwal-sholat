type Title = {
  title: string;
};

const TidakAda = ({ title }: Title) => {
  return <p className="text-xl font-bold">Input {title} yang kamu masukkan kurang tepat!</p>;
};

export default TidakAda;
