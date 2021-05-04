// DOM ELEMENT REFERENCES
let totalPrice = document.getElementById("totalCost");
let backToStoreBtn = document.getElementById("backBtn");
let orderId = document.getElementById("orderID");

// Shows total cost of order and ID
totalPrice.innerHTML = sessionStorage.getItem('Total') + '$';
orderId.innerHTML = sessionStorage.getItem('orderID');

// remove the item from localStorage and SessionStorage
backToStoreBtn.addEventListener('click', () => {
    sessionStorage.removeItem("orderId");
    localStorage.removeItem("productInCart");
    localStorage.removeItem("cartNumbers");
    localStorage.removeItem("totalCost");
    location.replace('index.html');
});