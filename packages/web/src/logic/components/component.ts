import { ComponentSchematic } from "./schematic";

export class Component {
  id: string;
  position: {
    x: number;
    y: number;
  };

  constructor(config: { position?: { x: number; y: number } }) {
    this.id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.position = config.position || { x: 0, y: 0 };
  }

  get schematic(): ComponentSchematic {
    return new ComponentSchematic();
  }
}
