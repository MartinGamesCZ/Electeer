"use client";

import { useEffect, useState } from "react";
import {
  TbBolt,
  TbCircuitChangeover,
  TbCircuitGround,
  TbCircuitSwitchOpen,
  TbLine,
  TbLogicAnd,
  TbLogicNot,
  TbLogicOr,
  TbLogicXor,
} from "react-icons/tb";

const categories = [
  {
    id: "rails",
    name: "Rails",
    icon: TbCircuitGround,
    components: [
      {
        name: "Voltage Rail",
        description: "Provides a high voltage level",
        icon: TbBolt,
        component: "special.rail.voltage",
      },
      {
        name: "Ground Rail",
        description: "Provides a low voltage level",
        icon: TbCircuitGround,
        component: "special.rail.ground",
      },
    ],
  },
  {
    id: "switches",
    name: "Switches",
    icon: TbCircuitSwitchOpen,
    components: [
      {
        name: "Switch",
        description: "A simple switch component",
        icon: TbCircuitSwitchOpen,
        component: "builtin.switches.switch",
      },
    ],
  },
  {
    id: "logic_gates",
    name: "Logic Gates",
    icon: TbLogicAnd,
    components: [
      {
        name: "AND Gate",
        description: "Outputs true if all inputs are true",
        icon: TbLogicAnd,
        component: "builtin.logic_gates.and",
      },
      {
        name: "NOT Gate",
        description: "Outputs the inverse of the input",
        icon: TbLogicNot,
        component: "builtin.logic_gates.not",
      },
      {
        name: "XOR Gate",
        description: "Outputs true if an odd number of inputs are true",
        icon: TbLogicXor,
        component: "builtin.logic_gates.xor",
      },
      {
        name: "OR Gate",
        description: "Outputs true if at least one input is true",
        icon: TbLogicOr,
        component: "builtin.logic_gates.or",
      },
    ],
  },
];

interface ComponentDrawerProps {
  onComponentSelect: (component: string) => void;
  selectedComponent: string | null;
}

export function ComponentDrawer({
  onComponentSelect,
  selectedComponent,
}: ComponentDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  useEffect(() => {
    if (!selectedComponent)
      onComponentSelect(categories[0].components[0].component);
  }, [selectedComponent]);

  useEffect(() => {
    const category = categories.find((cat) => cat.id === selectedCategory);

    if (category) onComponentSelect(category.components[0].component);
  }, [selectedCategory]);

  return (
    <div className="flex flex-row w-full h-12 bg-[#d8f28f] border-b-[#89a832] border-b-2">
      <div className="w-fit h-8 px-2 border-r-2 mt-2 mb-2 gap-1 border-r-[#89a832] flex flex-row">
        {categories.map((category) => (
          <div
            key={category.name}
            className={
              "flex p-1 h-8 w-8 rounded-md items-center justify-center " +
              (selectedCategory === category.id ? "bg-[#6a8a12]" : "")
            }
          >
            <category.icon
              size={32}
              className={
                "inline-block " +
                (selectedCategory === category.id
                  ? "text-[#d8f28f]"
                  : "text-[#6a8a12]")
              }
              onClick={() => setSelectedCategory(category.id)}
            />
          </div>
        ))}
      </div>
      <div className="w-full h-8 px-2 mt-2 mb-2 gap-1 flex flex-row">
        {categories
          .find((cat) => cat.id == selectedCategory)
          ?.components.map((component) => (
            <div
              key={component.name}
              className={
                "flex p-1 h-8 w-8 rounded-md items-center justify-center " +
                (selectedComponent === component.component
                  ? "bg-[#6a8a12]"
                  : "")
              }
            >
              <component.icon
                size={32}
                className={
                  "inline-block " +
                  (selectedComponent === component.component
                    ? "text-[#d8f28f]"
                    : "text-[#6a8a12]")
                }
                onClick={() => onComponentSelect(component.component)}
              />
            </div>
          ))}
      </div>
      <div className="h-8 px-2 mt-2 mb-2 gap-1 flex flex-row">
        <div
          className={
            "flex p-1 h-8 w-8 rounded-md items-center justify-center " +
            (selectedComponent == "_.wire" ? "bg-[#6a8a12]" : "")
          }
        >
          <TbLine
            size={32}
            className={
              "inline-block " +
              (selectedComponent == "_.wire"
                ? "text-[#d8f28f]"
                : "text-[#6a8a12]")
            }
            onClick={() => onComponentSelect("_.wire")}
          />
        </div>
      </div>
    </div>
  );
}
