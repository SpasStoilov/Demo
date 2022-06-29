
export function goMarzipano(){

  let viewer = new Marzipano.Viewer(document.getElementById('pano'));

  // Create source.
  let source = Marzipano.ImageUrlSource.fromString(
    "marzipanoPics/angra.jpg"
  );
  
  let levels2 = [{ width: 4000 }]
  
  // Create geometry.
  let geometry = new Marzipano.EquirectGeometry(levels2);
  
  // Create view.
  let limiter = Marzipano.RectilinearView.limit.traditional(1024, 180*Math.PI/180);
  let view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);
  
  
  // Create scene.
  let scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true
  });
  
  
  
  let buttonsHolder = document.querySelector('.buttonViews-VrFormalForm')
  
  buttonsHolder.addEventListener('click', (e) =>{
    e.preventDefault()

    console.log(e.target)
  
    if (e.target.nodeName === "BUTTON"){
  
      let source = Marzipano.ImageUrlSource.fromString(`marzipanoPics/${e.target.textContent}.jpg`);
    
      let scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
      });
    
      // Display new scene.
      scene.switchTo();
  
    }
  
  })
  
  // Display scene.
  scene.switchTo();
}