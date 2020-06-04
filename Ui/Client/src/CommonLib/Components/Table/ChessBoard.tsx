import * as React from 'react';
import { ChessTable } from './ChessTable';
import { ChessBoardProps } from './ChessBoardProps';

export class ChessBoard extends React.Component<ChessBoardProps, any>{

    public render(){
        var black = this.props.blackcolor,
            white = this.props.whitecolor,
            width = ChessTable.cellWidth,
            height = ChessTable.cellHeight;

        return <g>
                <defs>
                    <pattern id="Pattern1" x="0" y="0" 
                            width={2/this.props.numCols} height={2/this.props.numRows}>

                        {this.cell(width, height, 0, 0, white)}
                        {this.cell(width, height, width, 0, black)}
                        {this.cell(width, height, 0, height, black)}
                        {this.cell(width, height, width, height, white)}

                    </pattern>
                </defs>
                <rect fill="url(#Pattern1)" width={this.width()} height={this.height()}>
                </rect>
            </g>
    }

    private cell(width: number, height: number, x: number, y: number, color: string){
        return  <rect 
                    x={x.toString()} 
                    y={y.toString()} 
                    width={width.toString()} 
                    height={height.toString()} 
                    fill={'#' + color}>
                </rect>;
    }

    private width() { return ChessTable.cellWidth * this.props.numCols; }
    private height() { return ChessTable.cellHeight * this.props.numRows; }

}