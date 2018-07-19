DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(500) NOT NULL,
    department_name VARCHAR (500) NOT NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
    );
    
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("The Witcher", "Video Games", 59.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Ronaldo Juventus Jersey", "Sports memorabilia", 99.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Pierogi maker", "Small appliances", 7.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Wine erator", "Home goods", 13.75, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Label maker", "Office items", 25.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Rubber Soul vinyl", "Music", 34.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Harry Potter BLUray box set", "Movies", 89.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Batman Arkham Knight", "Video Games", 24.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Apple IPhone X", "Electronics", 999.999, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Google Home", "Electronics", 49.99, 7);