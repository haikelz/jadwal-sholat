export type Coordinates = {
  lat: number;
  lng: number;
};

/** Kota Bandung, used until the reader shares or picks a location. */
export const DEFAULT_POSITION: Coordinates = {
  lat: -6.905977,
  lng: 107.613144,
};

/**
 * ~1km precision: prayer times don't change at that scale, and a stable value
 * keeps query keys (and caches) the same between visits.
 */
export function roundCoordinate(value: number) {
  return Math.round(value * 100) / 100;
}

export function roundCoordinates(position: Coordinates): Coordinates {
  return {
    lat: roundCoordinate(position.lat),
    lng: roundCoordinate(position.lng),
  };
}
