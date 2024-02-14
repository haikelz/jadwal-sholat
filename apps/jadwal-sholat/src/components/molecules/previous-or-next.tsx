import { Next, Previous } from "~components/atoms";
import { SuratProps } from "~interfaces";
import { cx } from "~lib/helpers";

export function PreviousOrNext({ data }: SuratProps) {
  return (
    <div
      className={cx(
        "flex w-full space-x-3",
        data.number > 1 ? "justify-between" : "justify-end"
      )}
    >
      <Previous data={data} />
      <Next data={data} />
    </div>
  );
}
