import { FigureType } from "./FigureType";
import { TableCell } from "./TableCell";
import { Figures } from "./Figures";
import { TableCellFactory } from "./TableCellFactory";
import { FigureOnTable } from "./FigureOnTable";
import { PlayerColor } from "../PlayerColor";

export class ChessyTable{
    public static dim: number = 8;
    private width: number;
    private whiteColor: string;
    private blackColor: string;
    private namespaceURI: string = 'http://www.w3.org/2000/svg';
    private id: string;
    private static offsetForStandardFigures = { x: 2, y: 3 };
    private htmlNode: SVGAElement = null;
    private htmlNodeComputed: boolean = false;
    private selectedElement: Element = null;
    private clickingOffset: Point = null;
    private color: PlayerColor; 
    
    private cellWidth: number;
    
    public constructor(color: PlayerColor, width = 400, 
        whiteColor : string = 'eddcad', blackColor: string = 'b38a5b', id: string='chess-table'){
            this.color = color;
            this.width = width;
            this.cellWidth = this.width / ChessyTable.dim;
            this.whiteColor = whiteColor;
            this.blackColor = blackColor;
            this.id = id;
    }
    
    private html(color: PlayerColor): SVGAElement{
        var table: SVGAElement = document.createElementNS(this.namespaceURI, 'svg') as SVGAElement;
        table.setAttribute('id', this.id);
        table.setAttribute('viewBox', `0 0 ${this.width} ${this.width}`);
        table.setAttribute('xmlns', this.namespaceURI);

        var defs = document.createElementNS(this.namespaceURI, 'defs');
        var pattern = document.createElementNS(this.namespaceURI, 'pattern');
        pattern.setAttribute('id', 'Pattern');
        pattern.setAttribute('x', '0');
        pattern.setAttribute('y', '0');
        pattern.setAttribute('width', '0.25');
        pattern.setAttribute('height', '0.25');

        var rect1 = document.createElementNS(this.namespaceURI, 'rect');

        rect1.setAttribute('x', '0');
        rect1.setAttribute('y', '0');
        rect1.setAttribute('width', `${this.cellWidth}`);
        rect1.setAttribute('height', `${this.cellWidth}`);
        rect1.setAttribute('fill', `#${this.whiteColor}`);

        var rect2 = document.createElementNS(this.namespaceURI, 'rect');

        rect2.setAttribute('x', `${this.cellWidth}`);
        rect2.setAttribute('y', '0');
        rect2.setAttribute('width', `${this.cellWidth}`);
        rect2.setAttribute('height', `${this.cellWidth}`);
        rect2.setAttribute('fill', `#${this.blackColor}`);

        var rect3 = document.createElementNS(this.namespaceURI, 'rect');

        rect3.setAttribute('x', '0');
        rect3.setAttribute('y', `${this.cellWidth}`);
        rect3.setAttribute('width', `${this.cellWidth}`);
        rect3.setAttribute('height', `${this.cellWidth}`);
        rect3.setAttribute('fill', `#${this.blackColor}`);

        var rect4 = document.createElementNS(this.namespaceURI, 'rect');

        rect4.setAttribute('x', `${this.cellWidth}`);
        rect4.setAttribute('y', `${this.cellWidth}`);
        rect4.setAttribute('width', `${this.cellWidth}`);
        rect4.setAttribute('height', `${this.cellWidth}`);
        rect4.setAttribute('fill', `#${this.whiteColor}`);

        pattern.appendChild(rect1);
        pattern.appendChild(rect2);
        pattern.appendChild(rect3);
        pattern.appendChild(rect4);


        defs.appendChild(pattern);

        table.appendChild(defs);

        var rect = document.createElementNS(this.namespaceURI, 'rect');

        rect.setAttribute('fill', 'url(#Pattern)');
        rect.setAttribute('width', `${this.width}`);
        rect.setAttribute('height', `${this.width}`);

        table.appendChild(rect);

        return table;
    }

    private getFigure(figureType: FigureType, color: PlayerColor, tableCell: TableCell): SVGGElement{
        var figure : SVGGElement = null;
        var coordinates = this.figureTableCoordinatesFromTableCell(tableCell);

        switch(figureType){
            case FigureType.Pawn:
                figure = Figures.createPawn(coordinates.x, coordinates.y, color);
                break;
            case FigureType.Rook:
                figure = Figures.createRook(coordinates.x, coordinates.y, color);
                break;
            case FigureType.Bishop:
                figure = Figures.createBishop(coordinates.x, coordinates.y, color);
                break;
            case FigureType.Knight:
                figure = Figures.createKnight(coordinates.x, coordinates.y, color);
                break;
            case FigureType.King:
                figure = Figures.createKing(coordinates.x, coordinates.y, color);
                break;
            case FigureType.Queen:
                figure = Figures.createQueen(coordinates.x, coordinates.y, color);
                break;
        }

        return figure;
    }

