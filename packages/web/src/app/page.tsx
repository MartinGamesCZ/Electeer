"use client";

import { ComponentDrawer } from "@/components/ComponentDrawer";
import { SchematicBoard } from "@/components/SchematicBoard";
import { useState } from "react";

export default function Page() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  return (
    <div className={"flex flex-col w-screen h-screen"}>
      <ComponentDrawer
        onComponentSelect={setSelectedComponent}
        selectedComponent={selectedComponent}
      />
      <SchematicBoard selectedComponent={selectedComponent} />
    </div>
  );
}
