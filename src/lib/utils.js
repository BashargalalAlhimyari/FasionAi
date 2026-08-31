/**
 * cn — utility to merge Tailwind classes (clsx + tailwind-merge).
 * Used by every component for conditional class composition.
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
