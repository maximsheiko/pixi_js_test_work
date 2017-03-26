/**
 * Created by Andrew on 3/26/2017.
 */

class SpawnController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.count = 0;
        this.shapeTypes = [RandomShape.CIRCLE, '4 sides', '5 sides', '6 sides', 'circle', 'ellipse', 'random'];
        

        this.view.hitAreaSprite.on('pointerup', (e)=> {
            this.addRandomShape(e.data.global.x,e.data.global.y);
        });
        
        this.view.app.stage.interactive = true;
        this.view.app.stage.on('pointertap', (e) => {
            if (e.target.name !== 'hitArea') {
                this.destroyShape(e.target)
            }
        })
    }

    tick() {
        if (this.count % 60 == 0) {
            this.count = 0;
            for (var i = 0; i < this.model.shapesPerSec; i++) {
                let randX = Math.floor(Math.random() * (this.appWidth));
                this.addRandomShape(randX, 0);
            }
        }
    }

    destroyShape(shape) {
        this.model.destroyShape(shape);
        shape.destroy();
    }
    
    addRandomShape(x, y) {
        let randomShape = Math.floor(Math.random() * (this.shapeTypes.length));
        var shape = new RandomShape(x, y, this.shapeTypes[randomShape]);
        this.model.addShape(shape);
    }
}