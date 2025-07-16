import { ComponentSchematicPin, PinState } from "./components/schematic";

export class Connection {
  public pin1: ComponentSchematicPin;
  public pin2: ComponentSchematicPin;

  constructor(p1: ComponentSchematicPin, p2: ComponentSchematicPin) {
    this.pin1 = p1;
    this.pin2 = p2;

    this.renderLoop();
  }

  renderLoop() {
    this.logic();

    window.requestAnimationFrame(this.renderLoop.bind(this));
  }

  logic() {
    const allPins = [this.pin1, this.pin2];

    // Get all output pins
    const outputPins = allPins.filter((pin) => pin.type === "output");

    // Get all input pins
    const inputPins = allPins.filter((pin) => pin.type === "input");

    // If there is at least one output pin with a high state,
    // set all input pins to high state

    if (outputPins.some((pin) => pin.state === PinState.High)) {
      inputPins.forEach((pin) => {
        pin.setState(PinState.High);
      });
    } else {
      // If no output pin is high, set all input pins to low state
      inputPins.forEach((pin) => {
        pin.setState(PinState.Low);
      });
    }
  }
}

export function drawConnections(
  connections: Connection[],
  canvasRef: HTMLCanvasElement
) {
  if (!canvasRef) return;

  const ctx = canvasRef.getContext("2d");

  if (!ctx) return;

  connections.forEach((conn) => {
    const [p1x, p1y] = conn.pin1.position;
    const [p2x, p2y] = conn.pin2.position;

    ctx.beginPath();
    ctx.moveTo(p1x, p1y);

    ctx.lineWidth = 1;

    // Create squared (L-shaped) connection lines
    // Calculate the midpoint for the bend
    const midX = p1x + (p2x - p1x) / 2;

    // Draw horizontal line from p1 to midpoint
    ctx.lineTo(midX, p1y);

    // Draw vertical line from midpoint to p2 y-coordinate
    ctx.lineTo(midX, p2y);

    // Draw horizontal line to p2
    ctx.lineTo(p2x, p2y);

    ctx.stroke();
  });
}
