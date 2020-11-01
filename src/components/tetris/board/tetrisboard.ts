class TetrisBoard {
  private board: boolean[][];
  private width: number;
  private depth: number;

  constructor(width: number, depth: number) {
    this.board = Array.from({ length: depth }, (_1, _2) =>
      Array.from({ length: width }, (_1, _2) => false)
    );
    this.width = width;
    this.depth = depth;
  }

  public getBoard = () => this.board;
  public getWidth = () => this.width;
  public getDepth = () => this.depth;
  public getValueAt = (x: number, y: number) => this.board[y][x];

  public update(points: Array<[number, number, boolean]>) {
    points.forEach(([x, y, value]: [number, number, boolean]) => {
      if (x >= 0 && x < this.width && y >= 0 && y < this.depth)
        this.board[y][x] = value;
    });
  }
}

export { TetrisBoard };
