export function goMarzipano(firstImgLocation, pano, imgNameAndID, buttonsHolder){

  console.log("C:>>> goMarcipano acting...")

  // DOM selections:                             
  let viewer = new Marzipano.Viewer(pano);
  //----------------------------------------------------------------------------

  // Create source.
  let source = Marzipano.ImageUrlSource.fromString(firstImgLocation);
  //----------------------------------------------------------------------------
  
  // Levels.
  let levels2 = [{ width: 4000 }];
  //----------------------------------------------------------------------------

  // Create geometry.
  let geometry = new Marzipano.EquirectGeometry(levels2);
  //----------------------------------------------------------------------------
  
  // Create view.
  let limiter = Marzipano.RectilinearView.limit.traditional(1024, 180*Math.PI/180);
  let view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);
  //----------------------------------------------------------------------------

  // Create scene.
  let scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true
  });
  //----------------------------------------------------------------------------

  // Event:
  buttonsHolder.addEventListener('click', (e) => {
    e.preventDefault()

    console.log("C:>>> goMarzipano -> userVrToursList is clicked at:", e.target)



    if (e.target.nodeName === "BUTTON" && Object.keys(imgNameAndID).includes(e.target.textContent)){

      // seting all btn background to none:
      const allbtns = buttonsHolder.querySelectorAll("button")
      for (let b of allbtns){
        b.style.backgroundColor = "";
      }
      //----------------------------------------------------------------------------------------

      e.target.style.backgroundColor = '#CFCFCF';
      const ImgName = e.target.textContent;
      const ImgID = imgNameAndID[ImgName][0];
      const ImgEx = imgNameAndID[ImgName][1];
      const ImgLocation = `useruploads/${ImgID}${ImgName}${ImgEx}`;

      console.log("C:>>> goMarzipano -> buttonsHolder -> e.target -> Name:", ImgName);
      console.log("C:>>> goMarzipano -> buttonsHolder -> e.target -> ID:", ImgID);
      console.log("C:>>> goMarzipano -> buttonsHolder -> e.target -> Ex:", ImgEx);
      console.log("C:>>> goMarzipano -> buttonsHolder -> e.target -> Location:", ImgLocation);

      let source = Marzipano.ImageUrlSource.fromString(ImgLocation);
    
      let scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
      });
    
      // Display new scene.
      scene.switchTo();
      //----------------------------------------------------------------------------
  
    };
  
  });

  //----------------------------------------------------------------------------

  // Display scene.
  scene.switchTo();
  //----------------------------------------------------------------------------

}