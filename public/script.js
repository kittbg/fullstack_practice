const $container = $('.container');
const $button = $('.button');

$button.on('click', () => {
    $(".container").empty();
    var userInput = $("input").val()
})

fetch(`http://127.0.0.1:3000/api/cars/${userInput}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let newdiv = $(`
    <div>${cars.make}</div>
    <div>${cars.model}</div>
    <div>${cars.year}</div>
    <div>${cars.color}</div>
    `)
  })

  $container.append(newdiv)

