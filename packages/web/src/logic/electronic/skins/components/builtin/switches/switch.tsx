import { SchematicComponent } from "@/logic/electronic/component";
import { ComponentSkin } from "../../../skin";
import { NotGateComponent } from "@/logic/electronic/components/builtin/logic_gates/not";
import { GRID_SIZE } from "@/config";
import {
  TbCircuitSwitchClosed,
  TbCircuitSwitchOpen,
  TbLogicAnd,
  TbLogicNot,
  TbSwitch,
} from "react-icons/tb";
import { AndGateComponent } from "@/logic/electronic/components/builtin/logic_gates/and";
import { SwitchComponent } from "@/logic/electronic/components/builtin/switches/switch";

export class SwitchComponentSkin extends ComponentSkin {
  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    component: SwitchComponent
  ) {
    super(x, y, w, h, component);
  }

  render(isPreview: boolean = false, component: SwitchComponent) {
    return (
      <div
        key={`switch-skin-${Math.random()}`}
        style={{
          left: `${(this.x + 1) * GRID_SIZE}px`,
          top: `${this.y * GRID_SIZE}px`,
          position: "absolute",
          width: GRID_SIZE * (this.width - 2) + "px",
          height: GRID_SIZE * this.height + "px",
          border: "2px solid #89a832",
          background: "#d8f28f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
          opacity: isPreview ? 0.5 : 1,
        }}
        onClick={() => {
          component.state = !component.state;
        }}
      >
        {component.state ? (
          <TbCircuitSwitchClosed size={40} color="#6a8a12" />
        ) : (
          <TbCircuitSwitchOpen size={40} color="#6a8a12" />
        )}
      </div>
    );
  }
}
