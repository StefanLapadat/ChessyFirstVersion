import * as React from "react";
import { IFigure } from "./IFigure";

export class ScaledFigure implements IFigure {

    private innerFigure: IFigure;
    private w: number;
    private h: number;

    public constructor(innerFigure: IFigure, width: number, height: number){
        this.innerFigure = innerFigure;
        this.w = width;
        this.h = height;
    }

    public render(): JSX.Element{
        
        return <g transform={`scale(${this.w/this.innerFigure.width()}, 
        ${this.h/this.innerFigure.height()})`}>
            { this.innerFigure.render() }
        </g>
    }

    public width(): number{
        return this.w;
    }

    public height(): number{
        return this.h;
    }
}