import { IconType } from "react-icons";

export class ComponentSchematicInputPin {
  id: string;
  label: string;
  type: "input" = "input";
  state: "high" | "low" = "low";

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }

  toggleState() {
    this.state = this.state === "low" ? "high" : "low";
  }
}

export class ComponentSchematicOutputPin {
  id: string;
  label: string;
  type: "output" = "output";
  state: "high" | "low" = "low";
  manuallyControlled: boolean = false;

  constructor(id: string, label: string, manuallyControlled: boolean = false) {
    this.id = id;
    this.label = label;
    this.manuallyControlled = manuallyControlled;
  }

  toggleState() {
    if (!this.manuallyControlled) return;

    this.state = this.state === "low" ? "high" : "low";
  }
}

export class ComponentSchematic {
  icon: IconType;
  inputs: ComponentSchematicInputPin[] = [];
  outputs: ComponentSchematicOutputPin[] = [];
  requestUpdate: () => void;

  constructor(
    icon: IconType = () => null,
    inputs: ComponentSchematicInputPin[] = [],
    outputs: ComponentSchematicOutputPin[] = [],
    requestUpdate: () => void = () => {}
  ) {
    this.icon = icon;
    this.inputs = inputs;
    this.outputs = outputs;
    this.requestUpdate = requestUpdate;
  }

  render() {
    const pinGap = 25;
    const height =
      pinGap * Math.max(this.inputs.length, this.outputs.length) + pinGap;

    return (
      <div
        className="border-2 border-gray-700 flex items-center justify-center p-2 px-6 bg-white relative"
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
              <div
                key={input.id}
                className="border-2 border-gray-600 w-5 h-5 bg-white"
                style={{
                  position: "absolute",
                  top: `${top}px`,
                  transform: "translateY(-50%)",
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  input.toggleState();
                  this.requestUpdate();
                }}
              >
                <p className="text-xs text-center w-full h-full font-mono pt-0.5">
                  {input.state == "low" ? 0 : 1}
                </p>
                <p className="text-xs font-mono pt-0.5 absolute right-[-1.25rem] top-0">
                  {input.label}
                </p>
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            gap: "20px",
          }}
        >
          {this.outputs.map((output, index) => {
            const top = pinGap + index * pinGap;

            return (
              <div
                key={output.id}
                className="border-2 border-gray-600 w-5 h-5 bg-white"
                style={{
                  position: "absolute",
                  top: `${top}px`,
                  transform: "translateY(-50%)",
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  output.toggleState();
                  this.requestUpdate();
                }}
              >
                <p className="text-xs text-center w-full h-full font-mono pt-0.5">
                  {output.state == "low" ? 0 : 1}
                </p>
                <p className="text-xs font-mono pt-0.5 absolute left-[-1.25rem] top-0">
                  {output.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
