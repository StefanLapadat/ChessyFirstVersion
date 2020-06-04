import { PlayerColor } from "../../Model/PlayerColor";

export interface ChessBoardProps{
    whitecolor: string,
    blackcolor: string,
    numRows: number,
    numCols: number,
    color: PlayerColor,
    draggableFigures: boolean
}