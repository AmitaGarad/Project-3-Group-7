
fetch('/Amita_data')
  .then(response => response.json())
  .then(data => {
    const formattedData = data.map(row => ({
      country: row.Country,
      count: row.Count,
    }));

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
        title: 'Influencers count by Country',
        geo: {
          projection: { type: "natural earth" },
          bgcolor: 'black'  // Set the background color of the map to black
        }
      }
    };

    Plotly.newPlot('choroplethMap', fig);
  });

  