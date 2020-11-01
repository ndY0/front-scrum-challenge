import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import { TetrisRenderer } from "./renderer/tetris-renderer";
import { useTetrisKeybindingHook } from "../../hooks/tetris-keybinding-hook";
import { AbstractTetrisEngine } from "./engines/abstract-tetris-engine";

const Tetris = ({
  initWidth,
  initHeight,
  engine,
}: {
  initWidth: number;
  initHeight: number;
  engine: AbstractTetrisEngine;
}) => {
  const [height] = useState(initHeight);
  const [width] = useState(initWidth);
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const [renderer] = useState(new TetrisRenderer(canvasRef));
  engine.setRenderer(renderer);
  useTetrisKeybindingHook(engine.getEventEmitter());
  useEffect(() => {
    engine.run();
    // const test = canvasRef.current?.getContext("2d");
    // if (test) {
    //   test.fillStyle = "#000";
    //   test.fillRect(0, 0, width, height);
    // }
  }, [engine]);
  return <canvas height={height} width={width} ref={canvasRef}></canvas>;
};

export { Tetris };
