type Title = {
  title: string;
};

const TidakAda = ({ title }: Title) => {
  return (
    <p className="font-bold text-xl">
      Input {title} yang anda masukkan kurang tepat!
    </p>
  );
};

export default TidakAda;
