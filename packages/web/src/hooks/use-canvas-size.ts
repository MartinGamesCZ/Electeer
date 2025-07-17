import { RefObject, useCallback, useEffect, useState } from "react";

// Hook to manage canvas size based on the size of a root element
export function useCanvasSize(rootRef: RefObject<HTMLDivElement | null>) {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  // Callback to resize the canvas based on the root element's dimensions
  const resizeCanvas = useCallback(() => {
    if (!rootRef.current) return;

    const root = rootRef.current.getBoundingClientRect();

    setCanvasWidth(root.width);
    setCanvasHeight(root.height);
  }, [rootRef]);

  // Effect to set up the resize listener and initial canvas size
  useEffect(() => {
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  return {
    width: canvasWidth,
    height: canvasHeight,
  };
}
