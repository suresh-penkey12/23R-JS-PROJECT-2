let apiendpoints = null;
async function getData() {
  let res = await fetch("https://kishorep283.github.io/JS-Swigg-Clone-Project/home.json");
  let obj = await res.json();
  apiendpoints = {
    tiffins: obj.tiffins,
    biryani: obj.biryani,
    pizza: obj.pizza,
    burgers: obj.burgers,
    cakes: obj.cakes,
    noodles: obj.noodles,
  };
  newData(apiendpoints);
}
getData();

const urlParams = new URLSearchParams(window.location.search);
const foodItem = urlParams.get("item");

const foodContainer = document.getElementById("food-items-container");
let delivery_time = document.querySelector(".delivery-time");
let ratings_give = document.querySelector(".ratings-give");
let th300_time = document.querySelector(".th300-time");
let f400_time = document.querySelector(".f400-time");

document.getElementById("food-title").textContent = foodItem
  ? foodItem.charAt(0).toUpperCase() + foodItem.slice(1)
  : "";
document.getElementById("food-des").textContent = foodItem
  ? "fill your tummy with these tasty " +
    foodItem.charAt(0).toUpperCase() +
    foodItem.slice(1)
  : "";

// async function newdata() {
//   let res = await fetch(apiendpoints[foodItem]);
//   let data = await res.json();
//   localStorage.setItem("resta", JSON.stringify(data));
//   display(data);
// }

// Make Changes Here , API Calls Resolved 
function newData(obj){
    display(obj[foodItem]);
    localStorage.setItem("resta",JSON.stringify(obj[foodItem]))
}

delivery_time.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("resta")) || [];
  console.log(data);
  if (data.length == 0) {
    console.log("No data available");
  } else {
    let result = data.filter((ele) => ele.time <= 30);
    display(result);
  }
});

ratings_give.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("resta")) || [];
  if (data.length == 0) {
    console.log("no data available");
  } else {
    let result = data.filter((ele) => ele.rating >= 4);
    display(result);
  }
});

th300_time.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("resta")) || [];
  if (data.length == 0) {
    console.log("No Data available");
  } else {
    let result = data.filter((ele) => ele.price <= 300);
    display(result);
  }
});

f400_time.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("resta")) || [];
  if (data.length == 0) {
    console.log("No Data available");
  } else {
    let result = data.filter((ele) => ele.price > 300);
    display(result);
  }
});

function display(data) {
  let htmlpage = "";
  data.forEach((item) => {
    htmlpage += `
      <div class="food-item-card">
          <a href="restaurant.html?id=${item.id}"><img class="image" src=${item.image}></a>
          <span class="title">${item.name}</span><br>
          <span><i class="fa fa-star" aria-hidden="true"></i><b>${item.rating}</b>  ${item.time}-mins</span><br>
          <span class="type">${item.type}</span><br>
          <span>${item.city}</span><br>
          <span>AVG RS ${item.price}</span><br>
      </div>
    `;
  });
  foodContainer.innerHTML = htmlpage;
}

