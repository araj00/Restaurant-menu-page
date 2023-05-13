const quantity = document.querySelector('.quantity');
const table = document.querySelector('tbody')
const subtotalElement = document.querySelector('.subtotal-value');
const totalTaxElement = document.querySelector('.tax-calculation');
const totalElement = document.querySelector('.total-calculation');



let cart = [];
let tax = 9.375;

class Product {

    async getCart() {
        cart = Storage.getCartItem();
        this.populateCart(cart)
    }

    addCartItem(item) {
        let subtotal = (item.price * item.quantity);
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td data-column="Product">
                    <div class="menu-name">
                        <img src="${item.foodImageUrl}" alt="${item.title}">
                        <p>${item.title}</p>
                    </div>
                </td>
                <td data-column="Price">Rs. ${item.price}</td>
                <td data-column="Quantity">
                    <div class="buttons">

                        <div class="quantity-counter">
                            <button class="decrease btn" data-id=${item.id}>-</button>
                            <div class="quantity">${item.quantity}</div>
                            <button class="increase btn" data-id=${item.id}>+</button>
                        </div>

                    </div>
                </td>
                <td data-column="Subtotal">
                    <div class="delete-food">

                        <p>Rs. <span class="subtotal-price">${subtotal}</span></p>
                        <img src="./assets/delete.png" data-id=${item.id} style="width:30px;height:30px;margin-left: 10px;" class="remove-item" alt="${item.title}">
                    </div>
                </td>
                <hr/>
      `
        table.appendChild(tr)
    }

    calculateAllTotal() {
        const totalBill = document.querySelectorAll('.subtotal-price')
        const eachItem = Array.from(totalBill)

        const subtotalValueArray = eachItem.map(bill => parseInt(bill.textContent))


        const totalSubtotalValue = parseInt(subtotalValueArray.reduce(totalValue, 0));
        const totalTaxValue = parseFloat(totalSubtotalValue * tax / 100);
        console.log(typeof totalSubtotalValue,typeof totalTaxValue)
        const totalItemValue =parseFloat(totalSubtotalValue + parseFloat(totalTaxValue)).toFixed(2);

        totalTaxElement.textContent = `Rs. ${totalTaxValue}`;
        subtotalElement.textContent = `Rs. ${totalSubtotalValue}`;
        totalElement.textContent = `Rs. ${totalItemValue}`;
        function totalValue(acc, value) {
            return (acc += value);
        }

    }

    cartLogic() {
        let itemId;
        table.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                console.log('remove-item', event.target.dataset.id)
                itemId = event.target.dataset.id;
                this.removeTheCartById(itemId);
                table.removeChild(event.target.parentElement.parentElement.parentElement);
                this.calculateAllTotal();
            }

            else if (event.target.classList.contains('increase')) {
                let amountItem = event.target;
                itemId = event.target.dataset.id;
                let tempItem = cart.find(item => item.id === itemId);
                tempItem.quantity = parseInt(tempItem.quantity) + 1;
                let cartItem = cart.filter(item => item.id !== itemId)
                let item = {
                    ...tempItem
                }
                cart = [...cartItem, item]
                Storage.updateCartItem(cart);
                // this.setCartValue(cart);
                console.log(tempItem.quantity)
                const subtotal = amountItem.parentElement.parentElement.parentElement.nextElementSibling;
                const subtotalPrice = subtotal.querySelector('.subtotal-price');
                subtotalPrice.innerText = tempItem.quantity * tempItem.price;
                amountItem.previousElementSibling.innerText = tempItem.quantity;
                this.calculateAllTotal();
            }
            else if (event.target.classList.contains('decrease')) {
                let amountItem = event.target;
                itemId = event.target.dataset.id;
                let tempItem = cart.find(item => item.id === itemId);
                if (parseInt(tempItem.quantity) > 1) {
                    tempItem.quantity = parseInt(tempItem.quantity) - 1;
                    let cartItem = cart.filter(item => item.id !== itemId)
                    let item = {
                        ...tempItem
                    }
                    cart = [...cartItem, item]
                    Storage.updateCartItem(cart);
                    const subtotal = amountItem.parentElement.parentElement.parentElement.nextElementSibling;
                    const subtotalPrice = subtotal.querySelector('.subtotal-price');
                    subtotalPrice.innerText = tempItem.quantity * tempItem.price;


                    amountItem.nextElementSibling.innerText = tempItem.quantity;
                    this.calculateAllTotal();
                }
                else {
                    this.removeTheCartById(itemId);
                    console.log(event.target.parentElement)
                    table.removeChild(event.target.parentElement.parentElement.parentElement.parentElement);
                    this.calculateAllTotal();
                }
            }
        })
    }

    removeTheCartById(id) {
        cart = cart.filter(item => item.id !== id);
        Storage.updateCartItem(cart)
    }

    populateCart(cart) {
        cart.forEach(item => {
            this.addCartItem(item);
        })
    }



}

class Storage {
    static getCartItem() {
        console.log('getting cart item');
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }

    static updateCartItem(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('added to the cart')
    }
}


//   adding eventlistener to the add to cart button to change the cart

   
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




document.addEventListener('DOMContentLoaded', () => {
    const products = new Product();
    products.getCart().then(() => {
        products.cartLogic();
        products.calculateAllTotal();
    }
    );
})