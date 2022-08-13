// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [] 메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
// - [] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [] 추가 되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"</ul>` 안에 삽입해야한다
// - [] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// - [] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하느 모달창이 뜬다.
// - [] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
// - [] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [] 총 메뉴 갯수를 count하여 상단에 보여준다.

// 자바스크립트를 불러왔을 때 실행이 되어야함
function APP() {
  // 메뉴의 이름을 입력받는 곳 -> HTML에서 input에서 입력받고 있음 
  // 엘리먼트를 찾는 메서드 id에는 #이 붙음 사용자가 키보드 입력한 값을 받는 경우 keypress
  // keypress로 이벤트를 입력받아 
  // e는 event의 약자
  document.querySelector('.menu-form').addEventListener("submit", (e) => {
    e.preventDefault();
  })


  document.querySelector('.input-field').addEventListener("keypress",() => {
    if(e.key === "Enter") {
      console.log(document.querySelector('.input-field'))
    }
  })
}