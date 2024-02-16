// Create the map object
let myMap3 = L.map("map3", {
    center: [0, 0],
    zoom: 2
});

let streetmap3 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create layer groups to hold the circles
let circleLayerDec = L.layerGroup();

// Create an object to hold the different layers
let baseLayers3 = {
    "Street Map": streetmap3,
};

// Add the circle layer to the layers object
let overlayLayers3 = {
    // "AI Influencers": circleLayerAI,
    "YT- December": circleLayerDec,
};

// Add layer control to the map
L.control.layers(baseLayers3, overlayLayers3, {collapsed:false}).addTo(myMap);

// Create an object to hold the sum of counts for each country
let countryCounts3 = {};

// Collect Nov_clean_data
d3.csv('../../Resources/Dec_clean_data_v2.csv').then(data => {
    console.log(data);

    // Create a new marker cluster group
    let markersDec = L.markerClusterGroup();

    // Loop through the data
    data.forEach(obj => {
        getLocationCoordinates(obj.Country, parseInt(obj.Count))
            .then(coordinates => {
                // Add a new marker to the marker cluster group, and bind a popup
                markersDec.addLayer(L.marker([coordinates.lat, coordinates.lng])
                .bindPopup(`<b>${obj.Country}</b>`));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Add the marker cluster layer to the map
    myMap.addLayer(markersDec);
}).catch(error => {
    console.error('Fetch error:', error);
});