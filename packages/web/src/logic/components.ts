import { AndGate } from "./components/gates/and";
import { NandGate } from "./components/gates/nand";
import { NorGate } from "./components/gates/nor";
import { NotGate } from "./components/gates/not";
import { OrGate } from "./components/gates/or";
import { XnorGate } from "./components/gates/xnor";
import { XorGate } from "./components/gates/xor";

export const ElectronicComponents = {
  gates: {
    not: NotGate,
    and: AndGate,
    nand: NandGate,
    or: OrGate,
    nor: NorGate,
    xor: XorGate,
    xnor: XnorGate,
  },
};
