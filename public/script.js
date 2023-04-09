const $container = $('.container');
const $button = $('.button');

$button.on('click', () => {
    $(".container").empty();
    var userInput = $("input").val()


fetch(`https://newfrontend.onrender.com/api/cars/${userInput}`)
  .then(response => response.json())
  .then(data => {

    for (let i = 0; i < data.length; i++){
        let cars = data[i];

    let newdiv = $(`
    <div>${cars.make}</div>
    <div>${cars.model}</div>
    <div>${cars.year}</div>
    <div>${cars.color}</div>
    `)
    $container.append(newdiv)
    }
  })
})
