import { cx } from "classix";
import { Next, Previous } from "~components/atoms";
import { SuratProps } from "~interfaces";

export function PreviousOrNext({ surat }: SuratProps): JSX.Element {
  return (
    <div
      className={cx("flex w-full space-x-3", surat.number > 1 ? "justify-between" : "justify-end")}
    >
      <Previous surat={surat} />
      <Next surat={surat} />
    </div>
  );
}
