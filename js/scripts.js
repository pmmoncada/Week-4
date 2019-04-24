// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';


// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-87.197714, 14.081646],
  zoom: 7,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

//Lookup Department names
var DeptLookup = (code) => {
  switch (code) {
    case 1:
      return {
        color: '#',
        description: 'Atlantida',
      };
    case 2:
      return {
        color: '#EE82EE',
        description: 'Colon',
      };
    case 3:
      return {
        color: '#5CA2D1',
        description: 'Comayagua',
      };
    case 4:
      return {
        color: '#9932CC',
        description: 'Copan',
      };
    case 5:
      return {
        color: '#ea6661',
        description: 'Cortez',
      };
    case 6:
      return {
        color: '#FFFACD',
        description: 'Choluteca',
      };
    case 7:
      return {
        color: '#778899',
        description: 'El Paraiso',
      };
    case 8:
      return {
        color: '#6BE01E',
        description: 'Francisco Morazan',
      };
    case 9:
      return {
        color: '#8ece7c',
        description: 'Gracias a Dios',
      };
    case 10:
      return {
        color: '#87DDDB',
        description: 'Intibuca',
      };
    case 11:
      return {
        color: '#FF0400',
        description: 'Islas de la Bahia',
      };
    case 12:
      return {
        color: '#E9B3A1',
        description: 'La Paz',
      };
    case 13:
      return {
        color: '#D64091',
        description: 'Lempira',
      };
    case 14:
      return {
        color: '#BEB118',
        description: 'Ocotepeque',
      };
    case 15:
      return {
        color: '#BE5418',
        description: 'Olancho',
      };
    case 16:
      return {
        color: '#F5A533',
        description: 'Santa Barbara',
      };
    case 17:
      return {
        color: '#E0D01E',
        description: 'Valle',
      };
    case 18:
      return {
          color: '#11A9A8',
          description: 'Yoro',
        };
    default:
      return {
        color: '#A9A9A9',
        description: 'Other',
      };
  }
};

// use jquery to programmatically create a Legend
// for numbers 1 - 11, get the land use color and description
for (var i=1; i<18; i++) {
  // lookup the location info for the current iteration
  const locationInfo = DeptLookup(i);

// this sets up the geojson as a source in the map, which I can use to add visual layers
map.addSource('limiteMunicipal', {
  type: 'geojson',
  data: './Data/limiteMunicipal.geojson',
});
