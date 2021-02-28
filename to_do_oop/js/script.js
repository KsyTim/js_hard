'use strict';
// создаем класс с todo приложением 
class Todo {
  // конструктор класса, который принимает и хранит значения поля для ввода дела, формы с данным полем, при нажатии на кнопку которого будет отслеживаться событие submit, список с не выполненными делами, список с выполненными делами и общий контейнер с выолненными и не выполненными делами
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        // получаем объект map из localStorage со значением toDoList
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }
    // метод, записывающий новые объекты в localStorage
    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }
    // метод, создающий новые дела, записывает их значения в объект map в localStorage, применяет анимацию к делам, и обновляет состояние на странице
    update() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
        this.animate();
    }
    // метод, создающий дела, при определнных условиях, записывающий их в список выолненных дел, или которые еще не выполнены
    createItem = item => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = item.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${item.value}</span>
              <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
              </div>
        `);
        // условие, если значение "выполнено" объекта класса Todo true, тогда переносим дело в список выполненных дел, в ином случае - в список дел, которые необходимо выполнить
        if (item.completed) {
          li.classList.toggle('did-complete');
          this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
            this.input.value = '';
        }
    }
    // метод, проверяющий значения поля для ввода и если поле не пустое, то записывает данные в объект newTodo
    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.update();
        } else {
          alert('Пожалуйста, заполните поле, оно не должно быть пустым!');
        }
    }
    // метод, генерирующий уникальный ключ для каждого объекта
    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    //  метод, удаляющий выполненное дело из списка дел и из localStorage
    deleteItem(target) {
      this.todoData.forEach((item, i, array) => {
        if(item.value.trim() === target.closest('li').textContent.trim()) {
          this.todoData.delete(i, 1);
          this.update();  
        }  
      }); 
    }
    //  метод, который переносит не выполненное дело в список выполненных дел и обновляет состояние значения completed в объектe в localStorage
    completedItem(target) {
      this.todoData.forEach((item) => {
        if (item.value.trim() === target.closest('li').textContent.trim()){
          item.completed = !item.completed; 
          this.update();
        }
      }); 
    }
    // метод, анимирующий todo приложение
    animate() {
      // обработчик события на кнопке "удалить" при наведении и отсутствии фокуса на элементе 
      document.querySelectorAll('.todo-remove').forEach((item) => {
        item.addEventListener('mouseenter', event => {
          const target = event.target;
          if (target.matches('.todo-remove')) {
            target.closest('li').classList.add('delete_item');
             target.classList.add('delete');
          }
        });
        item.addEventListener('mouseleave', event => {
          const target = event.target;
          if (target.matches('.todo-remove')) {
            target.closest('li').classList.remove('delete_item');
            target.classList.remove('delete');
          }
        });
      });
      // обработчик события на кнопке "выполнено" при наведении и отсутствии фокуса на элементе 
      document.querySelectorAll('.todo-complete').forEach(item => {
        item.addEventListener('mouseenter', event => {
          event.target.classList.add('btn-over');
        });
        item.addEventListener('mouseleave', event => {
          event.target.classList.remove('btn-over');
        });
      });
      // обработчик события на кнопке "редактировать" в списке не выполненных дел при клике на элемент 
      this.todoList.querySelectorAll('.todo-edit').forEach(item => {
        item.addEventListener('click', event => {
          event.target.closest('li').toggleAttribute('contenteditable');
          item.classList.toggle('editing');
        });
      });
    }
    // метод, обрабатывающий клик по конкретной кнопке, и вызывающий соотвественный метод класса Todo
    handler() {
      this.todoContainer.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.todo-complete')) {
          this.completedItem(target);
        } else if (target.matches('.todo-remove')) {
          this.deleteItem(target);
        } else if (target.matches('.todo-edit')) {
          this.todoData.forEach(item => {
            if(item.value.trim() === target.closest('li').textContent.trim()) {
              target.closest('li').addEventListener('blur', () => {
                item.value = target.closest('li').textContent.trim();
                this.update();  
              }); 
            } 
          });
        }        
      });
    }
    // метод, обрабатывающий форму с полем, и вызывающий метод addTodo класса Todo 
    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.update();
    }
}

// создаем экзмепляр класса Todo и передаем в него элементы со страницы
const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
// вызов методов экзмепляра todo класса Todo
todo.init();
todo.handler();
todo.animate();
