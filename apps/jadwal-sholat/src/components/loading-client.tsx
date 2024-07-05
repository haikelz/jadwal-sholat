import { cn } from "~lib/utils/cn";

import { Spinner } from "./ui/spinner";

export default function LoadingClient() {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center",
        "p-8 space-x-3 text-center"
      )}
    >
      <p className="text-2xl font-bold">Loading</p>
      <div role="status">
        <Spinner />
      </div>
    </div>
  );
}
