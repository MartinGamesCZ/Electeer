import { SchematicComponent } from "@/logic/electronic/component";
import { NotGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/not";
import { PinComponent } from "../../special/pin";
import { AndGateComponentSkin } from "@/logic/electronic/skins/components/builtin/logic_gates/and";
import { SwitchComponentSkin } from "@/logic/electronic/skins/components/builtin/switches/switch";

export class SwitchComponent extends SchematicComponent {
  public static readonly width = 10;
  public static readonly height = 4;

  protected switchState: boolean = false;

  constructor(x: number, y: number) {
    super(
      "builtin.switches.switch",
      x,
      y,
      SwitchComponent.width,
      SwitchComponent.height,
      SwitchComponentSkin
    );

    this.addComponent(new PinComponent(x, y + 1)); // Input pin
    this.addComponent(new PinComponent(x + 8, y + 1)); // Output pin
  }

  get state(): boolean {
    return this.switchState;
  }

  set state(value: boolean) {
    this.switchState = value;

    if (this.schematic) this.schematic.requestRerender();
  }
}
