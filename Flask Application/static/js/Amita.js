
fetch('/Amita_data')
  .then(response => response.json())
  .then(data => {
    const formattedData = data.map(row => ({
      country: row.Country,
      count: row.Count,
    }));

    // Set the size of the map container
    const mapContainer = document.getElementById('choroplethMap');
    mapContainer.style.width = '100%';  // Set the width to 100% of the container
    mapContainer.style.height = '700px';  // Set a fixed height for the map
    
    const fig = {
      data: [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: formattedData.map(row => row.country),
        z: formattedData.map(row => row.count),
        //text: formattedData.map(row => `${row.country}<br>Total Influencers: ${row.count}`),  // Update the text property to display only the country name and total influencers
        text: formattedData.map(row => `${row.country}<br>Total Influencers: ${row.count}`),  // Update the text property to display only the country name and total influencers
        colorscale: 'Viridis',
        colorbar: { title: 'Number of Influencers' }
      }],
      layout: {
        
        geo: {
          projection: { type: "natural earth" },
          bgcolor: 'black'  // Set the background color of the map to black
        },
        paper_bgcolor: 'rgba(0,0,0,0)',  // Set the background color as transparent
        plot_bgcolor: 'rgba(0,0,0,0)'   // Set the plot background color as transparent
      }
    };

    Plotly.newPlot('choroplethMap', fig);
  });

  