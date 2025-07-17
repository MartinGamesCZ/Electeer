import { Schematic } from "@/logic/electronic/schematic";
import { SchematicBoardRenderer } from "@/logic/ui/renderer";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export function useCanvasRenderer(
  canvasSize: {
    width: number;
    height: number;
  },
  schematic: Schematic,
  canvasRef: RefObject<HTMLCanvasElement | null>
) {
  const [renderer, setRenderer] = useState<SchematicBoardRenderer>();

  const render = useCallback(() => {
    if (!canvasRef.current || !renderer) return;

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;

    renderer.render(ctx);
  }, [renderer]);

  useEffect(() => {
    setRenderer(
      new SchematicBoardRenderer(canvasSize.width, canvasSize.height, schematic)
    );
  }, [canvasSize.width, canvasSize.height, schematic]);

  useEffect(() => {
    if (!renderer) return;

    let animationFrameId: number;

    const renderLoop = () => {
      render();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [render, renderer]);

  return canvasRef;
}
