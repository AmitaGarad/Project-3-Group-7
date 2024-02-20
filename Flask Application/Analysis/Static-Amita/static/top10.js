// Fetch the JSON data and create a grouped bar chart
fetch('/get_youtuber_data')
  .then(response => response.json())
  .then(data => {
    // Filter data for December and November
    const dataDecember = data.filter(item => new Date(item.Date).getMonth() === 11); // December is month 11 (0-indexed)
    const dataNovember = data.filter(item => new Date(item.Date).getMonth() === 10); // November is month 10 (0-indexed)

    // Sort the data by subscribers (descending)
    const sortData = (data) => data.sort((a, b) => b.Subscribers - a.Subscribers);

    // Get the top 10 YouTubers for each month
    const top10December = sortData(dataDecember).slice(0, 10);
    const top10November = sortData(dataNovember).slice(0, 10);

    // Create a grouped bar chart
    const ctx = document.getElementById('subscriberChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: top10December.map(item => item.Youtuber_name),
        datasets: [{
          label: 'Subscribers in December',
          data: top10December.map(item => item.Subscribers),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }, {
          label: 'Subscribers in November',
          data: top10November.map(item => item.Subscribers),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });