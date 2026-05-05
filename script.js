const amountE1 = document.querySelector("#amount");
const btn10El = document.querySelector("#cent10");
const btn20El = document.querySelector("#cent20");
const btnDollarEl = document.querySelector("#dollar");

// when click the button, relative amount will be added to credit
let credit = 0;

btn10El.addEventListener("click", function() {
    credit = credit + 0.10;
    amountE1.textContent = `$${credit.toFixed(2)}`;
});

btn20El.addEventListener("click", function() {
    credit = credit + 0.20;
    amountE1.textContent = `$${credit.toFixed(2)}`;
});

btnDollarEl.addEventListener("click", function() {
    credit = credit + 1;
    amountE1.textContent = `$${credit.toFixed(2)}`;
});

// When choosing snacks, the credit is able to reflect the balance
const allItems = document.querySelectorAll(".item");
allItems.forEach(function(item) {
    // This part "sets up" a listener for every item found
    item.addEventListener("click", function(){

        // This code ONLY runs when the specific item is clicked
        const priceText = item.querySelector(".item-price").textContent;
        const price = parseFloat(priceText.replace("$","")).toFixed(2);

        // Update credit and display credit
        credit = credit - price;
        amountE1.textContent = `$${credit}`;
    });   
});

// when click "Cancel" button, credit card return to zero
document.querySelector("#cancel").addEventListener("click", function(){
    amountE1.textContent = '$0.00';
})


