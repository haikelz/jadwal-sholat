import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMounted } from "@/hooks";
import useGlobalStore from "@/store";
import { MapPin } from "lucide-react";
import { lazy, Suspense } from "react";

// Leaflet and the place name only load in the browser, after mount.
const Map = lazy(() => import("@/components/map").then((mod) => ({ default: mod.Map })));
const UserLocation = lazy(() =>
  import("@/components/user-location").then((mod) => ({ default: mod.UserLocation })),
);

/** The reader's place, and the way to change it: opens LocationDialog. */
export function LocationButton() {
  const setIsOpenMap = useGlobalStore((state) => state.setIsOpenMap);
  const isMounted = useIsMounted();
  return (
    <Button type="button" variant="outline" onClick={() => setIsOpenMap(true)}>
      <MapPin aria-hidden="true" />
      <span className="sr-only">Lokasi saat ini </span>
      {isMounted ? (
        <Suspense fallback={<span>lokasi terpilih</span>}>
          <UserLocation />
        </Suspense>
      ) : (
        <span>lokasi terpilih</span>
      )}
      <span aria-hidden="true">·</span>
      Ubah
    </Button>
  );
}

/**
 * The map for picking a place, shared by every page that follows the reader's
 * location. The store opens it, so any button on the page can.
 */
export function LocationDialog() {
  const { isOpenMap, setIsOpenMap } = useGlobalStore((state) => ({
    isOpenMap: state.isOpenMap,
    setIsOpenMap: state.setIsOpenMap,
  }));
  return (
    <Dialog open={isOpenMap} onOpenChange={setIsOpenMap}>
      {/* From md up the picker fills the screen: title, map, close button
          as three rows, the map taking all the height between them. */}
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-4xl md:h-[calc(100dvh-2rem)] md:max-w-[calc(100%-2rem)] md:grid-rows-[auto_minmax(0,1fr)_auto]">
        <DialogHeader>
          <DialogTitle>Pilih lokasi</DialogTitle>
          <DialogDescription>Cari atau ketuk peta untuk memilih lokasi.</DialogDescription>
        </DialogHeader>
        {/* The dialog only opens on the client, so the map never renders at
            build time. */}
        <Suspense fallback={<Skeleton className="h-75 w-full md:h-full" />}>
          <Map />
        </Suspense>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
