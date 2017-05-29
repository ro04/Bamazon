# bamazon

Bamazon is a CLI style storefront implemented using **Node.js** for executing server-side JavaScript code combined with **MySQL** database. This application has two interfaces: Customer View and Management View. 

**Customer View**

Running the Node application called *bamazonCustomer.js* will: 
- First display all of the items available for sale. The Item IDs, Product Names, Prices, and Stock Quantity are included. 
- Then prompt the user with two messages:
    * The first message asks them the ID of the product they would like to buy.
    * The second asks how many units of the product they would like to buy.
- Third, once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request. If not, the app logs the phrase *Insufficient quantity!*, and then prevents the order from going through. However, if the store does have enough of the product, the customer's order is fulfilled and the SQL database is updated reflecting the remaining quantity.

**Management View**

Running the Node application called *bamazonManager.js* will list a set of menu options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

- If a manager selects *View Products for Sale*, the app lists every available item: the item IDs, names, prices, and quantities.

- If a manager selects *View Low Inventory*, the app lists all items with a inventory count lower than five.

- If a manager selects *Add to Inventory*, the app displays a prompt that will let the manager "add more" of any item currently in the store.

- If a manager selects *Add New Product*, it allows the manager to add a completely new product to the store.
