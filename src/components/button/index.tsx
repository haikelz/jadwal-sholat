import { suratProps } from "src/types";
import Sebelumnya from "./sebelumnya";
import Selanjutnya from "./selanjutnya";

const Button = ({ surat }: suratProps) => {
  return (
    <div className="flex mt-6 gap-3 w-full justify-between">
      <Sebelumnya surat={surat} />
      <Selanjutnya surat={surat} />
    </div>
  );
};

export default Button;
