/**
 * Created by Andrew on 3/26/2017.
 */
class SpawnModel {
    constructor () {
        this.shapesArr = [];
        
        this.gravity = 1;
        this.surface = 0;
        this.shapesPerSec = 1;
    }
    
    addShape (shape) {
        this.shapesArr.push(shape);
    }

    removeShape (shape) {
        this.shapesArr.splice(this.shapesArr.indexOf(shape), 1)
    }
}