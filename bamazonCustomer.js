var mysql = require ('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: "bamazon"
    
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
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

//Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.
var displayInventory = function() {
    //READ
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        console.log ("Current Inventory:");
    
        for(var i = 0; i < res.length; i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " |" + res[i].stock_quantity)
        }
         console.log("-------------------------------------");

         promptUser();
    })
};

//The app should then prompt users with two messages.
//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.
var promptUser = function(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the ID of the product you would like to buy.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many units of the product would you like to buy.',
            validate: validateInput,
            filter: Number
        }
    ]).then(function(answer){    
        connection.query('SELECT * FROM products WHERE ?', {item_id: answer.item_id}, function(err, res){
            if(err) throw err;

            //validate item_id
            var chosenItem;
            for(var i = 0; i < res.length; i++){
                if(answer.item_id === res[i].item_id){
                    chosenItem = res[i];
        
                    //Once the customer has placed the order, 
                    //your application should check if your store has enough of the product to meet the customer's request.
                    if(answer.quantity <= chosenItem.stock_quantity){
                        console.log('Good News! The product you selected is in stock.');
                        var updateQuery = 'UPDATE products SET stock_quantity = ' + (chosenItem.stock_quantity - answer.quantity);
                        //UPDATE
                        connection.query(updateQuery, function(err, res) {
                            if(err) throw err;
                            console.log("The following order has been placed:");
                            console.log("The item you ordered is: " + chosenItem.product_name); 
                            console.log("The quantity you want is: " + answer.quantity); 
                            console.log('Your total is $' + chosenItem.price * answer.quantity);
                            console.log('Thank you for shopping with us!');
                            console.log("\n---------------------------------------------------------------------\n");

                            connection.end();
                        });
                    }else{
                            console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                            console.log('Please modify your order.');
                            console.log("\n---------------------------------------------------------------------\n");

                            displayInventory();
                    }  

                }else{
                    console.log("Item does not exist");
                    displayInventory();
                }
            } //end for
        })
    })
}

displayInventory();




