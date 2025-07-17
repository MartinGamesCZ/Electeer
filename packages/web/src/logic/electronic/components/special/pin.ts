import { SchematicComponent } from "../../component";
import { PinComponentSkin } from "../../skins/components/special/pin";
import { ComponentSkin } from "../../skins/skin";

export class PinComponent extends SchematicComponent {
  protected value: boolean;
  protected isFloating: boolean = true;

  public static readonly width = 2;
  public static readonly height = 2;

  protected listeners: { [key: string]: Function[] } = {};

  constructor(x: number, y: number, isFloating: boolean = true) {
    super(
      "special.pin",
      x,
      y,
      PinComponent.width,
      PinComponent.height,
      PinComponentSkin
    );
    this.value = false;
    this.isFloating = isFloating;
  }

  getValue(): boolean {
    return this.value;
  }

  setValue(value: boolean): void {
    if (this.value === value) return;

    this.value = value;

    this.schematic?.requestRerender();

    this.listeners["change"]?.forEach((callback) => {
      callback(this.value);
    });
  }

  isFloatingPin(): boolean {
    return this.isFloating;
  }

  setFloating(floating: boolean): void {
    this.isFloating = floating;
  }

  attachConnection(): void {
    if (!this.schematic) return;

    const currentConnection = this.schematic.getCurrentConnection();

    if (!currentConnection) return;

    currentConnection.attachPin(this);
  }

  onChange(callback: Function): void {
    if (!this.listeners["change"]) {
      this.listeners["change"] = [];
    }
    this.listeners["change"].push(callback);
  }
}
