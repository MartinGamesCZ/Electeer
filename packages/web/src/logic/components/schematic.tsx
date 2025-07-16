import { IconType } from "react-icons";
import { Component } from "./component";

export enum PinState {
  Low = 0,
  High = 1,
}

export class ComponentSchematicPin {
  id: string;
  label: string;
  type: "input" | "output";
  state: PinState = PinState.Low;
  manuallyControlled: boolean = false;
  updateListener: () => void = () => {};
  component: Component | null = null;

  constructor(
    id: string,
    label: string,
    input: "input" | "output",
    manuallyControlled: boolean = false
  ) {
    this.id = id;
    this.label = label;
    this.type = input;
    this.manuallyControlled = manuallyControlled;
  }

  attachUpdateListener(l: () => void) {
    this.updateListener = l;
  }

  attachComponent(component: Component) {
    this.component = component;
  }

  toggleState() {
    this.state = this.state === PinState.Low ? PinState.High : PinState.Low;
  }

  setState(state: PinState) {
    if (this.type !== "input") return;

    this.state = state;
    this.updateListener();
  }

  get position(): [number, number] {
    if (!this.component) return [-1, -1];

    const remToPx = (rem: number) => rem * 16;

    const pinGap = 25;
    const pinPosition = Math.max(
      this.component?.schematicInputPins.indexOf(this),
      this.component?.schematicOutputPins.indexOf(this)
    );
    const isInput = this.component?.schematicInputPins.includes(this);

    const x =
      this.component?.position.x +
      (isInput ? remToPx(-1.25 / 2) : remToPx(7 + 1.25 / 2));
    const y = this.component?.position.y + pinGap + pinGap * pinPosition;

    return [x, y];
  }
}

export class ComponentSchematicInputPin extends ComponentSchematicPin {
  constructor(id: string, label: string) {
    super(id, label, "input");
  }
}

export class ComponentSchematicOutputPin extends ComponentSchematicPin {
  constructor(id: string, label: string, manuallyControlled: boolean = false) {
    super(id, label, "output", manuallyControlled);
  }
}

export class ComponentSchematic {
  icon: IconType;
  inputs: ComponentSchematicInputPin[] = [];
  outputs: ComponentSchematicOutputPin[] = [];
  requestUpdate: () => void;
  component: Component;

  constructor(
    component: Component,
    icon: IconType = () => null,
    inputs: ComponentSchematicInputPin[] = [],
    outputs: ComponentSchematicOutputPin[] = [],
    requestUpdate: () => void = () => {}
  ) {
    this.icon = icon;
    this.inputs = inputs;
    this.outputs = outputs;
    this.requestUpdate = requestUpdate;
    this.component = component;

    [...inputs, ...outputs].forEach((pin) => {
      pin.attachUpdateListener(requestUpdate);
      pin.attachComponent(component);
    });
  }

  render(addConnection: (pin: ComponentSchematicPin) => boolean) {
    const pinGap = 25;
    const height =
      pinGap * Math.max(this.inputs.length, this.outputs.length) + pinGap;

    return (
      <div
        className="border-2 border-gray-700 flex items-center justify-center p-2 w-28 bg-white relative"
        style={{
          minHeight: `${height}px`,
        }}
      >
        <this.icon size={48} strokeWidth={1} />
        <div
          className="absolute top-0 left-[-1.25rem] h-full"
          style={{
            gap: "20px",
          }}
        >
          {this.inputs.map((input, index) => {
            const top = pinGap + index * pinGap;

            return (
              <ComponentSchematicPinElement
                pin={input}
                key={input.id}
                requestUpdate={this.requestUpdate}
                top={top}
                labelOnLeft={false}
                addConnection={addConnection}
              />
            );
          })}
        </div>
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            gap: "20px",
          }}
        >
          {this.outputs.map((pin, index) => {
            const top = pinGap + index * pinGap;

            return (
              <ComponentSchematicPinElement
                pin={pin}
                key={pin.id}
                requestUpdate={this.requestUpdate}
                top={top}
                addConnection={addConnection}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function ComponentSchematicPinElement({
  pin,
  requestUpdate,
  top,
  labelOnLeft = true,
  addConnection,
}: {
  pin: ComponentSchematicPin;
  requestUpdate: () => void;
  top: number;
  labelOnLeft?: boolean;
  addConnection: (pin: ComponentSchematicPin) => boolean;
}) {
  return (
    <div
      key={pin.id}
      className="border-2 border-gray-600 w-5 h-5 bg-white"
      style={{
        position: "absolute",
        top: `${top}px`,
        transform: "translateY(-50%)",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const addConnectionResult = addConnection(pin);

        if (addConnectionResult) return;

        pin.toggleState();
        requestUpdate();
      }}
    >
      <p className="text-xs text-center w-full h-full font-mono pt-0.5">
        {pin.state}
      </p>
      <p
        className={
          "text-xs font-mono pt-0.5 absolute top-0 " +
          (labelOnLeft ? "left-[-1.25rem]" : "right-[-1.25rem]")
        }
      >
        {pin.label}
      </p>
    </div>
  );
}
