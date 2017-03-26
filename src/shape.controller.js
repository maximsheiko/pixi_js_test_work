class Game {

    constructor() {
        this.shapeTypes = ['3 sides', '4 sides', '5 sides', '6 sides', 'circle', 'ellipse', 'random']
        this.gravity = 1
        this.shapeSpeed = 1
        this.shapeSquare = 0
        
        
        this.count = 1
        this.shapes = []
        this.view.setGravity(this.gravity)
        this.view.setShapeSpeed(this.shapeSpeed)
        this.view.setShapeCount(this.shapes.length)

        this.app.stage.interactive = true
        this.app.stage.on('pointertap', (e) => {
            if (e.target.name !== 'hitArea') {
                this.destroyShape(e.target)
            }
        })

        this.view.renderHitArea()

        this.app.ticker.add(()=> {
            if (this.count % (60 / this.shapeSpeed) == 0) {
                //generate new shape
                

                this.createShape(randX, this.gravity < 0 ? this.appHeight : 0)
                this.count = 1
            } else {
                this.count++
            }

            //get square every second to
            if (this.count % 60 == 0) {
                let pixels = this.app.renderer.extract.pixels()
                let counterSquare = 0
                //let counterBack = 0
                for (var i = 0; i < pixels.length; i += 4) {
                    if (pixels[i] && pixels[i] !== 16 && pixels[i + 1] !== 153 && pixels[i + 2] !== 187) {
                        counterSquare++
                    }
                }
                this.shapeSquare = counterSquare
            }

            this.shapes.forEach((shape)=> {
                if (shape._texture) shape.y += this.gravity

                if (shape.y > this.appHeight || shape.y < 0) {
                    this.destroyShape(shape)
                }
            })

            this.view.setShapeCount(this.shapes.length)
            this.view.setSquare(this.shapeSquare)
        })
    }

    createShape(x, y) {
        let randomShape = Math.floor(Math.random() * (this.shapeTypes.length))
        let newShape = new Shape(this.shapeTypes[randomShape], x, y).sprite;
        this.view.addShape(newShape)
        this.shapes.push(newShape)
    }

    increaseGravity() {
        this.gravity++
        this.view.setGravity(this.gravity)
    }

    decreaseGravity() {
        this.gravity--
        this.view.setGravity(this.gravity)
    }

    increaseSpeed() {
        this.shapeSpeed++
        this.view.setShapeSpeed(this.shapeSpeed)
    }

    decreaseSpeed() {
        this.shapeSpeed--
        this.view.setShapeSpeed(this.shapeSpeed)
    }

    destroyShape(shape) {
        shape.destroy()
        this.shapes.splice(this.shapes.indexOf(shape), 1)
    }

}

exports = Game