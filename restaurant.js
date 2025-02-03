let cart = JSON.parse(localStorage.getItem('cart')) || [];
let menuList = document.getElementById("menu-list");
menuList.style.height="0px";
function toggleMenu(){
  if(menuList.style.height == "0px"){
    menuList.style.height = "400px";
  }
  else{
    menuList.style.height = "0px";
  }
}


async function loadRestaurantDetails() {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get("id");
  
    try {
      const response = await fetch("https://suresh-penkey12.github.io/23R-JS-PROJECT-2/home.json");
      const restaurants = await response.json();
      const restaurant = restaurants.separ.find((r) =>parseInt(r.id) === parseInt(restaurantId));
  
      document.getElementById("restaurant-name").innerText = restaurant.name;
      // document.getElementById("ratings").innerText = restaurant.rating;
      document.getElementById("price").innerText = restaurant.ratings;
      document.getElementById("cuisine").innerText = restaurant.type;
      document.getElementById("location").innerText = restaurant.city;
      document.getElementById("time").innerText = restaurant.time +" mins";
  
      // Display recommended menu items
      const recommendedContainer = document.getElementById("recommended");
      restaurant.recommended.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "menu-item";
        itemDiv.innerHTML = `
          <div class="rig">
          <h3>${item.name}</h3>
          <p>${"₹"}${item.price}</p>
          <p><i class="fa fa-star" aria-hidden="true"></i>${" "}${item.rating}</p>
          <p>${item.description}</p>
        </div>
        <div class="lef">
          <img src="${item.image}">
          <button class="cart-items" data-desc ="${item.description}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">ADD</button>
        </div>
        
        `;
        recommendedContainer.appendChild(itemDiv);
      });

      const modal = document.createElement("div");
      modal.className="modal";
      modal.id="modal";
      modal.innerHTML = `
          <div class="modal-content">
            <span id="closeModal" class="close">&times;</span>
            <div id="modalDetails">
              <!-- Item details will be dynamically added here -->
            </div>
            <button id="confirmAdd" class="confirm-button">Confirm Add to Cart</button><br>
            <a href="./cart.html"><button class="viewBag" >View Bag</button></a>
          </div>
        `;
      document.body.appendChild(modal);
      const closeModal = document.getElementById("closeModal");
      const confirmAdd = document.getElementById("confirmAdd");
      const modalDetails = document.getElementById("modalDetails");
      document.querySelectorAll(".cart-items").forEach(button => {
        button.addEventListener("click",()=>{ 
          // debugger;   
          const prodname = button.dataset.name;
          const prodprice=parseFloat(button.dataset.price);
          const prodimage=button.dataset.image;
          const proddesc = button.dataset.desc;
          modalDetails.innerHTML=`
                <h3>${prodname}</h3>
                <img src="${prodimage}" alt="${prodname}" style="width: 100px; height: 100px;"/>
                <p>${"₹"}${prodprice}</p>
                
          `;
          modal.style.display="block";
          confirmAdd.onclick= () => {
            let matching = cart.find(item => item.name === prodname);
            if(matching){
              matching.quantity +=1;
            }else{
              cart.push({
                "name":prodname,
                "price":parseFloat(prodprice),
                "image":prodimage,
                "description":proddesc,
                "quantity":1
              })
            }
            const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.querySelector(".spa").innerText = cartQuantity;
            localStorage.setItem("cart",JSON.stringify(cart));
            console.log(cart);
            modal.style.display="none";
          }
        });
        closeModal.addEventListener("click",() => {
          modal.style.display="none";
        });
        // window.addEventListener("click",()=>{
        //   modal.style.display ="none";
        // })
      });
      
    } catch (error) {
      console.error("Error loading restaurant details:", error);
    }

  }
  
    
  
  
loadRestaurantDetails();

  