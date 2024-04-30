#! /usr/bin/env node
import inquirer from "inquirer";
class BankAccount {
    balance;
    constructor() {
        this.balance = 100;
    }
    debit(amount) {
        if (amount > this.balance) {
            return "Insufficient Balance";
        }
        else {
            this.balance -= amount;
            return "Transaction Successful! New Account Balance is " + this.balance;
        }
    }
    credit(amount) {
        if (amount > this.balance) {
            return "Insufficient Balance";
        }
        else {
            if (amount >= 100) {
                amount--;
            }
            this.balance += amount;
            return "Transaction Successful! New Account Balance is " + this.balance;
        }
    }
}
class Customer extends BankAccount {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    bankAccount;
    constructor(firstName, lastName, gender, age, mobileNumber) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.bankAccount = new BankAccount();
    }
    customerInfo() {
        return `
        Name : ${this.firstName} ${this.lastName},
        Age : ${this.age},
        Gender : ${this.gender},
        Mobile Number : ${this.mobileNumber},
        Account Balance : ${this.bankAccount.balance}
        `;
    }
}
let obj = {};
let arr = [];
async function run() {
    let ques = await inquirer.prompt([
        {
            message: "Select your option",
            name: "option",
            type: "list",
            choices: [
                "Create Bank Account",
                "Check Balance & Info",
                "Transaction Amount",
                "Exit",
            ],
        },
    ]);
    if (ques.option === "Create Bank Account") {
        let create = await inquirer.prompt([
            {
                message: "Enter your first name",
                type: "input",
                name: "fname",
            },
            {
                message: "Enter your last name",
                type: "input",
                name: "lname",
            },
            {
                message: "Enter your age",
                type: "number",
                name: "age",
            },
            {
                message: "Enter your Gender",
                type: "list",
                name: "gender",
                choices: ["Male", "Female"],
            },
            {
                message: "Enter your mobile number",
                type: "number",
                name: "mobileNumber",
            },
            {
                message: "Your bank account is ready submit 100Rs",
                type: "confirm",
                name: "bankAccount",
            },
        ]);
        let newComer = new Customer(create.fname, create.lname, create.gender, create.age, create.mobileNumber);
        obj[create.fname] = newComer;
        arr.push(create.fname);
        console.log("Account created successfully");
        run();
    }
    else if (ques.option === "Check Balance & Info") {
        let about = await inquirer.prompt([
            {
                message: "Select your account",
                type: "list",
                name: "customers",
                choices: arr
            },
        ]);
        console.log(obj[about.customers].customerInfo());
        run();
    }
    else if (ques.option === "Transaction Amount") {
        let trans = await inquirer.prompt([
            {
                message: "Select your account",
                type: "list",
                name: "account",
                choices: arr
            },
            {
                message: "Select transaction type",
                type: "list",
                name: "type",
                choices: ["Debit Amount", "Credit Amount"],
            },
            {
                message: "Enter your amount",
                type: "number",
                name: "amount",
            },
        ]);
        if (trans.type === "Debit Amount") {
            let mess = (obj[trans.account].debit(trans.amount));
            console.log(mess);
            mess = mess.split(" ");
            mess.splice(0, mess.length - 1);
            mess = mess.join("");
            obj[trans.account].bankAccount.balance = +mess;
            // obj[trans.account].bankAccount.balance
            run();
        }
        else if (trans.type === "Credit Amount") {
            let mess = (obj[trans.account].credit(trans.amount));
            console.log(mess);
            mess = mess.split(" ");
            mess.splice(0, mess.length - 1);
            mess = mess.join("");
            obj[trans.account].bankAccount.balance = +mess;
            run();
        }
    }
}
run();
