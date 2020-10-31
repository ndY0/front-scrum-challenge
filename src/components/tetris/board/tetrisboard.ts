class TetrisBoard {
  private board: boolean[][];
  private width: number;
  private depth: number;

  constructor(width: number, depth: number) {
    this.board = Array(depth).map((_noise: any) =>
      Array(width).map((_noise: any) => false)
    );
    this.width = width;
    this.depth = depth;
  }

  public getBoard = () => this.board;

  public update(points: Array<[number, number, boolean]>) {
    points.forEach(([x, y, value]: [number, number, boolean]) => {
      if (x >= 0 && x < this.width && y >= 0 && y < this.depth)
        this.board[y][x] = value;
    });
  }
}

export { TetrisBoard };
