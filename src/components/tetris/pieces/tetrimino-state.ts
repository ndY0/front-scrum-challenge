import { isArray } from "util";

class TetriminoState {
  private height: number;
  private width: number;
  private positions: Array<Array<boolean>>;
  private offsetTop: number = 0;
  private offsetBottom: number = 0;
  private offsetLeft: number = 0;
  private offsetRight: number = 0;
  private effectiveHeight: number = 0;
  private effectiveWidth: number = 0;

  public getOffsetTop = () => this.offsetTop;
  public getOffsetBottom = () => this.offsetBottom;
  public getOffsetRight = () => this.offsetRight;
  public getOffsetLeft = () => this.offsetLeft;
  public getHeight = () => this.height;
  public getWidth = () => this.width;
  public getEffectiveHeight = () => this.effectiveHeight;
  public getEffectiveWidth = () => this.effectiveWidth;

  constructor(positions: Array<Array<boolean>>) {
    this.height = positions.length;
    if (isArray(positions[0])) {
      this.width = positions[0].length;
    } else {
      throw new Error("There must be at least one row");
    }
    this.positions = positions;
    this.initialiseOffsets();
    this.initialiseEffectiveDimensions();
  }

  private initialiseOffsets() {
    this.offsetTop = this.positions.reduce(
      (selectedRowIndex: number, currentRow: boolean[], rowNumber: number) =>
        currentRow.reduce(
          (isFilled: boolean, currTile: boolean) => isFilled || currTile,
          false
        )
          ? selectedRowIndex
          : rowNumber,
      0
    );
    this.offsetBottom = this.positions
      .reverse()
      .reduce(
        (selectedRowIndex: number, currentRow: boolean[], rowNumber: number) =>
          currentRow.reduce(
            (isFilled: boolean, currTile: boolean) => isFilled || currTile,
            false
          )
            ? selectedRowIndex
            : rowNumber,
        0
      );
    this.offsetRight = this.positions
      .map((currentRow: boolean[]) =>
        currentRow.findIndex((tileValue: boolean) => tileValue)
      )
      .reduce((lowestIndex: number, current: number) =>
        lowestIndex > current ? current : lowestIndex
      );
    this.offsetLeft = this.positions
      .map((currentRow: boolean[]) =>
        currentRow.reverse().findIndex((tileValue: boolean) => tileValue)
      )
      .reduce((lowestIndex: number, current: number) =>
        lowestIndex > current ? current : lowestIndex
      );
  }

  private initialiseEffectiveDimensions() {
    this.effectiveWidth =
      this.getWidth() - (this.getOffsetLeft() + this.getOffsetRight());
    this.effectiveHeight =
      this.getHeight() - (this.getOffsetBottom() + this.getOffsetTop());
  }
}

export { TetriminoState };
