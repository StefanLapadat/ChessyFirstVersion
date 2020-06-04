import { FigureOnTableJson } from "./FigureOnTableJson";
import { FigureOnTable } from "./FigureOnTable";
import { PlayerColor } from "../PlayerColor";
import { TableRowMark } from "./TableRowMark";
import { TableColumnMark } from "./TableColumnMark";
import { FigureType } from "./FigureType";

export class FigureOnTableJsonToFigureOnTableTranslator{
    public translate(figure: FigureOnTableJson): FigureOnTable{
        var result: FigureOnTable = null;
        var color: PlayerColor, row: TableRowMark, column: TableColumnMark, type: FigureType;
        
        switch(figure.figure){
            case "pawn": type = FigureType.Pawn; break;
            case "rook": type = FigureType.Rook; break;
            case "bishop": type = FigureType.Bishop; break;
            case "knight": type = FigureType.Knight; break;
            case "king": type = FigureType.King; break;
            case "queen": type = FigureType.Queen; break;
            default: throw new Error(`Unknown figure - ${figure.figure}`);
        }

        switch(figure.color){
            case "white": color = PlayerColor.White; break;
            case "black": color = PlayerColor.Black; break;
            default: throw new Error(`Unknown color - ${figure.color}`);
        }

        switch(figure.row){
            case "1": row = TableRowMark.One; break;
            case "2": row = TableRowMark.Two; break;
            case "3": row = TableRowMark.Three; break;
            case "4": row = TableRowMark.Four; break;
            case "5": row = TableRowMark.Five; break;
            case "6": row = TableRowMark.Six; break;
            case "7": row = TableRowMark.Seven; break;
            case "8": row = TableRowMark.Eight; break;
            default: throw new Error(`Unsupported row - ${figure.row}`);
        }

        switch(figure.column){
            case "A": column = TableColumnMark.A; break;
            case "B": column = TableColumnMark.B; break;
            case "C": column = TableColumnMark.C; break;
            case "D": column = TableColumnMark.D; break;
            case "E": column = TableColumnMark.E; break;
            case "F": column = TableColumnMark.F; break;
            case "G": column = TableColumnMark.G; break;
            case "H": column = TableColumnMark.H; break;
            default: throw new Error(`Unsupported column - ${figure.column}`);
        }

        result = new FigureOnTable(type, color, row, column);

        return result; 
    }
}