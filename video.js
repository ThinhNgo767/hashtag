const file = document.getElementById("input-file");
const video = document.getElementById("video");
const next = document.getElementById("next");
const back = document.getElementById("back");
const playPause = document.getElementById("play-pause");
const again = document.getElementById("select-again");
const durationRange = document.getElementById("duration");

const controlButton = document.getElementById("container-control-btn");

let isPlay = false;

document.getElementById("btn-select").addEventListener("click", () => {
  file.click();
});

async function selectVideo(file) {
  const thum = await generateThumbnail(file);
  const src = URL.createObjectURL(file);
  const pic = URL.createObjectURL(thum);

  video.src = src;
  video.poster = pic;
  video.style.display = "block";
  controlButton.style.display = "flex";
  document.getElementById("control-time").style.display = "flex";
}

function generateThumbnail(file) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    video.src = URL.createObjectURL(file);
    video.currentTime = 1; // Capture frame at 2 seconds

    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Convert to Blob for upload, specify JPEG format
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.9, // Quality
      );
      URL.revokeObjectURL(video.src); // Release memory
    };

    video.onerror = () => {
      resolve(null); // Return null if there's an error
    };
  });
}

file.addEventListener("change", async function () {
  let media = file.files[0];
  await selectVideo(media);
});

next.addEventListener("click", () => {
  if (video.currentTime + 0.1 >= video.duration) {
    video.currentTime = video.duration;
    return;
  }
  video.currentTime += 0.1;
});

back.addEventListener("click", () => {
  video.currentTime = Math.max(0, video.currentTime - 0.1);
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

again.addEventListener("click", function () {
  URL.revokeObjectURL(video.src);
  URL.revokeObjectURL(video.poster);
  video.src = "";
  video.poster = "";
  file.value = "";
  video.style.display = "none";
  controlButton.style.display = "none";
  document.getElementById("control-time").style.display = "none";
});

durationRange.addEventListener("input", () => {
  video.currentTime = durationRange.value;
});
