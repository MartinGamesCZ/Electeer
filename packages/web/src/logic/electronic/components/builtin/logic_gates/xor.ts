import { SchematicComponent } from "@/logic/electronic/component";
import { NotGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/not";
import { PinComponent } from "../../special/pin";
import { AndGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/and";
import { XorGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/xor";

export class XorGateComponent extends SchematicComponent {
  public static readonly width = 12;
  public static readonly height = 8;

  protected pin_in0: PinComponent;
  protected pin_in1: PinComponent;
  protected pin_out0: PinComponent;

  constructor(x: number, y: number) {
    super(
      "builtin.logic_gates.xor",
      x,
      y,
      XorGateComponent.width,
      XorGateComponent.height,
      XorGateComponentSkin
    );

    this.pin_in0 = new PinComponent(x, y + 1); // Input 1 pin
    this.pin_in1 = new PinComponent(x, y + 5); // Input 2 pin
    this.pin_out0 = new PinComponent(x + 10, y + 3, false); // Output pin

    this.addComponent(this.pin_in0);
    this.addComponent(this.pin_in1);
    this.addComponent(this.pin_out0);

    this.pin_in0.onChange(this.logic.bind(this));
    this.pin_in1.onChange(this.logic.bind(this));
  }

  logic() {
    this.pin_out0.setValue(this.pin_in0.getValue() !== this.pin_in1.getValue());
  }
}
