fetch('/Judith_Data')
    .then(response => response.text())
    .then(data => {
        // Split the data into lines
        const lines = data.split('\n');
        
        // Initialize a frequency counter for Lifestyle and MBTI Personality combinations
        const counter = {};
        
        // Loop through each line of data
        lines.forEach(line => {
            try {
                // Parse the JSON data from the line
                const data = JSON.parse(line);
                
                // Extract Lifestyle and MBTI Personality values
                const lifestyle = data.Lifestyle;
                const mbtiPersonality = data["MBTI Personality"];
                
                // Increment the count for this combination
                counter[lifestyle] = counter[lifestyle] || {};
                counter[lifestyle][mbtiPersonality] = (counter[lifestyle][mbtiPersonality] || 0) + 1;
            } catch (error) {
                // Log any errors when parsing JSON data
                console.error('Error parsing JSON data:', error);
            }
        });
        
        // Generate traces for each Lifestyle category
        const traces = Object.entries(counter).map(([lifestyle, personalityCounts], index) => ({
            type: 'scatterpolar',
            r: Object.values(personalityCounts),
            theta: Object.keys(personalityCounts),
            fill: 'toself',
            name: lifestyle
        }));
        
        // Create the layout for the chart
        const layout = {
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 10] // You can adjust the range based on your data
                }
            },
            showlegend: true,
            legend: {
                x: .7,
                y: 1
            }
        };
        
        // Create the Spider/Radar chart
        Plotly.newPlot('scatter', traces, layout);
    })

