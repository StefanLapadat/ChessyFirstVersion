import { TableCell } from "./TableCell";
import { TableRowMark } from "./TableRowMark";
import { TableColumnMark } from "./TableColumnMark";

export class TableCellFactory{

    public static createCell(row: TableRowMark, column: TableColumnMark){
        return new TableCell(row, column);
    }

    /**
     * 
     * @param row One == 0, Two == 1, ... 
     * @param column A == 0, B == 1, ... 
     */
    public static createCellFromZeroBasedNumbers(row: number, column: number){
        

        return TableCellFactory.createCell(row, column);
    }
}