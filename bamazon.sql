CREATE DATABASE bamazon;

Use bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);


-- Insert data into the products table --
INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUES ('Printer', 'Electronics', 59.68, 20),
        ('3D TV', 'TV, Audio & Home Theather', 1189.91, 206),
        ('Bluetooth Speaker', 'Electronics', 199.00, 2),
        ('PlayStation 4', 'Video Games', 255.00, 87),
        ('Camera', 'Electronics', 300.10, 150),
        ('GPS', 'Gadgets & Gizmos', 249.95, 56),
        ('Curved TV', 'TV, Audio & Home Theather', 857.99, 7),
        ('Xbox One', 'Video Games', 264.99, 345),
        ('Blu-ray Disc Player', 'TV, Audio & Home Theater', 67.50, 1566),
        ('Helicoter Drone', 'Gadgets & Gizmos', 999.99, 35);