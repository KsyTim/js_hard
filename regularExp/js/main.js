// 1.Написать скрипт, которые заменяет слово "функция" и его однокоренные слова в div с id=task1 на «<strong>функция</strong>». 
const task1 = document.getElementById('task1');
const reg1 = task1.textContent.replace(/(функци)(.{1})/gi, match => `<strong>${match}</strong>`);
task1.textContent = '';
task1.insertAdjacentHTML('afterbegin', reg1);

// 2. Написать скрипт который в div с id=task2 найдет время. Время имеет формат часы:минуты. И часы, и минуты состоят из двух цифр, пример: 09:00. Заключить найденное время в тег <b></b>
const task2 = document.body;
const reg2 = task2.innerHTML.replace(/[0-9]{2}:[0-9]{2}/gi, match => `<b>${match}</b>`);
task2.innerHTML = '';
task2.insertAdjacentHTML('afterbegin', reg2);

// 3. Создать запрос во всем документе найти текст в кавычках и заключить его в теги <mark></mark>
const task3_2 = document.getElementById('task1');
const task3_1 = document.getElementById('task2');
const reg3_1 = task3_1.innerHTML.replace(/("|«).*("|»)/gi, match => {
  match = match.replace(/("|«)|("|»)/g, '');
  return `<mark>${match}</mark>`;
});
const reg3_2 = task3_2.innerHTML.replace(/("|«).*("|»)/gi, match => {
  match = match.replace(/("|«)|("|»)/g, '');
  return `<mark>${match}</mark>`;
});
task3_1.textContent = '';
task3_2.textContent = '';
task3_1.insertAdjacentHTML('afterbegin', reg3_1);
task3_2.insertAdjacentHTML('afterbegin', reg3_2);

// 4. Замените в документе домены вида http://site.ru на <a href="http://site.ru">site.ru</a>, 
const task4 = document.body;
const reg4 = task4.innerHTML.replace(/http:\/\/.*\.ru.*(\)|\.)/g, match => {
  const result = match.replace(/(http:\/\/www\.)|(http:\/\/)|(\/.*)|(\.)$/g, '');
  return match = `<a href="${match}">${result}</a>`;
});
task4.innerHTML = '';
task4.insertAdjacentHTML('afterbegin', reg4);

// 5. Напишите регулярное выражение для поиска цвета, заданного как #ABCDEF, вывести цвет в консоль
const task5 = document.body;
const reg5 = task5.innerHTML.match(/#[A-Z0-9]{6}/g);
reg5.forEach(item => {
  console.log(item);
});

// 6. Ссылки такого вида http://site.ru/aaaa/bbbb.html заменить
// на <a href="http://site.ru/aaaa/bbbb.html">site.ru</a>
// в html документе таких ссылок нет, но, если такие ссылки будут в документе, то обработаются в 4ом задании