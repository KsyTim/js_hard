'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    update() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    createItem = item => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = item.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${item.value}</span>
              <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
              </div>
        `);
        if (item.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
            this.input.value = '';
        }
    }

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

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(target) {
      this.todoData.forEach((item, i, array) => {
        if(item.value.trim() === target.closest('li').textContent.trim()) {
          this.todoData.delete(i, 1);
          this.update();  
        }  
      }); 
    }

    completedItem(target) {
      this.todoData.forEach((item) => {
        if (item.value.trim() === target.closest('li').textContent.trim()){
          item.completed = !item.completed;
          this.update();
        }
      }); 
    }

    handler() {
      this.todoContainer.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.todo-complete')) {
          this.completedItem(target);
        } else if (target.matches('.todo-remove')) {
          this.deleteItem(target);
        }         
      });
    }


    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.update();
    }
}


const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init();
todo.handler();
