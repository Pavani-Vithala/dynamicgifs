//Creating an emty topic array to psuh the buttons to create
var animals = ["dog", "cat", "rat"];

//function which wraps all actions on the page
$(document).ready(function () {
  //setting the focus to the input text box at the load of the page
  $("#animal-input").focus();
  //calling renderButtons to display buttons 
  renderButtons();
  //Function to get the gifs from Gify API and display on screen
  function displayAnimalInfo() {
    //Getting the data-name attribute of the button clicked
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=qDIj6PV4VSIhhGJn2UABWMDlHmgw0kf0&q=" + animal + "&limit=25";
    //ajax call to Gipy API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      //storing the data element of the response object
      var results = response.data;
      for (var i = 0; i < 10; i++) {
        var animalDiv_i = $("<div class='animal'>");
        var rating = results[i].rating;
        var title = results[i].title;
        var pOne = $("<p>").text("Rating: " + rating);
        var pTwo = $("<p>").text("Title: " + title);
        var imgURL1 = results[i].images.fixed_height_still.url;
        var imgURL2 = results[i].images.fixed_height.url;
        var fav_i = $("<i class = 'fa fa-heart'>");
        var image_i = $("<img>").attr("src", imgURL1);
        fav_i.attr("id", "fav");
        image_i.addClass("gif");
        image_i.attr("data-animate", imgURL2);
        image_i.attr("data-still", imgURL1);
        image_i.attr("data-state", "still")
        animalDiv_i.append(pOne);
        animalDiv_i.append(fav_i);
        animalDiv_i.append(pTwo);
        animalDiv_i.append(image_i);
        animalDiv_i.css('float', 'left');
        animalDiv_i.css('margin', '5px');
        animalDiv_i.css('border','solid');
        animalDiv_i.css('border-width','1px');
        $("#animal-view").prepend(animalDiv_i);


      }
    });
  }
  //Function to create buttons based on the elements in the animals array
  function renderButtons() {

    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {
      //Create a button for each element
      var a = $("<button>");
      //add a class to all buttons created
      a.addClass("animal-btn");
      //add the data-name attribute to the butotns created and store the animal name
      a.attr("data-name", animals[i]);
      //set the text of the button as the string from the animal array
      a.text(animals[i]);
      //set the back ground color of the buttons created
      $('.animal-btn').css({ "background-color": "teal" });
      //append the butotns created to the buttons-view HTML div
      $("#buttons-view").append(a);
    }
  }


  $("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();
    //Push the name of the animal typed to the animals array
    animals.push(animal);
    //set the text box empty by clearing the data entered
    $("#animal-input").val("");
    //call the renderButtons to create the button and redisplay the butotns view
    renderButtons();
  });

  var clicked = true;
  //Function to change the color of the Fav(heart Shape) on click
  $(document).on("click", "#fav", function (event) {
    event.preventDefault();
    if (clicked) {
      $(this).css('color', 'red');
      clicked = false;
    } else {
      $(this).css('color', 'black');
      clicked = true;
    }
   
  });



//Function called on clicking the animal button
  $(document).on("click", ".animal-btn", displayAnimalInfo);
//function controlling the state of the gifs
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