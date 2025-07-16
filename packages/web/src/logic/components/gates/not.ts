import { TbLogicNot } from "react-icons/tb";
import { Component } from "../component";
import {
  ComponentSchematic,
  ComponentSchematicInputPin,
  ComponentSchematicOutputPin,
  PinState,
} from "../schematic";
import { b, ps } from "@/utils/binary";

export class NotGate extends Component {
  schematicInputPins = [new ComponentSchematicInputPin("i0", "I0")];
  schematicOutputPins = [new ComponentSchematicOutputPin("o0", "O0")];

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

  getSchematic() {
    return new ComponentSchematic(
      this,
      TbLogicNot,
      this.schematicInputPins,
      this.schematicOutputPins,
      this.requestUpdate.bind(this)
    );
  }

  logic() {
    const input0 = b(this.getPinState("i0"));

    let output0: PinState = ps(Number(!input0) as 0 | 1);

    this.setPinState("o0", output0);
  }
}
