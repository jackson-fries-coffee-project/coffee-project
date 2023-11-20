"use strict"

function renderCoffee(coffee) {
    let html = '<tr class="coffee">';
    html += `<td>${coffee.id}</td>`;
    html += `<td>${coffee.name}</td>`;
    html += `<td>${coffee.roast}</td>`;
    html += '</tr>';

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
    const filteredCoffees = [];
    coffees.forEach(coffee => {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
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

submitButton.addEventListener('submit', updateCoffees);

function searchCoffee(event) {
    if (event) {
        event.preventDefault();
    }
    let searchedCoffeeList = [];
    const coffeeSearch = document.getElementById("coffee-search").value.toLowerCase();
    searchedCoffeeList = coffees.filter((coffee) => {
        if (coffee.name.toLowerCase().includes(coffeeSearch) || coffee.roast.toLowerCase().includes(coffeeSearch)) {
            return true;
        }
    })
    console.log(searchedCoffeeList)
    tbody.innerHTML = renderCoffees(searchedCoffeeList);
}

document.querySelector("#search-from").addEventListener("submit", searchCoffee);

let searchTimeout;
document.querySelector("#coffee-search").addEventListener("keyup", (event) => {

    console.log(event);
    clearTimeout(searchTimeout);

    // dont start
    searchTimeout = setTimeout(function () {
        searchCoffee();
    }, 550);
});

function addCoffee(event) {
    event.preventDefault();
    const roastSelection = document.querySelector('#roast-add-selection').value;
    const roastName = document.querySelector('#add-coffee-name').value;

    const newIdCreatedForCoffee = getAllCoffees().length + 1;
    const newCoffee = {
        id: newIdCreatedForCoffee,
        name: roastName,
        roast: roastSelection
    }
    coffees.push(newCoffee);

    // save coffee to browsers local storage
    saveCoffee(newCoffee);

    tbody.innerHTML = renderCoffees(getAllCoffees());
}

document.querySelector("#add-form").addEventListener("submit", addCoffee);


// Persisting Coffees

function saveCoffee(coffee) {
    let savedCoffees = getSavedCoffees();
    // checks if the local Storage coffees even exists otherwise would cause error with push code below
    if (!savedCoffees?.length) {
        savedCoffees = [];
    }
    // add coffee to array
    savedCoffees.push(coffee);
    // save to browser storage as a string
    localStorage.setItem('coffees', JSON.stringify(savedCoffees));
}

function getSavedCoffees() {
    // get coffees and turn them into an array
    return JSON.parse(localStorage.getItem('coffees'))
}

function getAllCoffees() {
    // combine default coffees and saved coffees, condition checks for length of saved coffees and merges and flattens to the existing coffee
    return coffees.append(...(getSavedCoffees()?.length ? getSavedCoffees() : []));
}

function deleteCoffees() {
    // ask confirmation before deleting
    if (confirm("Are you sure you want to delete all those coffees?")) {
        localStorage.removeItem('coffees');
    }

}