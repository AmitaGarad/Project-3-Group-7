// Create the map object
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
});

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create a layer group to hold the circles for AI Influencers
// let circleLayerAI = L.layerGroup().addTo(myMap);

// Create layer groups to hold the circles
let circleLayerSept = L.layerGroup().addTo(myMap);
let circleLayerNov = L.layerGroup().addTo(myMap);
let circleLayerDec = L.layerGroup().addTo(myMap);

// Create an object to hold the different layers
let baseLayers = {
    "Street Map": streetmap,
};

// Add the circle layer to the layers object
let overlayLayers = {
    // "AI Influencers": circleLayerAI,
    "YT- September": circleLayerSept,
    "YT- November": circleLayerNov,
    "YT- December": circleLayerDec,
};

// Add layer control to the map
L.control.layers(baseLayers, overlayLayers, {collapsed:false}).addTo(myMap);

// Function to get coordinates for a location using Geoapify
const getLocationCoordinates = async (locationName) => {
    const apiKey = '010eab3aafc649ef9faa7cc14d2497ff';
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(locationName)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.features && data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates;
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

// Function to calculate the sum of counts for circles within a certain radius
const calculateCircleSum = (zoomLevel, radius, circleLayer) => {
    let sum = 0;
    // Iterate over the circles in the circle layer group
    circleLayer.eachLayer(layer => {
        // Calculate the area of the circle
        const circleArea = Math.PI * Math.pow(layer.getRadius(), 2);
        // If the circle's area is less than the threshold area based on zoom level and radius
        if (circleArea <= (radius * radius * Math.pow(2, 2 - zoomLevel))) {
            sum += layer.options.count || 0; // Add the count to the sum
        }
    });
    return sum;
};

// Event listener for zoomend event
myMap.on('zoomend', () => {
    const zoomLevel = myMap.getZoom();
    const radius = 5000; // Radius of the circle, adjust as needed
    // Calculate the sum of counts for circles within the given radius for each layer
    const sumSept = calculateCircleSum(zoomLevel, radius, circleLayerSept);
    const sumNov = calculateCircleSum(zoomLevel, radius, circleLayerNov);
    const sumDec = calculateCircleSum(zoomLevel, radius, circleLayerDec);
    console.log('Sum of counts - September:', sumSept);
    console.log('Sum of counts - November:', sumNov);
    console.log('Sum of counts - December:', sumDec);
});

// // Collect AI Influencer Data
// fetch('../../Resources/influencer_data.jsonl')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.text(); // Read response body as text
//     }) 
//     .then(textData => {
//         // Split text data into lines
//         const lines = textData.split('\n');
//         // Parse each non-empty line as JSON
//         const jsonObjects = lines
//             .filter(line => line.trim() !== '') // Filter out empty lines
//             .slice(0, 200)
//             .map(line => {
//                 try {
//                     return JSON.parse(line);
//                 } catch (error) {
//                     console.error('Error parsing JSON:', error);
//                     return null; // or handle the error in another way
//                 }
//             });
//         console.log('Data:', jsonObjects);

//         // Convert the locations to coordinates and add circles to the layer group for AI Influencers
//         jsonObjects.forEach(obj => {
//             getLocationCoordinates(obj['State or Province'])
//                 .then(coordinates => {
//                     L.circle(coordinates, {
//                         radius: 5000, // Radius of the circle, adjust as needed
//                         color: 'blue',
//                         fillColor: 'blue',
//                         fillOpacity: 0.5,
//                         count: obj.count // Add a count property to the circle
//                     })
//                     .addTo(circleLayerAI);
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                 });
//         });
//     })
//     .catch(error => {
//         console.error('Fetch error:', error);
//     });

// Collect Sept_clean_data
d3.csv('../../Resources/Sept_clean_data.csv').then(data => {
    console.log(data);

    // Convert the countries to coordinates and add circles to the layer group for Sept_clean_data
    data.forEach(obj => {
        getLocationCoordinates(obj.Country)
            .then(coordinates => {
                L.circle(coordinates, {
                    radius: 10000, // Radius of the circle, adjust as needed
                    color: 'green',
                    fillColor: 'green',
                    fillOpacity: 0.5
                })
                .addTo(circleLayerSept);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}).catch(error => {
    console.error('Fetch error:', error);
});

// Collect Youtube influencer data - November
d3.csv('../../Resources/Nov_clean_data_v2.csv').then(data => {
    console.log(data);

    // Convert the countries to coordinates and add circles to the layer group for Nov_clean_data
    data.forEach(obj => {
        getLocationCoordinates(obj.Country)
            .then(coordinates => {
                L.circle(coordinates, {
                    radius: 10000, // Radius of the circle, adjust as needed
                    color: 'orange',
                    fillColor: 'orange',
                    fillOpacity: 0.5
                })
                .addTo(circleLayerNov);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}).catch(error => {
    console.error('Fetch error:', error);
});

// Collect Youtube influencer data - December
d3.csv('../../Resources/Dec_clean_data_v2.csv').then(data => {
    console.log(data);

    // Convert the countries to coordinates and add circles to the layer group for Dec_clean_data
    data.forEach(obj => {
        getLocationCoordinates(obj.Country)
            .then(coordinates => {
                L.circle(coordinates, {
                    radius: 10000, // Radius of the circle, adjust as needed
                    color: 'red',
                    fillColor: 'red',
                    fillOpacity: 0.5
                })
                .addTo(circleLayerDec);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}).catch(error => {
    console.error('Fetch error:', error);
});
