// Hàm để tạo hoạt ảnh cho giá trị của các phần tử
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.innerText = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
          window.requestAnimationFrame(step);
      }
  };
  window.requestAnimationFrame(step);
}

// Hàm để kiểm tra các phần tử trong khung nhìn
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Khởi tạo Intersection Observer để theo dõi các phần tử .paction
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".paction");
  const endValues = [103676, 163, 1309, 35, 76]; // Giá trị kết thúc mong muốn

  const options = {
      threshold: 0.1 // Phần tử sẽ được coi là trong khung nhìn khi 10% của nó xuất hiện
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const element = entry.target;
              const index = Array.from(elements).indexOf(element);
              animateValue(element, 0, endValues[index], 2000); // 2000ms = 2 giây
              observer.unobserve(element); // Ngừng quan sát sau khi hoạt ảnh chạy xong
          }
      });
  }, options);

  elements.forEach(element => {
      observer.observe(element);
  });
});

// Lắng nghe sự kiện cuộn để chuyển đổi lớp phủ
// window.addEventListener('scroll', function() {
//   const overlay = document.getElementById('titleOverlay');
//   if (!overlay) return; // Đảm bảo overlay tồn tại

//   const scrollPos = window.scrollY * 1.5;
//   const maxScroll = window.innerHeight;

//   if (scrollPos <= maxScroll) {
//       // Chuyển đổi tỷ lệ và độ mờ dựa trên vị trí cuộn
//       const scale = 1 + scrollPos / maxScroll;
//       const opacity = 1 - scrollPos / maxScroll;

//       overlay.style.transform = `scale(${scale})`;
//       overlay.style.opacity = opacity;

//       // Ngăn chặn cuộn trang khi overlay vẫn hiển thị
//     //   document.body.style.overflow = 'hidden';
//   } else {
//       // Cho phép cuộn trang khi overlay đã biến mất
//     //   document.body.style.overflow = 'auto';
//   }
// });

// Chuyển đổi video khi video hiện tại kết thúc
// const mainVideo = document.getElementById('mainVideo');
// let currentVideoIndex = 0;
// const videos = [
//   'Video/9796-221163273_medium.mp4',
//   'Video/148537-794355619.mp4',
//   'Video/179588-862589764_medium.mp4',
//   'Video/95071-644716512_small.mp4'
// ];

// if (mainVideo) {
//   mainVideo.addEventListener('ended', function() {
//       currentVideoIndex = (currentVideoIndex + 1) % videos.length;
//       mainVideo.src = videos[currentVideoIndex];
//       mainVideo.load();
//       mainVideo.play();
//   });
// }

// Đảm bảo jQuery đã được tải trước khi thực thi mã sau
$(document).ready(function () {
  var mySwiper = new Swiper(".swiper", {
      autoHeight: true,
      autoplay: {
          delay: 5000,
          disableOnInteraction: false
      },
      speed: 500,
      direction: "horizontal",
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      pagination: {
          el: ".swiper-pagination",
          type: "progressbar"
      },
      loop: false,
      effect: "slide",
      spaceBetween: 30,
      on: {
          init: function () {
              $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
              $(".swiper-pagination-custom .swiper-pagination-switch").eq(0).addClass("active");
          },
          slideChangeTransitionStart: function () {
              $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
              $(".swiper-pagination-custom .swiper-pagination-switch").eq(mySwiper.realIndex).addClass("active");
          }
      }
  });

  $(".swiper-pagination-custom .swiper-pagination-switch").click(function () {
      mySwiper.slideTo($(this).index());
      $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
      $(this).addClass("active");
  });
});
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.tabs ul li a');

    function changeActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.parentElement.classList.remove('is-active'));
        navLinks[index].parentElement.classList.add('is-active');
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});
