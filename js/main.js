'use strict';
function tryToGuessTheNumber(){
  // создаем переменную и присвоим ей значение загаданного числа 
  const guessedNumber = 58;
  // функция, проверяющая является ли переменная числом
  let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  // создаем переменную, которая будет хранить значение, введенное пользователем, и которое будем сравнивать с загаданным
  let yourNumber; 
  // создаем переменную и присвоим ей значение количества попыток на отгадывание загаданного числа 
  const effort = 10;
  // функция, при вызове которой отнимаем одну попытку и сообщаем количество оставшихся попыток ... принимает количество попыток
  function effortAmount(effort) {
    // функция "угадай число"
    function guessTheNumber(){
      // присваиваем переменной значение, которое будет вводить пользователь
      yourNumber = prompt('Угадайте число от 1 до 100');
      // функция, сообщающая, что введенное пользователем число меньше, чем загаданное
      function numberLess(){
        alert(`Загаданное число меньше, осталось ${effort--} попыток`);
      }
      // функция, сообщающая, что введенное пользователем число больше, чем загаданное
      function numberMore(){
        alert(`Загаданное число больше, осталось ${effort--} попыток`);
      }
      // функция, сообщающая, что пользователем введено не число
      function notNumber() {
        alert('Введите число!');    
      }
      // функция, которая сообщает, что игра окончена, будет срабатывать, если нажата кнопка cancel, то есть yourNumber вернет null
      function cancelGame(){
        confirm('Игра окончена');
      }
      // функция сообщающая, что игра выиграна
      function winGame(){
        confirm('Поздравляю, Вы угадали!');
      }
      // общее условие: если введено число, то выолняется следующая проверка, иначе(строки 51-53) вызов функции notNumber
      if (isNumber(+yourNumber)){
        // если первое условие true, то можно сравнивать с загаданным числом
        // если меньше загаданного числа
        if (+yourNumber > guessedNumber) {
          numberLess();
          // если cancel
        } else if (yourNumber === null) {
          cancelGame();
          // если пустая строка или пробелы
        } else if (yourNumber === '' || yourNumber.trim() === '') {
          notNumber();
          // если больше загаданного числа
        } else if (+yourNumber < guessedNumber){
          numberMore();
          // если равно загаданному числу
        } else if (+yourNumber === guessedNumber){
          winGame();
        }
      } else {
        notNumber();
      }
      return guessTheNumber();
    }
    guessTheNumber();
    if(effort > 0) {
      effortAmount(effort);
    }
  }

  effortAmount(effort);
}  
tryToGuessTheNumber();