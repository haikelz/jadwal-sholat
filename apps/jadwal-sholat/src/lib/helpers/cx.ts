import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cx = (...classes: ClassValue[]) => twMerge(clsx(...classes));
