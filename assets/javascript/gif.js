var animals = [];

// displayMovieInfo function re-renders the HTML to display the appropriate content
$(document).ready(function() {
  renderButtons();
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=qDIj6PV4VSIhhGJn2UABWMDlHmgw0kf0&q=" + animal + "&limit=10&rating=G";
  
  console.log(queryURL);
  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    //var result = jQuery.parseJSON(response.d);
    //console.log("The result is "+result);
    // Creating a div to hold the movie
    var results = response.data;
    var animalDiv = $("<div class='animal'>");

    // Storing the rating data
    

    // Creating an element to have the rating displayed
    
    // Displaying the rating
    animalDiv.append(pOne);

    // Retrieving the URL for the image
    for(var i=0;i<10;i++)
    {
      var rating = results[i].rating;
     console.log("Rating is" + rating);
     var pOne = $("<p>").text("Rating: " + rating);

      imgURL = results[i].images.fixed_height.url;
      console.log(imgURL);
     
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    animalDiv.append(pOne);
   animalDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#animal-view").prepend(animalDiv);
   
    } 
  }); 
}   
 




// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
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

});