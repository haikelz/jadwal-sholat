import { useEffect } from "react";
import useGlobalStore from "~store";

export function useGeolocation() {
  const { setPosition } = useGlobalStore((state) => ({
    setPosition: state.setPosition,
  }));

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude as number,
          lng: position.coords.longitude as number,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, [setPosition]);
}
