'use strict'
// создаем переменные
let container = document.querySelector('.container');
let bgColor = document.querySelector('.bg-color-name');
let changeColorButton = document.getElementById('change-color');

// создаем функцию которая будет генерировать рандомный background
function randomColor() {
  let red = random(0,255).toString(16);
  let green = random(0,255).toString(16);
  let blue = random(0,255).toString(16);
  return '#' + red + green + blue;
}
// функция которая генерирует рандомные целые числа в заданном диапазоне
function random(x, y){
  return Math.round(Math.random() * (y - x) + x);
}
// событие при нажатии на кнопку смена цвета 
changeColorButton.addEventListener('click', function(){
  // смена фона
  container.setAttribute('style', `background-color: ${randomColor()}`);
  // значение цвета 
  bgColor.textContent = randomColor();
});

