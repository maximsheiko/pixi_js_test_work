window.onload = function ()  {
   let app = new PIXI.Application(512, 512, {backgroundColor: 0x1099bb});

   app_width = app.renderer.height / app.renderer.resolution;
   app_height = app.renderer.width / app.renderer.resolution;

   var shape = new RandomShape(0, 0, RandomShape.CIRCLE);
   
   var model = new SpawnModel();
   var view = new SpawnView(model, app);
   var controller = new SpawnController(model, view,app);

   app.ticker.add(()=> {
      view.tick();
      controller.tick();
   });
};


