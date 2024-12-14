// script.js
const followText = document.querySelector('.follow-text');
const wrapper = document.querySelector('.music-wrapper');

// Store the target Y position
let targetY = window.innerHeight / 2;

// Smoothly update the text's position
function updatePosition() {
    const currentY = parseFloat(getComputedStyle(followText).top);
    let newY = currentY + (targetY - currentY) * 0.1; // Smooth interpolation
    console.log
    if(newY < followText.offsetHeight){
        newY = followText.offsetHeight
    }
    
    followText.style.top = `${newY}px`;

    // Continue updating position
    requestAnimationFrame(updatePosition);
}

// Update the target position on mouse move
document.addEventListener('mousemove', (event) => {
    let ans = getOffset(wrapper)
    targetY = event.pageY - ans.top; // Update only the Y-coordinate
    console.log(event.pageY - ans.top);
});

// Start the animation
updatePosition();
let prevScroll = window.scrollY


document.addEventListener('scroll', () =>{
    let ans = getOffset(wrapper)
    targetY = targetY + (window.scrollY - prevScroll)
    console.log((window.scrollY - prevScroll))
    prevScroll = window.scrollY
});

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

const audioPlayer = document.getElementById('audioPlayer');
const music1 = document.querySelector('.music1');

let isPlaying = false;
let currentlyPlaying = null;
let song = null;

const musicGrid = document.querySelector('.musicGrid');

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
        }
        followText.style.color = child.getAttribute('data-color');
    });
}

function onAudioLoaded() {
    audioPlayer.play();
    currentSong = song; // Update the current song
    isPlaying = true; // Mark as playing
    audioPlayer.removeEventListener('loadeddata', onAudioLoaded); // Remove the event listener
}