import { SchematicComponent } from "@/logic/electronic/component";
import { NotGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/not";
import { PinComponent } from "../../special/pin";
import { AndGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/and";

export class AndGateComponent extends SchematicComponent {
  public static readonly width = 12;
  public static readonly height = 8;

  constructor(x: number, y: number) {
    super("builtin.logic_gates.and", x, y, 12, 8, AndGateComponentSkin);

    this.addComponent(new PinComponent(x, y + 1)); // Input 1 pin
    this.addComponent(new PinComponent(x, y + 5)); // Input 2 pin
    this.addComponent(new PinComponent(x + 10, y + 3)); // Output pin
  }
}
