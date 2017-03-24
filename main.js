class Game {

    constructor() {
        this.shapeTypes = ['3 sides', '4 sides', '5 sides', '6 sides', 'circle', 'ellipse','random']
        this.gravity = 1
        this.shapeSpeed = 1
        this.shapeSquare = 0
        this.app = new PIXI.Application(512, 512, {backgroundColor: 0x1099bb})
        this.view = new ShapeView(this)
        this.appHeight = this.app.renderer.height / this.app.renderer.resolution
        this.appWidth =  this.app.renderer.width / this.app.renderer.resolution
        this.count = 1
        this.shapes = []
        this.view.setGravity(this.gravity)
        this.view.setShapeSpeed(this.shapeSpeed)
        this.view.setShapeCount(this.shapes.length)

        this.app.stage.interactive = true
        this.app.stage.on('pointertap', (e, target) => {
           if (e.target.name !== 'hitArea') {
               this.destroyShape(e.target)
           }
        })

        this.view.renderHitArea()

        this.app.ticker.add(()=> {
            if (this.count%(60/this.shapeSpeed) == 0) {
                //generate new shape
                let randX = Math.floor(Math.random() * (this.appWidth-20))

                this.createShape(randX,this.gravity < 0 ? this.appHeight : 0)
                this.count = 1
                let pixels = this.app.renderer.extract.pixels(this.app.stage)

                //todo
                //for (var i = 0; i < pixels.length; i+=4) {
                //    if (pixels[i] == 16) {
                //        this.shapeSquare++
                //    }
                //}
            } else {
                this.count ++
            }

            this.shapes.forEach((shape)=> {
                if (shape._texture) shape.y += this.gravity

                if (shape.y > this.appHeight) {
                    this.destroyShape(shape)
                }
            })

            this.view.setShapeCount(this.shapes.length)
            this.view.setSquare(this.shapeSquare)
        })
    }

    createShape(x,y) {
        let randomShape = Math.floor(Math.random() * (this.shapeTypes.length))
        let newShape = new Shape(this.shapeTypes[randomShape],x,y).sprite;
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
        this.shapes.splice(this.shapes.indexOf(shape),1)
    }

}

exports = Game