import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { TetrisEngine } from "./engine/tetris-engine";
import { TetrisRenderer } from "./renderer/tetris-renderer";

const Tetris = (initWidth: number, initHeight: number) => {
  const [height] = useState(initHeight);
  const [width] = useState(initWidth);
  const canvasRef = useRef(null);
  const [engine] = useState(new TetrisEngine());
  const [renderer] = useState(new TetrisRenderer());
  useEffect(() => {
    renderer.setCanvas(canvasRef.current);
    engine.set;
  }, []);
  return <canvas height={height} width={width} ref={canvasRef}></canvas>;
};

const mapStateToProps = (state) => ({
  tetrisStates: state.tetris.states,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps, Tetris);
