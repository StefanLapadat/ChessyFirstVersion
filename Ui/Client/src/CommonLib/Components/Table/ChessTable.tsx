import * as React from "react";
import { PlayerColor } from "../../Model/PlayerColor";
import { Tuple } from "../../Utils/Tuple";
import { StandardFigureProducer } from "../Figures/StandardFigures/StandardFigureProducer";
import { IFigureProducer } from "../Figures/IFigureProducer";
import { FigureOnTable } from "../../Model/ChessyTable/FigureOnTable";
import { FigureType } from "../../Model/ChessyTable/FigureType";
import { TableCell } from "../../Model/ChessyTable/TableCell";
import { PositionedFigure } from "../Figures/PositionedFigure";
import { IFigure } from "../Figures/IFigure";
import { DraggableFigure } from "../Figures/DraggableFigure";
import { ScaledFigure } from "../Figures/ScaledFigure";
import { ChessTableProps } from "./ChessTableProps";
import { ChessBoard } from "./ChessBoard";
import { ChessBoardProps } from "./ChessBoardProps";

export class ChessTable extends React.Component<ChessTableProps, any> {
    public static cellWidth: number = 100;
    public static cellHeight: number = 100;
    private width: number;
    private height: number;

    constructor(props: ChessTableProps){
        super(props);
        this.width = ChessTable.cellWidth * this.props.numCols;
        this.height = ChessTable.cellHeight * this.props.numRows;
    }

    public render(): JSX.Element {
        return (
            <svg id="chess-tablee" viewBox={`${0} ${0}  ${this.width} ${this.height}`} 
                xmlns="http://www.w3.org/2000/svg">

                    {this.Board(this.props)}
                    {this.Figures(this.props.figures)}
            </svg>
        );
    }

    private Board(props: ChessBoardProps): JSX.Element{
        return <ChessBoard {...props} />;
    }

    private Figures(props: FigureOnTable[]): JSX.Element[]{
        return props.map(a=> this.figure(a).render());
    }

    private figure(figure: FigureOnTable): IFigure{
        return this.props.draggableFigures? 
        this.draggableFigure(figure): 
        this.positionedFigure(figure);
    }

    private draggableFigure(figure: FigureOnTable): DraggableFigure{
        var positionedFigure = this.positionedFigure(figure);
        var draggableFigure = new DraggableFigure(positionedFigure);
        
        return draggableFigure;
    }

    private positionedFigure(figure: FigureOnTable): PositionedFigure{
        var position = this.coordinatesOfCell(figure.cell);

        var cleanFigure = this.cleanFigure(figure.figureType, figure.color);
        var scaledFigure = new ScaledFigure(cleanFigure, ChessTable.cellWidth, ChessTable.cellHeight);
        var positionedFigure = new PositionedFigure(scaledFigure, position.x, position.y);
        
        return positionedFigure;
    }

    private cleanFigure(figureType: FigureType, color: PlayerColor): IFigure{
        var producer: IFigureProducer = new StandardFigureProducer();
        return producer.produce(figureType, color);
    }
    
    private coordinatesOfCell(tableCell: TableCell): Tuple<number, number>{
        var yIndex = this.props.color === PlayerColor.White ?
                    (this.props.numRows - tableCell.row - 1) :
                    (tableCell.row);

        var xIndex = tableCell.column;

        return {x: ChessTable.cellWidth * xIndex, y: ChessTable.cellHeight * yIndex};
    }
}