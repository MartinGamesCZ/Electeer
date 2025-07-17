export class SchematicComponentPosition {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  get(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}
