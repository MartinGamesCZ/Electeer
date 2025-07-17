import { SchematicComponent } from "@/logic/electronic/component";
import { NotGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/not";
import { PinComponent } from "../../special/pin";

export class NotGateComponent extends SchematicComponent {
  public static readonly width = 12;
  public static readonly height = 6;

  constructor(x: number, y: number) {
    super("builtin.logic_gates.not", x, y, 12, 6, NotGateComponentSkin);

    this.addComponent(new PinComponent(x, y + 2)); // Input pin
    this.addComponent(new PinComponent(x + 10, y + 2)); // Output pin
  }
}
