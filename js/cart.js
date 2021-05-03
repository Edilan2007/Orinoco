function makeRequest(data) {
  return  new Promise((resolve, reject) => {
    let apiRequest = new XMLHttpRequest();
    apiRequest.open("POST", "http://localhost:3000/api/cameras/order");
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 201) {
          console.log(apiRequest.response);
          resolve(JSON.parse(apiRequest.response));
          console.log(data);
        } else {
          reject(JSON.parse(apiRequest.response));
        }
      }
    };
    apiRequest.setRequestHeader('Content-Type', 'application/json');
    //apiRequest.send(JSON.stringify(data));
  });
}


// Adding Items to the Cart
function displayCart() {
  let cartItems = localStorage.getItem('productInCart');
  cartItems = JSON.parse(cartItems);
  const cartItemsWrapper = document.getElementById('cart_items');
  console.log(cartItemsWrapper);

  console.log(cartItems);

  if (cartItems) {
    console.log('running');
    // Creates table with items from localStorage
    for (let i = 0; i < cartItems.length; i++) {
      let tr = document.createElement('tr');

      let nameCell = document.createElement('p');
      let lenseCell = document.createElement('td');
      let priceCell = document.createElement('td');
      let btnRemove = document.createElement('td');
      let imgCell = document.createElement('img');
      let divName = document.createElement('td');
      let quantityCell = document.createElement('td');
      priceCell.style.color = '#3bc492';
      

      nameCell.innerHTML = cartItems[i].name;
      lenseCell.innerHTML = cartItems[i].selectLense;
      priceCell.innerHTML = ((cartItems[i].price / 100) * cartItems[i].quantity) + ' $';
      imgCell.setAttribute('src', cartItems[i].imgUrl);
      imgCell.setAttribute("width", "90px")

      btnRemove.innerHTML = `<button class="btn-del" id="remove" onclick='deleteItem(${i})'>X</button>`;
      quantityCell.innerHTML = `<input type="number" id="quantity" name="quantity" min="1" value ="${cartItems[i].quantity}" class="quantity" onclick="changeQuantity(${i}, event.target.value)">`;

      divName.append(imgCell, nameCell);
      divName.classList.add('divImage');

      // Create cart item row & add it to table
      tr.append(divName, lenseCell, quantityCell, priceCell, btnRemove);
      cartItemsWrapper.appendChild(tr);
    }

  }
}
//change quantity product
function changeQuantity (index, value){
let cartItems = JSON.parse(localStorage.getItem('productInCart'));
cartItems[index].quantity = parseInt(value);
localStorage.setItem('productInCart', JSON.stringify(cartItems));

displayCart();
calculateTotalPrice();
} 

function calculateTotalPrice(){
  let totalItemCost = JSON.parse(localStorage.getItem('totalCost'));
  let total = document.getElementById('total');

  total.innerHTML = totalItemCost + " "+ " $";
  sessionStorage.setItem('Total', JSON.stringify(totalItemCost));
  console.log(totalItemCost);
}


//Remove item from cart and update localStorage 
function deleteItem(index){
  let cartItems = JSON.parse(localStorage.getItem('productInCart'));
  cartItems.splice(index, 1);

  
  //itemNumber = itemNumber - 1;
  //console.log(cartItems[i].count);
  localStorage.setItem('productInCart', JSON.stringify(cartItems));
  //localStorage.setItem('cartNumbers',JSON.stringify(itemNumber));
  //Re-render.....
  displayCart();
  //Re-calculate....
  calculateTotalPrice();

}



function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.spanCart').textContent = productNumbers;
  }
}
onLoadCartNumbers();
displayCart();
calculateTotalPrice();


//ADD event to the submit button
submitBtn.addEventListener('click', ($event) => {
  $event.preventDefault();
  let products = [];
  //get id prod and push it in array
  let cartItems = JSON.parse(localStorage.getItem('.spanCart'));
  for (let i= 0; i< cartItems.length; i++){
    products.push(cartItems[i].prodId);
    console.log(products);
  }
});

submitForm = async (orderObject) => {
  try  {
    //call makeRequest for api request and await response
    const requestPromise = makeRequest(orderObject);
    const response = await requestPromise;

    //pass response to displayConfirmation function
    displayCart(response);
  } catch (error) {
    document.querySelector(".row").innerHTML =
      '<h2>' + error + '</h2>';
  }
}

submitForm();