// Create the map object
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
});

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create layer groups to hold the circles
let circleLayerDec = L.layerGroup().addTo(myMap);

// Create an object to hold the different layers
let baseLayers = {
    "Street Map": streetmap,
};

// Add the circle layer to the layers object
let overlayLayers = {
    // "AI Influencers": circleLayerAI,
    "YT- December": circleLayerDec,
};

// Add layer control to the map
L.control.layers(baseLayers, overlayLayers, {collapsed:false}).addTo(myMap);

// Create an object to hold the sum of counts for each country
let countryCounts = {};

// Function to get coordinates for a location using Geoapify
const getLocationCoordinates = async (locationName, count) => {
    const apiKey = '010eab3aafc649ef9faa7cc14d2497ff';
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(locationName)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.features && data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates;
            const country = data.features[0].properties.country;
            if (!countryCounts[country]) {
                countryCounts[country] = 0;
            }
            countryCounts[country] += count;
            return {
                lat: coordinates[1],
                lng: coordinates[0]
            };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

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