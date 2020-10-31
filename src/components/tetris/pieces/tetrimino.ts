import { TetriminoState } from "./tetrimino-state";

abstract class Tetrimino {
  private states: Array<TetriminoState>;
  private currentStateIndex: number;

  public setCurrentStateIndex = (index: number) => {
    if ((index) => 0 && index < this.states.length) {
      this.currentStateIndex = index;
    } else {
      throw new Error("state index out of range");
    }
  };

  protected setStates = (states: Array<TetriminoState>) => {
    this.states = states;
  };

  // 0 mean clock wise, 1 counter clock wise
  public rotate(direction: 0 | 1) {
    this.currentStateIndex =
      direction === 0
        ? this.currentStateIndex === this.states.length - 1
          ? 0
          : this.currentStateIndex + 1
        : this.currentStateIndex === 0
        ? this.states.length - 1
        : this.currentStateIndex - 1;
  }

  public getStateCount = () => this.states.length;
  public getCurrentStateIndex = () => this.currentStateIndex;
  public getCurentState = () => this.states[this.currentStateIndex];
}

export { Tetrimino };
