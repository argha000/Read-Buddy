import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function CN(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
