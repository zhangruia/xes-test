export function nest (children) {
    if (children[0]){
        children[0].transform[0] = 20;
        children[0].transform[1] = 15;
    }
    if (children.children) {
        nest(children.children)
    }
}