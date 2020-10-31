import { Tetrimino } from "./tetrimino";
import {
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
} from "./tetriminos-state-list";

class BarTetrimino extends Tetrimino {
  constructor() {
    super();
    super.setStates([BarState1, BarState2]);
  }
}

class SquareTetrimino extends Tetrimino {
  constructor() {
    super();
    super.setStates([Square1]);
  }
}

class LTetrimino extends Tetrimino {
  constructor() {
    super();
    super.setStates([L1, L2, L3, L4]);
  }
}

class MirrorLTetrimino extends Tetrimino {
  constructor() {
    super();
    super.setStates([MirrorL1, MirrorL2, MirrorL3, MirrorL4]);
  }
}

class ZTetrimino extends Tetrimino {
  constructor() {
    super();
    super.setStates([Z1, Z2]);
  }
}

class MirrorZTetrimino extends Tetrimino {
  constructor() {
    super();
    super.setStates([MirrorZ1, MirrorZ2]);
  }
}

class TTetrimino extends Tetrimino {
  constructor() {
    super();
    super.setStates([T1, T2, T3, T4]);
  }
}

export {
  BarTetrimino,
  SquareTetrimino,
  LTetrimino,
  MirrorLTetrimino,
  ZTetrimino,
  MirrorZTetrimino,
  TTetrimino,
};
