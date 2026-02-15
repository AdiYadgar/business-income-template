const fs = require('fs');

// קבלת פרמטרים מ-Jenkins
const business = process.argv[2];
const income = Number(process.argv[3]);
const expenses = Number(process.argv[4]);
const includeTax = process.argv[5] === 'true';

// ולידציה
if (!business || isNaN(income) || isNaN(expenses)) {
    console.error("Invalid parameters");
    process.exit(1);
}

let profit = income - expenses;
let tax = 0;

if (includeTax) {
    tax = profit * 0.17;
    profit -= tax;
}

// יצירת תיקייה אם לא קיימת
if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
}

// HTML
const html = `
<html>
<head><title>Business Report</title></head>
<body>
<h1>${business}</h1>
<p>Income: ${income}</p>
<p>Expenses: ${expenses}</p>
<p>Tax: ${tax}</p>
<h2>Final Profit: ${profit}</h2>
</body>
</html>
`;

fs.writeFileSync('output/report.html', html);

// LOG
const log = `
Business: ${business}
Income: ${income}
Expenses: ${expenses}
Tax: ${tax}
Final Profit: ${profit}
Date: ${new Date()}
`;

fs.writeFileSync('output/run.log', log);

console.log("Report generated successfully!");
