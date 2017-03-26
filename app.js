import RandomShape from './src/RandomShape';

window.onload = function ()  {
   let app = new PIXI.Application(512, 512, {backgroundColor: 0x1099bb});

   app_width = app.renderer.height / app.renderer.resolution;
   app_height = app.renderer.width / app.renderer.resolution;

   var shape = new RandomShape(0, 0, RandomShape.CIRCLE);
   
   var model = new ShapeModel();
   var view = new ShapeView(model, app);
   var controller = new ShapeController(model, view);

   app.ticker.add(()=> {
      view.tick();
      controller.tick();
   });
};


