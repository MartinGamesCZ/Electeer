import { TbLogicAnd } from "react-icons/tb";
import { Component } from "../component";
import {
  ComponentSchematic,
  ComponentSchematicInputPin,
  ComponentSchematicOutputPin,
} from "../schematic";

export class AndGate extends Component {
  protected schematicInputPins = [
    new ComponentSchematicInputPin("i0", "I0"),
    new ComponentSchematicInputPin("i1", "I1"),
  ];
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
  }

  get schematic() {
    return new ComponentSchematic(
      TbLogicAnd,
      this.schematicInputPins,
      this.schematicOutputPins,
      this.requestUpdate.bind(this)
    );
  }

  requestUpdate() {
    this.logic();
    this.requestRerender();
  }

  logic() {
    const input0 = this.getPinState("i0");
    const input1 = this.getPinState("i1");

    let output0: "low" | "high" = "low";

    if (input0 === "high" && input1 === "high") {
      output0 = "high";
    }

    this.setPinState("o0", output0);
  }
}
