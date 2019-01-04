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
        startPurchase();
    });
}

function startPurchase() {
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "What item would you like to buy?"
        })
        .then(function(answer) {
            console.log("You want to buy item " + answer.id);
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
            // console.log("You wanted to buy " + answer.id + " of item " + item);
            purchaseItem(item, answer.id);
            // connection.end();
            // process.exit(-1);:q
        });
}

// get an item
function purchaseItem(item, qty) {
    console.log("You want to buy " + qty + " of item " + item);
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
        var new_quantity = element.stock_quantity - qty;
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