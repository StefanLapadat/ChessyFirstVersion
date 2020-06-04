import { FigureType } from "./FigureType";
import { PlayerColor } from "../PlayerColor";
import { TableRowMark } from "./TableRowMark";
import { TableColumnMark } from "./TableColumnMark";
import { TableCell } from "./TableCell";
import { TableCellFactory } from "./TableCellFactory";

export class FigureOnTable{

    public figureType: FigureType;
    public color: PlayerColor;
    public cell: TableCell;

    public constructor(figureType: FigureType, color: PlayerColor, row: TableRowMark, column: TableColumnMark){
        this.figureType = figureType;
        this.color = color;
        this.cell = TableCellFactory.createCell(row, column);
    }
}