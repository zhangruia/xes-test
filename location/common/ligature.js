export function ligature (mainJson, coordinate) {
    // console.log(mainJson)
    // var json = mainJson.pages[0].children
    var X = coordinate.X;
    var Y = coordinate.Y;
    var rightX = coordinate.rightX;
    for (var i = 0; i < mainJson.pages[0].children.length; i++) {
    // console.log(mainJson.pages[0].children[i])
    mainJson.pages[0].children[i].transform[7] = 0;
    mainJson.pages[0].children[i].transform[8] = 0;
        if(i === 0) {
            mainJson.pages[0].children[i].transform[0] = 0;
            mainJson.pages[0].children[i].transform[1] = 0;
        } else {
            if ( i !== 0 && i % 2 == 0) {
                mainJson.pages[0].children[i].transform[0] = rightX;
                mainJson.pages[0].children[i].transform[1] = Y;
            } else {
                Y = Y + 200
                mainJson.pages[0].children[i].transform[0] = X;
                mainJson.pages[0].children[i].transform[1] = Y;
            }
        }
        
    }
    // console.log(mainJson)
}

