const output = document.getElementById('output');
const getData = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) {
        return;
      } 
      if (request.status === 200) {
        const response = JSON.parse(request.responseText);
        resolve(response);
      } else {
        reject(request.statusText);
      }
    });
    request.send();
  });
};

// const outputPhotos = (data) => {
//   const random = Math.floor(Math.random() * data.length);
//   const obj = data[random];
//   output.innerHTML = `
//     <h4>${obj.title}</h4>
//     <img src="${obj.thumbnailUrl} alt="${obj.title}">
//   `
// };

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

// getData(urlPhotos)
//   .then(outputPhotos)
//   .catch(error => console.error(error));




// const outputPhotos = (data) => {
//   output.insertAdjacentHTML('beforebegin', `
//     <h4>${data.title}</h4>
//     <img src="${data.thumbnailUrl} alt="${data.title}">
//   `);
// };  

const firstImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
  secondImg = getData('https://jsonplaceholder.typicode.com/photos/2');

// не корректно отрабатывает так как каждый раз меняется то первая, то вторая картинка в порядке расположения на странице, чтобы разрешить это используем promiseAll, см. стр.63 или чтобы подгружалась одна из двух, необходимо использовать race см. стр.58 

// firstImg
//   .then(outputPhotos)
//   .catch(error => console.error(error));
// secondImg
//   .then(outputPhotos)
//   .catch(error => console.error(error));

// Promise.race([firstImg, secondImg])
//   .then(outputPhotos)
//   .catch(error => console.error(error));


const outputPhotos = (data) => {
  data.forEach(element => {
    output.insertAdjacentHTML('beforebegin', `
    <h4>${element.title}</h4>
    <img src="${element.thumbnailUrl} alt="${element.title}">
  `);
  });
}; 

Promise.all([firstImg, secondImg])
  .then(outputPhotos)
  .catch(error => console.error(error));

