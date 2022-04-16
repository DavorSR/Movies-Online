
const track = document.querySelector('.carousel_track');

//We can create Array that take all children of element and by that we avoid need to make changes with addidtion of new elements, they will be added automatically 

const slides = Array.from(JSON.parse(movies));
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');


const main = document.getElementById('watch');

//Again we create array from children not a class of children
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Makse slides next to each other

let setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

let moveToSlide = (track, currentSlide, targetSlide) => {

    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';

    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide');

}

//add function wherever you need to change direction and just change direction (targetDot)

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')

}


const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden')
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden')
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}



// Move to left
prevButton.addEventListener('click', e => {
    let currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    let currentDot = dotsNav.querySelector('.current-slide')
    let prevDot = currentDot.previousElementSibling;
    let prevIndex = slides.findIndex(slide => slide === prevSlide)


    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex)


})


//Move to the right
nextButton.addEventListener('click', e => {
    //instead of searching in document we can tell querySelector where to search, in this case we already set const track and we can search only in that part.
    let currentSlide = track.querySelector('.current-slide');
    //We can use next and previous elementSibling to swap between elements
    let nextSlide = currentSlide.nextElementSibling;
    let currentDot = dotsNav.querySelector('.current-slide')
    let nextDot = currentDot.nextElementSibling;
    let nextIndex = slides.findIndex(slide => slide === nextSlide)

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex)



})

// Nav Dots //////////////////////////////////////////////

dotsNav.addEventListener('click', e => {
    //find what was click on
    let targetDot = e.target.closest('button');

    if (!targetDot) return;

    let currentSlide = track.querySelector('.current-slide');
    let currentDot = dotsNav.querySelector('.current-slide');

    //Find index loop to every item in array and return 1'st expresion it finds


    let targetIndex = dots.findIndex(dot => dot === targetDot);
    let targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex)

})