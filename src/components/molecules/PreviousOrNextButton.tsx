import { cx } from "classix";
import { Sebelumnya, Selanjutnya } from "~atoms";
import { SuratProps } from "~models";

type PreviousOrNextButtonProps = SuratProps & {};

export default function PreviousOrNextButton({ surat }: PreviousOrNextButtonProps) {
  return (
    <div className={cx("flex w-full gap-3", surat.number > 1 ? "justify-between" : "justify-end")}>
      <Sebelumnya surat={surat} />
      <Selanjutnya surat={surat} />
    </div>
  );
}
