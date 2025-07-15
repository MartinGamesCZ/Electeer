"use client";

import { ElectronicComponents } from "@/logic/components";
import { Component } from "@/logic/components/component";
import { useEffect, useState } from "react";

export function Board() {
  const [components, setComponents] = useState<Component[]>([]);
  const [_, setRerender] = useState(0);

  return (
    <div
      className={`_pattern_graphpaper w-full h-full`}
      onClick={(e) => {
        setComponents((p) => [
          ...p,
          new ElectronicComponents.gates.not({
            position: {
              x: e.clientX,
              y: e.clientY,
            },
            onRerenderRequest: () => setRerender((prev) => prev + 1),
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
