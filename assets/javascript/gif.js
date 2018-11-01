var animals = [];


$(document).ready(function () {
  $("#animal-input").focus();
  renderButtons();
  function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=qDIj6PV4VSIhhGJn2UABWMDlHmgw0kf0&q=" + animal + "&limit=25";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {


      var results = response.data;
      for (var i = 0; i < 10; i++) {
        var animalDiv_i = $("<div class='animal'>");
        var rating = results[i].rating;
        var title = results[i].title;
        console.log("Rating is" + rating);
        var pOne = $("<p>").text("Rating: " + rating);
        var pTwo = $("<p>").text("Title: " + title);
        //var favBtn = $("<button>").text("Click to add to Fav");

        var imgURL1 = results[i].images.fixed_height_still.url;
        var imgURL2 = results[i].images.fixed_height.url;
        var fav_i = $("#Favs").val();
        console.log("The favourite is" + fav_i);
        var image_i = $("<img>").attr("src", imgURL1);

        image_i.addClass("gif");
        image_i.attr("data-animate", imgURL2);
        image_i.attr("data-still", imgURL1);
        image_i.attr("data-state", "still")
        animalDiv_i.append(pOne);
        animalDiv_i.append(pTwo);
        animalDiv_i.append(fav_i);
        animalDiv_i.append(image_i);
        animalDiv_i.css('float', 'left');
        animalDiv_i.css('margin-right', '5px');
        $("#animal-view").prepend(animalDiv_i);


      }
    });
  }

  function renderButtons() {

    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {


      var a = $("<button>");

      a.addClass("animal-btn");

      a.attr("data-name", animals[i]);

      a.text(animals[i]);

      $('.animal-btn').css({ "background-color": "teal" });


      $("#buttons-view").append(a);
    }
  }


  $("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    $("#animal-input").val("");
    renderButtons();
  });


  $(document).on("click", ".animal-btn", displayAnimalInfo);

  $(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");




    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});