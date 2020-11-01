import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import { connect } from "react-redux";
import { TetrisRenderer } from "./renderer/tetris-renderer";
import { EventEmitter } from "events";
import { useTetrisKeybindingHook } from "../../hooks/tetris-keybinding-hook";
import { AbstractTetrisEngine } from "./engines/abstract-tetris-engine";

const Tetris = (
  initWidth: number,
  initHeight: number,
  engine: AbstractTetrisEngine
) => {
  const [height] = useState(initHeight);
  const [width] = useState(initWidth);
  const canvasRef: MutableRefObject<HTMLCanvasElement> = useRef(
    new HTMLCanvasElement()
  );
  const eventEmitter = new EventEmitter();
  const [renderer] = useState(new TetrisRenderer(canvasRef));
  engine.setRenderer(renderer);
  useTetrisKeybindingHook(eventEmitter);
  useEffect(() => {}, []);
  return <canvas height={height} width={width} ref={canvasRef}></canvas>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps, Tetris);
