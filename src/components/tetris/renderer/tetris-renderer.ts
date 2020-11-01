import { MutableRefObject } from "react";
import { TetrisBoard } from "../board/tetrisboard";

class TetrisRenderer {
  private canvasRef: MutableRefObject<HTMLCanvasElement>;
  constructor(canvasRef: MutableRefObject<HTMLCanvasElement>) {
    this.canvasRef = canvasRef;
  }
  public async draw(board: TetrisBoard) {
    const canvasContext = this.canvasRef.current.getContext("2d");
    if (canvasContext) {
      const tileWidth = Math.floor(
        this.canvasRef.current.width / board.getWidth()
      );
      const tileDepth = Math.floor(
        this.canvasRef.current.height / board.getDepth()
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
