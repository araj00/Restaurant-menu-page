const quantity = document.querySelector('.quantity');
const controller = document.querySelectorAll('.btn');

// getting foodImage url
const foodImage = document.querySelector('.food-image').children[0]
const foodImageUrl = foodImage.getAttribute('src')

// getting description of food

const allDescription = document.querySelector('.description').children
const title = allDescription[0].textContent
const price = allDescription[1].textContent


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

  quantity.textContent = num;