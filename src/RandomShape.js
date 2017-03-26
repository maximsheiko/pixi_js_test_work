/**
 * Created by Andrew on 3/26/2017.
 */

class RandomShape/* extends PIXI.Sprite*/{
    constructor(x, y, type) {
        let shape = new PIXI.Graphics();

        //---

        let randColor = "0x" + ((1 << 24) * Math.random() | 0).toString(16);
        shape.lineStyle(0);
        shape.beginFill(randColor, 1);
        let polyPts;
        switch (type) {
            case '3 sides':
                polyPts = [20, 10, 40, 100, 100, 20];
                shape.drawPolygon(polyPts);
                break;
            case RandomShape.RECT:
                shape.drawRect(50, 250, 100, 100);
                break;
            case '5 sides':
                polyPts = [20, 10, 70, 10, 90, 45, 50, 70, 0, 45];
                shape.drawPolygon(polyPts);
                break;
            case '6 sides':
                polyPts = [20, 20, 60, 20, 80, 60, 60, 100, 20, 100, 0, 60];
                shape.drawPolygon(polyPts);
                break;
            case RandomShape.CIRCLE:
                shape.drawCircle(x, y, 60);
                break;
            case 'ellipse':
                shape.drawEllipse(x, y, 80, 40);
                break;
            case 'random':
                shape.moveTo(22, 11);
                shape.arcTo(41, -8, 58, 11, 18);
                shape.arcTo(86, 20, 65, 48, 18);
                shape.arcTo(62, 74, 32, 61, 18);
                shape.arcTo(-4, 69, 4, 40, 18);
                shape.arcTo(-2, 11, 22, 11, 18);
                break
        }
        shape.endFill();

        //---

        shape.boundsPadding = 0;
        let texture = shape.generateCanvasTexture();

        super(texture);

        this.x = x;
        this.y = y;
        this.interactive = true;
        this.rotation = Math.random() * Math.PI * 2;
        this.scale.x = this.scale.y = Math.random() * 0.25 + 0.75;
        this.anchor.set(0.5);

    }

    drawShape(type) {

    }
}

RandomShape.CIRCLE = 'circle';
RandomShape.RECT = 'rect';

exports = RandomShape;