const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch ramdom user
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

//double money
function doubleMoney() {
    data = data.map((user) => {
        return {
            ...user,
            money: user.money * 2
        }
    });

    updateDOM();
}

//sort by richest
function sortRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

//filter millionares
function filterMill() {
    data = data.filter(item => {
        return item.money > 1000000
    });

    updateDOM();
}

//reduce all the money in the arry into one value
function calcWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong></strong>${formatMoney(wealth)}</h3>`;
    main.appendChild(wealthEl);
}

//add new object to data array 
function addData(obj) {
    data.push(obj);

    updateDOM();
}

//update dom
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

//format number as mony
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortRichest);
showMillBtn.addEventListener('click', filterMill);
calculateBtn.addEventListener('click', calcWealth);