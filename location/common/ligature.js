import { Coordinates } from './data/coordinate.js'
import { nest } from './nest.js'
export function ligature (mainJson) {
    var coordinates = new Coordinates(mainJson);
    var coordinate;
    //判断题型
    if (mainJson.pages[0].modelType == 1) {
        coordinate = coordinates.coordinate1;
    } else if (mainJson.pages[0].modelType == 2) {
        coordinate = coordinates.coordinate2;
    } else if (mainJson.pages[0].modelType == 3) {
        coordinate = coordinates.coordinate3;
    } else {
        coordinate = coordinates.coordinate4;
    }
    var spaceX = coordinate.spaceX;
    var spaceY = coordinate.spaceY;
    var stemX = coordinate.stemX;
    var stemY = coordinate.stemY;
    var answerX = coordinate.answerX;
    var answerY = coordinate.answerY;
    // var modelType = coordinate.modelType;
    var children = mainJson.pages[0].children;
    for (var i = 0; i < children.length; i++) {
        children[i].transform[2] = 1;
        children[i].transform[3] = 1;
        children[i].transform[4] = 0;
        children[i].transform[5] = 0;
        children[i].transform[6] = 0;
        children[i].transform[7] = 0;
        children[i].transform[7] = 0;
        if (children[i].name == 'bgImg') {
            children[i].rectangle = [0, 0, 1920, 1080];
            children[i].transform = [0, 0, 1, 1, 0, 0, 0, 0, 0];
        } else if (children[i].conName == 'Text') {
            children[i].rectangle = [0, 0, 0, 40];
            children[i].transform = [200, 100, 1, 1, 0, 0, 0, 0, 0];
        } else if (children[i].name == 'submit_btn') {
            children[i].rectangle = [0, 0, 210, 80];
            children[i].transform = [1500, 900, 1, 1, 0, 0, 0, 0, 0];
        } else {
            if (children[i].groupType == 'ligature_stem' 
                || children[i].groupType == 'choice' 
                || children[i].groupType == 'blank') {
                children[i].transform[0] = stemX;
                children[i].transform[1] = stemY;
                stemX = stemX + spaceX;
                stemY = stemY + spaceY;
            }
            if (children[i].groupType == 'ligature_answer') {
                children[i].transform[0] = answerX;
                children[i].transform[1] = answerY;
                answerX = answerX + spaceX;
                answerY = answerY + spaceY;
            }
        }
        if (children[i].children) {
            nest(children[i].children)
            // console.log(children[i].children)
        }
    }
}

