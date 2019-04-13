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
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",
            contentType: "application/json",
            dataType : "json",

        })

            .then(function (response) {
                imageUrl = response.data;
                console.log(imageUrl);
                for (var i = 0; imageUrl.length > i; i++) {
                    var movieURL = imageUrl[i].images.original.url;
                    console.log("My movie = " + movieURL);
                    var movieImage = $("<img>");
                    movieImage.addClass("movie-border movie-image");
                    movieImage.attr("src", movieURL);
                    movieImage.attr("alt", "movie-" + [i]);
                    var movieRating = imageUrl[i].rating;
                    var movieRatingDisplay = $("<div>");
                    movieRatingDisplay.addClass("movie-rating");
                    movieRatingDisplay.text("Rating: " + movieRating.toUpperCase());

                    $("#image").prepend(movieImage);
                    $("#image").prepend(movieRatingDisplay);
            }
            });
         };

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


    // execution of the code

    buildButtons();
    addClickEvent();



} )