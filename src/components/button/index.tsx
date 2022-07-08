import { suratProps } from "src/props";
import Sebelumnya from "./sebelumnya";
import Selanjutnya from "./selanjutnya";

const Button = ({ surat }: suratProps) => {
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
