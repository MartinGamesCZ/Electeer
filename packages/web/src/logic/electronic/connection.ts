import { PinComponent } from "./components/special/pin";
import { Schematic } from "./schematic";

export class Connection {
  private pins: PinComponent[] = [];
  private schematic: Schematic;

  constructor(schematic: Schematic) {
    this.schematic = schematic;

    this.logicCalcLoop();
  }

  logicCalcLoop(): void {
    if (!this.isEmpty()) this.logic();

    window.requestAnimationFrame(this.logicCalcLoop.bind(this));
  }

  logic(): void {
    this.setPinStates();
  }

  addPin(pin: PinComponent): void {
    this.pins.push(pin);
  }

  isEmpty(): boolean {
    return this.pins.length === 0;
  }

  attachPin(pin: PinComponent): void {
    if (this.pins.includes(pin)) return;

    this.addPin(pin);
    this.schematic.requestRerender();
  }

  getPoints(): { x: number; y: number }[] {
    return this.pins.map((pin) => ({
      x: pin.getPosition().getX(),
      y: pin.getPosition().getY(),
    }));
  }

  setPinStates(): void {
    // Check if there is any pin in the connection that is high and not floating
    const hasHighPin = this.pins.some(
      (pin) => !pin.isFloatingPin() && pin.getValue()
    );

    // Set all floating pins in the connection to the same state
    for (const pin of this.pins) {
      if (!pin.isFloatingPin()) continue;

      pin.setValue(hasHighPin);
    }
  }
}