    private figureTableCoordinatesFromTableCell(tableCell: TableCell): Point{
        var yIndex = this.color === PlayerColor.White ?
                    (ChessyTable.dim - tableCell.row - 1) :
                    (tableCell.row);

        var xIndex = tableCell.column;

        return {x: this.cellWidth * xIndex + 
                    ChessyTable.offsetForStandardFigures.x,
                y: this.cellWidth * yIndex + 
                    ChessyTable.offsetForStandardFigures.y};
    }

    public tableWithFigures(figures: FigureOnTable[], 
            color: PlayerColor = PlayerColor.White, draggable: boolean): Element{
            
        if(this.htmlNodeComputed){
            throw new Error('This object was used before. Create new one to use this method again.');
        }else{
            this.htmlNodeComputed = true;
            this.htmlNode = this.html(color);
        }

        if(draggable){
            this.htmlNode.addEventListener('mousemove', this.drag);
            this.htmlNode.addEventListener('mouseup',   this.endDrag);
            this.htmlNode.addEventListener('mouseleave', this.endDrag);
        }

        var that = this;
        var child : any;
        figures.forEach(a => {
            var figure = this.getFigure(a.figureType, a.color, a.cell);
            if(draggable){
                for (var i = 0; i < figure.childNodes.length; i++) {
                    child = figure.childNodes[i];
                    if (child.className == "draggable") {
                        break;
                    }
                }
                that.makeDraggable(child);
            }
            this.htmlNode.appendChild(figure);
        });

        return this.htmlNode;
    }

    private pointToTableCell(point: Point): TableCell {
        if(point.x < 0 || point.x > this.width || point.y < 0 || point.y > this.width){
            return null;
        }

        var yIndex : number = this.color === PlayerColor.White ? 
        Math.floor((this.width - point.y) / this.cellWidth) :
        Math.floor(point.y / this.cellWidth);

        var xIndex: number = Math.floor(point.x / this.cellWidth);

        return TableCellFactory.createCellFromZeroBasedNumbers(yIndex, xIndex);
    }

    private getMousePosition(evt: any): Point {
        var CTM = this.htmlNode.getScreenCTM();

        return new Point((evt.clientX - CTM.e) / CTM.a, (evt.clientY - CTM.f) / CTM.d);
    }
   
    private makeDraggable(figure: any) {
        figure.addEventListener('mousedown', this.startDrag);
    }

    private startDrag = (evt: any) => {
        if (evt.currentTarget.classList.contains('draggable') && evt.button === 0) {
            this.selectedElement = evt.currentTarget;
            var coord = this.getMousePosition(evt);
            var xy = this.selectedElement.parentElement.getAttribute('transform').match(/[+-]?([0-9]*[.])?[0-9]+/g);
            this.selectedElement.parentElement.setAttributeNS(
                null, "transform", 
                `translate(${coord.x - this.cellWidth / 2},${coord.y - this.cellWidth/2})`);

            this.htmlNode.removeChild(this.selectedElement.parentElement);
            this.htmlNode.appendChild(this.selectedElement.parentElement);
            this.clickingOffset = this.getMousePosition(evt);
            xy = this.selectedElement.parentElement.getAttribute('transform').match(/[+-]?([0-9]*[.])?[0-9]+/g);
            this.clickingOffset.x -= parseFloat(xy[0]);
            this.clickingOffset.y -= parseFloat(xy[1]);
        }
    }

    private drag = (evt: any)  => {
        if (this.selectedElement) {
            evt.preventDefault();
            var coord = this.getMousePosition(evt);
            this.selectedElement.parentElement.setAttributeNS(
                null, "transform", 
                `translate(${coord.x - this.clickingOffset.x},${coord.y - this.clickingOffset.y})`);
        }
    }

    private endDrag = (evt: any) => {
        if(this.selectedElement){
            var currentPoint : Point = {x: null, y: null};
            var xy = this.selectedElement.parentElement.getAttribute('transform').match(/[+-]?([0-9]*[.])?[0-9]+/g);
            currentPoint.x = parseFloat(xy[0]) + this.cellWidth / 2 - ChessyTable.offsetForStandardFigures.x; 
            currentPoint.y = parseFloat(xy[1]) + this.cellWidth / 2 - ChessyTable.offsetForStandardFigures.y;
            var cell = this.pointToTableCell(currentPoint);
            this.moveFigureToCell(this.selectedElement.parentElement, cell);
            
            this.selectedElement = null;
        }
    }

    private moveFigureToCell(figure: any, cell: TableCell): void{
        var coordinates = this.figureTableCoordinatesFromTableCell(cell);
        figure.setAttributeNS(null, "transform", `translate(${coordinates.x},${coordinates.y})`);
    }
}

class Point{
    public x: number;
    public y: number;

    public constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}