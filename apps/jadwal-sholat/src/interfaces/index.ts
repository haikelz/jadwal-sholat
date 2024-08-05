import { ReactNode } from "react";

export * from "./asmaul-husna.interface";
export * from "./doa-harian.interface";
export * from "./jadwal-sholat.interface";
export * from "./surat.interface";

export interface ChildrenProps {
  children: ReactNode;
}

export interface DateSliceProps {
  date: Date;
  setDate: (func: Function) => void;
}

export interface WidthSliceProps {
  width: number;
  setWidth: (width: number) => void;
}

export interface IsAscendingSliceProps {
  isAscending: boolean;
  setIsAscending: (isAscending: boolean) => void;
}

export interface ScrollSliceProps {
  scroll: number;
  setScroll: (scroll: number) => void;
}

export interface LocationPositionProps {
  position: {
    lat: number;
    lng: number;
  };
  setPosition: (pos: { lat: number; lng: number }) => void;
}

export interface IsOpenMapProps {
  isOpenMap: boolean;
  setIsOpenMap: (isOpenMap: boolean) => void;
}
