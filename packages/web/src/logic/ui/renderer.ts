import { GRID_SIZE } from "@/config";
import { Connection } from "../electronic/connection";
import { SchematicBoardGrid } from "./grid";
import {
  getComponentCenterCoordinates,
  translatePixelsToCoordinates,
} from "../grid/coordinates";
import { PinComponent } from "../electronic/components/special/pin";
import { Schematic } from "../electronic/schematic";

export class SchematicBoardRenderer {
  private gridRenderer: SchematicBoardGrid;
  private schematic: Schematic;

  constructor(width: number, height: number, schematic: Schematic) {
    this.gridRenderer = new SchematicBoardGrid(width, height);
    this.schematic = schematic;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.gridRenderer.render(ctx);
    new SchematicConnectionRenderer(this.schematic.getConnections()).render(
      ctx
    );
  }
}

export class SchematicConnectionRenderer {
  private connections: Connection[];

  constructor(connections: Connection[]) {
    this.connections = connections;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!ctx) return;

    for (const connection of this.connections) {
      if (connection.isEmpty()) continue;

      const points = connection.getPoints();

      if (points.length === 0) continue;

      ctx.beginPath();
      ctx.strokeStyle = "#89a832";
      ctx.lineWidth = 2;
      ctx.moveTo((points[0].x + 1) * GRID_SIZE, (points[0].y + 1) * GRID_SIZE);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(
          (points[i].x + 1) * GRID_SIZE,
          (points[i].y + 1) * GRID_SIZE
        );
      }

      ctx.stroke();
    }
  }
}
