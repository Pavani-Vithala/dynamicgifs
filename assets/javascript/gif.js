var animals = [];

// displayMovieInfo function re-renders the HTML to display the appropriate content
$(document).ready(function() {
  renderButtons();
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=qDIj6PV4VSIhhGJn2UABWMDlHmgw0kf0&q=" + animal + "&limit=25";
  
  console.log(queryURL);
  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    
    var results = response.data;
    var animalDiv = $("<div class='animal'>");

    
    
    
    animalDiv.append(pOne);

    // Retrieving the URL for the image
    for(var i=0;i<10;i++)
    {
      var rating = results[i].rating;
      var title = results[i].title;
     console.log("Rating is" + rating);
     var pOne = $("<p>").text("Rating: " + rating);
     var pTwo = $("<p>").text("Title: " + title);
     //var favBtn = $("<button>").text("Click to add to Fav");

      var imgURL1 = results[i].images.fixed_height_still.url;
      var imgURL2 = results[i].images.fixed_height.url;
      
     
    var image = $("<img>").attr("src", imgURL1);
    image.addClass("gif");
    image.attr("data-animate",imgURL2);
    image.attr("data-still",imgURL1);
    image.attr("data-state","still")
    


    // Appending the image
    animalDiv.append(pOne);
    animalDiv.append(pTwo);
    //animalDiv.append(pOne);
    //animalDiv.append(favBtn);
    animalDiv.append(image);

    $("#animal-view").prepend(animalDiv);
   
    } 
  }); 
}   
 




// Function for displaying movie data
function renderButtons() {

  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
   // $(".animal-btn").attr("background-color","teal");
    $('.animal-btn').css({"background-color":"teal"});
   // $(".animal-btn").attr("color","white").

    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding movie from the textbox to our array
  animals.push(animal);
  $("#animal-input").val("");
  
  console.log(animal);



  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
$(document).on("click",".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  console.log("Entered gif click function");
  console.log("The state of Gif is "+ state);
  
  console.log(this);
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
});