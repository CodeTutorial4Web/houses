const navbarBtns = document.querySelectorAll('.burger');
const navbarLines = document.querySelectorAll('.burger > div');
const navbarLinksList = document.querySelectorAll('.navbar nav ul');
const sections = document.querySelectorAll('section');
const navbarContainer = document.querySelectorAll('header');
const sectionsHeaders = document.querySelectorAll('.section-header h2');



$(window).scroll(()=>{
    if($(window).scrollTop() > $(sections[0]).offset().top - 70) {
        navbarContainer.forEach(container => {
            container.classList.add('active');
        })
    }else {
        navbarContainer.forEach(container => {
            container.classList.remove('active');
        })
    }
})





for (let index = 0; index < sections.length; index++) {

    if(sections[index].dataset.nav === 'Book Now') {
        sectionsHeaders[index].innerHTML = 'Book Our Luxorios Houses <span>Now</span>';
    }else {
        sectionsHeaders[index].textContent = sections[index].dataset.nav
    }
    const navListItem = document.createElement('li');
    const anchorElement = document.createElement('a');
    anchorElement.textContent = sections[index].dataset.nav;
    anchorElement.href = `#${sections[index].id}`;
    navListItem.appendChild(anchorElement);
    navbarLinksList.forEach(list => {
        list.appendChild(navListItem)
    });


    
    anchorElement.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target.href)
        const targetSection = document.querySelector(e.target.getAttribute('href'));
        targetSection.scrollIntoView({behavior: 'smooth'})
    });

    navListItem.addEventListener('click', ()=>{
        navbarLinksList.forEach(list => {
            list.classList.remove('slide'); 
        })

        navbarLines.forEach(line => {
            line.classList.remove('change');
        })
    })
}

navbarBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=> {
        navbarLinksList.forEach(list => {
            list.classList.toggle('slide');
        })

        navbarLines.forEach(line => {
            line.classList.toggle('change');
        })
    })
})