
window.addEventListener("scroll", scrolled);
console.log("HE$#");
function expand() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

function scrolled() {
  const htmlElement = document.documentElement;
  var nav = document.getElementById("myTopnav");
  var activeItem = document.querySelector(".active");
  width = window.innerWidth;
  if(htmlElement.scrollTop == 0){
    nav.style.backgroundColor = "rgba(0,0,0,0)";
    activeItem.style.color = "white";
  }
  else{
    nav.style.backgroundColor = "white";
    activeItem.style.color = "black";
  }
  if(width <= 624){
    nav.style.backgroundColor = "rgba(0,0,0,0)";
    activeItem.style.color = "black";
  }
}
