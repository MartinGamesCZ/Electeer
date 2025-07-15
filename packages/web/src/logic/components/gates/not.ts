import { TbLogicNot } from "react-icons/tb";
import { Component } from "../component";
import {
  ComponentSchematic,
  ComponentSchematicInputPin,
  ComponentSchematicOutputPin,
} from "../schematic";

export class NotGate extends Component {
  protected schematicInputPins = [new ComponentSchematicInputPin("i0", "I0")];
  protected schematicOutputPins = [new ComponentSchematicOutputPin("o0", "O0")];

  constructor({
    position,
    onRerenderRequest,
  }: {
    position?: { x: number; y: number };
    onRerenderRequest?: () => void;
  } = {}) {
    super({
      position,
      onRerenderRequest,
    });

    this.requestUpdate(); // Ensure the logic is run initially
  }

  get schematic() {
    return new ComponentSchematic(
      TbLogicNot,
      this.schematicInputPins,
      this.schematicOutputPins,
      this.requestUpdate.bind(this)
    );
  }

  logic() {
    const input0 = this.getPinState("i0");

    let output0: "low" | "high" = "high";

    if (input0 === "high") {
      output0 = "low";
    }

    this.setPinState("o0", output0);
  }
}
