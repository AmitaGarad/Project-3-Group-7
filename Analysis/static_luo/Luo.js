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


fetch('../../Resources/output.json')
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
            createInfo(item)
        });
    })

function createInfo(data) {
    fetch('../../Resources/output.json')
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
    
fetch('../../Resources/AI_Influencer_200.json')
        .then((response) => response.json())
        .then((jsonData) => {
            let name = jsonData.Name;
            let CAT = jsonData.Lifestyle;
            let Name = [];
            let jointData = [];
            for (let [key, value] of Object.entries(jsonData.Name)) {
                Name.push(value)
            };
            for (let i = 0; i < Name.length; i++) {
                jointData.push({Name:name[i],Category:CAT[i]})
            }     
            console.log(jointData)       
    });


function createPieChart(data) {
    fetch('../../Resources/AI_Influencer_200.json')
        .then((response) => response.json())
        .then((jsonData) => {
            //Re-arrange Data
            let name = jsonData.Name;
            let CAT = jsonData.Lifestyle;
            let Name = [];
            let jointData = [];
            for (let [key, value] of Object.entries(jsonData.Name)) {
                Name.push(value)
            };
            for (let i = 0; i < Name.length; i++) {
                jointData.push({Name:name[i],Category:CAT[i]})
            }     
            console.log(jointData) 
    });
}