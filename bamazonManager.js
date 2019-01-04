var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    printDatabase();
});

function startPrompts() {
    inquirer.prompt({
        type: "list",
        name: "selection",
        message: "Select an action",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function(answer) {
        if (answer.selection === "View Products for Sale") {
            process.stdout.write('\033c');
            console.log("Products for Sale");
            printDatabase();
        } else if (answer.selection === "View Low Inventory") {
            //printLowInventory();
            process.stdout.write('\033c');
            console.log("Low inventory");
            printLowInventory();
        } else if (answer.selection === "Add to Inventory") {
            console.log("Add to Inventory");
            addToInventory();
        } else if (answer.selection === "Add New Product") {
            process.stdout.write('\033c');
            console.log("Add New Product");
            addItem();
        }
    });
}

function printDatabase() {
    connection.query("SELECT * FROM products ", function(err, res) {
        if (err) throw err;
        //  console.log(res);
        res.forEach(element => {
            console.log("id: " + element.item_id +
                ", name: " + element.product_name +
                ", dept: " + element.department_name +
                ", price: $" + Number(element.price).toFixed(2) +
                ", qty: " + element.stock_quantity
            );
        });
        startPrompts();
    });
}

function printLowInventory() {
    process.stdout.write('\033c');
    connection.query("SELECT * FROM products ", function(err, res) {
        if (err) throw err;
        //  console.log(res);
        res.forEach(element => {
            if (element.stock_quantity < 100) {
                console.log("id: " + element.item_id +
                    ", name: " + element.product_name +
                    ", dept: " + element.department_name +
                    ", price: $" + Number(element.price).toFixed(2) +
                    ", qty: " + element.stock_quantity
                );
            }
        });
        startPrompts();
    });
}

function addToInventory() {
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "What item?"
        })
        .then(function(answer) {
            console.log("You want to add to " + answer.id);
            findQuantity(answer.id);
        });
}

function findQuantity(item) {
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "How many?"
        })
        .then(function(answer) {
            purchaseItem(item, answer.id);
        });
}

// get an item
function purchaseItem(item, qty) {
    console.log("You want to add " + qty + " to item " + item);
    // query database for item
    connection.query("SELECT * FROM products where item_id=" + item, function(err, res) {
        if (err) throw err;
        //  console.log(res);

        if (res.length === 0) {
            console.log("item not found: " + item);
            return printDatabase();
        }
        var element = res[0];
        if (element.stock_quantity < qty) {
            console.log("quantity not available: " + qty);
            return printDatabase();
        }

        // modify table now
        var new_quantity = Number(element.stock_quantity) + Number(qty);
        modifyDatabase(element.item_id, element.product_name, element.department_name, element.price,
            new_quantity);
    });
}

function modifyDatabase(id, name, dept, price, qty) {
    console.log("new quantity: " + qty);
    var newRecord = {
        item_id: id,
        product_name: name,
        department_name: dept,
        price: price,
        stock_quantity: qty
    }
    connection.query('UPDATE products SET ? WHERE item_id = ' + id, newRecord, function(err, result) {
        if (err) throw err;
        printDatabase();
    })
}

function addItem() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Name of item?"
    }, {
        name: "quantity",
        type: "input",
        message: "Quantity?"
    }, {
        name: "price",
        type: "input",
        message: "Price?"
    }, {
        name: "department",
        type: "input",
        message: "Department?"
    }]).then(function(answer) {
        var sql = `INSERT INTO products (product_name, department_name,price,stock_quantity) VALUES ("${answer.item}","${answer.department}",${answer.price},${answer.quantity} )`;
        console.log(sql)
        connection.query(sql, function(err, result) {
            if (err) throw err;
            printDatabase();
        });
    })
}