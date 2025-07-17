import { SchematicBoardGrid } from "./grid";

export class SchematicBoardRenderer {
  private gridRenderer: SchematicBoardGrid;

  constructor(width: number, height: number) {
    this.gridRenderer = new SchematicBoardGrid(width, height);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.gridRenderer.render(ctx);
  }
}
