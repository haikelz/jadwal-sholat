import { ShareButton } from "@/components/common/share-button";
import { Providers } from "@/components/providers";
import type { ComponentProps } from "react";

/** ShareButton on its own, for static pages without another island. */
export function ShareIsland(props: ComponentProps<typeof ShareButton>) {
  return (
    <Providers>
      <ShareButton {...props} />
    </Providers>
  );
}
