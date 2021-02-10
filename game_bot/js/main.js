'use strict';
function gameGuessTheNumber(){
  // создаем переменную и присвоим ей значение количества попыток 
  const effort = 10;
  function effortAmount(effort) {
    // создаем переменную и присвоим ей значение загаданного числа 
    const guessedNumber = Math.floor(Math.random()*100);
    // функция, проверяющая является ли переменная числом
    let isNumber = function(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    // создаем переменную, которая будет хранить значение, введенное пользователем, и которое будем сравнивать с загаданным
    let yourNumber; 
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
      // функция, сообщающая, что пользователем введено число не из указанного диапазона (1-100)
      function matchNumber() {
        alert('Введите число из указанного диапазона!');    
      }
      // функция, которая сообщает, что игра окончена, будет срабатывать, если нажата кнопка cancel, то есть yourNumber вернет null
      function cancelGame(){
        alert('Игра окончена');
        gameGuessTheNumber();
      }
      // функция сообщающая, что игра выиграна
      function winGame(){
        confirm('Поздравляю, Вы угадали!!! Хотите сыграть еще?');
        gameGuessTheNumber();
      }
      function effortEnd() {
        confirm('Попытки закончились, хотите сыграть еще?');
        gameGuessTheNumber();
      }
      // общее условие: если введено число, то выолняется следующая проверка, иначе(строки 71-73) вызов функции notNumber
      if (isNumber(+yourNumber)){
        // если первое условие true, то можно сравнивать с загаданным числом
        // если cancel
              if (yourNumber === null) {
                cancelGame();
              } else if (yourNumber === '' || yourNumber.trim() === '') {
                notNumber();
                // если веденное число не из указанного диапазона
              } else if (+yourNumber < 1 || +yourNumber > 100) {
                matchNumber();
                // если закончилось количество попыток
              } else if (effort <= 0) {
                effortEnd();
                gameGuessTheNumber();
                // если меньше загаданного числа
              } else if (+yourNumber > guessedNumber) {
                numberLess();
                // если больше загаданного числа
              } else if (+yourNumber < guessedNumber){
                numberMore();
                // если загаданное и введеное числа равны
              } else if (+yourNumber === guessedNumber){
                winGame();
                gameGuessTheNumber();
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
gameGuessTheNumber();