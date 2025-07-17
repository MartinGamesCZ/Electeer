"use client";

import { GRID_SIZE } from "@/config";
import { useCanvasSize } from "@/hooks/use-canvas-size";
import { useCanvasRenderer } from "@/hooks/use-renderer";
import { SchematicComponent } from "@/logic/electronic/component";
import { ElectronicComponents } from "@/logic/electronic/components/components";
import { Schematic } from "@/logic/electronic/schematic";
import { isAllowedToPlaceComponent } from "@/logic/grid/collision";
import {
  getComponentCenterCoordinates,
  removeOverflow,
  translatePixelsToCoordinates,
} from "@/logic/grid/coordinates";
import { useEffect, useRef, useState } from "react";

interface SchematicBoardProps {
  selectedComponent: string | null;
}

export function SchematicBoard({ selectedComponent }: SchematicBoardProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const canvasSize = useCanvasSize(rootRef);
  const canvasRef = useCanvasRenderer(canvasSize);

  const [_, setUpdate] = useState(0);
  const [schematic, setSchematic] = useState(
    new Schematic(() => setUpdate(performance.now()))
  );

  const placementComponentPreview =
    ElectronicComponents[
      selectedComponent as keyof typeof ElectronicComponents
    ];

  const [
    placementComponentPreviewPosition,
    setPlacementComponentPreviewPosition,
  ] = useState({
    x: -10e10,
    y: -10e10,
  });

  useEffect(() => {
    if (!rootRef.current || !placementComponentPreview) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!rootRef.current || !placementComponentPreview) return;

      const relativeX =
        event.clientX - rootRef.current.getBoundingClientRect().left;
      const relativeY =
        event.clientY - rootRef.current.getBoundingClientRect().top;

      setPlacementComponentPreviewPosition(
        removeOverflow(
          getComponentCenterCoordinates(
            translatePixelsToCoordinates(relativeX),
            translatePixelsToCoordinates(relativeY),
            placementComponentPreview.width,
            placementComponentPreview.height
          )
        )
      );
    };

    const handleMouseLeave = () => {
      setPlacementComponentPreviewPosition({ x: -10e10, y: -10e10 });
    };

    rootRef.current.addEventListener("mousemove", handleMouseMove);
    rootRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (!rootRef.current) return;

      rootRef.current.removeEventListener("mousemove", handleMouseMove);
      rootRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rootRef, placementComponentPreview]);

  useEffect(() => {
    if (!selectedComponent || !placementComponentPreview) return;
    if (!rootRef.current) return;

    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current) return;

      const component = new placementComponentPreview(
        Math.max(
          Math.round(
            (event.clientX - rootRef.current!.getBoundingClientRect().left) /
              GRID_SIZE
          ) - Math.floor(placementComponentPreview.width / 2),
          0
        ),
        Math.max(
          Math.round(
            (event.clientY - rootRef.current!.getBoundingClientRect().top) /
              GRID_SIZE
          ) - Math.floor(placementComponentPreview.height / 2),
          0
        )
      );

      schematic.placeComponent(component);
    };

    rootRef.current.addEventListener("click", handleClick);

    return () => {
      if (!rootRef.current) return;

      rootRef.current.removeEventListener("click", handleClick);
    };
  }, [selectedComponent, schematic, rootRef]);

  return (
    <div className="w-full h-full flex relative" ref={rootRef}>
      <div className="absolute top-0 left-0 w-full h-full z-2">
        {schematic.render()}
        {placementComponentPreview &&
          isAllowedToPlaceComponent(
            placementComponentPreviewPosition.x,
            placementComponentPreviewPosition.y,
            placementComponentPreview as unknown as typeof SchematicComponent,
            schematic.getComponents()
          ) &&
          new placementComponentPreview(
            placementComponentPreviewPosition.x,
            placementComponentPreviewPosition.y
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
