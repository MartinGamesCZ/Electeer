import { ReactNode } from "react";
import { SchematicComponent } from "./component";
import { PinComponent } from "./components/special/pin";
import { NotGateComponent } from "./components/builtin/logic_gates/not";
import { AndGateComponent } from "./components/builtin/logic_gates/and";
import { VoltageRailComponent } from "./components/special/voltage_rail";
import { GroundRailComponent } from "./components/special/ground_rail";

export class Schematic {
  private components: SchematicComponent[];

  constructor() {
    this.components = [new GroundRailComponent(10, 10)];
  }

  render(): ReactNode {
    return this.components.map((component) => component.render());
  }
}
