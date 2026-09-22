export const steps = [0, 0, 2, 1, 4, 3, 2, 2, 0, 2, 1, 3, 1, 0];
export type Position = { slide: number; step: number };
export function clampPosition(slide: number, step: number): Position {
  const safeSlide = Number.isFinite(slide)
    ? Math.max(0, Math.min(steps.length - 1, Math.trunc(slide)))
    : 0;
  return {
    slide: safeSlide,
    step: Number.isFinite(step)
      ? Math.max(0, Math.min(steps[safeSlide], Math.trunc(step)))
      : 0,
  };
}
export function parseHash(hash: string): Position {
  const [slide = "1", step = "0"] = hash.replace(/^#\/?/, "").split("/");
  return clampPosition(Number(slide) - 1, Number(step));
}
export function move(position: Position, direction: 1 | -1): Position {
  const { slide, step } = position;
  if (direction === 1)
    return step < steps[slide]
      ? { slide, step: step + 1 }
      : clampPosition(slide + 1, slide === steps.length - 1 ? step : 0);
  return step > 0
    ? { slide, step: step - 1 }
    : slide > 0
      ? { slide: slide - 1, step: steps[slide - 1] }
      : position;
}
