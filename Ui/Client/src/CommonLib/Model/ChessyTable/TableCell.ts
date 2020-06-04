import { TableRowMark } from "./TableRowMark";
import { TableColumnMark } from "./TableColumnMark";

export class TableCell{
    public row: TableRowMark;
    public column: TableColumnMark;

    public constructor(row: TableRowMark, column: TableColumnMark){
        this.row = row;
        this.column = column;
    }
}