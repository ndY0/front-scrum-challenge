import React, { useState, useRef } from "react";
import { connect } from "react-redux";

const Tetris = (initWidth: number, initHeight: number) => {
  const [height, setHeight] = useState(initHeight);
  const [width, setWidth] = useState(initWidth);
  const canvas = useRef(null);
  return <canvas height={height} width={width}></canvas>;
};

const mapStateToProps = (state) => ({
  tetrisStates: state.tetris.states,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps, Tetris);
