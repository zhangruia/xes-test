import { Box } from './Box'
export class FillVacancy extends Box{
    constructor(config){
        this.rightAnswer=config.rightAnswer;
        this.groupType=config.groupType;
        this.defaultTexture=config.defaultTexture;
        this.focusTexture=config.focusTexture;
    }
}