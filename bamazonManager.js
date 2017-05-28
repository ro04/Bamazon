var mysql = require ('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: "bamazon"
    
});

// only positive integers for inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
});

var promptSelection = function() {
    inquirer.prompt({
        type: 'list',
        name: 'option',
        message: "Please choose from the following Menu Options:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product" ]
    }).then(function(answer){
        if(answer.option === "View Products for Sale") {
            displayInventory();
        }
        if(answer.option === "View Low Inventory") {
            displayLowInventory();
        }
        if(answer.option === "Add to Inventory") {
            addInventory();
        }
        if(answer.option === "Add New Product") {
            addNewProduct();
        }
    });
};

//Display all of the items available for sale. 
var displayInventory = function() {
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        console.log ("Current Inventory:");
    
        for(var i = 0; i < res.length; i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " |" + res[i].stock_quantity)
        }
         console.log("-------------------------------------");

         connection.end();
    })
};

//List all items with a inventory count lower than five
var displayLowInventory = function() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res) {
        if(err) throw err;

        console.log ("Current Inventory BELOW FIVE:");
    
        for(var i = 0; i < res.length; i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " |" + res[i].stock_quantity)
        }
         console.log("-------------------------------------");

         connection.end();
    })
};

//Display a prompt that will let the manager "add more" of any item currently in the store.
var addInventory = function() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'item_id',
        message: "Please enter the item ID.",
        validate: validateInput,
        filter: Number
    },
    {
        type: 'input',
        name: 'stock_quantity',
        message: "How many items whould you like to add to the inventory",
        validate: validateInput,
        filter: Number
    }
    ]).then(function(answer){
        connection.query('SELECT * FROM products WHERE ?', {item_id: answer.item_id}, function(err, res){
            if (err) throw err;

            //validate item_id
            var chosenItem;
            for(var i = 0; i < res.length; i++){
                if(answer.item_id === res[i].item_id){
                    chosenItem = res[i];

                    //Updating inventory with quantity entered
                    var updateQuery = 'UPDATE products SET stock_quantity = ' + (chosenItem.stock_quantity + answer.stock_quantity) + ' WHERE item_id = ' + chosenItem.item_id;
                    connection.query(updateQuery, function(err, data) {
                        if(err) throw err;
                        
                        console.log('Stock count for Item ID ' + chosenItem.item_id + ' has been updated to ' + (chosenItem.stock_quantity + answer.stock_quantity) + '.');
                        console.log("\n---------------------------------------------------------------------\n");

                        connection.end();
                    })
                } 
            }
        })
    }) 
}

//If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
var addNewProduct = function() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'product_name',
        message: "What is the item you would like to add to the database?"
    },
    {
        type: 'input',
        name: 'department_name',
        message: "What is the department name?"
    },
    {
        type: 'input',
        name: 'price',
        message: "What is the selling price of the item?"
    },
    {
        type: 'input',
        name: 'stock_quantity',
        message: "What is the stock quantity?",
        validate: validateInput,
        filter: Number
    }
    ]).then(function(answer){
        connection.query('INSERT INTO products SET ?', {
            product_name: answer.product_name,
            department_name: answer.department_name,
            price: answer.price,
            stock_quantity: answer.stock_quantity
        }, function(err){
            if(err) throw err;
            console.log("Your new product has been added cessfully!");
            console.log("------------------------------------------");
            displayInventory();
        })
    })
}

promptSelection();
