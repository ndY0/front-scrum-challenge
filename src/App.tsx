import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Tetris } from "./components/tetris/Tetris";
import { TetrisEngine } from "./components/tetris/engines/tetris-engine";
import { EventEmitter } from "events";

const App = () => {
  const [engine] = useState(new TetrisEngine(new EventEmitter()));
  return <Tetris initWidth={240} initHeight={600} engine={engine} />;
};

export default App;
