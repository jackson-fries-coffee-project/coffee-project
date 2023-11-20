"use strict"

// CHANGED TABLE TO DIV AND ADDED COL-6 TO SHOW COFFEE LIST IN TWO COLUMNS
function renderCoffee(coffee) {
    let html = '<div class="coffee col-6">';
    html += `<h3>${coffee.name}</h3>`;
    html += `<p>${coffee.roast}</p>`;
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    let coffeeListHtml = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        coffeeListHtml += renderCoffee(coffees[i]);
    }
    return coffeeListHtml;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    const selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    let userSelection = [];
    // const userInput = document.getElementById("coffee-search").value;
// filterAll(filteredCoffees, userInput);
    if (selectedRoast !== "all") {
        userSelection = [...coffees];
        console.log(userSelection)
        switch (selectedRoast) {
            case "light":
                filteredCoffees = userSelection.filter(coffee => coffee.roast === "light");
                filteredCoffees = searchByInput(filteredCoffees)
                break;
            case "medium":
                filteredCoffees = userSelection.filter(coffee => coffee.roast === "medium");
                filteredCoffees = searchByInput(filteredCoffees)
                break;
            case "dark":
                filteredCoffees = userSelection.filter(coffee => coffee.roast === "dark");
                filteredCoffees = searchByInput(filteredCoffees)
                break;
        }
    } else {
        coffees.forEach(coffee => {
            // ADDED ANOTHER CONDITION TO MAKE ALL THE ROAST POPULATE WHEN 'all' IS SELECTED
            if (coffee.roast === selectedRoast || selectedRoast === "all") {
                filteredCoffees.push(coffee);
            }
        });
    }
    tbody.innerHTML = renderCoffees(filteredCoffees);
}




// } else {
//     switch (selectedRoast) {
//         case "light":
//             filteredCoffees = coffees.filter(coffee => coffee.roast === "light");
//             break;
//         case "medium":
//             filteredCoffees = coffees.filter(coffee => coffee.roast === "light");
//             break;
//         case "dark":
//             filteredCoffees = coffees.filter(coffee => coffee.roast === "light");
//             break;
//     }
// }


function searchByInput(coffees) {
    const userInput = document.getElementById("coffee-search").value;
    if (!userInput) {
        return coffees;
    }
   return coffees.filter(coffee => coffee.name.includes(userInput));
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

const tbody = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

function searchCoffee(event) {
    event.preventDefault();
    let searchedCoffeeList = [];
    const coffeeSearch = document.getElementById("coffee-search").value.toLowerCase();
    searchedCoffeeList = coffees.filter((coffee) => {
        if (coffee.name.toLowerCase().includes(coffeeSearch) || coffee.roast.toLowerCase().includes(coffeeSearch)) {
            return coffee;
        }
    })
    console.log(searchedCoffeeList)
    tbody.innerHTML = renderCoffees(searchedCoffeeList);
}

document.querySelector("#search-from").addEventListener("submit", searchCoffee);
document.querySelector("#coffee-search").addEventListener("keyup", searchCoffee);

// ADDED AN EVENT LISTENER TO ROAST SELECTION SO WHEN YOU SELECT A ROAST FROM THE DROPDOWN THE COFFEE LIST WILL UPDATE AS WELL
document.querySelector("#roast-selection").addEventListener('change', updateCoffees);

function addCoffee(event) {
    event.preventDefault();
    const roastSelection = document.querySelector('#roast-add-selection').value;
    const roastName = document.querySelector('#add-coffee-name').value;

    const newId = coffees.length + 1;

    coffees.push({
        id: newId,
        name: roastName,
        roast: roastSelection
    })

    tbody.innerHTML = renderCoffees(coffees);
}

document.querySelector("#add-form").addEventListener("submit", addCoffee);