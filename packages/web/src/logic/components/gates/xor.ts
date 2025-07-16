import { TbLogicAnd, TbLogicOr, TbLogicXor } from "react-icons/tb";
import { Component } from "../component";
import {
  ComponentSchematic,
  ComponentSchematicInputPin,
  ComponentSchematicOutputPin,
  PinState,
} from "../schematic";
import { b, ps } from "@/utils/binary";

export class XorGate extends Component {
  schematicInputPins = [
    new ComponentSchematicInputPin("i0", "I0"),
    new ComponentSchematicInputPin("i1", "I1"),
  ];
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
      TbLogicXor,
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
    const input0 = b(this.getPinState("i0"));
    const input1 = b(this.getPinState("i1"));

    let output0: PinState = ps(Number(input0 != input1) as 0 | 1);

    this.setPinState("o0", output0);
  }
}
