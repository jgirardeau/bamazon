
This project has three separate functions, all are node.js scripts.
The scripts are used to maintain a database of sales and products.
The basic database structure is below:

CREATE TABLE products (
item_id int NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price float(10,2),
stock_quantity integer(8),
product_sales float(10,2) default 0,
PRIMARY KEY (item_id)
);
CREATE TABLE departments (
department_id int NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100),
over_head_costs float(10,2),
PRIMARY KEY (department_id)
);

The three basic programs are:

bamazonCustomer.js  -- buy items from database; if not enough items are available, the sale will not go through.
bamazonManager.js -- maintain database; add stock back; add new items
bamazonSupervisor.js -- review overall sales by department; add departments

Screenshots of programs.
node bamazonCustomer.js
item_id  product_name  department_name  price  stock_quantity  product_sales
-------  ------------  ---------------  -----  --------------  -------------
1        socks         footwear         9.2    1070            276
2        nike air      footwear         99.98  100             0
3        sandals       footwear         38.18  70              0
4        scarf         clothing         9.2    1000            0
5        coat          clothing         99.98  100             0
6        hat           clothing         38.18  70              0
7        shirt         clothing         38.18  70              0
8        screwdriver   tools            9.2    1000            0
9        pliars        tools            99.98  100             0
10       hammer        tools            38.18  70              0
11       socks         footwear         9.2    1000            0
12       nike air      footwear         99.98  90              999.8
13       sandals       footwear         38.18  70              0
14       scarf         clothing         9.2    1000            0
15       coat          clothing         99.98  100             0
16       hat           clothing         38.18  70              0
17       shirt         clothing         38.18  70              0
18       screwdriver   tools            9.2    880             1104
19       pliars        tools            99.98  100             0
20       hammer        tools            38.18  70              0
21       napkins       house            2      9               2
22       forks         house            2      10              0

? What item would you like to buy? 2
You want to buy item 2
? How many? 10
You want to buy 10 of item 2
new quantity: 90, price: $999.8000000000001
item_id  product_name  department_name  price  stock_quantity  product_sales
-------  ------------  ---------------  -----  --------------  -------------
1        socks         footwear         9.2    1070            276
2        nike air      footwear         99.98  90              999.8
3        sandals       footwear         38.18  70              0
4        scarf         clothing         9.2    1000            0
5        coat          clothing         99.98  100             0
6        hat           clothing         38.18  70              0
7        shirt         clothing         38.18  70              0
8        screwdriver   tools            9.2    1000            0
9        pliars        tools            99.98  100             0
10       hammer        tools            38.18  70              0
11       socks         footwear         9.2    1000            0
12       nike air      footwear         99.98  90              999.8
13       sandals       footwear         38.18  70              0
14       scarf         clothing         9.2    1000            0
15       coat          clothing         99.98  100             0
16       hat           clothing         38.18  70              0
17       shirt         clothing         38.18  70              0
18       screwdriver   tools            9.2    880             1104
19       pliars        tools            99.98  100             0
20       hammer        tools            38.18  70              0
21       napkins       house            2      9               2
22       forks         house            2      10              0

node bamazonManager.js
Low inventory
id: 2, name: nike air, dept: footwear, price: $99.98, qty: 90
id: 3, name: sandals, dept: footwear, price: $38.18, qty: 70
id: 6, name: hat, dept: clothing, price: $38.18, qty: 70
id: 7, name: shirt, dept: clothing, price: $38.18, qty: 70
id: 10, name: hammer, dept: tools, price: $38.18, qty: 70
id: 12, name: nike air, dept: footwear, price: $99.98, qty: 90
id: 13, name: sandals, dept: footwear, price: $38.18, qty: 70
id: 16, name: hat, dept: clothing, price: $38.18, qty: 70
id: 17, name: shirt, dept: clothing, price: $38.18, qty: 70
id: 20, name: hammer, dept: tools, price: $38.18, qty: 70
id: 21, name: napkins, dept: house, price: $2.00, qty: 9
id: 22, name: forks, dept: house, price: $2.00, qty: 10
? Select an action (Use arrow keys)
> View Products for Sale
  View Low Inventory
  Add to Inventory
  Add New Product

  node bamazonManager.js
  You want to add 10 to item 22
