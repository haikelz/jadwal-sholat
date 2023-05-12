import { cx } from "classix";
import { Sebelumnya, Selanjutnya } from "~components/atoms";
import { SuratProps } from "~models";

export default function PreviousOrNextButton({ surat }: SuratProps & {}) {
  return (
    <div
      className={cx("flex w-full space-x-3", surat.number > 1 ? "justify-between" : "justify-end")}
    >
      <Sebelumnya surat={surat} />
      <Selanjutnya surat={surat} />
    </div>
  );
}
