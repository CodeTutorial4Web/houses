const containers = document.querySelectorAll('.display-data');
const viewContainer = document.querySelector('.view-house-container');
const viewContainerContent = document.querySelector('.view-house-container .text-content')
const nextImageBtn = document.querySelector('.images-slider-prev');
const prevImageBtn = document.querySelector('.images-slider-next');
const imagesList = document.querySelector('.images-slider-list');
const imagesSlider = document.querySelector('.images-slider')
const closeContainer = document.querySelector('.view-house-container .fa-multiply')

function hide() {
  viewContainer.classList.remove('show')
}

closeContainer.addEventListener('click', hide)

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
  viewContainer.classList.add('show')
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
                <img src="data:image/png;base64,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" alt="">

                <div>
                  <h4>Offerd By</h4>
                  <p>TMG</p>
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