new quantity: 20
item_id  product_name  department_name  price  stock_quantity  product_sales
-------  ------------  ---------------  -----  --------------  -------------
1        socks         footwear         9.2    1070            276
2        nike air      footwear         99.98  90              999.8
3        sandals       footwear         38.18  70              0
4        scarf         clothing         9.2    1000            0
5        coat          clothing         99.98  100             0
6        hat           clothing         38.18  70              0
7        shirt         clothing         38.18  70              0
8        screwdriver   tools            9.2    1000            0
9        pliars        tools            99.98  100             0
10       hammer        tools            38.18  70              0
11       socks         footwear         9.2    1000            0
12       nike air      footwear         99.98  90              999.8
13       sandals       footwear         38.18  70              0
14       scarf         clothing         9.2    1000            0
15       coat          clothing         99.98  100             0
16       hat           clothing         38.18  70              0
17       shirt         clothing         38.18  70              0
18       screwdriver   tools            9.2    880             1104
19       pliars        tools            99.98  100             0
20       hammer        tools            38.18  70              0
21       napkins       house            2      9               2
22       forks         house            2      20              0

node bamazonManager.js
You want to add 100 to item 22
quantity not available: 100
item_id  product_name  department_name  price  stock_quantity  product_sales
-------  ------------  ---------------  -----  --------------  -------------
1        socks         footwear         9.2    1070            276
2        nike air      footwear         99.98  90              999.8
3        sandals       footwear         38.18  70              0
4        scarf         clothing         9.2    1000            0
5        coat          clothing         99.98  100             0
6        hat           clothing         38.18  70              0
7        shirt         clothing         38.18  70              0
8        screwdriver   tools            9.2    1000            0
9        pliars        tools            99.98  100             0
10       hammer        tools            38.18  70              0
11       socks         footwear         9.2    1000            0
12       nike air      footwear         99.98  90              999.8
13       sandals       footwear         38.18  70              0
14       scarf         clothing         9.2    1000            0
15       coat          clothing         99.98  100             0
16       hat           clothing         38.18  70              0
17       shirt         clothing         38.18  70              0
18       screwdriver   tools            9.2    880             1104
19       pliars        tools            99.98  100             0
20       hammer        tools            38.18  70              0
21       napkins       house            2      9               2
22       forks         house            2      20              0


node bamazonManager.js
Add New Product
? Name of item? Spoons
? Quantity? 100
? Price? 2.
? Department? house
item_id  product_name  department_name  price  stock_quantity  product_sales
-------  ------------  ---------------  -----  --------------  -------------
1        socks         footwear         9.2    1070            276
2        nike air      footwear         99.98  90              999.8
3        sandals       footwear         38.18  70              0
4        scarf         clothing         9.2    1000            0
5        coat          clothing         99.98  100             0
6        hat           clothing         38.18  70              0
7        shirt         clothing         38.18  70              0
8        screwdriver   tools            9.2    1000            0
9        pliars        tools            99.98  100             0
10       hammer        tools            38.18  70              0
11       socks         footwear         9.2    1000            0
12       nike air      footwear         99.98  90              999.8
13       sandals       footwear         38.18  70              0
14       scarf         clothing         9.2    1000            0
15       coat          clothing         99.98  100             0
16       hat           clothing         38.18  70              0
17       shirt         clothing         38.18  70              0
18       screwdriver   tools            9.2    880             1104
19       pliars        tools            99.98  100             0
20       hammer        tools            38.18  70              0
21       napkins       house            2      9               2
22       forks         house            2      20              0
23       Spoons        house            2      100             0

node bamazonSupervisor.js
? Select an action View Product Sales by Department
department_id  department_name  over_head_costs  Product Sales  Profit
-------------  ---------------  ---------------  -------------  ------
2              clothing         11.2             0              -11.2
1              footwear         10.1             2275.6         2265.5
5              house            2                2              0
3              tools            12.4             1104           1091.6

Key statement:
SELECT department_id, departments.department_name, over_head_costs, SUM(products.product_sales) as "Product Sales", (SUM(products.product_sales) - over_head_costs) as "Profit"
FROM departments	RIGHT join products ON departments.department_name = products.department_name
GROUP BY departments.department_name;
