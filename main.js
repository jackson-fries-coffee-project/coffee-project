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
        userSelection = [...allCoffees];
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
        allCoffees.forEach(coffee => {
            // ADDED ANOTHER CONDITION TO MAKE ALL THE ROAST POPULATE WHEN 'all' IS SELECTED
            if (coffee.roast === selectedRoast || selectedRoast === "all") {
                filteredCoffees.push(coffee);
            }
        });
        filteredCoffees = searchByInput(filteredCoffees)
    }
    tbody.innerHTML = renderCoffees(filteredCoffees);
}


function searchByInput(coffees) {
    const userInput = document.getElementById("coffee-search").value;
    if (!userInput) {
        return coffees;
    }
    return coffees.filter(coffee => coffee.name.toLowerCase().includes(userInput));
}

let allCoffees = [];

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

tbody.innerHTML = renderCoffees(getAllCoffees());

submitButton.addEventListener('click', updateCoffees);


document.querySelector("#search-from").addEventListener("submit", updateCoffees);
document.querySelector("#coffee-search").addEventListener("keyup", updateCoffees);

// ADDED AN EVENT LISTENER TO ROAST SELECTION SO WHEN YOU SELECT A ROAST FROM THE DROPDOWN THE COFFEE LIST WILL UPDATE AS WELL
document.querySelector("#roast-selection").addEventListener('change', updateCoffees);

function addCoffee(event) {
    event.preventDefault();
    const roastSelection = document.querySelector('#roast-add-selection').value;
    const roastName = document.querySelector('#add-coffee-name').value;

    const newId = allCoffees.length + 1;
    const coffee = {
        id: newId,
        name: roastName,
        roast: roastSelection
    }
    allCoffees.push(coffee)
    saveCoffee(coffee)
    tbody.innerHTML = renderCoffees(allCoffees);
}

document.querySelector("#add-form").addEventListener("submit", addCoffee);

// Persistence
function saveCoffee(coffee) {
//     Check if coffee exists on local storage
    let preppedCoffees = getSavedCoffees();
    preppedCoffees.push(coffee);

    console.log(preppedCoffees);
    // stringify the coffees to save to local storage
    localStorage.setItem('coffees', JSON.stringify(preppedCoffees));
    console.log(JSON.stringify(JSON.parse(localStorage.getItem('coffees'))));

}

function getSavedCoffees() {
    if (localStorage.getItem('coffees')) {
        console.log(JSON.stringify(localStorage.getItem('coffees')));
        return JSON.parse(localStorage.getItem('coffees'));
    } else {
        return [];
    }
}

function getAllCoffees() {
    return allCoffees = [...coffees, ...getSavedCoffees()];
}

getAllCoffees();