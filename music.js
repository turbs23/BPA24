// script.js
const followText = document.querySelector('.follow-text');
const wrapper = document.querySelector('.music-wrapper');

// Store the target Y position
let targetY = window.innerHeight / 2;
let offsetHeight = getOffset(wrapper).bottom - getOffset(wrapper).top
// Smoothly update the text's position
function updatePosition() {
    const currentY = parseFloat(getComputedStyle(followText).top);
    let newY = currentY + (targetY - currentY) * 0.1; // Smooth interpolation
    if(newY < followText.offsetHeight){
        newY = followText.offsetHeight
    }
    else if(newY > offsetHeight - 50){
        newY = offsetHeight - 50;
    }
    else{
        followText.style.top = `${newY}px`;
    }
    // Continue updating position
    requestAnimationFrame(updatePosition);
}

// Update the target position on mouse move
document.addEventListener('mousemove', (event) => {
    let ans = getOffset(wrapper)
    targetY = event.pageY - ans.top; // Update only the Y-coordinate
    
});

// Start the animation
updatePosition();
let prevScroll = window.scrollY


document.addEventListener('scroll', () =>{
    let ans = getOffset(wrapper)
    targetY = targetY + (window.scrollY - prevScroll)
    prevScroll = window.scrollY
});

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY
  };
}

const audioPlayer = document.getElementById('audioPlayer');
const music1 = document.querySelector('.music1');

let isPlaying = false;
let currentlyPlaying = null;
let song = null;

const musicGrid = document.querySelector('.musicGrid');
const nav = document.getElementById("myTopnav");
const navA = document.querySelectorAll('[id=navItem]')


for( const child of musicGrid.children){
    if(child == document.querySelector('.empty')){
        continue;
    }

    child.addEventListener('click', () =>{
        song = child.getAttribute('data-song');
        if(!isPlaying){
            audioPlayer.src = song;
            audioPlayer.addEventListener('loadeddata', onAudioLoaded, { once: true });
            isPlaying = true;
            followText.style.color = child.getAttribute('data-color');
            currentlyPlaying = child;
            followText.innerHTML = "Stop";

        }
        else if(isPlaying && currentlyPlaying == child){
            audioPlayer.pause();
            isPlaying = false;
            followText.innerHTML = "Listen";
        }
        else{
            audioPlayer.pause();
            audioPlayer.src = song;
            audioPlayer.play();
            currentlyPlaying = child;
            followText.innerHTML = "Stop";
        }
    });

    child.addEventListener('mouseenter', () => {
        if (isPlaying){
            if(currentlyPlaying == child){
                followText.innerHTML = "Stop";
            }
            else{
                followText.innerHTML = "Listen";
            }
        }
        else{
            followText.innerHTML = "Listen";
            followText.style.color = child.getAttribute('data-color');
            nav.style.backgroundColor = child.getAttribute('data-color');
            window.removeEventListener('scroll', scrolled)
            navA.forEach((n, index) =>{
            var activeItem = document.querySelector(".active");
            if( n != activeItem){
                n.style.color = "black"
            }
            
        });
        }
        
    });
}

function onAudioLoaded() {
    audioPlayer.play();
    currentSong = song; // Update the current song
    isPlaying = true; // Mark as playing
    audioPlayer.removeEventListener('loadeddata', onAudioLoaded); // Remove the event listener
}