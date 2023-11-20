"use strict"

// CHANGED TABLE TO DIV AND ADDED COL-6 TO SHOW COFFEE LIST IN TWO COLUMNS
function renderCoffee(coffee) {
    let html = '<div class="coffee col-6">';
    html += `<h3>${coffee.name}</h3>`;
    html += `<p>${coffee.roast}</p>`;
    html += '</div>';
    return html;
}

// creates html to list all coffees
function renderCoffees(coffees) {
    let coffeeListHtml = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        coffeeListHtml += renderCoffee(coffees[i]);
    }
    return coffeeListHtml;
}

// used to update coffees based on inputs by user
function updateCoffees(e) {
    // on adding a coffee the event will be undefined
    if (e) {
        e.preventDefault();
    }
    // don't submit the form, we just want to update the data
    const selectedRoast = roastSelection.value;
    let filteredCoffees = [];

    if (selectedRoast !== "all") {
        filteredCoffees = searchByOtherRoastsSelected(selectedRoast);
    } else {
        filteredCoffees = searchByAllSelected(filteredCoffees, selectedRoast);
    }
    filteredCoffees = searchByInput(filteredCoffees);
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// This code is used to search for coffees using value from search box
function searchByInput(coffees) {
    const userInput = document.getElementById("coffee-search").value;
    if (!userInput) {
        return coffees;
    }
    return coffees.filter(coffee => coffee.name.toLowerCase().includes(userInput.toLowerCase()));
}

// used to search by the All roast value
function searchByAllSelected(filteredCoffees, selectedRoast) {
    allCoffees.forEach(coffee => {
        // ADDED ANOTHER CONDITION TO MAKE ALL THE ROAST POPULATE WHEN 'all' IS SELECTED
        if (coffee.roast === selectedRoast || selectedRoast === "all") {
            filteredCoffees.push(coffee);
        }
    });
    return filteredCoffees;
}

// Function to search by roast if its other than All value (Dark, Medium, Light)
function searchByOtherRoastsSelected(selectedRoast) {
    // function searchByAllNotSelected(filteredCoffees, selectedRoast) {
    let userSelection = [...allCoffees];
    let filteredCoffees = [];
    switch (selectedRoast) {
        case "light":
            filteredCoffees = userSelection.filter(coffee => coffee.roast === "light");
            break;
        case "medium":
            filteredCoffees = userSelection.filter(coffee => coffee.roast === "medium");
            break;
        case "dark":
            filteredCoffees = userSelection.filter(coffee => coffee.roast === "dark");
            break;
    }
    return filteredCoffees;
}

// variable will contain coffees and saved Coffees
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

// Global HTML References
const tbody = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');

tbody.innerHTML = renderCoffees(getAllCoffees());

function getAllCoffees() {
    return allCoffees = [...coffees, ...getSavedCoffees()];
}

// All Events
// ADDED AN EVENT LISTENER TO ROAST SELECTION SO WHEN YOU SELECT A ROAST FROM THE DROPDOWN THE COFFEE LIST WILL UPDATE AS WELL
document.querySelector("#roast-selection").addEventListener('change', updateCoffees);
submitButton.addEventListener('click', updateCoffees);
document.querySelector("#add-form").addEventListener("submit", addCoffee);
document.querySelector("#search-from").addEventListener("submit", updateCoffees);
//-------------- Long Awaited Search Timeout with Event ----------------
let searchTimeout;
document.querySelector("#coffee-search").addEventListener("keyup", (event) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function () {
        updateCoffees();
    }, 550);
});


// Will Add the coffee and run functions related to persisting the coffee to the browser
function addCoffee(event) {
    event.preventDefault();
    const roastSelection = document.querySelector('#roast-add-selection').value;
    const roastName = document.querySelector('#add-coffee-name').value;

    const coffee = {
        id: allCoffees.length + 1,
        name: roastName,
        roast: roastSelection
    }
    allCoffees.push(coffee);
    saveCoffee(coffee);

    // Reset the search and the dropdown to default values
    resetValuesAfterAddCoffee();

    updateCoffees();
}

function resetValuesAfterAddCoffee() {
    document.getElementById("coffee-search").value = "";
    document.querySelector('#roast-selection').value = "all";
    document.querySelector('#add-coffee-name').value = "";
}

// Persistence
function saveCoffee(coffee) {
//     Check if coffee exists on local storage
    let preppedCoffees = getSavedCoffees();
    preppedCoffees.push(coffee);
    // stringify the coffees to save to local storage
    localStorage.setItem('coffees', JSON.stringify(preppedCoffees));
}

// gets coffees in local storage
function getSavedCoffees() {
    // check if coffees key exists otherwise return empty array
    if (localStorage.getItem('coffees')) {
        return JSON.parse(localStorage.getItem('coffees'));
    } else {
        return [];
    }
}

