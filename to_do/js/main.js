'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const containerToDo = document.querySelector('.todo-container');
let todoData = [];



//   {
//     value: 'убраться',
//     completed: false
//   },
//   {
//     value: 'погладить',
//     completed: true
//   }
// ];

const updateToDo = function(){
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach(function(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
                    '<div class="todo-buttons">' + 
                      '<button class="todo-remove"></button>' + 
                      '<button class="todo-complete"></button>' +
                    '</div>';
    if(item.completed){
      todoCompleted.append(li);
    } else {               
      todoList.append(li);
    }
    const buttonTodoCompleted = li.querySelector('.todo-complete');
    buttonTodoCompleted.addEventListener('click', function(){
      item.completed = !item.completed;
      updateToDo();
    });

    // const buttonDelete = li.querySelector('.todo-remove');
    // buttonDelete.addEventListener('click', () => {
    //   const index = todoData.findIndex(elem =>
    //     elem.id === li.dataset.idItem);
    //     todoData.splice(index, 1);
    //     updateToDo();
    // });
    // });
    // const buttonDelete = li.querySelector('.todo-remove');
    // buttonDelete.addEventListener('click', function(e){
    //   if (li.parentElement.id === 'todo'){
    //     todoList.removeChild(li);
    //   } else if (li.parentElement.id === 'completed'){
    //     todoCompleted.removeChild(li);
    //   }
    //   // console.log(li.parentElement.id);

    //   // todoList.removeChild(li);
 
    // });
    
    const buttonDelete = li.querySelector('.todo-remove');
    buttonDelete.addEventListener('click', function(e){
      if (li.parentElement.id === 'todo'){
        todoList.removeChild(li);
      } else if (li.parentElement.id === 'completed'){
        todoCompleted.removeChild(li);
      }
    });

  });
    // buttonDelete.forEach(function(item, i){
    //   item.addEventListener('click', function(){
    //     if(item.parentNode.parentNode.textContent === this.parentNode.parentNode.querySelector('.text-todo').textContent) {
    //       todoData.splice(item, 1);
    //       updateToDo();
    //     } else {
    //       console.log('Error');
    //     }
    //   });
    // });
  // });

};


if (localStorage.getItem('value')){
  todoData = JSON.parse(localStorage.getItem('value'));
  updateToDo();
}

todoControl.addEventListener('submit', function(event){
  event.preventDefault();
  const newTodo = {
    value: headerInput.value,
    completed: false
  }
  if (headerInput.value === ''){
    todoControl.disabled = true;
  } else {
    todoControl.disabled = false;
    todoData.push(newTodo);
    headerInput.value = '';
    pressEnter();
    updateToDo();
    localStorage.setItem('value', JSON.stringify(todoData));
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
      updateToDo();
      localStorage.setItem('value', JSON.stringify(todoData));
    }
  });
};

updateToDo();