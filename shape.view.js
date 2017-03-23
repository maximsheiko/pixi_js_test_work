
class ShapeView {

    constructor(game) {
        this.app = game.app

        this.game = game
        let self = this
        let canvas = document.getElementById('canvas')
        this.app.renderer.view.style.display = "block";
        this.app.renderer.view.style.marginLeft = "auto";
        this.app.renderer.view.style.marginRight = "auto";
        this.app.renderer.view.style.display = "block";
        canvas.appendChild(this.app.view);

        this.gravityMinBtn = document.getElementById('gravityMin')
        this.gravityMaxBtn = document.getElementById('gravityMax')
        this.shapeSpeedMinBtn = document.getElementById('shapeSpeedMin')
        this.shapeSpeedMaxBtn = document.getElementById('shapeSpeedMax')
        
        this.shapeCountInp = document.getElementById('shapeCount')
        this.shapeAreaInp = document.getElementById('area')
        this.gravityInp = document.getElementById('gravity')
        this.shapeSpeedInp = document.getElementById('shapeSpeed')

        this.gravityMinBtn.addEventListener('click',function(){
            self.game.decreaseGravity()
        })

        this.gravityMaxBtn.addEventListener('click',function(){
            self.game.increaseGravity()
        })

        this.shapeSpeedMinBtn.addEventListener('click',function(){
            self.game.decreaseSpeed()
        })
        this.shapeSpeedMaxBtn.addEventListener('click',function(){
            self.game.increaseSpeed()
        })
    }

    addShape(newShape) {
        this.app.stage.addChild(newShape)
    }
    
    setShapeCount(value) {
        this.shapeCountInp.textContent = value
    }
    setGravity(value) {
        this.gravityInp.value = value
    }
    setShapeSpeed(value) {
        this.shapeSpeedInp.value = value
    }
    setSquare(value) {
        this.shapeAreaInp.textContent = value
    }
}
exports = ShapeView