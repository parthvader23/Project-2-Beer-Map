
var layers = {
  Brewery_locations: new L.LayerGroup(),
  Heat: new L.LayerGroup(),
  Cluster : new L.LayerGroup()
};

var overlays = {
  "Brewery Locations": layers.Brewery_locations,
  "Heat Map": layers.Heat,
  "Cluster Map": layers.Cluster
};

var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4,
  layers: [
    layers.Brewery_locations]
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
  for(var i = 0; i<data.name.length; i++) {
    L.marker([lat[i], long[i]])
      .bindPopup("<h1>" + name[i] + "</h1> <hr> <h3>State: " + state[i] + "</h3><h3>City: " + city[i] + "</h3><h3>Address: " + address[i] + "</h3>")
      .addTo(layers.Brewery_locations);
  }
});

d3.json("http://127.0.0.1:5000/alldata").then(function(data){
  var markers = L.markerClusterGroup();
  for (var i = 0; i < data.city.length; i++) {
    markers.addLayer(L.marker([parseFloat(data.lat[i]),parseFloat(data.long[i])
    ]))
    .bindPopup("<h1>" + data.name[i] + "</h1>")
    .addTo(layers.Cluster)
    };
})


d3.json("http://127.0.0.1:5000/alldata").then(function(data){
  var lat = data.lat
  var long = data.long
  var name = data.name
  var address = data.address
  var city = data.city
  var state = data.province
  let heatArray = []
  for (var i = 0; i < data.city.length; i++) {
    heatArray.push([parseFloat(data.lat[i]),parseFloat(data.long[i])
    ])
  };
  let heat=L.heatLayer(heatArray,{
      radius:275,
      maxOpacity: .01,
      blur: 10,
      scaleRadius: true,
      useLocalExtrema: true
  }).addTo(layers.Heat);
});


L.control.layers(overlays).addTo(myMap);




