class Shape {
    constructor(type, x, y) {
        this.shape = new PIXI.Graphics()

        this.shape.lineStyle(0);
        let randColor ="0x"+((1<<24)*Math.random()|0).toString(16)
        this.shape.beginFill(randColor, 1);
        let polyPts

        //hardcoded primitives
        switch (type) {
            case '3 sides':
                polyPts = [20, 10, 40, 100, 100, 20]
                this.shape.drawPolygon(polyPts);
                break
            case '4 sides':
                this.shape.drawRect(50, 250, 100, 100);
                break
            case '5 sides':
                polyPts = [20, 10, 70, 10, 90, 45, 50, 70 , 0,45]
                this.shape.drawPolygon(polyPts);
                break
            case '6 sides':
                polyPts = [20, 20, 60, 20, 80, 60, 60, 100,20,100,0,60]
                this.shape.drawPolygon(polyPts);
                break
            case 'circle':
                this.shape.drawCircle(x, y, 60);
                break
            case 'ellipse':
                this.shape.drawEllipse(x, y, 80, 40);
                break
            case 'random':
                this.shape.moveTo(22, 11);
                this.shape.arcTo(41, -8, 58, 11, 18);
                this.shape.arcTo(86, 20, 65, 48, 18);
                this.shape.arcTo(62, 74, 32, 61, 18);
                this.shape.arcTo(-4, 69, 4, 40, 18);
                this.shape.arcTo(-2, 11, 22, 11, 18);
                break

        }
        this.shape.endFill();

        this.shape.boundsPadding = 0;
        let texture = this.shape.generateCanvasTexture();
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.interactive = true;
        this.sprite.rotation = Math.random()
        this.sprite.scale.x = this.sprite.scale.y = Math.random()*0.25 + 0.75
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.x = x;
        this.sprite.y = y;
    }
}

exports = Shape