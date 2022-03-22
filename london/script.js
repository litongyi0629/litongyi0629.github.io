mapboxgl.accessToken = 'pk.eyJ1IjoidG9uZ3lpaWlpaWlpaTEyMyIsImEiOiJjbDA4OHNrZ2wwMDVnM2JxdGJmbXlwcWh3In0.Z6oaW37lTlOJpI2lR_5-jg';
const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/tongyiiiiiiii123/cl089iv6d004f14nyi9y670aj' // 
});
map.on('load', () => {
 const layers = [
  'Camden',
  'Westminister',
  'City of London',
  'Southwark',
  'Newham',
  'Hackney',
  'Lewisham',
  'Haringey'
];
const colors = [
  '#deabab',
  '#a42d2d',
  '#e3d83b',
  '#9c83e7',
  '#45a190',
  '#be8f60',
  '#e48686',
  '#3ac8e4'
]; 
// create legend
const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
});  
});
map.on('mousemove', (event) => {
  const states = map.queryRenderedFeatures(event.point, {
    layers: ['london']
  });
  document.getElementById('pd').innerHTML = states.length
    ? `<h3>${states[0].properties.LAD21NM}</h3><p><strong><em>${states[0].properties.london}</strong> GPB </em></p>`
    : `<p>Hover over a state!</p>`;
});
const geocoder = new MapboxGeocoder({
 // Initialize the geocoder
 accessToken: mapboxgl.accessToken, // Set the access token
 mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
 placeholder: "Search for places in London", // Placeholder text for the search bar
 proximity: {
 longitude: 51.4981,
 latitude: -0.0962
 } // Coordinates of Glasgow center
});
map.addControl(geocoder, "top-left")

map.addControl(new mapboxgl.NavigationControl(), "top-left");
map.addControl(
 new mapboxgl.GeolocateControl({
 positionOptions: {
 enableHighAccuracy: true
 },
 trackUserLocation: true,
 showUserHeading: true
 }),
 "top-left"
);