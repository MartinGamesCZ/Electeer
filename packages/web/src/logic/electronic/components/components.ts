import { AndGateComponentSkin } from "../skins/components/builtin/logic_gates/and";
import { NotGateComponentSkin } from "../skins/components/builtin/logic_gates/not";
import { GroundRailComponentSkin } from "../skins/components/special/ground_rail";
import { VoltageRailComponentSkin } from "../skins/components/special/voltage_rail";
import { AndGateComponent } from "./builtin/logic_gates/and";
import { NotGateComponent } from "./builtin/logic_gates/not";
import { OrGateComponent } from "./builtin/logic_gates/or";
import { XorGateComponent } from "./builtin/logic_gates/xor";
import { SwitchComponent } from "./builtin/switches/switch";
import { GroundRailComponent } from "./special/ground_rail";
import { VoltageRailComponent } from "./special/voltage_rail";

export const ElectronicComponents = {
  "builtin.logic_gates.not": NotGateComponent,
  "builtin.logic_gates.and": AndGateComponent,
  "builtin.logic_gates.xor": XorGateComponent,
  "builtin.logic_gates.or": OrGateComponent,
  "special.rail.voltage": VoltageRailComponent,
  "special.rail.ground": GroundRailComponent,
  "builtin.switches.switch": SwitchComponent,
};
