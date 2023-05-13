const quantity = document.querySelector('.quantity');
const controller = document.querySelectorAll('.btn');
const cartBtn = document.querySelector('.cart-btn')

// getting foodImage url
const foodImage = document.querySelector('.food-image').children[0]
const foodImageUrl = foodImage.getAttribute('src')

// getting description of food

const allDescription = document.querySelector('.description').children
const title = allDescription[0].textContent
const price = allDescription[1].textContent.split('.')[1]
const itemId = allDescription[0].dataset.id;

let cart = [];

console.log(foodImageUrl)
let num = 0;

controller.forEach(function(item){
   item.addEventListener('click',function(e){
   if(e.currentTarget.classList.contains('increase')){
    num++;
    console.log(num);
    quantity.textContent = num;
    document.querySelector('.decrease').disabled = false;
   }
   else if(e.currentTarget.classList.contains('decrease')){
    num--;
     if(num === 0){
    e.currentTarget.disabled = true;
    }
    quantity.textContent = num;
   }
   else{
    num = 0;
    quantity.textContent = num;
   }

  })})

  class Product{
    
    async getCart(){
      cart = await Storage.getCartItem();
    }

    
  }

  class Storage{
    static getCartItem(){
         console.log('getting cart item');
         return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }

    static addCartItem(cart){
        localStorage.setItem('cart',JSON.stringify(cart));
        console.log('added to the cart')
    }
  }

  quantity.textContent = num;

//   adding eventlistener to the add to cart button to change the cart
document.addEventListener('DOMContentLoaded',() => {
   const products = new Product()
   products.getCart().then(() => {

      cartBtn.addEventListener('click',function(){
         if(num>0){
         let cartItem = cart.filter(item => item.title !== title)
         let item = {
            id : itemId,
            'quantity':quantity.textContent,
            title,
            price,
            foodImageUrl
         }
         cart = [...cartItem,item]
         Storage.addCartItem(cart);
      }
      })
   })
})



  

    
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");


searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let lunchArrow = document.querySelector(".lunch-arrow");
lunchArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}

let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");
}

document.addEventListener('DOMContentLoaded',() => {
   const products = new Product();
   products.getCart()
})