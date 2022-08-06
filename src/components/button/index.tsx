import { Surat } from "src/interfaces";
import Sebelumnya from "./sebelumnya";
import Selanjutnya from "./selanjutnya";

const Button = ({ surat }: Surat) => {
  return (
    <div
      className={`flex gap-3 w-full ${
        surat.number > 1 ? "justify-between" : "justify-end"
      }`}
    >
      <Sebelumnya surat={surat} />
      <Selanjutnya surat={surat} />
    </div>
  );
};

export default Button;
