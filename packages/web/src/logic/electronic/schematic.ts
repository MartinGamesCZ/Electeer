import { ReactNode } from "react";
import { SchematicComponent } from "./component";
import { isAllowedToPlaceComponent } from "../grid/collision";

export class Schematic {
  private components: SchematicComponent[];
  private requestUpdate: () => void;

  constructor(requestUpdate: () => void) {
    this.components = [];
    this.requestUpdate = requestUpdate;
  }

  placeComponent(component: SchematicComponent): void {
    if (
      !isAllowedToPlaceComponent(
        component.getPosition().getX(),
        component.getPosition().getY(),
        component.constructor as typeof SchematicComponent,
        this.components
      )
    )
      return;

    this.components.push(component);
    this.requestUpdate();
  }

  render(): ReactNode {
    return this.components.map((component) => component.render());
  }

  getComponents(): SchematicComponent[] {
    return this.components;
  }
}
