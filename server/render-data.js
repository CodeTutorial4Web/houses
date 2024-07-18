const containers = document.querySelectorAll('.display-data');
const viewContainer = document.querySelector('.view-house-container');
const viewContainerContent = document.querySelector('.view-house-container .text-content')
const nextImageBtn = document.querySelector('.images-slider-prev');
const prevImageBtn = document.querySelector('.images-slider-next');
const imagesList = document.querySelector('.images-slider-list');
const imagesSlider = document.querySelector('.images-slider')
const closeContainer = document.querySelector('.view-house-container .fa-multiply');
const closeBookNow =  document.querySelector('.close-book-now-container');
const bookNowContainer = document.querySelector('.book-now-container');
const darkBg = document.querySelector('.dark-bg');

const showBookNow = document.querySelector('.show-book-now');

function hide(container) {
  container.classList.remove('show');
  document.body.classList.remove('overflow-hidden');
  darkBg.classList.remove('show');

}

function show(container) {
  container.classList.add('show');
  document.body.classList.add('overflow-hidden');
  darkBg.classList.add('show');
}

showBookNow.addEventListener('click', ()=> {
  show(bookNowContainer);
})

closeBookNow.addEventListener('click', ()=> {
  hide(bookNowContainer);
})

closeContainer.addEventListener('click', () => {
  hide(viewContainer)}
)

let data;

function slide(type){
  let  SliderItems = document.querySelectorAll('.images-slider-list img');
  
  if(type === 'next'){
      imagesList.appendChild(SliderItems[0]);
  }else{
      imagesList.prepend(SliderItems[SliderItems.length - 1]);
  }


}

// Fetching Data

async function fetchData() {
  const returnedData = await fetch('./server/houses.json');
  data = await returnedData.json();
}

// Rendering Data

function renderData(container, target) {
  let itemsContainer = ``;
  let finalArray = data[target];
  for (let i = 0; i < finalArray.length; i++) {

    itemsContainer += `
        
               <div class="houses-slider-item">
          <img src="${finalArray[i].img}" class="house-img" />
          <div class="houses-slider-item-content">
            <div>
              <h3>${finalArray[i].title}</h3>
              <p>${finalArray[i].desc}</p>
              <span class="price">${finalArray[i].price} ${finalArray[i].currency}</span>
            </div>
            <div class="info">
              <span class="location">
              <i class="fas fa-map-location"></i>
                ${finalArray[i].location}
              </span>
              
              <button = onclick="viewDetails(${i}, ${target})" class="btn">View Details</button>
            </div>
          </div>
        </div>
        
        
        
        `;
  }

  container.innerHTML = itemsContainer;
}

// View Details Function 

function viewDetails(index, target){
  viewContainer.classList.add('show');
  document.body.classList.add('overflow-hidden');
  darkBg.classList.add('show');

  let arrayCopy = data[target.id];
  let imagesArray = arrayCopy[index].sliderImages;
  let images = ``;

  for(let i = 0; i<imagesArray.length; i++) {
    images += `
       <img src="${imagesArray[i]}" alt="">
  
    `;

    console.log(images)
  }

  viewContainerContent.innerHTML = `
  
      <div class="text-content">
        <div class="content">
          <h3>${arrayCopy[index].title}</h3>
          <p>${arrayCopy[index].desc}</p>
          <span class="price">
            ${arrayCopy[index].price} ${arrayCopy[index].currency}
          </span>
  
          <div class="info">
            <div class="location">
              <i class="fas fa-map-location"></i>
              ${arrayCopy[index].location}
            </div>
  
            <div class="house-info">
              <span>
                <i class="fas fa-bed"></i> ${arrayCopy[index].rooms}
              </span>
  
              <span>
                <i class="fas fa-bath"></i>
                ${arrayCopy[index].baths}
              </span>
  
              <span>
                <i class="fas fa-car"></i> ${arrayCopy[index].garages}
              </span>
  
              <span>
                <i class="fas fa-house"></i> ${arrayCopy[index].area}
              </span>
            </div>

            <div class="company">
              <span>
                <img src="${arrayCopy[index].company.img}" alt="">

                <div>
                  <h4>Offerd By</h4>
                  <p>${arrayCopy[index].company.name}</p>
                </div>

              </span>
            </div>



          </div>
  
        </div>

        <div class="contact">
          <h4>Contact For House</h4>
          <ul>
            <li>
              <a href="#">
                <i class="fas fa-phone"></i>
                Call Now
              </a>
            </li>

            <li>
              <a href="#">
                <i class="fab fa-whatsapp"></i>
                Chat
              </a>

            </li>

            <li>
              <a href="#">
                <i class="fas fa-envelope"></i>
                Email
              </a>

            </li>
          </ul>
        </div>
      </div>
  
  
  
  
  `
  
}

// Houses Images Slider

nextImageBtn.onclick = function(){
  slide('next');    
}

prevImageBtn.onclick = function(){
  slide('prev');    
}



document.addEventListener('keyup', (e)=>{
  if(e.key === 'ArrowRight'){
      slide('next');
      
  }else if(e.key === 'ArrowLeft'){
      slide('prev');
  }

});


// Calling Functions

(async () => {
  await fetchData();
  containers.forEach(container => {
    renderData(container, container.parentNode.getAttribute("id"));
  })
})();

