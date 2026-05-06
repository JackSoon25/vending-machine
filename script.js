const amountE1 = document.querySelector("#amount");
const selectedItemEL = document.querySelector("#selected-item");
const coinBtn = document.querySelectorAll(".coin-button");

let credit = 0.00;
let selectedItem = null;
let selectedItemPrice = 0.00;
let selected = 0;
let selectedItemStock = 0;

// ---------- coin buttons: deposit only ----------
coinBtn.forEach(function(btn) {
    btn.addEventListener("click", function() {
        const value = parseFloat(btn.getAttribute("data-value"));
        credit = credit + value;
        amountE1.textContent = `$${credit.toFixed(2)}`;

        // check if we can dispense now
        if (selected == 1 && credit >= selectedItemPrice) {
            dispenseItem();
        }
    });
});

// ---------- item selection ----------
const allItems = document.querySelectorAll(".item");

allItems.forEach(function(item) {
    item.addEventListener("click", function() {

        // get current stock from DOM
        const stockNum = parseInt(item.querySelector(".item-stock").textContent.replace("Stock: ", ""));

        if (stockNum > 0) {
            // switch selection to this item
            selected = 1;
            selectedItem = item;
            selectedItemPrice = parseFloat(item.querySelector(".item-price").textContent.replace("$", ""));
            selectedItemStock = stockNum;

            // show remaining credit after this item
            amountE1.textContent = `$${(credit - selectedItemPrice).toFixed(2)}`;
            selectedItemEL.textContent = "SELECT AN ITEM";
            selectedItemEL.classList.remove("fade-out");
            selectedItemEL.classList.add("fade-in");

            // auto-dispense if already enough credit
            if (credit >= selectedItemPrice) {
                dispenseItem();
            }
        } else {
            // out of stock
            selectedItemEL.textContent = "OUT OF STOCK";
            selectedItemEL.classList.remove("fade-out");
            selectedItemEL.classList.add("fade-in");

            setTimeout(function() {
                selectedItemEL.classList.remove("fade-in");
                selectedItemEL.classList.add("fade-out");
                setTimeout(function() {
                    selectedItemEL.textContent = "SELECT AN ITEM";
                    selectedItemEL.classList.remove("fade-out");
                    selectedItemEL.classList.add("fade-in");
                }, 1000);
            }, 2000);
        }
    });
});

// ---------- cancel ----------
document.querySelector("#cancel").addEventListener("click", function() {
    credit = 0.00;
    amountE1.textContent = "$0.00";
    selected = 0;
    selectedItem = null;
    selectedItemPrice = 0.00;
    selectedItemStock = 0;
    selectedItemEL.textContent = "SELECT AN ITEM";
    selectedItemEL.classList.remove("fade-out");
    selectedItemEL.classList.add("fade-in");
});

// ---------- dispense function ----------
function dispenseItem() {
    // decrement stock in DOM
    selectedItemStock--;
    selectedItem.querySelector(".item-stock").textContent = "Stock: " + selectedItemStock;

    // deduct price from credit
    credit = credit - selectedItemPrice;
    amountE1.textContent = `$${credit.toFixed(2)}`;

    // show dispensing message for 3 seconds
    selectedItemEL.textContent = "Dispensing Product";
    selectedItemEL.classList.remove("fade-out");
    selectedItemEL.classList.add("fade-in");

    setTimeout(function() {
        selectedItemEL.classList.remove("fade-in");
        selectedItemEL.classList.add("fade-out");
        setTimeout(function() {
            selectedItemEL.textContent = "SELECT AN ITEM";
            selectedItemEL.classList.remove("fade-out");
            selectedItemEL.classList.add("fade-in");
        }, 1000);
    }, 3000);

    // reset selection after dispense
    selected = 0;
    selectedItem = null;
    selectedItemPrice = 0.00;
    selectedItemStock = 0;
}