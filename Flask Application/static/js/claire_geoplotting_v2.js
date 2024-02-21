// Create the map object
let myMap = L.map("map", {
    center: [37.0902, -95.7129], // Centered on the US
    zoom: 4
});

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create layer groups to hold the markers
let markerLayer = L.layerGroup().addTo(myMap);

// Create layer group to hold circle markers
let circleLayer = L.layerGroup().addTo(myMap);

// Create an object to hold the different layers
let baseLayers = {
    "Street Map": streetmap,
};
// Add the marker layer to the layers object
let overlayLayers = {
    "AI Influencers": markerLayer,
};

// Create object to store coordinates for each state/province
// Auto-populate Georgia and Ontario, the conversion is incorrect using the API for some reason
let countryCoordinates = {
    "Georgia": { lat: 32.1656, lng: -82.9001 },
    "Ontario": { lat: 43.65107, lng: -79.347015}
};

// Function to get coordinates for a state/province using Geoapify
const getLocationCoordinates = async (locationName, count) => {
    if (countryCoordinates[locationName]) {
        return countryCoordinates[locationName];
    }

    const apiKey = '010eab3aafc649ef9faa7cc14d2497ff';
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(locationName)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.features && data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates;
            countryCoordinates[locationName] = {
                lat: coordinates[1],
                lng: coordinates[0],
                count: count
            };
            return countryCoordinates[locationName];
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Collect AI Influencer Data
fetch('/Subset_AI_Data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }) 
    .then(jsonData => {
        // Limit data to the first 200 objects
        const jsonObjects = jsonData.slice(0, 200);
        console.log('Data:', jsonObjects);
        
        // Create an array to hold the marker objects
        const markers = [];
        
        // Convert the locations to coordinates
        jsonObjects.forEach(obj => {
            getLocationCoordinates(obj['State or Province'])
                .then(coordinates => {
                    if (coordinates) {
                        // Create a marker object
                        const marker = L.marker([coordinates.lat, coordinates.lng])
                            .bindPopup("<h3>" + obj['State or Province'] + "</h3> <p>" +
                            coordinates.lat + ", " + coordinates.lng + "</p>");
                        markers.push(marker);
                    }
                    // Check if all markers have been created
                    if (markers.length === jsonObjects.length) {
                        // Create a marker cluster group
                        const markerCluster = L.markerClusterGroup();
                    
                        // Add markers to the cluster group
                        markers.forEach(marker => markerCluster.addLayer(marker));
                    
                        // Add the marker cluster group to the map
                        myMap.addLayer(markerCluster);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });