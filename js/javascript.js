function openNav() {
  document.getElementById("mySidepanel").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidepanel").style.display = "none";
}

document.addEventListener("click", function (e) {
  const sidepanel = document.getElementById("mySidepanel");
  const openButton = document.getElementById("openBtn"); // Nút để mở menu (nếu có)

  // Nếu click KHÔNG nằm trong sidepanel VÀ KHÔNG phải là nút mở menu
  if (!sidepanel.contains(e.target) && !openButton.contains(e.target)) {
    closeNav();
  }
});
