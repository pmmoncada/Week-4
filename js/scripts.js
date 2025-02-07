// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';


// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-86.401978,14.716448],
  zoom: 6,
});


//Lookup Department names
var DeptLookup = (code) => {
  console.log(code);
  switch (code) {
    case 1:
      return {
        color: '#A9A9A9',
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


// Add zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl());



//Data source: https://data.humdata.org/dataset/division-politica-de-honduras
//Then made into geojson on QGIS

//Finish loading base style
map.on('style.load', function() {
// set up the geojson as a source in the map
  map.addSource('departmentsHN', {
     type: 'geojson',
     data: './Data/departmentsHN.geojson',
   });

// add a custom-styled layer for each Depar
   map.addLayer({
     id: 'departments-fill',
     type: 'fill',
     source: 'departmentsHN',
     paint: {
       'fill-opacity': 0.7,
       'fill-color': {
         type: 'categorical',
         property: "OBJECTID",
         stops: [
             [
               1,
               DeptLookup(1).color,
             ],
             [
               2,
               DeptLookup(2).color,
             ],
             [
               3,
               DeptLookup(3).color,
             ],
             [
               4,
               DeptLookup(4).color,
             ],
             [
               5,
                DeptLookup(5).color,
             ],
             [
               6,
                DeptLookup(6).color,
             ],
             [
               7,
                DeptLookup(7).color,
             ],
             [
               8,
                DeptLookup(8).color,
             ],
             [
               9,
                DeptLookup(9).color,
             ],
             [
               10,
                DeptLookup(10).color,
             ],
             [
               11,
                DeptLookup(11).color,
             ],
             [
               12,
                DeptLookup(12).color,
             ],
             [
               13,
                DeptLookup(13).color,
             ],
             [
               14,
                DeptLookup(14).color,
             ],
             [
               15,
                DeptLookup(15).color,
             ],
             [
               16,
                DeptLookup(16).color,
             ],
             [
               17,
                DeptLookup(17).color,
             ],
             [
               18,
                DeptLookup(18).color,
             ],
           ]
         }
     }
   }, 'waterway-label')


    // add an empty data source, which we will use to highlight the lot the user is hovering over
    map.addSource('highlight-feature-depto', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    // when the mouse moves, do stuff!
    map.on('mousemove', function (e) {
      // query for the features under the mouse, but only in the lots layer
      var features = map.queryRenderedFeatures(e.point, {
          layers: ['departments-fill'],
      });

      // get the first feature from the array of returned features.
      var lot = features[0]

      if (lot) {  // if there's a lot under the mouse, do stuff
        map.getCanvas().style.cursor = 'pointer';  // make the cursor a pointer

        // lookup the corresponding description for the land use code
        // var deptoDescription = DeptLookup(parseInt(lot.properties.DEPTO)).description;

        // use jquery to display the address and land use description to the sidebar
        $('#names').text(lot.properties.DEPTO);

        // set this lot's polygon feature as the data for the highlight source
        map.getSource('highlight-feature-depto').setData(lot.geometry);
      } else {
       map.getCanvas().style.cursor = 'default'; // make the cursor default

        // reset the highlight source to an empty featurecollection
        map.getSource('highlight-feature-depto').setData({
          type: 'FeatureCollection',
          features: []
        });
       }
      })
    });





// // use jquery to programmatically create a Legend
// // for numbers 1 - 11, get the land use color and description
// for (var i=1; i<18; i++) {
//   // lookup the location info for the current iteration
//   const locationInfo = DeptLookup(i);
