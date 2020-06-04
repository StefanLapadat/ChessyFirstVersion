import { IFigureProducer } from "../IFigureProducer";
import { IFigure } from "../IFigure";
import { PlayerColor } from "../../../Model/PlayerColor";
import * as Figures from './StandardFigures';
import { FigureType } from "../../../Model/ChessyTable/FigureType";
import { StandardFigure } from "./StandardFigure";

export class StandardFigureProducer implements IFigureProducer{
    public produce(figureType: FigureType, color: PlayerColor): IFigure{
        switch(figureType){
            
            case FigureType.King:
                if(color === PlayerColor.White)
                return new Figures.WhiteKing();
                else
                return new Figures.BlackKing();
                
            case FigureType.Queen:
                if(color === PlayerColor.White)
                return new Figures.WhiteQueen();
                else
                return new Figures.BlackQueen();

            case FigureType.Rook: 
                if(color === PlayerColor.White)
                    return new Figures.WhiteRook();
                else
                    return new Figures.BlackRook();

            case FigureType.Bishop:
                if(color === PlayerColor.White)
                return new Figures.WhiteBishop();
                else
                return new Figures.BlackBishop();

            case FigureType.Knight:
                if(color === PlayerColor.White)
                return new Figures.WhiteKnight();
                else
                return new Figures.BlackKnight();

            case FigureType.Pawn:
                if(color === PlayerColor.White)
                return new Figures.WhitePawn();
                else
                return new Figures.BlackPawn();
        }
    }
}