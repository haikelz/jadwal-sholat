import type { CityView } from "@/components/homepage";
import { ImsakiyahPage } from "@/components/imsakiyah-page";
import { Providers } from "@/components/providers";

export function ImsakiyahIsland({ city }: { city?: CityView }) {
  return (
    <Providers>
      <ImsakiyahPage city={city} />
    </Providers>
  );
}
