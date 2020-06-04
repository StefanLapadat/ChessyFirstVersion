import { IFigure } from "../IFigure";

export abstract class StandardFigure implements IFigure {

    public width() { return 46; }
    public height() {return 46; }

    public abstract render(): JSX.Element;
}