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
import { EngineEvents, EnginEventData } from "./types";

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
  private currentPieceCoordinates: [number, number, boolean][] = [];
  private autoDropSpeed: number = 1000;
  private autoDropTimeout: NodeJS.Timeout | null = null;
  constructor(eventEmitter: EventEmitter) {
    super(eventEmitter);
    this.tetrisBoard = new TetrisBoard(12, 30);
    this.eventEmitter.on("left", () =>
      this.addEngineTask(this.handleLeftMove.bind(this))
    );
    this.eventEmitter.on("right", () =>
      this.addEngineTask(this.handleRightMove.bind(this))
    );
    this.eventEmitter.on("down", () =>
      this.addEngineTask(() => {
        if (this.autoDropTimeout) clearTimeout(this.autoDropTimeout);
        this.handleDownMove();
      })
    );
    this.eventEmitter.on("space", () =>
      this.addEngineTask(this.handleRotateMove.bind(this))
    );
  }

  public setAutoDropSpeed = (speed: number) => {
    this.autoDropSpeed = speed;
  };
  public getAutoDropSpeed = () => this.autoDropSpeed;

  public setRenderer(renderer: TetrisRenderer) {
    this.renderer = renderer;
  }

  public on(event: EngineEvents, callback: (data: EnginEventData) => void) {
    this.eventEmitter.on(event, callback);
  }

  private getRandomTetrimino(): Tetrimino {
    console.log("called !");
    const indexOfTetrimino = randomInt(TetrisEngine.tetriminoList.length - 1);
    return new TetrisEngine.tetriminoList[indexOfTetrimino]();
  }

  public autoDropPiece() {
    this.autoDropTimeout = setTimeout(() => {
      this.handleDownMove();
      this.autoDropPiece();
    }, this.autoDropSpeed);
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
    this.currentPieceCoordinates = this.computeCoordinates(
      this.currentPiecePosition
    );
    this.tetrisBoard.update(this.currentPieceCoordinates);
    this.renderer?.draw(this.tetrisBoard);
  }

  private invertCoordinatesValues(coords: [number, number, boolean][]) {
    return coords.map(([x, y, value]: [number, number, boolean]): [
      number,
      number,
      boolean
    ] => [x, y, !value]);
  }

  private computeCoordinates([x, y]: [number, number]): [
    number,
    number,
    boolean
  ][] {
    const coord: [number, number, boolean][] = [];
    this.currentPiece
      ?.getCurentState()
      .getPositions()
      .forEach((line: boolean[], lineIndex) => {
        line.forEach((tile: boolean, depthIndex) => {
          tile ?? coord.push([x + lineIndex, y + depthIndex, tile]);
        });
      });
    return coord;
  }

  private isCollidingRight(coords: [number, number, boolean][]) {
    return coords.reduce(
      (acc: boolean, [x, _y, _val]: [number, number, boolean]) => {
        return acc && x >= this.tetrisBoard.getDepth();
      },
      false
    );
  }

  private isCollidingLeft(coords: [number, number, boolean][]) {
    return coords.reduce(
      (acc: boolean, [x, _y, _val]: [number, number, boolean]) => {
        return acc && x <= 0;
      },
      false
    );
  }

  private isCollidingBottom(coords: [number, number, boolean][]) {
    return coords.reduce(
      (acc: boolean, [_x, y, _val]: [number, number, boolean]) => {
        return acc && y >= this.tetrisBoard.getDepth();
      },
      false
    );
  }

  private isAtTop(coords: [number, number, boolean][]) {
    return coords.reduce(
      (acc: boolean, [x, _y, _val]: [number, number, boolean]) => {
        return acc && x === 0;
      },
      false
    );
  }

  private isCollidingPieces(coords: [number, number, boolean][]) {
    return coords.reduce((acc: boolean, coord: [number, number, boolean]) => {
      return acc && this.tetrisBoard.getBoard()[coord[1]][coord[0]];
    }, false);
  }

  private handleLeftMove() {
    const [x, y] = this.currentPiecePosition;
    const newCoords = this.computeCoordinates([x - 1, y]);
    if (this.isCollidingLeft(newCoords)) return;
    if (this.isCollidingPieces(newCoords)) return;
    this.tetrisBoard.update(
      this.invertCoordinatesValues(this.currentPieceCoordinates)
    );
    this.currentPiecePosition = [x - 1, y];
    this.currentPieceCoordinates = newCoords;
    this.tetrisBoard.update(this.currentPieceCoordinates);
    this.renderer?.draw(this.tetrisBoard);
  }

  private handleRightMove() {
    const [x, y] = this.currentPiecePosition;
    const newCoords = this.computeCoordinates([x + 1, y]);
    if (this.isCollidingRight(newCoords)) return;
    if (this.isCollidingPieces(newCoords)) return;
    this.tetrisBoard.update(
      this.invertCoordinatesValues(this.currentPieceCoordinates)
    );
    this.tetrisBoard.update(
      this.invertCoordinatesValues(this.currentPieceCoordinates)
    );
    this.currentPiecePosition = [x + 1, y];
    this.currentPieceCoordinates = newCoords;
    this.tetrisBoard.update(this.currentPieceCoordinates);
    this.renderer?.draw(this.tetrisBoard);
  }

  private handleDownMove() {
    const [x, y] = this.currentPiecePosition;
    const newCoords = this.computeCoordinates([x, y + 1]);
    const isCollidingPiece = this.isCollidingPieces(newCoords);
    if (this.isAtTop(this.currentPieceCoordinates) && isCollidingPiece) {
      this.eventEmitter.emit("end");
      this.isRunning = false;
      return;
    }
    if (this.isCollidingBottom(newCoords) || isCollidingPiece) {
      this.initializeNewTetrimino();
      return;
    }
    this.tetrisBoard.update(
      this.invertCoordinatesValues(this.currentPieceCoordinates)
    );
    this.currentPiecePosition = [x, y + 1];
    this.currentPieceCoordinates = newCoords;
    this.tetrisBoard.update(this.currentPieceCoordinates);
    this.renderer?.draw(this.tetrisBoard);
  }

  private handleRotateMove() {
    this.currentPiece?.rotate(0);
    const newCoords = this.computeCoordinates(this.currentPiecePosition);
    if (this.isCollidingPieces(newCoords)) {
      this.currentPiece?.rotate(1);
      return;
    }
    if (this.isCollidingLeft(newCoords)) {
      let slidingCoords = [];
      let x = 0;
      let y = 0;
      let counter = 0;
      do {
        counter += 1;
        [x, y] = this.currentPiecePosition;
        slidingCoords = this.computeCoordinates([x + 1, y]);
      } while (this.isCollidingLeft(slidingCoords));
      if (this.isCollidingPieces(slidingCoords)) {
        this.currentPiece?.rotate(1);
        return;
      } else {
        this.tetrisBoard.update(
          this.invertCoordinatesValues(this.currentPieceCoordinates)
        );
        this.currentPiecePosition = [x + counter, y];
        this.currentPieceCoordinates = slidingCoords;
        this.tetrisBoard.update(this.currentPieceCoordinates);
        return;
      }
    }
    if (this.isCollidingRight(newCoords)) {
      let slidingCoords = [];
      let x = 0;
      let y = 0;
      let counter = 0;
      do {
        counter += 1;
        [x, y] = this.currentPiecePosition;
        slidingCoords = this.computeCoordinates([x - 1, y]);
      } while (this.isCollidingRight(slidingCoords));
      if (this.isCollidingPieces(slidingCoords)) {
        this.currentPiece?.rotate(1);
        return;
      } else {
        this.tetrisBoard.update(
          this.invertCoordinatesValues(this.currentPieceCoordinates)
        );
        this.currentPiecePosition = [x - counter, y];
        this.currentPieceCoordinates = slidingCoords;
        this.tetrisBoard.update(this.currentPieceCoordinates);
        return;
      }
    }
    this.tetrisBoard.update(
      this.invertCoordinatesValues(this.currentPieceCoordinates)
    );
    this.currentPieceCoordinates = newCoords;
    this.tetrisBoard.update(this.currentPieceCoordinates);
  }

  protected start() {
    this.initializeNewTetrimino();
    this.autoDropPiece();
  }
}

export { TetrisEngine };
