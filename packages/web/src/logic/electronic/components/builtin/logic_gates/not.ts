import { SchematicComponent } from "@/logic/electronic/component";
import { NotGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/not";
import { PinComponent } from "../../special/pin";

export class NotGateComponent extends SchematicComponent {
  public static readonly width = 12;
  public static readonly height = 6;

  protected pin_in0: PinComponent;
  protected pin_out0: PinComponent;

  constructor(x: number, y: number) {
    super(
      "builtin.logic_gates.not",
      x,
      y,
      NotGateComponent.width,
      NotGateComponent.height,
      NotGateComponentSkin
    );

    this.pin_in0 = new PinComponent(x, y + 2); // Input pin
    this.pin_out0 = new PinComponent(x + 10, y + 2, false); // Output pin

    this.pin_in0.onChange(this.logic.bind(this));

    this.addComponent(this.pin_in0);
    this.addComponent(this.pin_out0);

    this.logic();
  }

  logic(): void {
    this.pin_out0.setValue(!this.pin_in0.getValue());
  }
}
