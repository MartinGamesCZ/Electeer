import { GRID_SIZE } from "@/config";

export function translatePixelsToCoordinates(n: number): number {
  return Math.round(n / GRID_SIZE);
}

export function getComponentCenterCoordinates(
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } {
  return {
    x: x - Math.floor(width / 2),
    y: y - Math.floor(height / 2),
  };
}

export function removeOverflow({ x, y }: { x: number; y: number }) {
  return {
    x: Math.max(x, 0),
    y: Math.max(y, 0),
  };
}
