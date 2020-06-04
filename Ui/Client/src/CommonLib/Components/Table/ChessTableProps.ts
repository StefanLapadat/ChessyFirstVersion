import { PlayerColor } from "../../Model/PlayerColor";
import { FigureOnTable } from "../../Model/ChessyTable/FigureOnTable";

export interface ChessTableProps{
    whitecolor: string,
    blackcolor: string,
    numRows: number,
    numCols: number,
    color: PlayerColor,
    figures: FigureOnTable[],
    draggableFigures: boolean
}