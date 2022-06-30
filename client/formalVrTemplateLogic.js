export function goMarzipano(imgs, userVrToursList){

  console.log("C:>>> goMarzipano actingg...");
  console.log("C:>>> goMarzipano -> IMGS:", imgs);

  // Img patterns: 
  const patternImgName = /(?<=end\$)[^\/:*?"<>|]+(?=\.jpg$|\.png$)/;
  const patterImgID = /ID[0-9-]+end\$/;
  const patterImgEx = /(.jpg$|.png$)/;
  //----------------------------------------------------------------------------


  // img Object Info Holder:
  const imgNameAndID = {};
  //----------------------------------------------------------------------------


  // DOM selections:
                            //?
  let buttonsHolder = document.querySelector('.buttonViews-VrFormalForm');
                          //--
  let viewer = new Marzipano.Viewer(document.getElementById('pano'));
  //----------------------------------------------------------------------------


  // btn creation and append to buttonsHolder:
  let count = 1

  for (let img of imgs) {
    const imgName = img.match(patternImgName)[0];
    const imgID = img.match(patterImgID)[0];
    const imgEx = img.match(patterImgEx)[0];
    imgNameAndID[imgName] = [imgID, imgEx];

    let btn = document.createElement('button');
    // let buttonViewsVrFormalForm = btn.parentElement
    btn.textContent = imgName;

    if (count == 1){
      btn.style.backgroundColor = 'green';
    }

    buttonsHolder.appendChild(btn);
    count ++;
  }
  //----------------------------------------------------------------------------

  console.log("C:>>> goMarzipano -> IMG -> name, ID, Ex:", imgNameAndID);

  // Create source.
  let source = Marzipano.ImageUrlSource.fromString(
    `useruploads/${imgs[0]}`
  );
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

  // Event.
  userVrToursList.addEventListener('click', (e) => {
    e.preventDefault()

    console.log("C:>>> goMarzipano -> userVrToursList is clicked at:", e.target)

    if (e.target.nodeName === "BUTTON" && Object.keys(imgNameAndID).includes(e.target.textContent)){
      const ImgName = e.target.textContent;
      const ImgID = imgNameAndID[ImgName][0];
      const ImgEx = imgNameAndID[ImgName][1];
      const ImgLocation = `useruploads/${ImgID}${ImgName}${ImgEx}`;

      console.log("C:>>> goMarzipano -> buttonsHolder -> e.target -> Name:", ImgName);
      console.log("C:>>> goMarzipano -> buttonsHolder -> e.target -> ID:", ImgID);
      console.log("C:>>> goMarzipano -> buttonsHolder -> e.target -> Ex:", ImgEx);
      console.log("C:>>> goMarzipano -> buttonsHolder -> e.target -> Location:", ImgLocation );

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
  
    }
    else if (e.target.nodeName === "BUTTON"){

    }
  
  });
  //----------------------------------------------------------------------------

  // Display scene.
  scene.switchTo();
  //----------------------------------------------------------------------------

}