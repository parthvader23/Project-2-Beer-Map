
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);

// d3.json("http://127.0.0.1:5000/alldata").then(function(data){
//   var lat = data.lat
//   var long = data.long
//   var name = data.name
//   var address = data.address
//   var city = data.city
//   var state = data.province
//   let heatlist = []
//   for(let i = 0; i<data.length; i++){
//       heatlist.push([lat[i],long[i]])
//   }
//   let heat=L.heatLayer(heatlist,{
//       radius:20
//   }).addTo(h)
  
// })