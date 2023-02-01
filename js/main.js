// 슬라이드 전체크기 구하기
const slide = document.querySelector(".main_slide");
let slideWidth = slide.clientWidth;

// 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체선택
let slideItems = document.querySelectorAll(".slide_item");
const maxSlide = slideItems.length;

// 버튼 클릭할 때 마다 현재 슬라이드가 어디인지 알려주기 위한 변수
let currSlide = 1;

// 페이지네이션 생성
const pagination = document.querySelector(".slide_pagination");

for (let i = 0; i < maxSlide; i++) {
  if (i === 0) pagination.innerHTML += '<li class="page_item active"></li>';
  else pagination.innerHTML += '<li class="page_item"></li>';
}
const paginationItems = document.querySelectorAll(".slide_pagination > li");

// 무한슬라이드를 위해 start,end 슬라이드 복사 (이해안됨)
const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];
const startElem = document.createElement("div");
const endElem = document.createElement("div");

endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;

startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

// 각 복제한 엘리먼트 추가하기
slideItems[0].before(endElem);
slideItems[slideItems.length - 1].after(startElem);

// 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체선택
slideItems = document.querySelectorAll(".slide_item");
let offset = slideWidth + currSlide;
slideItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset}px`);
});

function nextMove() {
  currSlide++;
  //마지막 슬라이드 이상으로 넘어가지 않게
  if (currSlide <= maxSlide) {
    // 슬라이드를 이동시키기 위해 offset계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  } else {
    // 무한슬라이드 기능
    currSlide = 0;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide++;
    offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset적용
    setTimeout(() => {
      // 각 슬라이드 아이템의 left에 offset적용
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
    // 슬라이드 이동 시 현재 활성화된 페이지네이션 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  }
}

function prevMove() {
  currSlide--;
  // 1번째 슬라이드 이하로 넘어가지 않게
  if (currSlide > 0) {
    // 슬라이드를 이동시키기 위한 offset계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동시 현재 활성화된 페이지네이션 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  } else {
    // 무한슬라이드 기능
    currSlide = maxSlide + 1;
    let offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide--;
    offset = slideWidth * currSlide;
    setTimeout(() => {
      //각 슬라이드 아이템의 left에 offset적용
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
    // 슬라이드 이동시 현재 활성화된 페이지네이션 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  }
}

// 브라우저 화면이 조정될 때마다 슬라이드 너비 변경
window.addEventListener("resize", () => {
  slideWidth = slide.clientWidth;
});

// 각페이지네이션 클릭시 해당 슬라이드로 이동
for (let i = 0; i < maxSlide; i++) {
  paginationItems[i].addEventListener("click", () => {
    // 클릭한 페이지네이션에 따라 현재 슬라이드를 변경해주기 (currSlide는 시작 위치가 1이기 때문에 + 1)
    currSlide = i + 1;
    // 슬라이드를 이동시키기 위한 offset계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동시 현재 활성화된 페이지네이션 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  });
}

// 스와이프 이벤트를 위한 변수초기화
let startPoint = 0;
let endPoint = 0;

// pc클릭 이벤트
slide.addEventListener("mousedown", (e) => {
  startPoint = e.pageX; // 마우스 드래그 시작위치 저장
});

slide.addEventListener("mouseup", (e) => {
  endPoint = e.pageX; // 마우스 드래그 끝 위치 저장
  if (startPoint < endPoint) {
    // 마우스가 오른쪽으로 드래그 된 경우
    prevMove(); // 이 함수를 쓸거고,
  } else if (startPoint > endPoint) {
    // 마우스가 왼쪽으로 드래그 된 경우
    nextMove(); // 이 함수를 쓸거다
  }
});

// 기본적으로 슬라이드 루프 시작
let loopInterval = setInterval(() => {
  nextMove();
}, 3000); // 트렌지션 개념..

// 슬라이드에 마우스가 올라간 경우 루프 멈추기
slide.addEventListener("mouseover", () => {
  clearInterval(loopInterval);
});

// 슬라이드에서 마우스가 나온 경우 루프 재시작하기
slide.addEventListener("mouseout", () => {
  loopInterval = setInterval(() => {
    nextMove();
  }, 3000);
});
