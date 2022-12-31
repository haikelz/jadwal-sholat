import Sebelumnya from "@/atoms/sebelumnya";
import Selanjutnya from "@/atoms/selanjutnya";
import clsx from "clsx";
import { PreviousOrNextButtonProps } from "@/types";

const PreviousOrNextButton = ({ surat }: PreviousOrNextButtonProps) => {
  return (
    <div
      className={clsx("flex w-full gap-3", surat.number > 1 ? "justify-between" : "justify-end")}
    >
      <Sebelumnya surat={surat} />
      <Selanjutnya surat={surat} />
    </div>
  );
};

export default PreviousOrNextButton;
