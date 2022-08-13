// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [O] 메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
// - [O] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [O] 추가 되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"</ul>` 안에 삽입해야한다
// - [O] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [O] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [O] 사용자 입력값이 빈 값이라면 추가되지 않는다.
 
// TODO 메뉴 수정
// - [] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하느 모달창이 뜬다.
// - [] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.


// TODO 메뉴 삭제
// - [] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
// - [] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [] 총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);

// 자바스크립트를 불러왔을 때 실행이 되어야함
function App() {
  $('.menu-form').addEventListener("submit", (e) => {
    e.preventDefault();
  })

  $('.input-field').addEventListener("keypress",(e) => {
     if (e.key !== 'Enter') {
      return;
        }
        if ($('.input-field').value === '') {
          alert('값을 입력해주세요.');
          return;
        }
          const espressoMenuName = $('.input-field').value;
          const menuItemTemplate = (espressoMenuName) => {
            return;
            `<li class="menu-list-item d-flex items-center py-2">
              <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
              <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
              수정
              </button>
              <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
              삭제
              </button>
              </li>`;
          };
          $('.menu-list').insertAdjacentHTML(
            'beforeEnd',
            menuItemTemplate(espressoMenuName)
          );
          const menuCount = $('.menu-list').querySelectorAll('li').length;
          $('.menu-count').innerHTML = `총 ${menuCount}개`;
          $('.input-filed').value = '';
        }
  );
}