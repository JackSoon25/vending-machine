// const btn10El = document.querySelector("#cent10");
// const btn20El = document.querySelector("#cent20");
// const btnDollarEl = document.querySelector("#dollar");

// // when click the button, relative amount will be added to credit

// btn10El.addEventListener("click", function() {
//     credit = credit + 0.10;
//     amountE1.textContent = `$${credit.toFixed(2)}`;
// });

// btn20El.addEventListener("click", function() {
//     credit = credit + 0.20;
//     amountE1.textContent = `$${credit.toFixed(2)}`;
// });

// btnDollarEl.addEventListener("click", function() {
//     credit = credit + 1;
//     amountE1.textContent = `$${credit.toFixed(2)}`;
// });

const amountE1 = document.querySelector("#amount");
const coinBtn = document.querySelectorAll(".coin-button");
let credit = 0.00;
let selectedItem = [];
let selectedItemPrice = 0.00;
let selected = 0;
let selectedItemStock = 0;
coinBtn.forEach(function(btn){
    btn.addEventListener("click", function() {
        // Get the value from the data-value attribute
        const value = parseFloat(btn.getAttribute("data-value"));
        console.log(value);
        // Add it to the credit
        credit = credit + value;

        // update the display
        amountE1.textContent = `$${credit.toFixed(2)}`;
    });
    if (selected == 1 && credit >= selectedItemPrice) {
        selectedItemStock --;
        credit = credit - selectedItemPrice;
        const itemEL = document.querySelector("#selected-item");

            //Immediately show "Out of Stock"
            itemEL.textContent = "Dispensing Product";
            itemEL.classList.remove("fade-out");
            itemEL.classList.add("fade-in");

            //Wait 2 seconds while the user reads "Dispensing Product"
            setTimeout(function(){
                itemEL.classList.remove("fade-in");
                itemEL.classList.add("fade-out");

                //Wait 1 second (duration of the fade) to swap the text back
                setTimeout(function(){
                    itemEL.textContent = "SELECT AN ITEM";
                    itemEL.classList.remove("fade-out");
                    itemEL.classList.add("fade-in");
                },1000);
            },2000);
    }
});


// When choosing snacks, the credit is able to reflect the balance
const allItems = document.querySelectorAll(".item");

allItems.forEach(function(item) {
    // This part "sets up" a listener for every item found
    item.addEventListener("click", function(){

        //get the stock number
        const stockNum = parseInt(item.querySelector(".item-stock").textContent.replace("Stock: ",""));
        selectedItemStock = stockNum;

        if (stockNum > 0) {
            // This code ONLY runs when the specific item is clicked
            const priceText = item.querySelector(".item-price").textContent;
            const price = parseFloat(priceText.replace("$","")).toFixed(2);

            //display the balance
            amountE1.textContent = `$${credit - price}`;
            selected = 1;
            selectedItem = item;
            selectedItemPrice = price;

        } else {
            const itemEL = document.querySelector("#selected-item");

            //Immediately show "Out of Stock"
            itemEL.textContent = "OUT OF STOCK";
            itemEL.classList.remove("fade-out");
            itemEL.classList.add("fade-in");

            //Wait 2 seconds while the user reads "OUT OF STOCK"
            setTimeout(function(){
                itemEL.classList.remove("fade-in");
                itemEL.classList.add("fade-out");

                //Wait 1 second (duration of the fade) to swap the text back
                setTimeout(function(){
                    itemEL.textContent = "SELECT AN ITEM";
                    itemEL.classList.remove("fade-out");
                    itemEL.classList.add("fade-in");
                },1000);
            },2000);

        }
    });
});

// when click "Cancel" button, credit card return to zero
document.querySelector("#cancel").addEventListener("click", function(){
    amountE1.textContent = '$0.00';
    selected = 0;
})