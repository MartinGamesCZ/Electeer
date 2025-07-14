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
}

export class ComponentSchematicOutputPin {
  id: string;
  label: string;
  type: "output" = "output";
  state: "high" | "low" = "low";

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }
}

export class ComponentSchematic {
  icon: IconType;
  inputs: ComponentSchematicInputPin[] = [];
  outputs: ComponentSchematicOutputPin[] = [];

  constructor(
    icon: IconType = () => null,
    inputs: ComponentSchematicInputPin[] = [],
    outputs: ComponentSchematicOutputPin[] = []
  ) {
    this.icon = icon;
    this.inputs = inputs;
    this.outputs = outputs;
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
          {this.outputs.map((input, index) => {
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
              >
                <p className="text-xs text-center w-full h-full font-mono pt-0.5">
                  {input.state == "low" ? 0 : 1}
                </p>
                <p className="text-xs font-mono pt-0.5 absolute left-[-1.25rem] top-0">
                  {input.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
