import * as React from "react";
import { IFigure } from "./IFigure";
import { PositionedFigure } from "./PositionedFigure";

export class DraggableFigure implements IFigure{

    protected innerFigure: PositionedFigure;

    public constructor(innerFigure: PositionedFigure){
        this.innerFigure = innerFigure;
    }
    
    public render(): JSX.Element{
        return <g>
            { this.innerFigure.render() }
            <rect   
                    
                    style={{fill:'#000000', strokeWidth:0, stroke:'#000000'}} 
                    width={this.innerFigure.width()} height={this.innerFigure.height()}
                    x={this.innerFigure.x()} y={this.innerFigure.y()}
                    fillOpacity="0" className={"draggable"}>
            </rect>
        </g>
    }

    public width(): number{
        return this.innerFigure.width();
    }

    public height(): number{
        return this.innerFigure.height();
    }
}