import { TbLogicNot } from "react-icons/tb";
import { Component } from "../component";
import {
  ComponentSchematic,
  ComponentSchematicInputPin,
  ComponentSchematicOutputPin,
} from "../schematic";

export class NotGate extends Component {
  constructor({ position }: { position?: { x: number; y: number } } = {}) {
    super({
      position,
    });
  }

  get schematic() {
    return new ComponentSchematic(
      TbLogicNot,
      [new ComponentSchematicInputPin("input", "I0")],
      [new ComponentSchematicOutputPin("output", "O0")]
    );
  }
}
