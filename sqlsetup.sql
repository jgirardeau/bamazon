DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

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
use bamazon;

select * from departments;
select * from products;

SELECT department_id, departments.department_name, over_head_costs, SUM(products.product_sales) as "Product Sales", (SUM(products.product_sales) - over_head_costs) as "Profit"
FROM departments	RIGHT join products ON departments.department_name = products.department_name
GROUP BY departments.department_name;

