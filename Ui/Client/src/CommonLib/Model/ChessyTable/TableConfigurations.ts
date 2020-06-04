import { FigureOnTableJson } from "./FigureOnTableJson";
import { FigureOnTable } from "./FigureOnTable";
import { FigureOnTableJsonToFigureOnTableTranslator } from "./FigureOnTableJsonToFigureOnTableTranslator";
import * as settings from '../../Resources/commonTableConfigurations.json'; 

export class TableConfigurations{
    
    public static StandardConfiguration(): FigureOnTable[]{
        return TableConfigurations.getConfigurationFromObject(
            settings.configurations.standard);
    }

    private static getConfigurationFromObject(input: FigureOnTableJson[]): FigureOnTable[]{
        var result: FigureOnTable[] = null;
        var translator: FigureOnTableJsonToFigureOnTableTranslator = 
            new FigureOnTableJsonToFigureOnTableTranslator(); //TO DO: Use DI here!!
        result = input.map(a => translator.translate(a));
        return result;
    }
}
