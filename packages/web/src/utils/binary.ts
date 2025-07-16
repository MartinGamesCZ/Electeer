import { PinState } from "@/logic/components/schematic";

export function b(pinState: PinState | undefined): 0 | 1 {
  if (pinState === undefined) return 0;

  return pinState === PinState.Low ? 0 : 1;
}

export function ps(value: 0 | 1): PinState {
  if (value === 0) return PinState.Low;

  return PinState.High;
}
