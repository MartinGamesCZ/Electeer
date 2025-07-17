import { SchematicComponent } from "@/logic/electronic/component";
import { PinComponent } from "./pin";
import { GroundRailComponentSkin } from "../../skins/components/special/ground_rail";

export class GroundRailComponent extends SchematicComponent {
  public static readonly width = 7;
  public static readonly height = 6;

  constructor(x: number, y: number) {
    super(
      "special.rail.ground",
      x,
      y,
      GroundRailComponent.width,
      GroundRailComponent.height,
      GroundRailComponentSkin
    );

    const pinOut0 = new PinComponent(x + 5, y + 2); // Output pin

    pinOut0.setValue(false); // Set the ground rail to low

    this.addComponent(pinOut0);
  }
}
