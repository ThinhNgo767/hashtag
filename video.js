const file = document.getElementById("input-file");
const video = document.getElementById("video");
const next = document.getElementById("next");
const back = document.getElementById("back");
const dropzone = document.getElementById("dropzone");
const currentTime = document.getElementById("current_time");

function selectVideo(file) {
  const src = URL.createObjectURL(file);
  video.src = src;
  video.style.display = "block";
  currentTime.innerText = video.currentTime;
}

file.addEventListener("change", function () {
  let media = file.files[0];
  selectVideo(media);
});
next.addEventListener("click", () => {
  if (video.currentTime > video.duration) return;
  video.currentTime += 0.1;
  currentTime.innerText = video.currentTime.toFixed(1);
});
back.addEventListener("click", () => {
  if (video.currentTime === 0) return;
  video.currentTime -= 0.1;
  currentTime.innerText = video.currentTime.toFixed(1);
});
