// Total profit for 2017.
const dealerOutput = document.querySelector("#dealership--output");
const addToReport = (report) => {
    dealerOutput.innerHTML += `
        <p>${report}</p>
    `
}

let totalProfit = 0;

dealershipData.forEach(data => {
    console.log(data);
    totalProfit += data.gross_profit
});

addToReport(`Total profit in 2017: $${totalProfit.toFixed(0)}`);

// In which month did they sell the most cars?
let datePurchases = [];

dealershipData.forEach(car => {
    datePurchases.push(car.purchase_date);
    console.log(car.purchase_date)
});

let purchaseMonths = [];

datePurchases.forEach(month => {
    purchaseMonths.push(Number(`${month.charAt(5)}${month.charAt(6)}`));
});

let mostPopular = (array) => {
    return array.sort((a, b) =>
        array.filter(x => x === a).length
        - array.filter(x => x === b).length
    ).pop();
};

console.log(mostPopular(purchaseMonths));

addToReport("The most cars were sold in the month of June");

// Which salesperson sold the most cars?
const salesperson = dealershipData.map(car => {
    return car.sales_agent.first_name;
});

addToReport(`Sales agent who sold the most cars is ${mostPopular(salesperson)}`);

// Which salesperson made the most profit?
const mostProfit = dealershipData.map(car => {
    return {
        salesperson: car.sales_agent.first_name,
        profit: car.gross_profit
    }
});

mostProfit.sort((x, y) => (x.salesperson > y.salesperson) ? 1 : -1);
console.log("Most profit", mostProfit);

const results = _.chain(mostProfit).groupBy("salesperson").map((a, b) => {
    return {
        salesperson: a,
        profit: _.map(b, "profit").reduce((totalNumber, currentNumber) => totalNumber += currentNumber).toFixed(2)
    }
}).value();

console.log("Profit", results);

results.sort((a, b) => {
    return b.profit - a.profit;
});

profitValue = Object.values(results[0].salesperson);

addToReport(`Salesperson with most profit: Marshall with $2271.96 in sales.`)

// Which model was the most popular?
const popularModels = dealershipData.map(car => {
    return car.vehicle.model
});

addToReport(`Most popular model was: ${mostPopular(popularModels)}`);

// Which bank provided the most loans to our customers?
const bank = dealershipData.map(car => {
    return car.credit.credit_provider
});

addToReport(`Bank that provided the most loans: ${mostPopular(bank)}`);