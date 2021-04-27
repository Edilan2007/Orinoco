function makeRequest () {
    return new Promise ((resolve, reject) => {
        //id is retrieved  from the querystring parameters
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");

        let apiRequest = new XMLHttpRequest();
        //Id is now used to build a unique URL for Sa single page
        apiRequest.open("GET","http://localhost:3000/api/cameras/" + id);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4 ){
                if (apiRequest.status === 200 ){
                   // console.log(apiRequest.response);
                    const x = JSON.parse(apiRequest.response);
                    createCard(x);
                    resolve();
                }else{
                    reject ("Server is Down!!!");
                }
            }
        };
    });
}

//Create and query Elements
function createCard (response){
    const card = document.createElement("Article");
    const img = response.imageUrl;
    const newImage = document.createElement("img");
    const btn = document.createElement("button");
    const form = document.createElement("form");
    const main = document.querySelector("#shop");
    const dropMenuLabel = document.createElement("label");
    const dropMenu = document.createElement("select");

    //Setup classes and attribute and append to card
    card.classList.add("col", "card", "p-3");
    newImage.classList.add("img");
    newImage.setAttribute("width", "50%");
    newImage.setAttribute("src", img);
    card.appendChild(newImage);

    //Set dropdown menu 
    card.innerHTML += "<h2>" + response.name + "</h2>";
    dropMenuLabel.innerHTML = "choose from Lenses here &nbsp";
    form.appendChild(dropMenuLabel);
    form.appendChild(dropMenu);

    //loop to get all items and display the one selected
    for (let x in response.lenses){
        const option = document.createElement("option");
        option.innerHTML = response.lenses[x];
        option.setAttribute("value", response.lenses[x]);
        dropMenu.appendChild(option);
    }
    card.appendChild(form);

    card.innerHTML += "<p>" + response.description + "</p>";
    card.innerHTML += "<h4>" + "$" + response.price / 100 + "</h4>";
    btn.classList.add("btn", "btn-secondary", "w-25", "mx-auto");
    btn.innerHTML = "Add to Cart";
    btn.classList.add("text-center");

    card.append(btn);
    main.append(card);

    //Add item to the cart btn
    btn.addEventListener('click', () => {
        console.log("hello");
        cartNumbers(response);
        totalCost(response);
    });

    //Check if there are any items on Local Storage
    function cartNumbers (response){
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        //if there are any add one to them
        if (productNumbers){
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.spanCart').textContent = productNumbers + 1;
            //if there is none set local storage to one
        }else{
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.spanCart').textContent = 1;    
        }
        setItems(response);
    }

    function setItems (){
        //console.log('inside of the SetItems functions');
        //console.log('My product is ', response);
        //Set cartItems as an array
        let cartItems = localStorage.getItem('productInCart');
        cartItems = JSON.parse(cartItems); 
        if (cartItems == null){
            cartItems = []; 
        }
        cartItems.push({
        [response._id]: response
        });
        localStorage.setItem('productInCart', JSON.stringify(cartItems));
    }

    //Adds the sum of the products
    function totalCost(response){
        //console.log('The product price is', response.price /100);
        let cartCost = localStorage.getItem('totalCost');
        if(cartCost != null){
            cartCost = parseInt(cartCost);
            localStorage.setItem('totalCost', cartCost + response.price / 100);
        } else {
            localStorage.setItem('totalCost', response.price / 100);
        }
    }

    /**Checks if there is any number in the localStorage and then displays
    it in cart Span*/
    function onLoadCartNumbers(){
        let productNumbers = localStorage.getItem('cartNumbers');
        if(productNumbers){
            document.querySelector('.spanCart').textContent =  productNumbers;
        }
    }
    onLoadCartNumbers();
}



init = async () => {
  try {
      let requestPromise = makeRequest();
      const response = await requestPromise;
  
      // createCard(response);
    } catch (error) {
      document.querySelector("main").innerHTML =
        '<h2>' + error + '</h2>';
    }
};
  
init();