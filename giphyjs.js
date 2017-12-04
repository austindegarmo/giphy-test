 $(document).ready(function() {

      var animals = ["stone", "rock", "kitten", "doggo"];

      function populateButtons(arrayToUse,classToAdd,areaToAdd) {
        $(areaToAddTo).empty();
        //Creates a place to add specific attribute based buttons, and where to place them

        for (var i = 0; i < arrayTosUse.length; i++) {
          var a = $("<button>");
          a.addClass(classToAdd);
          a.attr("data-type", arrayToUse[i]);
          a.text(arrayToUse[i]);
          $(areaToAddTo).append(a);
        }


      }

      $(document).on("click", ".animal-button", function() {
        $("#animals").empty();
        $(".animal-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
      });
   
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class=\"animal-item\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;

        var still = results[i].images.fixed_height_still.url;

        var animalImage = $("<img>");
        animalImage.attr("src", still);
        animalImage.attr("data-still", still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#animals").append(animalDiv);
      }
    });

$(document).on("click", ".animal-image", function() {
  
  var state = $(this).attr("src");
    //This variable is calling the returned object from the Giphy API

  if (state === "still") {

    $(this).attr("src", $(this).attr("data-state"));
    $(this).attr("data-state", "animate");
  }
 else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
 }

 });

   $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal =$("input").eq(0).val();

    if (newAnimal.lengh > 2) {
      animals.push(newAnimal);
    }

    populateButtons(animals, "animal-button", "#animal-buttons");
    // creating buttons and seperating them  by divs


    populateButtons(animals, "animal-button", "#animal-buttons")
   });
   populateButtons(animals, "animal-button", "#animal-buttons");
});