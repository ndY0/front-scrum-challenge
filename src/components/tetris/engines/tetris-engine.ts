import { TetrisBoard } from "../board/tetrisboard";
import { Tetrimino } from "../pieces/tetrimino";
import { TetrisRenderer } from "../renderer/tetris-renderer";
import { EventEmitter } from "events";
import { AbstractTetrisEngine } from "./abstract-tetris-engine";
import {
  LTetrimino,
  MirrorLTetrimino,
  BarTetrimino,
  ZTetrimino,
  MirrorZTetrimino,
  SquareTetrimino,
} from "../pieces/tetriminos-list";
import { randomInt } from "../../../common/utils/random-int";

class TetrisEngine extends AbstractTetrisEngine {
  static readonly tetriminoList: [
    typeof LTetrimino,
    typeof MirrorLTetrimino,
    typeof BarTetrimino,
    typeof ZTetrimino,
    typeof MirrorZTetrimino,
    typeof SquareTetrimino
  ] = [
    LTetrimino,
    MirrorLTetrimino,
    BarTetrimino,
    ZTetrimino,
    MirrorZTetrimino,
    SquareTetrimino,
  ];
  private tetrisBoard: TetrisBoard;
  private renderer: TetrisRenderer | null = null;
  private currentPiece: Tetrimino | null = null;
  private currentPiecePosition: [number, number] = [0, 0];
  private isRunning: boolean = false;
  constructor(eventEmitter: EventEmitter) {
    super(eventEmitter);
    this.tetrisBoard = new TetrisBoard(12, 30);
    this.eventEmitter.on("left", this.handleLeftMove);
    this.eventEmitter.on("right", this.handleRightMove);
    this.eventEmitter.on("down", this.handleDownMove);
    this.eventEmitter.on("space", this.handleRotateMove);
  }

  public setRenderer(renderer: TetrisRenderer) {
    this.renderer = renderer;
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.eventEmitter.on(event, callback);
  }

  private getRandomTetrimino(): Tetrimino {
    const indexOfTetrimino = randomInt(TetrisEngine.tetriminoList.length - 1);
    return new TetrisEngine.tetriminoList[indexOfTetrimino]();
  }

  private initializeNewTetrimino() {
    //get a random tetrimino
    this.currentPiece = this.getRandomTetrimino();
    // rotate the tetrimino randomly
    Array(randomInt(this.currentPiece.getStateCount())).forEach((_) =>
      this.currentPiece?.rotate(0)
    );
    //place it on top of board
    this.currentPiecePosition = [
      Math.floor(this.tetrisBoard.getWidth() / 2) -
        this.currentPiece.getCurentState().getOffsetLeft() +
        Math.floor(this.currentPiece.getCurentState().getEffectiveWidth() / 2),
      0 - this.currentPiece.getCurentState().getOffsetTop(),
    ];
  }

  private computeCoordinates() {}

  private isCollidingLeft() {}

  private isCollidingRight() {}

  private isCollidingPieces() {}

  private handleLeftMove() {}

  private handleRightMove() {}

  private handleDownMove() {}

  private handleRotateMove() {}

  protected async run() {}

  protected async compute() {}
}

export { TetrisEngine };
