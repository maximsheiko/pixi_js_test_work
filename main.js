const shapeTypes = ['3 sides', '4 sides', '5 sides', '6 sides', 'circle', 'ellipse']//'random'
//import ShapeView from './shape.view'
class Game {

    constructor() {
        this.gravity = 1
        this.shapeSpeed = 1
        this.offsetShape = 50 //hardcoded click offset
        this.app = new PIXI.Application(512, 512, {backgroundColor: 0x1099bb});
        this.view = new ShapeView(this)
        this.appHeight = this.app.renderer.height / this.app.renderer.resolution
        this.appWidth =  this.app.renderer.width / this.app.renderer.resolution
        this.count = 1
        this.shapes = []
        this.view.setGravity(this.gravity)
        this.view.setShapeSpeed(this.shapeSpeed)
        this.view.setShapeCount(this.shapes.length)

        let createShape =  (x,y) => {
            let randomShape = Math.floor(Math.random() * (shapeTypes.length))
            let newShape = new Shape(shapeTypes[randomShape],x,y).sprite;
            this.view.addShape(newShape)
            this.shapes.push(newShape)
        }

        this.app.stage.interactive = true
        this.app.stage.on('pointertap', (e, target) => {
           if (e.target.name !== 'hitArea') {
               this.destroyShape(e.target)
           }
        })

        //cheat to detect click position
        let hitArea = new PIXI.Graphics()
        hitArea.lineStyle(0);
        hitArea.beginFill(0xFFFF0B, 0)
        hitArea.drawRect(0, 0, this.appWidth, this.appHeight)
        hitArea.endFill()
        hitArea.boundsPadding = 0;
        let hitAreaSprite = new PIXI.Sprite(hitArea.generateCanvasTexture());
        hitAreaSprite.interactive = true
        hitAreaSprite.name = 'hitArea'
        hitArea.zOrder = -10
        this.view.addShape(hitAreaSprite)

        hitAreaSprite.on('pointerup', (e)=> {
            createShape(e.data.global.x-this.offsetShape,e.data.global.y-this.offsetShape)
        })

        this.app.ticker.add(()=> {
            if (this.count%(60/this.shapeSpeed) == 0) {
                //generate new shape
                let randX = Math.floor(Math.random() * (this.appWidth-20))

                createShape(randX,this.gravity < 0 ? this.appHeight : 0)
                this.count = 1
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
            this.view.setSquare(this.shapes.length)
        })
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