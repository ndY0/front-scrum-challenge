import { EventEmitter } from "events";
import { TetrisRenderer } from "../renderer/tetris-renderer";
import { EngineTask } from "./types";

abstract class AbstractTetrisEngine {
  protected eventEmitter: EventEmitter;
  protected isRunning: boolean = false;
  private stack: Promise<void>;
  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.stack = new Promise((resolve: () => void, _: () => void) => {
      resolve();
    });
  }
  public getEventEmitter = () => this.eventEmitter;
  protected abstract start(): void;
  public run() {
    this.start();
    this.isRunning = true;
  }
  public abstract setRenderer(renderer: TetrisRenderer): void;
  protected addEngineTask(task: EngineTask) {
    this.stack.then(
      (_) => {
        if (this.isRunning) {
          this.stack = new Promise((resolve: () => void, _: () => void) => {
            task();
            resolve();
          });
        }
      },
      (_) => {
        if (this.isRunning) {
          this.stack = new Promise((resolve: () => void, _: () => void) => {
            task();
            resolve();
          });
        }
      }
    );
  }
}

export { AbstractTetrisEngine };
