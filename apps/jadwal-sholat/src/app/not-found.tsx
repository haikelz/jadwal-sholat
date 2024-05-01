import { cn } from "~lib/utils/cn";

export default function NotFoundPage() {
  return (
    <div
      className={cn(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold">404 😴</h1>
        <p className="mt-3 tracking-wide font-medium">
          Halaman yang kamu tuju tidak ditemukan!{" "}
        </p>
      </section>
    </div>
  );
}
