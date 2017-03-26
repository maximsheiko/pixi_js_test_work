/**
 * Created by Andrew on 3/26/2017.
 */

class SpawnController {
    constructor(model, view,app) {
        this.model = model;
        this.view = view;
        this.count = 0;
        this.app = app;
        this.shapeTypes = ['3 sides', '4 sides', '5 sides', '6 sides', 'circle', 'ellipse', 'random'];

        this.setShapeCount(this.count);
        this.setGravity(this.model.gravity);
        this.setShapeSpeed(this.model.shapeSpeed);
        this.setSquare(this.model.area);

        this.view.app.stage.interactive = true;
        this.view.app.stage.on('pointertap', (e) => {
            if (e.target.name !== 'hitArea') {
                this.destroyShape(e.target)
            } else {
                this.addRandomShape(e.data.global.x,e.data.global.y);
            }
        })

        let self = this;
        this.view.gravityMinBtn.addEventListener('click',function(){
            self.decreaseGravity()
        })

        this.view.gravityMaxBtn.addEventListener('click',function(){
            self.increaseGravity()
        })

        this.view.shapeSpeedMinBtn.addEventListener('click',function(){
            self.decreaseSpeed()
        })
        this.view.shapeSpeedMaxBtn.addEventListener('click',function(){
            self.increaseSpeed()
        })
    }

    tick() {
        this.count++

        if (this.count % 60 == 0) {
            this.count = 0;

            for (let i = 0; i < this.model.shapeSpeed; i++) {
                let randX = Math.floor(Math.random() * (app_width));
                this.addRandomShape(randX, 0);
            }
        }

        //get square every second to best performance
        if (this.count % 60 == 0) {
            let pixels = this.app.renderer.extract.pixels()
            let counterSquare = 0
            //let counterBack = 0
            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i] && pixels[i] !== 16 && pixels[i + 1] !== 153 && pixels[i + 2] !== 187) {
                    counterSquare++
                }
            }
            this.model.area = counterSquare
            this.setShapeCount(this.model.shapes.length)
            this.setSquare(this.model.area)
        }

        this.model.shapes.forEach((shape)=>{
            if (shape.y > app_height || shape.y < 0) {
                this.destroyShape(shape)
            }
        })
    }

    destroyShape(shape) {
        this.model.destroyShape(shape);
        shape.destroy();
    }
    
    addRandomShape(x, y) {
        let randomShape = Math.floor(Math.random() * (this.shapeTypes.length));
        var shape = new RandomShape(x, y, this.shapeTypes[randomShape]);
        this.model.addShape(shape);
        this.view.addShape(shape);
    }

    setShapeCount(value) {
        this.view.shapeCountInp.textContent = value
    }
    setGravity(value) {
        this.view.gravityInp.value = value
    }
    setShapeSpeed(value) {
        this.view.shapeSpeedInp.value = value
    }
    setSquare(value) {
        this.view.shapeAreaInp.textContent = value
    }
    increaseGravity() {
        this.model.gravity++
        this.setGravity(this.model.gravity)
    }

    decreaseGravity() {
        this.model.gravity--
        this.setGravity(this.model.gravity)
    }

    increaseSpeed() {
        this.model.shapeSpeed++
        this.setShapeSpeed(this.model.shapeSpeed)
    }

    decreaseSpeed() {
        this.model.shapeSpeed--
        this.setShapeSpeed(this.model.shapeSpeed)
    }
}

exports = SpawnController