import { SchematicComponent } from "@/logic/electronic/component";
import { NotGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/not";
import { PinComponent } from "../../special/pin";
import { AndGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/and";
import { SwitchComponentSkin } from "@/logic/electronic/skins/components/builtin/switches/switch";

export class SwitchComponent extends SchematicComponent {
  public static readonly width = 10;
  public static readonly height = 4;

  protected switchState: boolean = false;

  protected pin_i0: PinComponent;
  protected pin_o0: PinComponent;

  constructor(x: number, y: number) {
    super(
      "builtin.switches.switch",
      x,
      y,
      SwitchComponent.width,
      SwitchComponent.height,
      SwitchComponentSkin
    );

    this.pin_i0 = new PinComponent(x, y + 1);
    this.pin_o0 = new PinComponent(x + 8, y + 1, false);

    this.addComponent(this.pin_i0); // Input pin
    this.addComponent(this.pin_o0); // Output pin

    this.pin_i0.onChange(this.logic.bind(this));

    this.logic();
  }

  logic() {
    if (this.switchState) this.pin_o0.setValue(this.pin_i0.getValue());
    else this.pin_o0.setValue(false);
  }

  get state(): boolean {
    return this.switchState;
  }

  set state(value: boolean) {
    this.switchState = value;

    if (this.schematic) this.schematic.requestRerender();

    this.logic();
  }
}
