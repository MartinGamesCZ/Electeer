"use client";

import { ElectronicComponents } from "@/logic/components";
import { Component } from "@/logic/components/component";
import { ComponentSchematicPin } from "@/logic/components/schematic";
import { Connection, drawConnections } from "@/logic/connection";
import { useCallback, useEffect, useRef, useState } from "react";
import { PiCircuitry } from "react-icons/pi";
import {
  TbLogicAnd,
  TbLogicNand,
  TbLogicNor,
  TbLogicNot,
  TbLogicOr,
  TbLogicXnor,
  TbLogicXor,
} from "react-icons/tb";

export function Board() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] =
    useState<keyof typeof ElectronicComponents.gates>("and");
  const [isCreatingConnection, setIsCreatingConnection] = useState(false);
  const [connectionStart, setConnectionStart] =
    useState<ComponentSchematicPin | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);

  const [canvasSizeX, setCanvasSizeX] = useState(0);
  const [canvasSizeY, setCanvasSizeY] = useState(0);

  const [_, setRerender] = useState(0);

  const connectionCanvasRef = useRef<HTMLCanvasElement>(null);

  const placeComponent = useCallback(
    (x: number, y: number) => {
      if (isCreatingConnection) return;

      setComponents((prev) => [
        ...prev,
        new ElectronicComponents.gates[selectedComponent]({
          position: {
            x,
            y,
          },
          onRerenderRequest: () => setRerender((prev) => prev + 1),
        }),
      ]);
    },
    [selectedComponent, isCreatingConnection]
  );

  const addConnection = useCallback(
    (pin: ComponentSchematicPin) => {
      if (!isCreatingConnection) return false;

      if (connectionStart) {
        // Logic to handle connection creation
        setConnections((prev) => [
          ...prev,
          new Connection(connectionStart, pin),
        ]);

        setIsCreatingConnection(false);
        setConnectionStart(null);
      } else {
        // Start a new connection
        setConnectionStart(pin);
      }

      return true; // Indicate that the connection was handled
    },
    [isCreatingConnection, connectionStart]
  );

  useEffect(() => {
    let isMounted = true;

    const renderLoop = () => {
      drawConnections(connections, connectionCanvasRef.current!);

      if (isMounted) window.requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      isMounted = false;
    };
  }, [connections, connectionCanvasRef]);

  useEffect(() => {
    const onResize = () => {
      console.log("RESIZE");

      setCanvasSizeX(window.innerWidth);
      setCanvasSizeY(window.innerHeight);
    };

    document.addEventListener("resize", onResize);

    onResize();

    return () => {
      document.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={`_pattern_graphpaper w-full h-full`}
      onClick={(e) => placeComponent(e.clientX, e.clientY)}
    >
      <div className="absolute top-0 left-0 z-50">
        <TbLogicAnd
          size={48}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent("and");
          }}
        />
        <TbLogicNand
          size={48}
          className={selectedComponent === "nand" ? "text-blue-500" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent("nand");
          }}
        />
        <TbLogicOr
          size={48}
          className={selectedComponent === "or" ? "text-blue-500" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent("or");
          }}
        />
        <TbLogicNor
          size={48}
          className={selectedComponent === "nor" ? "text-blue-500" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent("nor");
          }}
        />
        <TbLogicXor
          size={48}
          className={selectedComponent === "xor" ? "text-blue-500" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent("xor");
          }}
        />
        <TbLogicXnor
          size={48}
          className={selectedComponent === "xnor" ? "text-blue-500" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent("xnor");
          }}
        />
        <TbLogicNot
          size={48}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent("not");
          }}
        />
        <PiCircuitry
          size={48}
          className={isCreatingConnection ? "text-blue-500" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setIsCreatingConnection((prev) => !prev);
          }}
        />
      </div>
      {components.map((component) => (
        <ElectronicComponent
          key={component.id}
          component={component}
          addConnection={addConnection}
        />
      ))}
      <canvas
        ref={connectionCanvasRef}
        className="fixed top-0 left-0 z-20"
        width={canvasSizeX}
        height={canvasSizeY}
      />
    </div>
  );
}

function ElectronicComponent({
  component,
  addConnection,
}: {
  component: Component;
  addConnection: (pin: ComponentSchematicPin) => boolean;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: component.position.x,
        top: component.position.y,
        zIndex: "1000",
      }}
    >
      {component.getSchematic().render(addConnection)}
    </div>
  );
}
