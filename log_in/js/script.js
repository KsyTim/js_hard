'use strict';

class Registration {
    constructor(signUpBtn, logInBtn, username, list) {
        this.signUpBtn = document.getElementById(signUpBtn);
        this.logInBtn = document.getElementById(logInBtn);
        this.username = document.getElementById(username);
        this.list = document.getElementById(list);
        this.userList = new Map(JSON.parse(localStorage.getItem('list')));
    }

    addToStorage() {
        localStorage.setItem('userList', JSON.stringify([...this.userList]));
    }

    update() {
        this.list.textContent = '';
        this.userList.forEach(this.createItem);
        this.addToStorage();
    }

    createItem = item => {
        const li = document.createElement('li');
        li.classList.add('user_list--item');
        li.insertAdjacentHTML('beforeend', `
            <span class="user-info">Имя: ${item.name}, фамилия: ${item.lastname}, зарегистрирован: ${item.regDate}</span>
              <div class="buttons">
                <button class="user-delete"></button>
              </div>
        `);
        this.list.append(li);
    }

    addTodo() {
            const user = {
                name: this.user,
                lastname: this.user,
                login: this.login, 
                password: this.password,
                regDate: this.date
            };
            this.userList.set(user);
            this.update();
    }

    handler() {
      document.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('#sign_up')) {
          this.user = prompt('Введите Ваше имя и Фамилию', 'Иван Иванов');
          this.login = prompt('Введите Ваш логин');
          this.password = prompt('Введите Ваш пароль');
          
          this.update();
        } else if (target.matches('#log_in')) {
          this.update();
        }         
      });
    }

}


const registration = new Registration('sign_up', 'log_in', 'username', 'user_list');
console.log(registration);
registration.handler();