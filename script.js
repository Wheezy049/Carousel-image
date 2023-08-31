let track = document.querySelector('.carousel_track');
let slides = Array.from(track.children);
let nextButton = document.querySelector('.carousel_button--right');
let prevButton = document.querySelector('.carousel_button--left');
let dotsNav = document.querySelector('.carousel_nav');
let dots = Array.from(dotsNav.children);
let slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slide next to one another
let setSlidePosition = (slide, index) => {
 slide.style.left = slideWidth * index + 'px'
};
slides.forEach(setSlidePosition);

// move slide function for next and previous button
moveToSlide = (track, currentSlide, targetSlide) =>{
 track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
 currentSlide.classList.remove('current-slide');
 targetSlide.classList.add('current-slide');
};
// dot function
let updateDots = (currentDot, targetDot) => {
 currentDot.classList.remove('current-slide');
 targetDot.classList.add('current-slide');
};
// hideshowArrow function
let hideShowArrow = (slides, prevButton, nextButton, targetIndex) =>{
 if (targetIndex === 0) {
  prevButton.classList.add('is-hidden');
  nextButton.classList.remove('is-hidden');
 } else if (targetIndex === slides.length - 1) {
  prevButton.classList.remove('is-hidden');
  nextButton.classList.add('is-hidden');
 } else {
  prevButton.classList.remove('is-hidden');
  nextButton.classList.remove('is-hidden');
 };
};

// when i clicked left, move slide to the left
prevButton.addEventListener('click', e =>{
 let currentSlide = track.querySelector('.current-slide');
 let prevSlide = currentSlide.previousElementSibling;
 let currentDot = dotsNav.querySelector('.current-slide');
 let prevDot = currentDot.previousElementSibling;
 let prevIndex = slides.findIndex(slide => slide === prevSlide);

 moveToSlide(track, currentSlide, prevSlide);
 updateDots(currentDot, prevDot);
 hideShowArrow(slides, prevButton, nextButton, prevIndex);
});

// when i clicked right, move slide to the right
nextButton.addEventListener('click', ()=>{
 let currentSlide = track.querySelector('.current-slide');
 let nextSlide = currentSlide.nextElementSibling;
 let currentDot = dotsNav.querySelector('.current-slide');
 let nextDot = currentDot.nextElementSibling;
 let nextIndex = slides.findIndex(slide => slide === nextSlide);

 moveToSlide(track, currentSlide, nextSlide);
 updateDots(currentDot, nextDot);
 hideShowArrow(slides, prevButton, nextButton, nextIndex);
 // let amountToMove = nextSlide.style.left
 // track.style.transform = 'translateX(-' + amountToMove + ')'
 // currentSlide.classList.remove('current-slide')
 // nextSlide.classList.add('current-slide')
});

// carousel nav
dotsNav.addEventListener('click', e =>{
 let targetDot = e.target.closest('button');
 if(!targetDot) return;
 let currentSlide = track.querySelector('.current-slide');
 let currentDot = dotsNav.querySelector('.current-slide');
 let targetIndex = dots.findIndex(dot => dot === targetDot);
 let targetSlide = slides[targetIndex];

 moveToSlide(track, currentSlide, targetSlide);
 updateDots(currentDot, targetDot);
 hideShowArrow(slides, prevButton, nextButton, targetIndex);
});