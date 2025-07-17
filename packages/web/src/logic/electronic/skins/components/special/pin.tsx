import { GRID_SIZE } from "@/config";
import { ComponentSkin } from "../../skin";
import { PinComponent } from "@/logic/electronic/components/special/pin";
import { SchematicComponent } from "@/logic/electronic/component";

export class PinComponentSkin extends ComponentSkin {
  protected component: PinComponent;

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    component: PinComponent
  ) {
    super(x, y, w, h, component);

    this.component = component;
  }

  render(isPreview: boolean = false) {
    return (
      <div
        key={`pin-skin-${Math.random()}`}
        style={{
          left: `${this.x * GRID_SIZE}px`,
          top: `${this.y * GRID_SIZE}px`,
          position: "absolute",
          width: GRID_SIZE * this.width + "px",
          height: GRID_SIZE * this.height + "px",
          border: "2px solid #89a832",
          background: "#d8f28f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
          opacity: isPreview ? 0.5 : 1,
        }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: "800",
            color: "#6a8a12",
          }}
        >
          {this.component.getValue() ? "1" : "0"}
        </p>
      </div>
    );
  }
}
