import { Next, Previous } from "~components/atoms";
import { SuratProps } from "~interfaces";
import { cx } from "~lib/helpers";

export function PreviousOrNext({ surat }: SuratProps) {
  return (
    <div
      className={cx(
        "flex w-full space-x-3",
        surat.number > 1 ? "justify-between" : "justify-end"
      )}
    >
      <Previous surat={surat} />
      <Next surat={surat} />
    </div>
  );
}
