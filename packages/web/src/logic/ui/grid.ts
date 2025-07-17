import { GRID_SIZE } from "@/config";

export class SchematicBoardGrid {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  render(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x <= this.width; x += GRID_SIZE) {
      for (let y = 0; y <= this.height; y += GRID_SIZE) {
        // Draw 2px dots at grid intersections
        ctx.fillStyle = "#eee";
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }
    }
  }
}
