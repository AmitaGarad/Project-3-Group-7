// Create the map object
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
});

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create layer groups to hold the circles
let circleLayerNov = L.layerGroup().addTo(myMap);

// Create an object to hold the different layers
let baseLayers = {
    "Street Map": streetmap,
};

// Add the circle layer to the layers object
let overlayLayers = {
    // "AI Influencers": circleLayerAI,
    "YT- November": circleLayerNov,
};

// Add layer control to the map
L.control.layers(baseLayers, overlayLayers, {collapsed:false}).addTo(myMap);

// Create an object to hold the sum of counts for each country
let countryCounts = {};


// Collect Nov_clean_data
d3.csv('../../Resources/Nov_clean_data_v2.csv').then(data => {
    console.log(data);

    // Create a new marker cluster group
    let markersNov = L.markerClusterGroup();

    // Loop through the data
    data.forEach(obj => {
        getLocationCoordinates(obj.Country, parseInt(obj.Count))
            .then(coordinates => {
                // Add a new marker to the marker cluster group, and bind a popup
                markersNov.addLayer(L.marker([coordinates.lat, coordinates.lng])
                    .bindPopup(`<b>${obj.Country}</b>`));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Add the marker cluster layer to the map
    myMap.addLayer(markersNov);
}).catch(error => {
    console.error('Fetch error:', error);
});