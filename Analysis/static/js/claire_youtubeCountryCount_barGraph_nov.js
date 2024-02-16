// Read in data using D3
d3.csv('../../Resources/Nov_clean_data_v2.csv').then(data => {
    let countryCounts = {};
    console.log(data);

    // Loop through each row
    data.filter(row => row.Country !== 'Unknown').forEach(function(row) {
        let country = row.Country;

        // add to countryCounts if already exists in object, increment
        if (countryCounts.hasOwnProperty(country)) {
            countryCounts[country]++;
        } else {
            countryCounts[country] = 1;
        }
    });

    console.log(countryCounts);

    // Sort the country counts in descending order
    const sortedCountries = Object.keys(countryCounts).sort((a, b) => countryCounts[b] - countryCounts[a]);
    
    // Define custom colors for the bars
    const customColors = [
        'rgb(31, 119, 180)',
        'rgb(255, 127, 14)',
        'rgb(44, 160, 44)',
        'rgb(214, 39, 40)',
        'rgb(148, 103, 189)',
        'rgb(140, 86, 75)',
        'rgb(227, 119, 194)',
        'rgb(127, 127, 127)',
        'rgb(188, 189, 34)',
        'rgb(23, 190, 207)',
        'rgb(255, 187, 120)', 
        'rgb(141, 211, 199)', 
        'rgb(255, 152, 150)', 
        'rgb(197, 176, 213)'
    ];    

    // Prepare data and colors for the bar graph
    const barData = {
        x: sortedCountries,
        y: sortedCountries.map(country => countryCounts[country]),
        type: 'bar',
        marker: {
            color: customColors
        }
    };

// Define layout for the bar graph
const layout = {
    title: 'Youtube Influencer Count Per Country - November 2022',
    xaxis: {
        title: 'Country',
        tickangle: -45,
        automargin: true
    },
    yaxis: {
        title: 'Count',
        automargin: true
    },
    // Adjust the width and height of the plot
    width: 700, // Adjust the value as needed
    height: 500, // Adjust the value as needed
    margin: {
        l: 100 // Increase the left margin to make room for the y-axis labels
    }
};

// Plot the bar graph
Plotly.newPlot('bar', [barData], layout);
});
