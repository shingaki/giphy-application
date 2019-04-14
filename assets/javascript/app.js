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
            movieBtn.addClass("button-style movie-button");
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
                }
            });
    };



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
        console.log("movie Row" + x);
        if (imagesForChosenTopic.still[x]) {
            console.log("image was clicked and is a still");
            var movieURL = imagesForChosenTopic.imagesAnimated[x];
            console.log("get animated move = " + movieURL);

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
            console.log("get still move = " + movieURL);

            var movieImage = $("<img>");
            movieImage.addClass("movie-border movie-image");
            movieImage.attr("src", movieURL);
            movieImage.attr("alt", "movie-" + [x]);
            movieImage.attr("id", "movie-" + [x]);

            imagesForChosenTopic.still[x] = true;
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


            $("#row-one").on("click", ".movie-button", function () {
                console.log(this.id);
                movieToBeSearched = (this.id);
                // build the query string to pull the movies
                queryString = buildSearchURL(movieToBeSearched);
                $("#image").empty();

                for (var i = 0; imagesForChosenTopic.imagesAnimated.length > i; i++)
                {
                    imagesForChosenTopic.still[i] = true;
                }

                imagesForChosenTopic.imagesStill.length = 0;
                imagesForChosenTopic.imagesAnimated.length = 0;
                getImages(queryString);
            })

    $("#add-decade").on("click", function(event) {
        event.preventDefault();

        addNewDecade();
    })


    function addNewDecade() {
        var decade = $("#movie-decade").val().trim();
        topics.movieYear.push(decade + " Movies");
        topics.movieQuery.push(decade+"+Movies");
        topics.buttonNumber.push("year"+decade);

        // Calling renderButtons which handles the processing of our movie array
        $("#row-one").empty();
        $("#image").empty();

        $("#movie-decade").val("");
        buildButtons();
        // execution of the code
    }


    buildButtons();

} )


