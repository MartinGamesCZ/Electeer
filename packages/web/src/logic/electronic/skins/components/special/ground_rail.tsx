import { ComponentSkin } from "../../skin";
import { GRID_SIZE } from "@/config";
import { TbBolt, TbCircuitGround } from "react-icons/tb";
import { AndGateComponent } from "@/logic/electronic/components/builtin/logic_gates/and";
import { GroundRailComponent } from "@/logic/electronic/components/special/ground_rail";

export class GroundRailComponentSkin extends ComponentSkin {
  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    component: GroundRailComponent
  ) {
    super(x, y, w, h, component);
  }

  render(isPreview: boolean = false) {
    return (
      <div
        key={`ground-rail-skin-${Math.random()}`}
        style={{
          left: `${this.x * GRID_SIZE}px`,
          top: `${this.y * GRID_SIZE}px`,
          position: "absolute",
          width: GRID_SIZE * (this.width - 1) + "px",
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
        <TbCircuitGround size={32} color="#6a8a12" />
      </div>
    );
  }
}
