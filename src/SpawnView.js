/**
 * Created by Andrew on 3/26/2017.
 */
class SpawnView {
    constructor(model, app) {
        this.model = model;
        this.app = app;

        let hitArea = new PIXI.Graphics()
        hitArea.lineStyle(0);
        hitArea.beginFill(0xFFFF0B, 0)
        hitArea.drawRect(0, 0, this.game.appWidth, this.game.appHeight)
        hitArea.endFill()
        hitArea.boundsPadding = 0;
        this.hitAreaSprite = new PIXI.Sprite(hitArea.generateCanvasTexture());
        this.hitAreaSprite.interactive = true
        this.hitAreaSprite.name = 'hitArea'
        //hitArea.zOrder = -10
        this.app.stage.addChild(hitArea)
    }
    
    tick() {
        this.model.shapesArr.forEach((item)=>{
            item.y += this.model.gravity;
        })
    }
}