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
            // process.exit(-1);
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

        if (res[0].stock_quantity < qty) {
            console.log("quantity not available: " + qty);
            return printDatabase();
        }

        // modify table now

        printDatabase();
    });

    // process.exit(-1);
}

// function artistSearch() {
//     inquirer
//         .prompt({
//             name: "artist",
//             type: "input",
//             message: "What artist would you like to search for?"
//         })
//         .then(function(answer) {
//             var query = "SELECT id, song, year FROM top5000 WHERE ?";
//             connection.query(query, { artist: answer.artist }, function(err, res) {
//                 for (var i = 0; i < res.length; i++) {
//                     console.log("Position: " + res[i].id + " || Song: " + res[i].song + " || Year: " + res[i].year);
//                 }
//                 runSearch();
//             });
//         });
// }

// function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//             console.log(res[i].artist);
//         }
//         runSearch();
//     });
// }

// function rangeSearch() {
//     inquirer
//         .prompt([{
//                 name: "start",
//                 type: "input",
//                 message: "Enter starting position: ",
//                 validate: function(value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             },
//             {
//                 name: "end",
//                 type: "input",
//                 message: "Enter ending position: ",
//                 validate: function(value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             }
//         ])
//         .then(function(answer) {
//             var query = "SELECT id,song,artist,year FROM top5000 WHERE id BETWEEN ? AND ?";
//             connection.query(query, [answer.start, answer.end], function(err, res) {
//                 for (var i = 0; i < res.length; i++) {
//                     console.log(
//                         "Position: " +
//                         res[i].id +
//                         " || Song: " +
//                         res[i].song +
//                         " || Artist: " +
//                         res[i].artist +
//                         " || Year: " +
//                         res[i].year
//                     );
//                 }
//                 runSearch();
//             });
//         });
// }

// function songSearch() {
//     inquirer
//         .prompt({
//             name: "song",
//             type: "input",
//             message: "What song would you like to look for?"
//         })
//         .then(function(answer) {
//             console.log(answer.song);
//             connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//                 console.log(
//                     "Position: " +
//                     res[0].id +
//                     " || Song: " +
//                     res[0].song +
//                     " || Artist: " +
//                     res[0].artist +
//                     " || Year: " +
//                     res[0].year
//                 );
//                 runSearch();
//             });
//         });
// }