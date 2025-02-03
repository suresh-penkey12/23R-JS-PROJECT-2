let cart=JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);
function cartdisplay(){
    let cartcontainer =document.querySelector(".cart-items");
    let totalprice = document.querySelector(".total-price");
    let totalitems=document.querySelector(".total-items");
    let totalcart = document.querySelector(".total-with-tax");
    let delivery =document.querySelector(".total-with-tax")

    let price=0;
    let items=0;
    if(cart.length == 0){
        cartcontainer.innerHTML = "<p>Your cart is empty!</p>";
        totalprice = 0;
        totalitems = 0;
        delivery.innerText =0;
        totalcart.cart.innerText=0;
        window.location.reload();
    }
    cart.forEach((prod,index) => {
        items += prod.quantity;
        price += parseFloat(prod.price) * prod.quantity;
        let itemsdiv =document.createElement("div");
        itemsdiv.className="items-list";
        itemsdiv.innerHTML=`
        <div class="image">
            <img src="${prod.image}" alt="${prod.name}" class="item-image">
            <p  class="antyy" >Quantity:<p></p> 
            <button class="quantity-btn decrease" data-index="${index}">-</button>
            <span>${prod.quantity}</span>
            <button class="quantity-btn increase" data-index="${index}">+</button>
            </p>
        </div>
        <div class="item-details">
            <h3 class ="nameof">${prod.name}</h3>
            <p class="descr">${prod.description}</p>
        </div>
        <div class="price">
            <p>Price: ${prod.price}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        </div>
    `;
    cartcontainer.appendChild(itemsdiv);
    

    })
    delivery=200;
    totalprice.innerText= price;
    totalitems.innerText=items;
    totalcart.innerText=price+200;

}

function updatecartpage(){
    localStorage.setItem("cart",JSON.stringify(cart));
    cartdisplay();
}

function handlequantitychanges(event){
    let index = event.target.dataset.index;
    if(event.target.classList.contains("increase")){
        cart[index].quantity += 1;
        window.location.reload();
    }
    else if(event.target.classList.contains("decrease") && cart[index].quantity > 1){
        cart[index].quantity -= 1;
        window.location.reload();
    }
    else if(event.target.classList.contains("decrease") && cart[index].quantity === 1){
        cart.splice(index,1);
        window.location.reload();
    }
    updatecartpage();
}
function removecartitem(event){
    let index = event.target.dataset.index;
    cart.splice(index,1);
    window.location.reload();
    updatecartpage();
} 
document.querySelector(".cart-items").addEventListener("click",(event)=>{
    if(event.target.classList.contains("quantity-btn")){
        handlequantitychanges(event);
    }
    if(event.target.classList.contains("remove-item")){
        removecartitem(event);
    }
})
let closemodal = document.getElementById("closeModal");
let modal = document.getElementById("modal")
let val=JSON.parse(sessionStorage.getItem("login"))
document.getElementById("check-btn").addEventListener("click",(event) => {
    event.preventDefault();
    if(val === "logged"){
        if(cart.length === 0){
            alert("your cart is Empty");
        }
        const paymethod = document.querySelector(
            'input[name="payment-method"]:checked'
        );
        if(!paymethod){
            alert("Select any of the method");
            return;
        }

        modal.style.display="block";
            
        localStorage.removeItem("cart");
        cart=[];
        updatecartpage();
    }else{
        alert(`please login before ,check-out`)
    }
})

closemodal.addEventListener("click",()=>{
    modal.style.display="none";
})



cartdisplay();
