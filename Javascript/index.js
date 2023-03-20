hamburger = document.querySelector(".hamburger");
hamburger.onclick = function() {
    navBar = document.querySelector(".nav_bar");
    navBar.classList.toggle("active"); 
}

const currentPage = window.location.pathname.split('/').pop();
const navLinks = [...document.querySelectorAll('.nav_bar ul li a')];

navLinks.forEach(link => {
  if (link.href.endsWith(currentPage)) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});





let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.transform = "translate(" + (-100 * slideIndex) + "%)";
    dots[i].classList.remove("active");
  }

  dots[slideIndex].classList.add("active");
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  setTimeout(showSlides, 5000);
}

let dots = document.getElementsByClassName("dot");

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function() {
    slideIndex = i;
    showSlides();
  });
}


const array = [
  "I summarized those programming languages",
  "I put all the important syntax of each language to be able to start writing",
];

const typing = document.querySelector(".typing");
const h2 = typing.querySelector("h2");
const p = typing.querySelector("p");

let i = 0; 
let j = 0;
let interval;

function type(){
  const current = array[i];
  const currentChar = current.charAt(j);

  if (i === 0) {
    h2.textContent += currentChar;
  } else {
    p.textContent += currentChar;
  }

  j++;

  if(j >= current.length){
    clearInterval(interval);
    j = 0;
    i++;

    if(i >= array.length)
      return;

    setTimeout(() =>{
      if (i === 1) {
        p.innerHTML += "<br>";
      }
      interval = setInterval(type, 50);

    }, 1000);
  } 

}

interval = setInterval(type, 50);
