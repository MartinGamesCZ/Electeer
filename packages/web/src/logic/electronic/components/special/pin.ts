import { SchematicComponent } from "../../component";
import { PinComponentSkin } from "../../skins/components/special/pin";
import { ComponentSkin } from "../../skins/skin";

export class PinComponent extends SchematicComponent {
  protected value: boolean;

  public static readonly width = 2;
  public static readonly height = 2;

  constructor(x: number, y: number) {
    super(
      "special.pin",
      x,
      y,
      PinComponent.width,
      PinComponent.height,
      PinComponentSkin
    );
    this.value = false;
  }

  getValue(): boolean {
    return this.value;
  }

  setValue(value: boolean): void {
    this.value = value;
  }
}
