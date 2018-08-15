import { coordinates } from './data/coordinate.js'
export function ligature (mainJson) {
    var coordinate = coordinates[mainJson.pages[0].modelType - 1]
    var spaceX = coordinate.spaceX;
    var spaceY = coordinate.spaceY;
    var Y = coordinate.contentY - spaceY;
    var X = coordinate.contentX - spaceX;
    var rightX = coordinate.rightX;
    var modelType = coordinate.modelType;
    for (var i = 1; i < mainJson.pages[0].children.length; i++) {
        mainJson.pages[0].children[i].transform[7] = 0;
        mainJson.pages[0].children[i].transform[8] = 0;
        if ( i !== 0 && i % 2 == 0) {
            if (modelType === 4) {
                mainJson.pages[0].children[i].transform[0] = rightX;
                mainJson.pages[0].children[i].transform[1] = Y;
            } else {
                Y = Y + spaceY;
                X = X + spaceX;
                mainJson.pages[0].children[i].transform[0] = X;
                mainJson.pages[0].children[i].transform[1] = Y;
            }
        } else {
            Y = Y + spaceY;
            X = X + spaceX;
            mainJson.pages[0].children[i].transform[0] = X;
            mainJson.pages[0].children[i].transform[1] = Y;
        }
    }
}

