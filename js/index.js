/* global - simble object to represent menu items & respective prices */
const menu = {
    hotdogs: 4,
    fries: 3.50,
    soda: 1.50,
    sauerkraut: 1
}

/* global - place order btn */
const placeOrderBtn = document.getElementById("begin-order-btn");
/* global - submit order btn */
const submitOrderBtn = document.getElementById("submit-order-btn");
/* global - modify new order btn */
const modifyOrderBtn = document.getElementById("modify-order-btn");

/* global - total order element */
const calculatedTotal = document.getElementById("calculated-amount");
/* global - final order element*/
const finalOrder = document.getElementById("ordered-items");

/* global - final order array */
var order = [];
/* global - total order amount */
var total = 0;

window.onload = () => {
    placeOrderBtn.addEventListener("click", () =>{
        // hide welcome page content
       updateElementStyle("welcome-page", "none");

        // show order page content
        updateElementStyle("order-content", "block");
    });

    submitOrderBtn.addEventListener("click", ()=>{
        calculateTotal();
        displayReceipt();
    });

    modifyOrderBtn.addEventListener("click", ()=>{
        // clearing total, order, and final order array
        total = 0;
        order = [];
        finalOrder.innerHTML = "";

        // hide welcome page content        
        updateElementStyle("welcome-page", "none");
      
        // show order page content
        updateElementStyle("order-content", "block")

        // hide reciept
        updateElementStyle("receipt", "none");
    });
}

// Function to calculate final order
function calculateTotal(){
    for(item in menu){
        let amount = parseFloat(document.getElementById(item).value);

        if(!isNaN(amount)){
            // calculate price & add to total
            let price = menu[item];
            let subTotal = amount * price;
            total += subTotal;

            // add item & amount to final order
            order[item] = amount;
        }
    }
}

// Function to display receipt
function displayReceipt(){
    // hide order form
    updateElementStyle("order-content", "none");
    
    // display receipt
    updateElementStyle("receipt", "inline");

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    calculatedTotal.innerHTML = dollarUS.format(total);

    for(food in order){
        let foodDiv = document.createElement("div");
        foodDiv.innerHTML = food + " x " + order[food];
        finalOrder.appendChild(foodDiv);
    }
}

// Function to show/hide specific page based on element ID
function updateElementStyle(elementID, styleType){
    let elementDiv = document.getElementById(elementID);
    elementDiv.style.display = styleType;
}