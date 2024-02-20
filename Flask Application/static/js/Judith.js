

fetch('/Subset_AI_Data')
.then(response => response.json()) // This parses the JSON data directly
.then(data => {
    // Hold the MBTI Personalities and the Lifestyle
    const counter = {};
    
    // Loop the data
    data.forEach(entry => {
        
            // Collect the Lifestyle and MBTI Personality values
            const lifestyle = entry.Lifestyle;
            const mbtiPersonality = entry["MBTI Personality"];
            
            // create the counter 
            counter[lifestyle] = counter[lifestyle] || {};
            counter[lifestyle][mbtiPersonality] = (counter[lifestyle][mbtiPersonality] || 0) + 1;
        });
        
    
    // creating the graph
    const traces = Object.entries(counter).map(([lifestyle, personalityCounts], index) => ({
        type: 'scatterpolar',
        r: Object.values(personalityCounts),
        theta: Object.keys(personalityCounts),
        fill: 'toself',
        name: lifestyle,
        marker: {
            size: 7,
        }
    }));
    
    // creating the layout 
    const layout = {
        
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 80]
            }
        },
        showlegend: true,
        legend: {
            x: .7,
            y: 1,
            font: {
                size: 10, 
            },    
        },
        
    };
    
    //calling my plot
    Plotly.newPlot('scatter', traces, layout);
});
