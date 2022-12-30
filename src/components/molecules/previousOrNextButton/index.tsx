import { PreviousOrNextButtonProps, Surat } from "@/interfaces";
import { Sebelumnya } from "@/atoms/sebelumnya";
import { Selanjutnya } from "@/atoms/selanjutnya";

const PreviousOrNextButton = ({ surat }: PreviousOrNextButtonProps) => {
  return (
    <div className={`flex w-full gap-3 ${surat.number > 1 ? "justify-between" : "justify-end"}`}>
      <Sebelumnya surat={surat} />
      <Selanjutnya surat={surat} />
    </div>
  );
};

export default PreviousOrNextButton;
