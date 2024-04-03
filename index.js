#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let currentBalance = 10000;
let pinCode = 26864;
// ptint welcome message
console.log(chalk.cyan.bold("\n\t\t\tWelcome To ATM Machine\n\t\t"));
let pinAnswer = await inquirer.prompt([
    {
        message: chalk.magenta.italic("Enter Your Pin Code:"),
        name: "pin",
        type: "number",
    },
]);
if (pinAnswer.pin === pinCode) {
    console.log(chalk.green.bold("\nPin Is Correct, Login Successfully!\n"));
    let operationAns = await inquirer.prompt([
        {
            message: chalk.magenta.italic("What Do You Want"),
            name: "Operation",
            type: "list",
            choices: ["Withdraw", "Check Balance"],
        },
    ]);
    if (operationAns.Operation === "Withdraw") {
        let Withdraw = await inquirer.prompt([
            {
                message: chalk.yellow.bold("Select a Withdrawal Method"),
                name: "withdrawMethod",
                type: "list",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (Withdraw.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    message: chalk.magenta.bold("Select Amount:"),
                    name: "fastCash",
                    type: "list",
                    choices: [2000, 4000, 6000, 8000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > currentBalance) {
                console.log(chalk.red.bold("\nInsufficent Balance\n"));
            }
            else {
                currentBalance -= fastCashAns.fastCash;
                console.log(chalk.green.bold(`\n${fastCashAns.fastCash} Withdraw Successfully!\n`));
                console.log(chalk.cyan.bold(`Your Remaining Balance is: ${currentBalance}\n`));
            }
        }
        else if (Withdraw.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    message: chalk.magenta.bold("Enter The Amount To Withdraw"),
                    name: "amount",
                    type: "number",
                },
            ]);
            if (amountAns.amount > currentBalance) {
                console.log(chalk.red("\nInsufficent Balance\n"));
            }
            else {
                currentBalance -= amountAns.amount;
                console.log(chalk.green.bold(`\n${amountAns.amount} Withdraw Successfully!`));
                console.log(chalk.cyan.bold(`\nYour Remaining Balance Is ${currentBalance}\n`));
            }
        }
    }
    else if (operationAns.Operation === "Check Balance") {
        console.log(chalk.yellow.bold(`\nYour Balance is ${currentBalance}\n`));
    }
}
else {
    console.log(chalk.red("\nPin Is Incorrect!\n"));
}
;
