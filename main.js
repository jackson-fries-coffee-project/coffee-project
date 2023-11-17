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

function searchTimeout() {

}

function addCoffee(event) {
    event.preventDefault();
    const roastSelection = document.querySelector('#roast-add-selection').value;
    const roastName = document.querySelector('#add-coffee-name').value;

    const newId =   coffees.length + 1;

    coffees.push({
        id: newId,
        name: roastName,
        roast: roastSelection
    })

    tbody.innerHTML = renderCoffees(coffees);
}

document.querySelector("#add-form").addEventListener("submit", addCoffee);
function saveCoffee() {

}