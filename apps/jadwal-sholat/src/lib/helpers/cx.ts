import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A function that combine clsx with tailwind merge
 *
 * @param {ClassValue[]} classes className
 * @returns {string} class
 */
export const cx = (...classes: ClassValue[]): string =>
  twMerge(clsx(...classes));
