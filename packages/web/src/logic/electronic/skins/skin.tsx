import { GRID_SIZE } from "@/config";
import { ReactNode } from "react";
import { SchematicComponent } from "../component";

export class ComponentSkin {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected component: SchematicComponent;

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    component: SchematicComponent
  ) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.component = component;
  }

  render(isPreview: boolean = false, component: SchematicComponent): ReactNode {
    return (
      <div
        key={Math.random().toString(36).substr(2, 9)}
        style={{
          position: "absolute",
          left: `${this.x * GRID_SIZE}px`,
          top: `${this.y * GRID_SIZE}px`,
          width: `${this.width * GRID_SIZE}px`,
          height: `${this.height * GRID_SIZE}px`,
          backgroundColor: "lightgray",
          border: "1px solid black",
        }}
      ></div>
    );
  }
}
