document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_youtube_subscribers_data')
        .then(response => response.json())
        .then(data => {
            // Prepare data for Plotly
            const categories = data.map(row => row.Category);
            const countries = Object.keys(data[0]).filter(key => key !== 'Category');
            const zData = categories.map(category => {
                return countries.map(country => {
                    const row = data.find(row => row.Category === category);
                    return row[country] || 0;
                });
            });

            // Adjusting the color scale
            const heatmapData = [{
                z: zData,
                x: countries,
                y: categories,
                type: 'heatmap',
                colorscale: 'RdBu',  // Using a diverging color scale
            }];

            const layout = {
                title: 'Heatmap of Subscribers by Category and Country',
                xaxis: {title: 'Country'},
                yaxis: {title: 'Category', automargin: true, tickangle: 45, tickfont: {size: 10}},
                sliders: [{
                    currentvalue: {"prefix": "Year:"},
                    steps: [],
                    pad: {"t": 50}
                  }]
            };

            Plotly.newPlot('heatmap', heatmapData, layout);
        })
        .catch(error => console.error('Error fetching the YouTube subscribers data:', error));
});
