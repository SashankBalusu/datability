






let map;
console.log(typeof localStorage.getItem("lat"))
console.log(localStorage.getItem("long"))
function initMap() {
  let img = localStorage.getItem("img")
  let home = {lat: Number(localStorage.getItem("lat")), lng: Number(localStorage.getItem("long"))}
  map = new google.maps.Map(document.getElementById("map"), {
    center: home,
    zoom: 8,
    disableDefaultUI: true,
    styles: [
      {
        'featureType': 'all',
        'elementType': 'all',
        'stylers': [
          { 'invert_lightness': true },
          { 'saturation': -50 },
          { 'lightness': 10 },
          { 'gamma': 1 },
          { 'hue': '#404C54' }
        ]
      }
    ]
  });
  const marker = new google.maps.Marker({
    position: home,
    map: map,
  });
  let contentString = 
  `<div><center><img src = ${img}></center> </div>`

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
  let latArr = localStorage.getItem("latArr")
  let lngArr = localStorage.getItem("lngArr")
  let imgArr = localStorage.getItem("imgArr")

  for (let i = 0; i < latArr.length; i++){
    let formDict = {lat: Number(latArr[i]), lng: Number(lngArr[i])}
    const marker = new google.maps.Marker({
      position: formDict,
      map: map,
    });
    let contentString = 
    `<div><img class = popImg src = ${imgArr[i]}> </div>`

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
  
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  }
  
}






window.initMap = initMap;