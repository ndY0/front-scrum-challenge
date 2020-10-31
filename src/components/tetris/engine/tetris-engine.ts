import { TetrisBoard } from "../board/tetrisboard";
import { Tetrimino } from "../pieces/tetrimino";
import { TetrisRenderer } from "../renderer/tetris-renderer";
import { EventEmitter } from "events";

class TetrisEngine {
  private tetrisBoard: TetrisBoard;
  private renderer: TetrisRenderer | null = null;
  private currentPiece: Tetrimino | null = null;
  private paused: boolean = true;
  private eventEmitter: EventEmitter;
  constructor() {
    this.tetrisBoard = new TetrisBoard(12, 30);
    this.eventEmitter = new EventEmitter();
  }

  public setRenderer(renderer: TetrisRenderer) {
    this.renderer = renderer;
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.eventEmitter.on(event, callback);
  }

  public send(event: string, _data: any) {
    switch (event) {
      case "start":
        this.run();
        break;
      case "pause":
        this.pause(true);
        break;
      case "unpause":
        this.pause(false);
        break;
      default:
        break;
    }
  }

  private pause(paused: boolean) {
    this.paused = paused;
  }

  private async run() {}
}

export { TetrisEngine };
