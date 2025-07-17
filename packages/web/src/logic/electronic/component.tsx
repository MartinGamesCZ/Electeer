import { ReactNode } from "react";
import { SchematicComponentPosition } from "./position";
import { ComponentSkin } from "./skins/skin";
import { Schematic } from "./schematic";

export class SchematicComponent {
  private id: string;
  private uid: string;
  private position: SchematicComponentPosition;
  public static readonly width: number;
  public static readonly height: number;
  public readonly width: number = SchematicComponent.width;
  public readonly height: number = SchematicComponent.height;
  private skin: ComponentSkin;

  protected components: SchematicComponent[] = [];
  protected schematic: Schematic | null = null;

  constructor(
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    skin: typeof ComponentSkin
  ) {
    this.id = id;
    this.uid = this.generateUid();
    this.position = new SchematicComponentPosition(x, y);
    this.skin = new skin(x, y, w, h, this);

    this.width = w;
    this.height = h;
  }

  protected addComponent(component: SchematicComponent): void {
    this.components.push(component);
  }

  render(isPreview: boolean = false): ReactNode {
    return [this.skin, ...this.components].map((component) =>
      component.render(isPreview, this)
    );
  }

  private generateUid(): string {
    return `${this.id}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getPosition(): SchematicComponentPosition {
    return this.position;
  }

  bindSchematic(schematic: Schematic): void {
    this.schematic = schematic;
  }
}
