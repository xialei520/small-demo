let workers = new Worker('./workers.js');

workers.addEventListener('message', event => {
    console.log(event, 'kkk')
    var img = document.createElement("img");
    var blob = new Blob([event.data])
    img.src = window.URL.createObjectURL(blob);   
  
    document.querySelector('#app').appendChild(img)
})

console.log('22222')
