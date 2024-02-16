// Create the map object
let myMap2 = L.map("map2", {
    center: [0, 0],
    zoom: 2
});

let streetmap2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap2);

// Create layer groups to hold the circles
let circleLayerNov = L.layerGroup();

// Create an object to hold the different layers
let baseLayers2 = {
    "Street Map": streetmap2,
};

// Add the circle layer to the layers object
let overlayLayers2 = {
    // "AI Influencers": circleLayerAI,
    "YT- November": circleLayerNov,
};

// Add layer control to the map
L.control.layers(baseLayers2, overlayLayers2, {collapsed:false}).addTo(myMap);

// Create an object to hold the sum of counts for each country
let countryCounts2 = {};

// Collect Nov_clean_data
d3.csv('../../Resources/Nov_clean_data_v2.csv').then(data => {
    console.log(data);

    // Create an array to store all getLocationCoordinates promises
    let promises2 = [];

    // Loop through the data
    data.forEach(obj => {
        // Push each promise to the promises array
        promises2.push(
            getLocationCoordinates(obj.Country, parseInt(obj.Count))
                .then(coordinates => {
                    // Return an object with coordinates and country
                    return {
                        coordinates: [coordinates.lat, coordinates.lng],
                        country: obj.Country
                    };
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        );
    });

    // Wait for all promises to resolve
    Promise.all(promises2).then(results => {
        // Create a new marker cluster group
        let markersSept = L.markerClusterGroup();

        // Loop through the results and add markers to the marker cluster group
        results.forEach(result => {
            markersSept.addLayer(L.marker(result.coordinates)
                .bindPopup(`<b>${result.country}</b>`));
        });

        // Add the marker cluster layer to the map
        myMap2.addLayer(markersSept);
    }).catch(error => {
        console.error('Promise.all error:', error);
    });
}).catch(error => {
    console.error('Fetch error:', error);
});