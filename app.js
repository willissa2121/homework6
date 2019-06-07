let myURL = "https://api.giphy.com/v1/gifs/search?api_key=JeHX0I0MEGzdyTS3fWWIeO1xvBS0lmCd&q=Lebron&limit=10&offset=0&rating=G&lang=en"
let trackArray = []
let gifCreator = () => {
  $("#append-gifs").empty()

  // console.log($("#gif-request").val());
  // $("#gif-request").css("border", "2px solid red")
  let gifNeed = $("#gif-request").val()

  console.log(trackArray.indexOf(gifNeed))
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
    console.log(currentURL)

    $.ajax({
      url: currentURL,
      method: "GET"
    }).then(function (response) {

      for (var i = 0; i < 10; i++) {

        let imgSrc = $("<img/>")
        imgSrc.attr("src", response.data[i].images.original.url)
        imgSrc.css({ "height": "200px", "width": "200px", "margin": "2px" })
        $("#append-gifs").append(imgSrc)
      }
    })
  }
  else {
    $("#main-button").text("Already Been Searched!")
    let currentURL = "https://api.giphy.com/v1/gifs/search?api_key=JeHX0I0MEGzdyTS3fWWIeO1xvBS0lmCd&q=" + gifNeed + "&limit=10&offset=0&rating=G&lang=en"
    $.ajax({
      url: currentURL,
      method: "GET"
    }).then(function (response) {

      for (var i = 0; i < 10; i++) {

        let imgSrc = $("<img/>")
        imgSrc.attr("src", response.data[i].images.original.url)
        imgSrc.css({ "height": "200px", "width": "200px", "margin": "2px" })
        $("#append-gifs").append(imgSrc)
      }
    })
  }

}

console.log($("#gif-request").value)

// let getData = () => {
//   return false
// }

// gifCreator()

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

      let imgSrc = $("<img/>")
      imgSrc.attr("src", response.data[i].images.original.url)
      imgSrc.css({ "height": "200px", "width": "200px", "margin": "2px" })
      $("#append-gifs").append(imgSrc)
    }
  })
}

