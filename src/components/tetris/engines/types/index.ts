type PlayerInputEvent = "down" | "right" | "left" | "space";
type EngineEvents = "end" | "lineRemoved";
type EnginEventData = void | { amount: number };
type EngineTask = () => void;

export type { PlayerInputEvent, EngineEvents, EngineTask, EnginEventData };
