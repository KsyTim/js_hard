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
  DomElement.apply(this, arguments);
  if(this.selector[0] === '.'){
    this.selector = this.selector.substr(1)
    let div = document.createElement('div');
    div.classList.add(`${this.selector}`);
    div.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam veritatis natus soluta iure architecto totam deserunt aliquid quas commodi repudiandae rem, vitae consequatur, eaque consectetur iusto labore? Voluptate, fugit aliquam?';
    document.body.append(div);
  } else if (this.selector[0] === '#'){
    let p = document.createElement('p');
    p.setAttribute('id', `${this.selector}`);
    p.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam veritatis natus soluta iure architecto totam deserunt aliquid quas commodi repudiandae rem, vitae consequatur, eaque consectetur iusto labore? Voluptate, fugit aliquam?';
    document.body.append(p);
  } else {
    console.log('Error');
  }
};
// с помощью cssText задаем стили созданному элементу в методе createElement
DomElement.prototype.cssText = function(selector, height, width, bg, fontSize){
  DomElement.apply(this, arguments);
  selector = this.selector;
  height = this.height;
  width = this.width;
  bg = this.bg;
  fontSize = this.fontSize;
  selector = selector.substr(1);
  let elem = document.querySelector(`${selector}`);
  elem.style.cssText = `height: ${height};
  width: ${width};
  background-color: ${bg};
  font-size: ${fontSize};
  `;
};
// создаем объект класса DomElement
let element = new DomElement();
// создеам элемент объекта element на странице
element.createElement('#p');
// присваиваем стили элементу объекта element
element.cssText('#p', '200px', '200px', 'yellow', '18px');


// это просто для тренировки 
function newElement(){
  DomElement.apply(this, arguments);
}

newElement.prototype = Object.create(DomElement.prototype);
newElement.prototype.constructor = newElement;
let elem = new newElement();
elem.createElement('.div');
elem.cssText('.div', '300px', '300px', 'green', '18px');