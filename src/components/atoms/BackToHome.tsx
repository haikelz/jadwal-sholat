import { cx } from "classix";

export function BackToHome() {
  return (
    <button
      type="button"
      aria-label="back to home"
      className={cx(
        "bg-blue-500 transition-all px-4 py-2",
        "hover:bg-blue-600 hover:translate-y-4"
      )}
    >
      Back to Home
    </button>
  );
}
