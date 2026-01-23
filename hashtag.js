const inputHashtag = document.getElementById("hashtag-input");
const saveButton = document.getElementById("submit-button");
const statusMessage = document.getElementById("status-message");
const pasteData = document.getElementById("paste-hashtag-button");
const copyData = document.getElementById("copy-button");
const deleteData = document.getElementById("delete-button");
const resultContainer = document.getElementById("result-container");
const hideData = document.getElementById("hide-button");
const textArea = document.querySelector("#hashtagTextArea");

let savedData = JSON.parse(localStorage.getItem("kbjHashtag")) || [];

function saveHashtag() {
  const hashtag = inputHashtag.value.trim();
  // 1. Kiểm tra xem ô nhập có trống không
  if (hashtag === "") {
    statusMessage.textContent = "Vui lòng không để trống!";
    return;
  }
  // 2. Kiểm tra ký tự đầu tiên có phải là # không
  if (!hashtag.startsWith("#")) {
    statusMessage.textContent =
      "Hashtag phải bắt đầu bằng ký tự # (Ví dụ: #abc)";
    inputHashtag.value = "";

    return;
  }
  // 3. Kiểm tra trùng lặp (không phân biệt chữ hoa chữ thường)
  const isDuplicate = savedData.some(
    (item) => item.toLowerCase() === hashtag.toLowerCase(),
  );

  if (isDuplicate) {
    statusMessage.textContent = "Hashtag đã tồn tại!";
    inputHashtag.value = "";
    return;
  }

  savedData.push(hashtag);
  localStorage.setItem("kbjHashtag", JSON.stringify(savedData));
  statusMessage.innerHTML = "Đã lưu thành công!" + hashtag;
  inputHashtag.value = "";

  renderToTextArea();
  setTimeout(() => {
    statusMessage.textContent = "";
  }, 2000);
}

saveButton.addEventListener("click", saveHashtag);

// function renderHashtags() {
//   const listElement = document.querySelector("#hashtagList"); // Giả sử bạn có <ul id="hashtagList"></ul>
//   if (!listElement) return;

//   listElement.innerHTML = ""; // Xóa danh sách cũ
//   savedData.forEach((item) => {
//     const li = document.createElement("li");
//     li.textContent = item;
//     listElement.appendChild(li);
//   });
// }

// // Gọi hàm này ngay khi trang web vừa load xong
// renderHashtags();

function renderToTextArea() {
  if (!textArea) return;
  if (savedData.length === 0) {
    resultContainer.style.display = "none";
    return;
  }
  resultContainer.style.display = "block";

  // join('\n') sẽ nối mảng ["#abc", "#def"] thành chuỗi "#abc\n#def"
  // Khi hiển thị trong textarea, nó sẽ tự động xuống dòng
  textArea.value = savedData.join("\n");
  textArea.style.height = "auto";
  textArea.style.height = textArea.scrollHeight + "px";
}

// Gọi lần đầu khi load trang để hiển thị dữ liệu cũ
renderToTextArea();

pasteData.addEventListener("click", function () {
  navigator.clipboard.readText().then((clipboardText) => {
    inputHashtag.value = clipboardText;
    statusMessage.textContent = "Đã dán nội dung từ clipboard!";
  });
});

copyData.addEventListener("click", function () {
  const textArea = document.querySelector("#hashtagTextArea");
  if (!textArea) return;
  textArea.select();
  navigator.clipboard.writeText(textArea.value);
  statusMessage.textContent = "Đã sao chép tất cả hashtag!";
});

deleteData.addEventListener("click", function () {
  const confirmDelete = confirm(
    "Bạn có chắc chắn muốn xóa tất cả hashtag đã lưu không?",
  );
  if (!confirmDelete) return;
  savedData = [];
  localStorage.removeItem("kbjHashtag");
  renderToTextArea();
  statusMessage.textContent = "Đã xóa tất cả hashtag đã lưu.";
});

let flagButton = true;

hideData.addEventListener("click", function () {
  flagButton = !flagButton;
  if (flagButton) {
    hideData.innerText = "Hide";
    textArea.classList.add("show-hashtag");
    textArea.classList.remove("hide-hashtag");
  } else {
    hideData.innerText = "Show";
    textArea.classList.add("hide-hashtag");
    textArea.classList.remove("show-hashtag");
  }
});
