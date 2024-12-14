document.addEventListener("DOMContentLoaded", () => {
    const summaries = document.querySelectorAll(".summary");
  
    summaries.forEach(summary => {
      const details = summary.nextElementSibling;
      details.addEventListener("click", () => {
        if (details) {
          const isHidden = details.classList.toggle("hidden");
          summary.setAttribute("aria-expanded", !isHidden);
        }
      });
      summary.addEventListener("click", () => {
        const details = summary.nextElementSibling;
        if (details) {
          const isHidden = details.classList.toggle("hidden");
          
          summary.setAttribute("aria-expanded", !isHidden);
        }
        
      });
    });
  });
  

  // script.js
const aboutImage = document.querySelector('.AboutImage');
const wrapper = document.querySelector('.AboutUsHolder');

// Store the target Y position
let targetY = window.innerHeight / 2;
let targetX = window.innerWidth / 2;

// Smoothly update the text's position
function updatePosition() {
    const currentY = parseFloat(getComputedStyle(aboutImage).top);
    const currentX = parseFloat(getComputedStyle(aboutImage).left);
    let newY = currentY + (targetY - currentY) * 0.1; // Smooth interpolation
    let newX = currentX + (targetX - currentX) * 0.1
    console.log
    if(newY < aboutImage.offsetHeight){
        newY = aboutImage.offsetHeight
    }
    
    aboutImage.style.top = `${newY}px`;
    aboutImage.style.left = `${newX}px`

    // Continue updating position
    requestAnimationFrame(updatePosition);
}

// Update the target position on mouse move
document.addEventListener('mousemove', (event) => {
    let ans = getOffset(wrapper)
    console.log(event.clientY)
    targetY = event.clientY
    targetX = event.clientX
});

// Start the animation
updatePosition();
let prevScroll = window.scrollY


document.addEventListener('scroll', () =>{
    //let ans = getOffset(wrapper)
    //targetY = targetY + (window.scrollY - prevScroll)
    //console.log((window.scrollY - prevScroll))
    //prevScroll = window.scrollY
});

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

texts = document.querySelectorAll('.expandable-text')

texts.forEach((child, cIndex) => {
  child.addEventListener('mouseenter', () => {
    aboutImage.style.backgroundImage = child.getAttribute('data-image');
    aboutImage.style.height = "250px";
    aboutImage.style.width = "250px";
  });
  child.addEventListener('mouseleave', () => {
    aboutImage.style.height = 0;
    aboutImage.style.width = 0;
  })
});
