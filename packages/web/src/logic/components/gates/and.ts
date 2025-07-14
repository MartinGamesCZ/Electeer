import { TbLogicAnd } from "react-icons/tb";
import { Component } from "../component";
import {
  ComponentSchematic,
  ComponentSchematicInputPin,
  ComponentSchematicOutputPin,
} from "../schematic";

export class AndGate extends Component {
  constructor({ position }: { position?: { x: number; y: number } } = {}) {
    super({
      position,
    });
  }

  get schematic() {
    return new ComponentSchematic(
      TbLogicAnd,
      [
        new ComponentSchematicInputPin("input", "I0"),
        new ComponentSchematicInputPin("input", "I1"),
      ],
      [new ComponentSchematicOutputPin("output", "O0")]
    );
  }
}
