import { IFigure } from "./IFigure";
import * as React from 'react';

export class PositionedFigure implements IFigure{

    private innerFigure: IFigure;
    private _x: number;
    private _y: number;

    public constructor(innerFigure: IFigure, x: number, y: number){
        this.innerFigure = innerFigure;
        this._x = x;
        this._y = y;
    }

    public render(): JSX.Element{
        return <g transform={`translate(${this._x}, ${this._y})`}>
            { this.innerFigure.render() }
        </g>
    }

    public width(): number{
        return this.innerFigure.width();
    }

    public height(): number{
        return this.innerFigure.height();
    }

    public x(): number{
        return this._x;
    }

    public y(): number{
        return this._y;
    }
}