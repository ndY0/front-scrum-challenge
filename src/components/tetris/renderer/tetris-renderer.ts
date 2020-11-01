import { MutableRefObject } from "react";
import { TetrisBoard } from "../board/tetrisboard";

class TetrisRenderer {
  private canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  constructor(canvasRef: MutableRefObject<HTMLCanvasElement | null>) {
    this.canvasRef = canvasRef;
  }
  public async draw(board: TetrisBoard) {
    const canvasContext = this.canvasRef.current?.getContext("2d");
    const canvas = this.canvasRef.current;
    if (canvasContext) {
      canvasContext.fillStyle = "#fff";
      canvasContext.fillRect(0, 0, 200, 600);
      const tileWidth = Math.floor(
        (canvas ? canvas.width : 0) / board.getWidth()
      );
      const tileDepth = Math.floor(
        (canvas ? canvas.height : 0) / board.getDepth()
      );
      // draw the tile on canvas
      board.getBoard().forEach((line: boolean[], depthIndex: number) => {
        line.forEach((tile: boolean, lineIndex) => {
          canvasContext.fillStyle = tile ? "#000" : "#fff";
          canvasContext.strokeStyle = tile ? "#000" : "#fff";
          canvasContext.fillRect(
            tileWidth * lineIndex,
            tileDepth * depthIndex,
            tileWidth - 1,
            tileDepth - 1
          );
        });
      });
      // draw lines between tiles
      canvasContext.lineCap = "square";
      canvasContext.lineJoin = "round";
      canvasContext.lineWidth = 2;
      canvasContext.strokeStyle = "bababa";
      for (let depthIndex = 0; depthIndex <= board.getWidth(); depthIndex++) {
        canvasContext.beginPath();
        canvasContext.moveTo(depthIndex * tileWidth, 0);
        canvasContext.lineTo(
          depthIndex * tileWidth,
          board.getDepth() * tileDepth
        );
        canvasContext.closePath();
      }
      for (let lineIndex = 0; lineIndex <= board.getDepth(); lineIndex++) {
        canvasContext.beginPath();
        canvasContext.moveTo(0, lineIndex * tileDepth);
        canvasContext.lineTo(
          board.getWidth() * tileWidth,
          lineIndex * tileDepth
        );
        canvasContext.closePath();
      }
    }
  }
}

export { TetrisRenderer };
