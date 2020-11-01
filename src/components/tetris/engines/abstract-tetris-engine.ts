import { EventEmitter } from "events";
import { TetrisRenderer } from "../renderer/tetris-renderer";

abstract class AbstractTetrisEngine {
  protected eventEmitter: EventEmitter;
  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
  }
  protected abstract async run(): Promise<void>;
  public abstract setRenderer(renderer: TetrisRenderer): void;
}

export { AbstractTetrisEngine };
