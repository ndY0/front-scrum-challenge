import { TetriminoState } from "./tetrimino-state";

//bar states :
const BarState1 = new TetriminoState([
  [false, false, false, false],
  [false, false, false, false],
  [true, true, true, true],
  [false, false, false, false],
]);
const BarState2 = new TetriminoState([
  [false, false, true, false],
  [false, false, true, false],
  [false, false, true, false],
  [false, false, true, false],
]);

const Square1 = new TetriminoState([
  [false, false, false, false],
  [false, true, true, false],
  [false, true, true, false],
  [false, false, false, false],
]);

const L1 = new TetriminoState([
  [false, false, false],
  [true, true, true],
  [false, false, true],
]);

const L2 = new TetriminoState([
  [false, true, false],
  [false, true, false],
  [true, true, false],
]);

const L3 = new TetriminoState([
  [false, false, false],
  [true, false, false],
  [true, true, true],
]);

const L4 = new TetriminoState([
  [false, true, true],
  [false, true, false],
  [false, true, false],
]);

const MirrorL1 = new TetriminoState([
  [false, false, false],
  [true, true, true],
  [true, false, false],
]);

const MirrorL2 = new TetriminoState([
  [true, true, false],
  [false, true, false],
  [false, true, false],
]);

const MirrorL3 = new TetriminoState([
  [false, false, false],
  [false, false, true],
  [true, true, true],
]);

const MirrorL4 = new TetriminoState([
  [false, true, false],
  [false, true, false],
  [false, true, true],
]);

const Z1 = new TetriminoState([
  [false, false, false],
  [false, true, true],
  [true, true, false],
]);

const Z2 = new TetriminoState([
  [true, false, false],
  [true, true, false],
  [false, true, false],
]);

const MirrorZ1 = new TetriminoState([
  [false, false, false],
  [true, true, false],
  [false, true, true],
]);

const MirrorZ2 = new TetriminoState([
  [false, false, true],
  [false, true, true],
  [false, true, false],
]);

const T1 = new TetriminoState([
  [false, false, false],
  [true, true, true],
  [false, true, false],
]);

const T2 = new TetriminoState([
  [false, true, false],
  [true, true, false],
  [false, true, false],
]);

const T3 = new TetriminoState([
  [false, false, false],
  [false, true, false],
  [true, true, true],
]);

const T4 = new TetriminoState([
  [false, true, false],
  [false, true, true],
  [false, true, false],
]);

export {
  BarState1,
  BarState2,
  Square1,
  L1,
  L2,
  L3,
  L4,
  MirrorL1,
  MirrorL2,
  MirrorL3,
  MirrorL4,
  Z1,
  Z2,
  MirrorZ1,
  MirrorZ2,
  T1,
  T2,
  T3,
  T4,
};
