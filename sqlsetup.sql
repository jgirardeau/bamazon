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

