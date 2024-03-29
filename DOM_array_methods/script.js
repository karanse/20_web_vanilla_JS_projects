const main = document.getElementById("main");
const addUserBtn= document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionersBtn = document.getElementById("show-millioners");
const sortBtn = document.getElementById("sort");
const calculateWeatlhBtn = document.getElementById("calculate-wealth");

let data = [];

// Fetch random user and add money
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}` ,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser)
}

// Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Double Money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    });
    updateDOM();
}

// Sort richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM()
}

// Filter only millioners
function showMillioners() {
    data = data.filter(user => user.money > 1000000);
    updateDOM()
}

// Calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

// Update DOM
function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);

    });
}

// Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionersBtn.addEventListener('click', showMillioners);
calculateWeatlhBtn.addEventListener('click', calculateWealth);