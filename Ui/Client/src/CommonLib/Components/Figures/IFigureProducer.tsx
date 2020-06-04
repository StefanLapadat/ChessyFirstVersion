
import { IFigure } from "./IFigure";
import { Tuple } from "../../Utils/Tuple";
import { PlayerColor } from "../../Model/PlayerColor";
import { FigureType } from "../../Model/ChessyTable/FigureType";

export interface IFigureProducer{
    /**
     * 
     * @param dim dim.x represents width of a resulting figure; dim.y represents height. 
     */
    produce(figureType: FigureType, color: PlayerColor): IFigure;
}