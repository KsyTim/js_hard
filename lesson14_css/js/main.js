// создаем класс 
function DomElement(selector, height, width, bg, fontSize){
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}
// создаем метод класса DomElement , который создает элемент на странице в зависимости от условия создаеn div с классом (если строка selector начинается с точки) или параграф с id (если строка selector  начинается с решетки #)
DomElement.prototype.createElement = function(){
  if(this.selector[0] === '.'){
    this.selector = this.selector.substr(1);
    let div = document.createElement('div');
    document.body.insertAdjacentElement('afterbegin', div);
    div.classList.add(`${this.selector}`);
    div.textContent = 'Блок';
    this.selector = `.${this.selector}`;
  } else if (this.selector[0] === '#'){
    this.selector = this.selector.substr(1);
    let p = document.createElement('p');
    document.body.insertAdjacentElement('afterbegin', p);
    p.setAttribute('id', `${this.selector}`);
    p.textContent = 'Параграф';
    this.selector = `#${this.selector}`;
  } else {
    console.log('Error');
  }
};
// с помощью cssText задаем стили созданному элементу в методе createElement
DomElement.prototype.cssText = function(){
  console.log(this.selector);
  let elem = document.querySelector(`${this.selector}`);
  elem.style.cssText = `height: ${this.height};
  width: ${this.width};
  background-color: ${this.bg};
  font-size: ${this.fontSize};
  position: ${this.position};
  right: 20px;
  top: 20px;
  `;
};
// создаем объект класса DomElement
let element = new DomElement('#p', '200px', '200px', 'yellow', '18px');
// создеам элемент объекта element на странице
element.createElement();
// присваиваем стили элементу объекта element
element.cssText();


// это просто для тренировки 
function newElement(selector, height, width, bg, fontSize){
  DomElement.apply(this, arguments);
}

newElement.prototype = Object.create(DomElement.prototype);
newElement.prototype.constructor = newElement;
let elem = new newElement('.div', '300px', '300px', 'green', '12px');
elem.createElement();
elem.cssText();

// extra lesson14 
function square(selector, height, width, bg, fontSize, position){
  this.position = position;
  DomElement.apply(this, arguments);
}
square.prototype = Object.create(DomElement.prototype);
square.prototype.constructor = square;

// создаем квадрат 100 на 100 пикселей 
function createBlock(){
  let elem2 = new square('#new', '100px', '100px', 'purple', '0px', 'absolute');
  elem2.createElement();
  elem2.cssText();
}
// помещаем квадрат elem2 класса square на страницу после выполнения события DOMContentLoaded (для наглядности останавливаю загрузку блока на секунду)
document.addEventListener('DOMContentLoaded', function(){
  setTimeout(createBlock, 1000);
}); 
// вызов callback-функции 
document.addEventListener('keydown', pressEvent);  

// callback-функция, которая отлавливает нажатие на стрелки клавиатуры (стрелка вверх, стрелка влево, стрелка вправо, стрелка вниз) и в зависимости от нажатой кнопки сдивгает объект в нужном направлении на 10 пикселей
function pressEvent(e){
   if(e.code === 'ArrowDown'){
    down();
  } else if (e.code === 'ArrowUp'){
    up();
  } else if(e.code === 'ArrowRight'){
    right();
  } else if (e.code === 'ArrowLeft'){
    left();
  } else {
    console.log('Error');
  }
  function down(){
    let elem = document.querySelector('body').firstChild;
    elem.style.top = '30px';
  }
  function up(){
    let elem = document.querySelector('body').firstChild;
    elem.style.top = '10px';
  }
  function right(){
    let elem = document.querySelector('body').firstChild;
    elem.style.right = '10px';
  }
  function left(){
    let elem = document.querySelector('body').firstChild;
    elem.style.right = '30px';
  }
}