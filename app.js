
//declaring the URL, the tracker array globally

let myURL = "https://api.giphy.com/v1/gifs/search?api_key=JeHX0I0MEGzdyTS3fWWIeO1xvBS0lmCd&q=Lebron&limit=10&offset=0&rating=G&lang=en"
let trackArray = []

// called when submit request button is pressed
let gifCreator = () => {
  $("#append-gifs").empty()

  // sets input value to variable, checks to see if it has already been done
  let gifNeed = $("#gif-request").val()


  //Condition to only run new gifNeed is request has not been made yet
  if (trackArray.indexOf(gifNeed) === -1) {
    trackArray.push(gifNeed)


    //creation of the button

    let newButton = $("<button>");
    newButton.text(gifNeed)
    newButton.attr("class", "btn btn-primary ml-2 mt-1 mr-2 mb-1")
    newButton.attr("id", gifNeed)
    newButton.attr("onClick", "buttonFunction()")
    $("#button-row").append(newButton)

    let currentURL = "https://api.giphy.com/v1/gifs/search?api_key=JeHX0I0MEGzdyTS3fWWIeO1xvBS0lmCd&q=" + gifNeed + "&limit=10&offset=0&rating=G&lang=en"
    
    // Ajax query that creates gif and rating and appends it to the container
    $.ajax({
      url: currentURL,
      method: "GET"
    }).then(function (response) {

      for (var i = 0; i < 10; i++) {
        console.log(response.data[i])
        let holderDiv = $("<div>")
        holderDiv.attr("class", "image-appender")
        let imgSrc = $("<img/>")
        imgSrc.attr("src", response.data[i].images.original.url)
        imgSrc.attr("onClick", "gifClick()")
        let rating = response.data[i].rating
        imgSrc.css({ "height": "200px", "width": "200px", "margin": "2px" })
        $("#append-gifs").append(holderDiv)
        holderDiv.css({"display": "flex", "flex-direction": "column", "align-items": "center"})
        holderDiv.append(imgSrc)
        holderDiv.append(`This gif is rated ${rating}`)
      }
    })
  }

  //Condition that will run if request has already been made. Will change button to say "request has been made", but will still populate field with previously searched gifs.
  else {
    $("#main-button").text("This Item Has Already Been Searched!")
    setTimeout(function(){
      $("#main-button").text("Send Request")
    }, 1500)
    let currentURL = "https://api.giphy.com/v1/gifs/search?api_key=JeHX0I0MEGzdyTS3fWWIeO1xvBS0lmCd&q=" + gifNeed + "&limit=10&offset=0&rating=G&lang=en"
    $.ajax({
      url: currentURL,
      method: "GET"
    }).then(function (response) {

      for (var i = 0; i < 10; i++) {
        let holderDiv = $("<div>")
        holderDiv.attr("class", "image-appender")
        let imgSrc = $("<img/>")
        imgSrc.attr("src", response.data[i].images.original.url)
        imgSrc.attr("onClick", "gifClick()")
        let rating = response.data[i].rating
        imgSrc.css({ "height": "200px", "width": "200px", "margin": "2px" })
        $("#append-gifs").append(holderDiv)
        holderDiv.css({"display": "flex", "flex-direction": "column", "align-items": "center"})
        holderDiv.append(imgSrc)
        holderDiv.append(`This gif is rated ${rating}`)
      }
    })
  }

}

console.log($("#gif-request").value)


//functiont that is called via onlcik of any button (they are all generated dynamically to have the same class name). Process of gif generation is idencitcal to previous process, just skips over the check of input, since no input is given.
function buttonFunction(event) {
  $("#append-gifs").empty();

  let word;
  // console.log(this.event.target)
  console.log(this.event.target.id)

  let currentURL = "https://api.giphy.com/v1/gifs/search?api_key=JeHX0I0MEGzdyTS3fWWIeO1xvBS0lmCd&q=" + this.event.target.id + "&limit=10&offset=0&rating=G&lang=en"


  $.ajax({
    url: currentURL,
    method: "GET"
  }).then(function (response) {

    for (var i = 0; i < 10; i++) {

      let holderDiv = $("<div>")
        holderDiv.attr("class", "image-appender")
        let imgSrc = $("<img/>")
        imgSrc.attr("src", response.data[i].images.fixed_height_still.url)
        imgSrc.attr("onClick", "gifClick()")
        let rating = response.data[i].rating
        imgSrc.css({ "height": "200px", "width": "200px", "margin": "2px" })
        $("#append-gifs").append(holderDiv)
        holderDiv.css({"display": "flex", "flex-direction": "column", "align-items": "center"})
        holderDiv.append(imgSrc)
        holderDiv.append(`This gif is rated ${rating}`)
    }
  })
}

function gifClick(event) {
  console.log(this.event.target)
  this.event.target.setAttribute("src", "https://unsplash.com/photos/J1IbThTQJoY")
}

