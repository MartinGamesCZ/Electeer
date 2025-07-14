"use client";

import { ElectronicComponents } from "@/logic/components";
import { Component } from "@/logic/components/component";
import { useState } from "react";

export function Board() {
  const [components, setComponents] = useState<Component[]>([]);

  return (
    <div
      className={`_pattern_graphpaper w-full h-full`}
      onClick={(e) => {
        setComponents((p) => [
          ...p,
          new ElectronicComponents.gates.and({
            position: {
              x: e.clientX,
              y: e.clientY,
            },
          }),
        ]);
      }}
    >
      {components.map((component) => (
        <div
          key={component.id}
          className="absolute"
          style={{
            left: component.position.x,
            top: component.position.y,
          }}
        >
          {component.schematic.render()}
        </div>
      ))}
    </div>
  );
}
