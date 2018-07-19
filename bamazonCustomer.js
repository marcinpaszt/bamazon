var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

//Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    //Port
    port: 3306,

    //Username
    user: "root",

    //Password
    password: "Isolated1",
    database: "bamazon_db"
});

//Connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    //Run the start function after the connection is made to prompt the user
    readProducts();
});

//Function which prompts the user for what action they should take
function readProducts() {
    console.log("\n Welcome to BAMazon! \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++)
        //Log all results of the SELECT statement
        {
            console.log(
                "Product id: " +
                res[i].product_name +
                " || Product Name: " +
                res[i].product_name +
                " || Department: " +
                res[i].department_name +
                " || Price: " +
                res[i].price +
                " || Stock Quantity: " +
                res[i].stock_quantity
            );
            console.log('--------------------------------------------------------------------------------------------------')
        }
        runSearch();
    });
}


//Function which prompts the user for what action they should take
function runSearch() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "How are you using BAMazon?",
        choices: [
            "As a customer",
            // "As a supervisor",
            // "As a manager"
        ]
    })

        .then(function (answer) {
            switch (answer.action) {
                case "As a customer":
                    buyBAMazon();
                    break;

                case "As a supervisor":
                    superviseBAMazon();
                    break;

                case "As a manager":
                    manageBAMazon();
                    break;
            }
        });
}

function buyBAMazon() {
    //Prompt for info about the item being put up for auction
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the id of the item you would like to buy?",
        },

        {
            name: "units",
            type: "input",
            message: "How many would you like to buy?",
        }
    ])

        .then(function (answer) {
            //Item they are buying
            var whatBuying = answer.item;
            //Makes it a number
            var howMany = answer.units;

            //Query db to make sure the item ID exists and is in stock
            var queryStr = "SELECT * FROM products WHERE ?";

            connection.query(queryStr, { product_name: whatBuying }, function (err, data) {

                if (err) throw err;

                //Wrong id entered
                if (data.length === 0) {
                    console.log("Please select a correct item id");
                    readProducts()
                }

                else {
                    var itemsData = data[0];

                    if (howMany <= itemsData.stock_quantity) {
                        console.log("Your order is in stock!!");
                        //Update the system
                        var newQueryStr = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_name = ?";

                        connection.query(newQueryStr, [howMany, whatBuying], function (err, data) {

                            if (err) throw err;
                            console.log("Your purchase was created successfully! You total is $" + itemsData.price * howMany);

                            connection.end();
                            askAgain();
                        });
                    }

                    else {
                        console.log("\n Insufficient amount in our stock. Please pick a different item.\n")
                        buyBAMazon()
                    }
                };
            });
        });
}

//Asks if they would like to purchase another item
function askAgain() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }])

        .then(function (answer) {
            if (answer.reply) {
                buyBAMazon();
            }

            else {
                console.log("Thanks for your order!");
            }
        });
}




