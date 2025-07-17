import { SchematicComponent } from "@/logic/electronic/component";
import { PinComponent } from "./pin";
import { VoltageRailComponentSkin } from "../../skins/components/special/voltage_rail";

export class VoltageRailComponent extends SchematicComponent {
  public static readonly width = 7;
  public static readonly height = 6;

  constructor(x: number, y: number) {
    super("special.rail.voltage", x, y, 7, 6, VoltageRailComponentSkin);

    const pinOut0 = new PinComponent(x + 5, y + 2); // Output pin

    pinOut0.setValue(true); // Set the voltage rail to high

    this.addComponent(pinOut0);
  }
}
