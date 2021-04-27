
makeRequest = () => {
    return new Promise((resolve, reject) => {
      let apiRequest = new XMLHttpRequest();
      
      apiRequest.open("GET", "http://localhost:3000/api/cameras", true);
      apiRequest.send();
      apiRequest.onreadystatechange = () => {
        if (apiRequest.readyState === 4) {
          if (apiRequest.status === 200) {
            //console.log(apiRequest.response);
            const x = JSON.parse(apiRequest.response);
            createCard(x);
            resolve();
            //console.log(data);
          } else {
            reject("Server is Down!!!!");
          }
        }
      };
    });
  };

  createCard = (response) => {
    const main = document.querySelector("#shop");
    for (let i in response) {
      const card = document.createElement("Article");
      const img = response[i].imageUrl;
      const newImg = document.createElement("IMG");
      const newA = document.createElement("a");
  
      card.classList.add("col-12", "col-sm-6", "card", "p-1", "m-0");
      newA.setAttribute("href", "item.html?id=" + response[i]._id);
      newA.textContent = "View More Details";
      newImg.classList.add("img");
      newImg.setAttribute("width", "100%");
      newImg.setAttribute("src", img);

      card.appendChild(newImg);
      card.innerHTML += "<h2>" + response[i].name + "</h2>";
      card.innerHTML += "<p>" + response[i].description + "</p>";
      card.innerHTML += "<p>" + "$" + response[i].price / 100 + "</p>";
  
      newA.classList.add("btn", "btn-secondary", "w-70", "mx-auto");
    
      card.appendChild(newA);
      main.appendChild(card);
    }

    //Checks if there is any number in the localStorage and then displays
    //it in cart Span
    function onLoadCartNumbers(){
        let productNumbers = localStorage.getItem('cartNumbers');
        if(productNumbers){
            document.querySelector('.spanCart').textContent =  productNumbers;
        }
    }
    onLoadCartNumbers();
  };
  
  init = async () => {
    try {
      let requestPromise = makeRequest();
      const response = await requestPromise;

      // createCard(response);
    } catch (error) {
      document.querySelector("main").innerHTML =
        '<h2 class = "mx-auto">' + error + "</h2>";
    }
  };
  
  init();
  