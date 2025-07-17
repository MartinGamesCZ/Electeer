import { SchematicComponent } from "../electronic/component";

export function isAllowedToPlaceComponent(
  x: number,
  y: number,
  component: typeof SchematicComponent,
  components: SchematicComponent[]
) {
  const containerOverflow = overflowsOutsideContainer(x, y);
  const collision = checkCollision(x, y, component, components);

  return !containerOverflow && !collision;
}

export function overflowsOutsideContainer(x: number, y: number) {
  return x < 0 || y < 0;
}

export function checkCollision(
  x: number,
  y: number,
  component: typeof SchematicComponent,
  components: SchematicComponent[]
) {
  const { width, height } = component;

  for (const other of components) {
    const otherX = other.getPosition().getX();
    const otherY = other.getPosition().getY();

    if (
      x < otherX + other.width &&
      x + width > otherX &&
      y < otherY + other.height &&
      y + height > otherY
    ) {
      return true; // Collision detected
    }
  }

  return false; // No collision
}
