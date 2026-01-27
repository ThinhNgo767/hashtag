const file = document.getElementById("input-file");
const video = document.getElementById("video");
const next = document.getElementById("next");
const back = document.getElementById("back");
const playPause = document.getElementById("play-pause");
const dropzone = document.getElementById("dropzone");

const controlButton = document.getElementById("container-control-btn");

let isPlay = false;

function selectVideo(file) {
  const src = URL.createObjectURL(file);
  video.src = src;

  video.style.display = "block";
  controlButton.style.display = "flex";
  document.getElementById("control-time").style.display = "flex";
}

file.addEventListener("change", function () {
  let media = file.files[0];
  selectVideo(media);
});
next.addEventListener("click", () => {
  if (video.currentTime > video.duration) return;
  video.currentTime += 0.1;
});
back.addEventListener("click", () => {
  if (video.currentTime === 0) return;
  video.currentTime -= 0.1;
});
playPause.addEventListener("click", () => {
  video.paused ? video.play() : video.pause();
});

// UI: Listen to the video to decide what the button says
video.addEventListener("play", () => {
  playPause.innerText = "Pause";
});

video.addEventListener("pause", () => {
  playPause.innerText = "Play";
});
video.addEventListener("timeupdate", () => {
  document.getElementById("current-time").innerText =
    video.currentTime.toFixed(1);
  document.getElementById("duration").max = video.duration;
  document.getElementById("duration").value = video.currentTime;
});
