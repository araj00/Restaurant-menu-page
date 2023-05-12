const menus = document.querySelector('.menus')


class Product {
    async getProducts() {
        const result = await fetch("/Products.json");

        const data = await result.json()
        console.log(data)

        const categorizedData = {};

        for (let i = 0; i < data.items.length; i++) {
            const item = data.items[i];

            const category = item.fields.category;

            if (!categorizedData[category]) {
                categorizedData[category] = [];
            }

            categorizedData[category].push(item);
        }

        console.log(categorizedData);
        return categorizedData
    }

    createProducts(data) {

        let i = 0;
        let result = '';
        for (const key in data) {

            result += `
        <div class="menu-slider">
        <div class="navigation-buttons">

          <div class="previous nav-btn"><</div>
          <div class="menu-headline">
                <div class="box">${data[key].length}</div>
                <p>${key}</p>
            </div>
                <div class="next nav-btn">></div>
          
         
        </div>

        <div class="slider-container">
        `;
            for (i = 0; i < data[key].length; i++) {
                console.log(i)
                if (i === 0) {
                    result += `
            <a href="./${data[key][i].sys.id}.html" class="images main">
            <img src="${data[key][i].fields.image.fields.file.url}" alt=${data[key][i].fields.title} />
            <div class="image-text">
            <div>${data[key][i].fields.title}</div>
            <div>Rs.${data[key][i].fields.price}</div>
            </div>
          </a>
            `
                    console.log(`${data[key][i].fields.title} `)
                }
                else {
                    result += `
                <a href="./${data[key][i].fields.category}${data[key][i].sys.id}.html" class="images">
                <img src="${data[key][i].fields.image.fields.file.url}" alt=${data[key][i].fields.title} />
                <div class="image-text">
                <div>${data[key][i].fields.title}</div>
                <div>Rs.${data[key][i].fields.price}</div>
                </div>
              </a>
                `
                }
            }
            result += `
          </div>
      
      </div>
      </div>
          `
            i = 0;
        }
        menus.innerHTML = result

    }

}


document.addEventListener('DOMContentLoaded', () => {
    const product = new Product()
    product.getProducts().then(data => {

        product.createProducts(data)
        const previous = document.querySelector('.previous');
        const next = document.querySelector('.next');
        const containers = document.querySelectorAll('.slider-container');

        containers.forEach(container => {
            const previous = container.previousElementSibling.querySelector('.previous');
            const next = container.previousElementSibling.querySelector('.next');
            const images = container.children;
            const totalImages = images.length;
            let currentIndex = 0;

            previous.addEventListener('click', () => {
                previousImage();
            });

            next.addEventListener('click', () => {
                nextImage();
            });

            function nextImage() {
                images[currentIndex].classList.remove('main');
                if (currentIndex == totalImages - 1) {
                    currentIndex = 0;
                } else {
                    currentIndex++;
                }

                images[currentIndex].classList.add('main');
            }

            function previousImage() {
                images[currentIndex].classList.remove('main');
                if (currentIndex == 0) {
                    currentIndex = totalImages - 1;
                } else {
                    currentIndex--;
                }

                images[currentIndex].classList.add('main');
            }

        })
    })
}
)
