"use client";

import { GRID_SIZE } from "@/config";
import { useCanvasSize } from "@/hooks/use-canvas-size";
import { useCanvasRenderer } from "@/hooks/use-renderer";
import { ElectronicComponents } from "@/logic/electronic/components/components";
import { Schematic } from "@/logic/electronic/schematic";
import { useEffect, useRef, useState } from "react";

interface SchematicBoardProps {
  selectedComponent: string | null;
}

export function SchematicBoard({ selectedComponent }: SchematicBoardProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const canvasSize = useCanvasSize(rootRef);
  const canvasRef = useCanvasRenderer(canvasSize);

  const [schematic, setSchematic] = useState(new Schematic());

  const placementComponentPreview =
    ElectronicComponents[
      selectedComponent as keyof typeof ElectronicComponents
    ];

  const [
    placementComponentPreviewPosition,
    setPlacementComponentPreviewPosition,
  ] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!rootRef.current) return;

      setPlacementComponentPreviewPosition({
        x: Math.round(
          (event.clientX - rootRef.current!.getBoundingClientRect().left) /
            GRID_SIZE
        ),
        y: Math.round(
          (event.clientY - rootRef.current!.getBoundingClientRect().top) /
            GRID_SIZE
        ),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rootRef]);

  return (
    <div className="w-full h-full flex relative" ref={rootRef}>
      <div className="absolute top-0 left-0 w-full h-full z-2">
        {schematic.render()}
        {placementComponentPreview &&
          new placementComponentPreview(
            placementComponentPreviewPosition.x -
              Math.floor(placementComponentPreview.width / 2),
            placementComponentPreviewPosition.y -
              Math.floor(placementComponentPreview.height / 2)
          ).render(true)}
      </div>
      <canvas
        className="w-full h-full absolute top-0 left-0 z-1"
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
    </div>
  );
}
