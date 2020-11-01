import { useEffect, useRef, useState } from "react";
import { EventEmitter } from "events";
import { PlayerInputEvent } from "../components/tetris/engines/types";

// hook that bind tetris keys on component mount, and unbind on unmount
const useTetrisKeybindingHook = (eventEmitter: EventEmitter) => {
  const documentRef = useRef(document);
  const [keyStatus] = useState({
    down: false,
    right: false,
    left: false,
    space: false,
  });

  useEffect(() => {
    const throttledInputsEmitter = (
      event: PlayerInputEvent,
      throttle: number
    ) => {
      if (keyStatus[event]) {
        setTimeout(() => {
          eventEmitter.emit(event);
          throttledInputsEmitter(event, 100);
        }, throttle);
      }
    };
    const keyBoardDownEventListener = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37:
          eventEmitter.emit("left");
          keyStatus.left = true;
          throttledInputsEmitter("left", 300);
          break;
        case 39:
          eventEmitter.emit("right");
          keyStatus.right = true;
          throttledInputsEmitter("right", 300);
          break;
        case 40:
          eventEmitter.emit("down");
          keyStatus.down = true;
          throttledInputsEmitter("down", 300);
          break;
        case 32:
          eventEmitter.emit("space");
          keyStatus.space = true;
          throttledInputsEmitter("space", 300);
          break;
        default:
          break;
      }
    };
    const keyBoardUpEventListener = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37:
          keyStatus.left = false;
          break;
        case 39:
          keyStatus.right = false;
          break;
        case 40:
          keyStatus.down = false;
          break;
        default:
          break;
      }
    };
    const document = documentRef.current;
    document.addEventListener("keydown", keyBoardDownEventListener);
    document.addEventListener("keyup", keyBoardUpEventListener);
    return () => {
      document.removeEventListener("keydown", keyBoardDownEventListener);
      document.removeEventListener("keyup", keyBoardUpEventListener);
    };
  }, [eventEmitter, keyStatus]);
};

export { useTetrisKeybindingHook };
