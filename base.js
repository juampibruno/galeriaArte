const audioElement = document.getElementById('audio-player');
const playButton = document.querySelector('.btn-1');
const arrowButton = document.querySelector('.btn-flecha');

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;

playButton.addEventListener(
  "click",
  () => {
    if (!audioContext) {
      audioContext = new AudioContext();
      const track = audioContext.createMediaElementSource(audioElement);
      track.connect(audioContext.destination);
    }

    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === "false") {
      audioElement.play();
      playButton.dataset.playing = "true";
      playButton.textContent = "Music OFF"
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
      playButton.textContent = "Music ON"
    }
  },
  false,
);

audioElement.addEventListener(
  "ended",
  () => {
    playButton.dataset.playing = "false";
  },
  false,
);

arrowButton.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
}