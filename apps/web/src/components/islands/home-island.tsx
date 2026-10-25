import { type CityView, Homepage } from "@/components/homepage";
import { Providers } from "@/components/providers";

export function HomeIsland({ city }: { city?: CityView }) {
  return (
    <Providers>
      <Homepage city={city} />
    </Providers>
  );
}
