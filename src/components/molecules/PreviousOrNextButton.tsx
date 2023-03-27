import { clsx } from "clsx";
import { Sebelumnya, Selanjutnya } from "~atoms";
import { SuratProps } from "~types";

type PreviousOrNextButtonProps = SuratProps & {};

export default function PreviousOrNextButton({ surat }: PreviousOrNextButtonProps) {
  return (
    <div
      className={clsx("flex w-full gap-3", surat.number > 1 ? "justify-between" : "justify-end")}
    >
      <Sebelumnya surat={surat} />
      <Selanjutnya surat={surat} />
    </div>
  );
}
