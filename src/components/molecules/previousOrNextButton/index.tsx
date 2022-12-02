import { PreviousOrNextButtonProps, Surat } from "@/interfaces";
import { Sebelumnya } from "@/components/atoms/sebelumnya";
import { Selanjutnya } from "@/components/atoms/selanjutnya";

const PreviousOrNextButton = ({ surat }: PreviousOrNextButtonProps) => {
  return (
    <div className={`flex w-full gap-3 ${surat.number > 1 ? "justify-between" : "justify-end"}`}>
      <Sebelumnya surat={surat} />
      <Selanjutnya surat={surat} />
    </div>
  );
};

export default PreviousOrNextButton;
