
var layers = {
    Brewery_locations: new L.LayerGroup(),
    Heat: new L.LayerGroup(),
    Circle_map: new L.LayerGroup()
};
  
var overlays = {
     "Brewery Locations": layers.Brewery_locations,
    "Heat Map": layers.Heat,
    "Circle Map": layers.Circle_map
};
  
var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [
      layers.Brewery_locations,
      layers.Heat,
      layers.Circle_map]
});
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

d3.json("http://127.0.0.1:5000/alldata").then(function(data){
  var lat = data.lat
  var long = data.long
  var name = data.name
  var address = data.address
  var city = data.city
  var state = data.province
  var heatArray = [];
  for(var i = 0; i<data.length; i++) {
    var location = [lat[i], long[i]]
    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }
  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(layers.Heat);
});