import { cx } from "classix";

export default function ErrorPage() {
  return (
    <div
      className={cx(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold">500 🤖</h1>
        <p className="mt-3 tracking-wide font-semibold">
          Maaf, sepertinya server sedang bermasalah!
        </p>
      </section>
    </div>
  );
}
