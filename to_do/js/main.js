'use strict'
// создаем переменную, которая хранит элемент формы на странице
const todoControl = document.querySelector('.todo-control');
// создаем переменную, которая хранит элемент инпута для ввода дел на странице
const headerInput = document.querySelector('.header-input');
// создаем переменную, которая хранит элемент списка дел, которые необходимо выполнить на странице
const todoList = document.querySelector('.todo-list');
// создаем переменную, которая хранит элемент списка выполненных дел на странице
const todoCompleted = document.querySelector('.todo-completed');
// создаем переменную, которая хранит элемент todo листа на странице
const containerToDo = document.querySelector('.todo-container');
// создаем массив, в котором будут храниться дела
let todoData = [];
// функция, которая будет обновлять состояние дел на странице при изменении их состояния
const updateToDo = function(){
  todoList.textContent = '';
  todoCompleted.textContent = '';
  // путем перебора массива дел, создаем элемент списка дел
  todoData.forEach(function(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
                    '<div class="todo-buttons">' + 
                      '<button class="todo-remove"></button>' + 
                      '<button class="todo-complete"></button>' +
                    '</div>';
    // услоиве, если значение "выполнено" объекта массива todoData true, тогла переносим дело в список выполненных дел, в ином случае - в список дел, которые необходимо выполнить
    if(item.completed){
      todoCompleted.append(li);
    } else {               
      todoList.append(li);
    }
    // создаем переменную, которая будет хранить значение кнопки "делоВыполнено"
    const buttonTodoCompleted = li.querySelector('.todo-complete');
    // при клике на данную кнопку меняем значение "выполнено" на противоположное, соответственно выполняется перенос в другой список и обновляем состояние дел на странице
    buttonTodoCompleted.addEventListener('click', function(){
      item.completed = !item.completed;
      updateToDo();
    });
    // создаем переменную, которая будет хранить значение кнопки "удалить дело"
    const buttonDelete = li.querySelector('.todo-remove');
    // при клике на данную кнопку, перебираем массив всех существующих дел в списках; и то дело, у которого значение совпадает с текстовым содержанием родительского тэга(то есть у данной корзины находим li, в которой она хранится), берем индекс в массиве и записываем в переменную индекса (стр.44), выходим из массива и удаляем из списка дел это дело, после чего снова обновляем состояние дел на странице
    buttonDelete.addEventListener('click', function(){
        let index;
        todoData.forEach(function(item, i, array){
          if(todoData[i].value === buttonDelete.parentElement.parentElement.querySelector('.text-todo').textContent) {
            index = i;
          } 
        });
        todoData.splice(index, 1);        
        updateToDo();
    });
  });
  // после того, как создаем дело на странице, добавляем его в локалсторэдж (стр.95-97)
  toLocalStorage();
};
// когда форма подверждается кликом по кнопке "добавить", если поле не пустое, то разблокируем кнопку "добавить", записываем дело в качестве объекта в массив дел и очищаем значение инпута, добавялем данные формы в локалсторэдж,  и обновляем состояние дел на странице
todoControl.addEventListener('submit', function(event){
  event.preventDefault();
  const newTodo = {
    value: headerInput.value,
    completed: false
  }
  if (newTodo.value === ''){
    todoControl.disabled = true;
  } else {
    todoControl.disabled = false;
    todoData.push(newTodo);
    headerInput.value = '';
    toLocalStorage();
    updateToDo();
    // вызываем функцию, которая выполняет те же действия, только не при клике по button.#add, а при нажатии клавиши "enter" (стр.77-90)
    pressEnter();
  }
});

function pressEnter(){
  document.addEventListener('keydown', function(event) {
    if (event.code == '13') {
      const newTodo = {
        value: headerInput.value,
        completed: false
      }
      todoData.push(newTodo);
      headerInput.value = '';
      toLocalStorage();
      updateToDo();      
    }
  });
};
// при загрузке страницы, загружаем данные из локалсторэдж (стр.99-104)
fromLocalStorage();
updateToDo();

function toLocalStorage() {
  localStorage.setItem('value', JSON.stringify(todoData));
};

function fromLocalStorage() {
  if (localStorage.getItem('value')){
    todoData = JSON.parse(localStorage.getItem('value'));
    updateToDo();
  }
};