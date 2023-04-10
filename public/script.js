const $button = $('.button');
const $div = $('.container');

$button.on('click', ()=>{
    $div.empty();
    var userInput = $("input").val();

    fetch(`http://127.0.0.1:3000/api/cars/${userInput}`)
      .then(response => response.json())
      .then(data => {
          console.log(data)

          data.forEach(cars => {
            let newDiv = $(`
            <div>${cars.make}</div>
            <div>${cars.model}</div>
            <div>${cars.year}</div>
            <div>${cars.color}</div>
            `)
            $div.append(newDiv)
          })
      })
})