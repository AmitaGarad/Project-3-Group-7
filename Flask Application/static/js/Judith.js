  // calling the json file to get the data
  fetch('/Subset_AI_Data')
  .then(response => response.json())
  .then(data => {
    // collecting the specific elements that i want to display
    const counter = {};
    
    // a for loop is needed to look through the data
    data.forEach(entry => {
      //specifying which specific elements to look for adn creating a constant variable for them
      const lifestyle = entry.Lifestyle;
      const mbtiPersonality = entry['MBTI Personality'];
  
      // here is the counting section, aggregate to show the amount of existing elements under lifestyle and personality
      counter[lifestyle] = counter[lifestyle] || {};
      counter[lifestyle][mbtiPersonality] = (counter[lifestyle][mbtiPersonality] || 0) + 1;
    });
  
    // creating the graph and adding in the variables with the aggregated elements
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
  
    // the adjusting the layout for the scatterplot graph 
    const layout = {
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 80]
        }
      },
    // creating a legend to display information and placing it on the right side of the scatter
      showlegend: true,
      legend: {
        x: 1,
        y: 1,
        font: {
          size: 10,
        },
      },
    //adjusting the display size so it can fit the page 
      width: 1200,  
      height: 600,  
      autosize: false,  
      margin: {  
        l: 100,
        r: 100,
        b: 100,
        t: 100,
        
    }
  };
  
  
  // plotting the graph, adding the layers of the graph and referencing the html
    Plotly.newPlot('scatter', traces, layout);
  });
  
   // calling the json file to get the data
  fetch('/Subset_AI_Data')
  .then(response => response.json())
  .then(data => {
    //going into the dataset once again and grabbing specific elements
    //here I want eduction level of the AI and personality of the AI
    var educationLevels = [...new Set(data.map(d => d['Education Level']))];
    var personalityTypes = [...new Set(data.map(d => d['MBTI Personality']))]; 
  
    // creating the count to see the how many influencers completed a specific level of education
    var counts = {};
    educationLevels.forEach(educationLevel => {
      counts[educationLevel] = {};
      personalityTypes.forEach(personalityType => {
        counts[educationLevel][personalityType] = data.filter(d => d['Education Level'] === educationLevel && d['MBTI Personality'] === personalityType).length;
      });
    });
  
    // creating graph and adding the variables holding the calculated dataset
    var trace = personalityTypes.map(personalityType => ({
      x: educationLevels,
      y: educationLevels.map(educationLevel => counts[educationLevel][personalityType]),
      type: 'bar',
      name: personalityType
    }));
  
    // this is creating the layout for the chart and specifying that it needs to be stacked 
    var layout = {
      title: 'MBTI Personality vs Education Level',
      xaxis: { title: 'Education Level' },
      yaxis: { title: 'Count' },
      barmode: 'stack', 
      width: 1200,  
      height: 600,  
      autosize: false,  
      margin: {  
        l: 100,
        r: 100,
        b: 100,
        t: 100,
      }
    };
  
    // plotting the graph, adding the layers of the graph and referencing the html
    Plotly.newPlot('bar-chart', trace, layout);
  });