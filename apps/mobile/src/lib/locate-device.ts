import { FALLBACK_PLACE_LABEL } from "@jadwal-sholat/core/api";
import { roundCoordinates, type Coordinates } from "@jadwal-sholat/core/prayer";
import * as Location from "expo-location";

const FIX_TIMEOUT_MS = 3000;
const LAST_FIX_MAX_AGE_MS = 10 * 60 * 1000;

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

async function placeLabel(position: Coordinates) {
  try {
    const [address] = await Location.reverseGeocodeAsync({
      latitude: position.lat,
      longitude: position.lng,
    });
    return (
      address?.city ??
      address?.subregion ??
      address?.district ??
      address?.region ??
      FALLBACK_PLACE_LABEL
    );
  } catch {
    return FALLBACK_PLACE_LABEL;
  }
}

/**
 * The device's approximate position (rounded to ~1km) and city name, or null
 * when permission is denied or no fix arrives in time.
 */
export async function locateDevice(): Promise<{
  position: Coordinates;
  label: string;
} | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return null;

    const fix =
      (await Location.getLastKnownPositionAsync({
        maxAge: LAST_FIX_MAX_AGE_MS,
      })) ??
      (await withTimeout(
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low }),
        FIX_TIMEOUT_MS,
      ));
    if (!fix) return null;

    const position = roundCoordinates({
      lat: fix.coords.latitude,
      lng: fix.coords.longitude,
    });
    return { label: await placeLabel(position), position };
  } catch {
    // Location services off, or the provider failed: keep the saved place.
    return null;
  }
}
