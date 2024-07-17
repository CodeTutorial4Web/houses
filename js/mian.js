//step 1: get DOM
const nextBtn = document.querySelector('.slider-hero-next');
const prevBtn = document.querySelector('.slider-hero-prev');
const slider = document.querySelector('.slider-hero');
const sliderList = document.querySelector('.slider-hero .slider-list');
let timeRunning = 3000; 
let timeAutoNext = 8000;



nextBtn.onclick = function(){
    showSlider('next');    
}

prevBtn.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItems = document.querySelectorAll('.slider-hero .slider-list .slider-hero-item');
    
    if(type === 'next'){
        sliderList.appendChild(SliderItems[0]);
        slider.classList.add('next');
    }else{
        sliderList.prepend(SliderItems[SliderItems.length - 1]);
        slider.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        slider.classList.remove('next');
        slider.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext)
}

document.addEventListener('keyup', (e)=>{
    if(e.key === 'ArrowRight'){
        showSlider('next');
        
    }else if(e.key === 'ArrowLeft'){
        showSlider('prev');
    }
    runTimeOut = setTimeout(() => {
        slider.classList.remove('next');
        slider.classList.remove('prev');
    }, timeRunning);
 });

// Houses Slider

// const housesSliderContainer = document.querySelectorAll('.houses-slider');

// document.addEventListener('mousemove', (e) => {
// //     const scrollX = e.clientX;
// //     const scrollY = e.clientY;
// //     scrollFollower.style.left = `${scrollX}px`;
// //     scrollFollower.style.top = `${scrollY}px`;

   
// // });
// const housesSliderItems = document.querySelectorAll('.houses-slider .houses-slider-item');
// const scrollFollower = document.querySelector('.scroll-follower');

// 
// housesSliderContainer.forEach((slider, index) => {
//     slider.addEventListener('mouseover', ()=> {
//         scrollFollower.classList.add('active')
//     })
//     slider.addEventListener('mouseout', ()=> {
//         scrollFollower.classList.remove('active')
//     })
// });

