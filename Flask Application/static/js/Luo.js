
function filterDropDown(button, dropdown, input, items) {
    //Create dropdown items from a list of items
    for (let i=0; i<items.length; i++) {
        let dropdown_item = document.createElement('button');
        dropdown_item.setAttribute('type', 'button');
        dropdown_item.setAttribute('class', 'dropdown-item');
        dropdown_item.setAttribute('value', `${items[i]}`);
        dropdown_item.innerHTML = items[i];
        dropdown.appendChild(dropdown_item);
    }
    //Hide the dropdown list
    dropdown.style.display = 'none';

    //Make the button toggle the display of dropdown
    button.addEventListener('click', function () {
        if (dropdown.style.display == 'none')
            dropdown.style.display = 'block';
        else
            dropdown.style.display = 'none';
    });

    input.addEventListener('input', function () {
        let dropdown_items = dropdown.querySelectorAll('.dropdown-item');
        if (!dropdown_items)
            return false;
        for (let i=0; i<dropdown_items.length; i++) {
            if (dropdown_items[i].innerHTML.toUpperCase().includes(input.value.toUpperCase()))
                dropdown_items[i].style.display = 'block';
            else
                dropdown_items[i].style.display = 'none';
        }
    });
}


fetch('/AI_Info') //output.json
    .then((response) => response.json())
    .then((jsonData) => {
        dataSet = jsonData.slice(0,200);
        console.log(dataSet);
        names = []
        for (let i = 0; i < dataSet.length; i++) {
            names.push(dataSet[i].Name)
        };
        filterDropDown(
            document.getElementById('toggle'),
            document.getElementById('dropdown'),
            document.getElementById('input'),
            names
        );
        d3.selectAll(".dropdown-item").on("click", function() {
            let item = d3.select(this).attr("value");
            console.log(item);
            createInfo(item);
            createChart(item);
        });
    })

function createInfo(data) {
    fetch('/AI_Info')
        .then((response) => response.json())
        .then((jsonData) => {
            dataSet = jsonData.slice(0,200);
            let result = dataSet.filter(i=>i.Name==data)[0];
            console.log(result)

            let htmlData = d3.select("#Influencer-data");

            htmlData.html("");

            for (let [key, value] of Object.entries(result)) {
                //console.log(`Key: ${key}, Value: ${value}`)
                htmlData.append("h6").text(`${key}: ${value}`);
            };
    })
}

function createChart(data) {
    //data engineering 1
    fetch('/AI_200_Info') //call AI_Influencer_200.json
        .then((response) => response.json())
        .then((jsonData) => {
            //Re-arrange Data
            let name = jsonData.Name;
            let CAT = jsonData.Lifestyle;
            let temp1 = [];
            let jointData = [];
            for (let [key, value] of Object.entries(jsonData.Name)) {
                temp1.push(value)
            };
            for (let i = 0; i < temp1.length; i++) {
                jointData.push({Name:name[i],Category:CAT[i]})
            };
            //data engineering 2
            fetch('/Category_Data') //call Category_Summary.json
                .then((response) => response.json())
                .then((jsonData2) => {
                    let CAT2 = jsonData2.Category;
                    let CATview = jsonData2.Average_view;
                    let CATlike = jsonData2.Average_likes;
                    let temp2 = [];
                    let jointData2 = [];
                    for (let [key, value] of Object.entries(jsonData2.Category)) {
                        temp2.push(value)
                    };
                    for (let i = 0; i < temp2.length; i++) {
                        jointData2.push({Category:CAT2[i],Views_Ratio:CATview[i],Likes_Ratio:CATlike[i]})
                    };
                    sorted_View = jointData2.sort(function(a,b){
                        return b.Views_Ratio - a.Views_Ratio
                    });

                    //create first bar chart
                    Cat_Key1 = [];
                    dataset1 = [];
                    dataset2 = [];
                    for (let i = 0; i < sorted_View.length; i++) {
                        Cat_Key1.push(sorted_View[i].Category),
                        dataset1.push(sorted_View[i].Views_Ratio),
                        dataset2.push(sorted_View[i].Likes_Ratio)
                    };
                    
                    console.log(sorted_View);
                    console.log(dataset2);

                    //Create chart with chart.js
                    let matchCat = jointData.filter(i=>i.Name==data)[0].Category;
                    console.log(matchCat)
                    backgroundColor1 = [];
                    backgroundColor2 = [];
                    for (let i = 0; i < sorted_View.length; i++) {
                        if (Cat_Key1[i]==matchCat) {
                            backgroundColor1.push('rgba(58, 39, 245, 0.8)'),
                            backgroundColor2.push('rgba(58, 39, 245, 0.8)')
                        }
                        else {
                            backgroundColor1.push('rgba(39, 221, 245, 0.8)'),
                            backgroundColor2.push('rgba(58, 39, 245, 0.8)')
                        }
                    }
                    console.log(backgroundColor2)

                    const ctx = document.getElementById('myChart'); 
                    if (window.chart0) {
                        // If it exists, destroy it
                        window.chart0.destroy();
                    }
                        window.chart0 = new Chart(ctx, {
                            type: 'bar',
                            data: {
                            labels: Cat_Key1,
                            datasets: [{
                                label: 'Views Tendency',
                                data: dataset1,
                                borderWidth: 1,
                                backgroundColor: backgroundColor1,
                                order:2
                                },{
                                label: 'Likes Tendency',
                                data: dataset2,
                                borderWidth: 1,
                                backgroundColor: 'rgba(245, 106, 39, 0.8)',
                                borderColor: 'rgba(230, 39, 245, 0.8)',
                                type: 'line',
                                order:1
                                }]
                            },
                            options: {
                            scales: {
                                y: {
                                beginAtZero: true
                                }
                            }
                        }
                    });
                });
    });
}
