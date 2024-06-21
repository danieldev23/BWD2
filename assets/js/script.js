const video = document.getElementById("main-video");

var navbar = document.querySelector(".navbar");
let isVideoPlayed = false;
var navbarHeight = navbar.offsetHeight;

console.log(navbarHeight);

window.addEventListener("scroll", function () {
  if(this.window.scrollY > navbarHeight) {
    navbar.classList.add("scroll-navbar");
  }
  else { 
    navbar.classList.remove("scroll-navbar");
  }

  const videoRect = video.getBoundingClientRect();
  const videoHeight = video.clientHeight;
  const windowHeight = window.innerHeight;

  const startPlayPosition = videoRect.top;
  const endPlayPosition = videoRect.top;

  if (
    startPlayPosition <= windowHeight &&
    endPlayPosition >= 0 &&
    !isVideoPlayed
  ) {
    video.play();
    isVideoPlayed = true;
  } else {
    // Nếu video không còn trong vùng nhìn thấy, có thể tắt video nếu cần thiết
    // Ví dụ: video.pause(); isVideoPlayed = false;
  }
});

$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});

// Open modal dialog
document.addEventListener("DOMContentLoaded", function () {
  // Lấy các phần tử liên quan đến modal
  var openModalButton = document.getElementById("open-modal-button");
  var closeModalButton = document.querySelector(".modal-close");
  var modal = document.getElementById("example-modal");

  // Xử lý sự kiện khi click vào nút mở modal
  openModalButton.addEventListener("click", function () {
    modal.classList.add("is-active");
  });

  // Xử lý sự kiện khi click vào nút đóng modal hoặc nền đen xung quanh modal
  closeModalButton.addEventListener("click", function () {
    modal.classList.remove("is-active");
  });

  modal
    .querySelector(".modal-background")
    .addEventListener("click", function () {
      modal.classList.remove("is-active");
    });
});
