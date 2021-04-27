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
  let productContainer = document.querySelector('.products');
  const cartItemsWrapper = document.getElementById('cart_items');
  //console.log(cartItemsWrapper);

  console.log(cartItems);
  console.log(cartItems[0]);
  console.log(typeof(cartItems[0]));
  if (cartItems && productContainer) {
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

      let priceString = cartItems[i].price.toString();
      let price = priceString.substring(0, 3);
      let priceNum = parseInt(price);

      nameCell.innerHTML = cartItems[i].name;
      lenseCell.innerHTML = cartItems[i].selectLenses;
      priceCell.innerHTML = (priceNum * cartItems[i].quantity) + ' $';
      imgCell.setAttribute('src', cartItems[i].imageUrl);

      btnRemove.innerHTML = `<button class="btn-del" id="remove" onclick='removeItem(${i})'>X</button>`;
      quantityCell.innerHTML = `<input type="number" id="quantity" name="quantity" min="1" value ="${cartItems[i].quantity}" class="quantity" onclick="changeQuantity(${i}, event.target.value)">`;

      divName.append(imgCell, nameCell);
      divName.classList.add('divImage');

      // Create cart item row & add it to table
      tr.append(divName, lenseCell, quantityCell, priceCell, btnRemove);
      cartItemsWrapper.appendChild(tr);
    }

  }
}



function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.spanCart').textContent = productNumbers;
  }
}
onLoadCartNumbers();
displayCart();


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