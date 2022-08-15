// step3 요구사항 분석

// TODO 서버 요청 부분
// - [O] 웹 서버를 띄운다.
// - [O] 서버에 새로운 메뉴가 추가될 수 있도록 요청한다.
// - [O] 서버에 카테고리별 메뉴리스트를 불러온다.
// - [O] 서버에 메뉴가 수정 될 수 있도록 요청한다.
// - [O] 서버에 메뉴가 품절상태가 토글될 수 있도록 요청한다.
// - [O] 서버에 메뉴가 삭제 될 수 있도록 요청한다.


// TODO 리팩터링 부분
// - [ ] localStorage에 저장하는 로직은 지운다.
// - [ ] fetch 비동기 api를 사용하는 부분을 async await를 사용하여 구현한다.

// TODO 사용자 경험
// - [ ] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert으로 예외처리를 진행한다.
// - [ ] 중복되는 메뉴는 추가할 수 없다. 

import { $ } from "./utils/dom.js"
import store from './store/index.js';
import MenuApi from './api/index.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso'
  this.init = async() => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
    render()
    initEventListeners();
  }

  const render = () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    )
    const template = this.menu[this.currentCategory]
      .map((menuItem) => {
        return;
          `<li data-menu-id="${menuItem.id}" class="menu-list-item d-flex items-center py-2">
            <span class="${menuItem.isSoldOut ? "sold-out" : ""} w-100 pl-2 menu-name">${menuItem.name}</span>
            <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
            >
            품절
            </button>
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
          })
          .join('');
        $('.menu-list').innerHTML = template;
        updateMenuCount();
  } 

  const updateMenuCount= () => {
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').innerHTML = `총 ${menuCount}개`;
  }

  const addMenuName = async() => {
    if ($('.input-field').value === '') {
      alert('값을 입력해주세요.');
      return;
    }
    const menuName = $('.input-field').value;
    await MenuApi.createMenu(this.currentCategory, menuName);
    render();
    $("#menu-name").value ="";
  }

  const updateMenuName = async(e) => {
    const menuId = e.target.closest('li').dataset.menuId
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', menuName.innerText);
    await MenuApi.updateMenu(this.currentCategory, updateMenuName, menuId);
    render()
  }

  const removeMenuName = async(e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      render();
    }
  }

  const soldOutMenu = async(e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
  }
  const changeCategory = (e) => {
    const isCategorryButton = e.target.classList.contains('cafe-category-name')
    if(isCategorryButton){
      const categoryName = e.target.dataset.categoryName
      this.currentCategory = categoryName
      $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`
      render();
    }
  }

  const initEventListeners = () => {
  $('.menu-list-item').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e)
      return;
    } 
    if(e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e)
      return;
    }
    if (e.target.classList.contains('menu-sold-out-button')) {
      soldOutMenu(e);
      return;
    }
  })

  $('.menu-form').addEventListener("submit", (e) => {
    e.preventDefault();
  })

  $('.input-field').addEventListener("keypress",(e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName()
  })

  $('.input-submit').addEventListener('click', addMenuName);

  $("nav").addEventListener("click", changeCategory)

  }
}

const app = new App();
app.init();

