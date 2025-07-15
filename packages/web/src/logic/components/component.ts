import {
  ComponentSchematic,
  ComponentSchematicInputPin,
  ComponentSchematicOutputPin,
} from "./schematic";

export class Component {
  id: string;
  position: {
    x: number;
    y: number;
  };
  onRerenderRequest?: () => void;
  protected schematicInputPins: ComponentSchematicInputPin[] = [];
  protected schematicOutputPins: ComponentSchematicOutputPin[] = [];

  constructor(config: {
    position?: { x: number; y: number };
    onRerenderRequest?: () => void;
  }) {
    this.id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    this.position = config.position || { x: 0, y: 0 };
    this.onRerenderRequest = config.onRerenderRequest;
  }

  get schematic(): ComponentSchematic {
    return new ComponentSchematic();
  }

  requestRerender() {
    this.onRerenderRequest?.();
  }

  requestUpdate() {
    this.logic();
    this.requestRerender();
  }

  logic() {}

  getPinState(pinId: string): "high" | "low" | undefined {
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

  setPinState(pinId: string, state: "high" | "low") {
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
