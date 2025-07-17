import { ReactNode } from "react";
import { SchematicComponent } from "./component";
import { isAllowedToPlaceComponent } from "../grid/collision";
import { Connection } from "./connection";
import { SchematicConnectionRenderer } from "../ui/renderer";

export class Schematic {
  private components: SchematicComponent[];
  private connections: Connection[];

  private currentConnection: Connection | null = null;

  private requestUpdate: () => void;
  private canvasRef: React.RefObject<HTMLCanvasElement | null>;

  constructor(
    requestUpdate: () => void,
    canvasRef: React.RefObject<HTMLCanvasElement | null>
  ) {
    this.components = [];
    this.connections = [];

    this.requestUpdate = requestUpdate;
    this.canvasRef = canvasRef;
  }

  placeComponent(component: SchematicComponent): void {
    if (
      !isAllowedToPlaceComponent(
        component.getPosition().getX(),
        component.getPosition().getY(),
        component.constructor as typeof SchematicComponent,
        this.components
      )
    )
      return;

    component.bindSchematic(this);
    this.components.push(component);
    this.requestUpdate();
  }

  requestRerender(): void {
    this.requestUpdate();
  }

  render(): ReactNode {
    return this.components.map((component) => component.render());
  }

  getComponents(): SchematicComponent[] {
    return this.components;
  }

  createConnection() {
    if (this.currentConnection) return;

    const connection = new Connection(this);

    this.connections.push(connection);
    this.currentConnection = connection;
  }

  endConnection() {
    this.currentConnection = null;
    this.connections = this.connections.filter(
      (connection) => !connection.isEmpty()
    );
  }

  getCurrentConnection(): Connection | null {
    return this.currentConnection;
  }

  getConnections(): Connection[] {
    return this.connections;
  }
}
