$(document).ready(function() {

    // Giphy

    //global  variables
    var queryURL = "";
    var movieToBeSearched = "";
    var queryString = "";
    var imageUrl = "";

    // build the array
    var topics =
        {
            movieYear: ["1920 Movies", "1930 Movies", "1940 Movies", "1950 Movies",
                "1960 Movies", "1970 Movies", "1980 Movies", "1990 Movies"],
            movieQuery: ["1920+Movies", "1930+Movies", "1940+Movies", "1950+Movies",
                "1960+Movies", "1970+Movies", "1980+Movies", "1990+Movies"],
            buttonNumber: ["year1920", "year1930", "year1940",
                "year1950", "year1960", "year1970", "year1980", "year1990"]
        };


    var imagesForChosenTopic =
        {
            imagesStill: [],
            imagesAnimated: [],
            still: []
        }



    // dynamically build the buttons
    function buildButtons() {
        for (var i = 0; topics.movieYear.length > i; i++) {
            var movieBtn = $("<button>");
            movieBtn.addClass("button-style movieButton");
            movieBtn.text(topics.movieYear[i]);
            movieBtn.attr("id", topics.buttonNumber[i]);
            $("#row-one").append(movieBtn);
        }
    }

    // build the images
    function getImages(queryURL) {

        $.ajax({
            url: queryURL,
            method: "GET",
            contentType: "application/json",
            dataType : "json",

        })

            .then(function (response) {
                imageUrl = response.data;
                for (var i = 0; imageUrl.length > i; i++) {
                    var movieURLStill = imageUrl[i].images.fixed_height_still.url;
                    var movieURLAnimated = imageUrl[i].images.fixed_height.url;
                    var movieURL = imageUrl[i].images.fixed_height_still.url;

                    var movieImage = $("<img>");
                    movieImage.addClass("movie-border movie-image");
                    movieImage.attr("src", movieURL);
                    movieImage.attr("alt", "movie-" + [i]);
                    movieImage.attr("id", "movie-" + [i]);
                    var movieRating = imageUrl[i].rating;
                    var movieRatingDisplay = $("<div>");
                    movieRatingDisplay.addClass("movie-rating");
                    movieRatingDisplay.text("Rating: " + movieRating.toUpperCase());
                    $("#image").append(movieImage);
                    $("#image").append(movieRatingDisplay);
                    imagesForChosenTopic.imagesStill.push(movieURLStill);
                    imagesForChosenTopic.imagesAnimated.push(movieURLAnimated);
                    imagesForChosenTopic.still.push(true);
                    // addImageClickEvent(i);
                }
            });
    };

    // function addImageClickEvent(x) {
    //         $("#movie-"+[x]).on("click", function () {
    //             // swapImage();
    //             console.log("Added CLick to Image");
    //             console.log([x]);
    //             swapImage(x);
    //         });
    // }


        $("#image").on("click", ".movie-image", function () {
            console.log("Added CLick to Image");
            var movieID = $(this).attr("id");
                console.log(movieID);
                if (movieID.length === 7) {
                    var x = movieID.substr(6, 1);
                }
                else {
                    var x = movieID.substr(6, 2);
                }
            swapImage(x);
            console.log(x);


        });




    function swapImage(x) {

        console.log("movie Row");
        if (imagesForChosenTopic.still[x]) {
            console.log("image was clicked and is a still");
            var movieURL = imagesForChosenTopic.imagesAnimated[x];

            var movieImage = $("<img>");
            movieImage.addClass("movie-border movie-image");
            movieImage.attr("src", movieURL);
            movieImage.attr("alt", "movie-" + [x]);
            movieImage.attr("id", "movie-" + [x]);

            imagesForChosenTopic.still[x] = false;

            $("#movie-" + [x]).replaceWith(movieImage);
        } else {
            console.log("clicked again - is animated");
            var movieURL = imagesForChosenTopic.imagesStill[x];

            var movieImage = $("<img>");
            movieImage.addClass("movie-border movie-image");
            movieImage.attr("src", movieURL);
            movieImage.attr("alt", "movie-" + [x]);
            movieImage.attr("id", "movie-" + [x]);

            imagesForChosenTopic.still[x] = false;
            $("#movie-" + [x]).replaceWith(movieImage);
        }
    }


    function buildSearchURL(movieYearToSearch) {
        for (var i = 0; topics.movieYear.length > i; i++)
        {
            if (topics.buttonNumber[i] === movieYearToSearch)
            {
                queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics.movieQuery[i] + "&apikey=dc6zaTOxFJmzC"+ "&limit=10";
            }
        }
        return queryURL;
    }

    function addClickEvent() {
        for (var j = 0; topics.buttonNumber.length > j; j++) {
            $("#" + topics.buttonNumber[j]).on("click", function () {
                console.log(this.id);

                movieToBeSearched = (this.id);

                // build the query string to pull the movies
                queryString = buildSearchURL(movieToBeSearched);
                getImages(queryString);
            });
        }
    }







    // execution of the code

    buildButtons();
    addClickEvent();




} )


// /***************************************************************************
//  // Event handler for user clicking a food image
//  //***************************************************************************
//  $(document.body).on("click", "img", function() {
//
//    if (DebugON) console.log ("In image press event handler");
//
//    // Swap the source url with the alternate src url
//    var temp_src = $(this).attr("src");
//    $(this).attr("src", $(this).attr("src_swap"));
//    $(this).attr("src_swap", temp_src);
//
//    if (DebugON) console.log ("In image press temp: " + temp_src);
//    if (DebugON) console.log ("In image press src: " + $(this).attr("src"));
//    if (DebugON) console.log ("In image press: swap " + $(this).attr("src_swap"));
//
// });  // event handler function for image press
//  // assign the attribute src of the still picture for the gif
//  foodImage.attr("src", results[i].images.fixed_height_still.url);
//
//  // assign the attribute src of the gif animated image
//  foodImage.attr("src_swap", results[i].images.fixed_height.url);