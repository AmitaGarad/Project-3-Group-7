// Create the map object
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
});

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


fetch('../../Resources/influencer_data.jsonl')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Read response body as text
    }) 
    .then(textData => {
        // Split text data into lines
        const lines = textData.split('\n');
        // Parse each non-empty line as JSON
        const jsonObjects = lines
            .filter(line => line.trim() !== '') // Filter out empty lines
            .map(line => {
                try {
                    return JSON.parse(line);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return null; // or handle the error in another way
                }
            });
        console.log('Data:', jsonObjects);

        // Function to get coordinates for a state/province using Geoapify
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

        // Example usage:
        getLocationCoordinates(jsonObjects[0]['State or Province'])
            .then(coordinates => {
                console.log('Coordinates:', coordinates);
                // Now you can use the coordinates to add markers to a map
                // For example, using a mapping library like Leaflet or Google Maps JavaScript API
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
