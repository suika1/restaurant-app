//Styles for map
export const STYLES = {
  style: [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#1e1e1e"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#dadada"
              }
          ]
      },
      {
          "featureType": "landscape",
          "stylers": [
              {
                  "color": "#616161"
              },
              {
                  "lightness": -10
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#5e2435"
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#e3e8f9"
              }
          ]
      },
      {
          "featureType": "poi",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                //   "color": "#781fda"
                  "color": "#1e1e1e"
              }
          ]
      },
    //   {
    //       "featureType": "road",
    //       "elementType": "labels.text.stroke",
    //       "stylers": [
    //           {
    //               "color": "#c9bac2"
    //           },
    //           {
    //               "weight": 2.5
    //           }
    //       ]
    //   },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "weight": 0.5
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffff88"
              },
              {
                  "weight": 0.5
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#737373"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                //   "color": "#e4c6fd"
                  "color": "#1e1e1e"
              }
          ]
      },
    //   {
    //       "featureType": "transit",
    //       "elementType": "labels.text.stroke",
    //       "stylers": [
    //           {
    //               "color": "#2b044a"
    //           },
    //           {
    //               "weight": 2
    //           }
    //       ]
    //   },
      {
          "featureType": "administrative.land_parcel",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
  ]
};
