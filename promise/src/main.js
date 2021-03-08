const output = document.getElementById('output');
const getData = (url, outputData) => {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) {
      return;
    } 
    if (request.status === 200) {
      const response = JSON.parse(request.responseText);
      outputData(response);
    } else {
      console.error(request.statusText);
    }
  });
  request.send();
};

const outputPhotos = (data) => {
  const random = Math.floor(Math.random() * data.length);
  const obj = data[random];
  output.innerHTML = `
    <h4>${obj.title}</h4>
    <img src="${obj.thumbnailUrl} alt="${obj.title}">
  `
};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

getData(urlPhotos, outputPhotos);