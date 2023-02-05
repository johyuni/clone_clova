var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1, //한 번에 몇개의 슬라이드를 보여줄건지
  spaceBetween: 0, // 슬라이드간 사이 여백
  loop: true, // 무한루프
  pagination: {
    el: ".swiper-pagination", // 대상..?
    clickable: true, // 페이지네이션 클릭하면 이동되게 할건지
  },
  autoplay: {
    delay: 3000, // 3초 간격으로 자동재생
  },
});
