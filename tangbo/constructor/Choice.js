import { Box } from './Box'
export class Chioce extends Box{
    constructor(config){
        this.isRight=config.rightAnswer;
        this.groupType=config.groupType;
    }
}
