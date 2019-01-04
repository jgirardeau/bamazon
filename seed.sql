USE bamazon;
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES
("socks","footwear",9.2,1000),
("nike air","footwear",99.98,100),
("sandals","footwear",38.18,70),
("scarf","clothing",9.2,1000),
("coat","clothing",99.98,100),
("hat","clothing",38.18,70),
("shirt","clothing",38.18,70),
("screwdriver","tools",9.2,1000),
("pliars","tools",99.98,100),
("hammer","tools",38.18,70)
;

INSERT INTO departments (department_name,over_head_costs)
VALUES
("footwear",10.1),
("clothing",11.2),
("tools",12.4)
;
