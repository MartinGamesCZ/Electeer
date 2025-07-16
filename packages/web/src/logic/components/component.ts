import { generateId } from "@/utils/id";
import {
  ComponentSchematic,
  ComponentSchematicInputPin,
  ComponentSchematicOutputPin,
  PinState,
} from "./schematic";

export class Component {
  id: string;
  position: {
    x: number;
    y: number;
  };
  onRerenderRequest?: () => void;
  schematicInputPins: ComponentSchematicInputPin[] = [];
  schematicOutputPins: ComponentSchematicOutputPin[] = [];

  constructor(config: {
    position?: { x: number; y: number };
    onRerenderRequest?: () => void;
  }) {
    this.id = generateId();

    this.position = config.position || { x: 0, y: 0 };
    this.onRerenderRequest = config.onRerenderRequest;
  }

  getSchematic(): ComponentSchematic {
    return new ComponentSchematic(this);
  }

  requestRerender() {
    this.onRerenderRequest?.();
  }

  requestUpdate() {
    this.logic();
    this.requestRerender();
  }

  logic() {}

  getPinState(pinId: string): PinState | undefined {
    if (pinId.startsWith("i")) {
      const inputPin = this.schematicInputPins.find((pin) => pin.id === pinId);
      return inputPin ? inputPin.state : undefined;
    }

    if (pinId.startsWith("o")) {
      const outputPin = this.schematicOutputPins.find(
        (pin) => pin.id === pinId
      );
      return outputPin ? outputPin.state : undefined;
    }

    return undefined; // Pin not found
  }

  setPinState(pinId: string, state: PinState) {
    if (pinId.startsWith("i")) {
      const inputPin = this.schematicInputPins.find((pin) => pin.id === pinId);

      if (inputPin) inputPin.state = state;
    }

    if (pinId.startsWith("o")) {
      const outputPin = this.schematicOutputPins.find(
        (pin) => pin.id === pinId
      );

      if (outputPin) outputPin.state = state;
    }
  }
}
