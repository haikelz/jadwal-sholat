import type { NominatimAddress } from "../schemas/nominatim";

export const FALLBACK_PLACE_LABEL = "lokasi terpilih";

/** The most useful locality name in a Nominatim address, like the web. */
export function formatPlaceLabel(address: NominatimAddress | undefined) {
  return (
    address?.city ??
    address?.town ??
    address?.municipality ??
    address?.village ??
    address?.county ??
    FALLBACK_PLACE_LABEL
  );
}
