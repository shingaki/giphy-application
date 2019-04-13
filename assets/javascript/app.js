$(document).ready(function() {

    // Giphy

    //http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC&limit=5
    var queryURL = "";
    var movieToBeSearched = "";
    var queryString = "";
    var imageCount = 2;
    var imageUrl = "";

    // build the array for the buttons

    var topics =
        {
            movieYear: ["1920 Movies", "1930 Movies", "1940 Movies", "1950 Movies",
                "1960 Movies", "1970 Movies", "1980 Movies", "1990 Movies"],
            movieQuery: ["1920+Movies", "1930+Movies", "1940+Movies", "1950+Movies",
                "1960+Movies", "1970+Movies", "1980+Movies", "1990+Movies"],
            buttonNumber: ["year1920", "year1930", "year1940",
                "year1950", "year1960", "year1970", "year1980", "year1990"]
        };




    // build the buttons

    function buildButtons() {
        for (var i = 0; topics.movieYear.length > i; i++) {
            var movieBtn = $("<button>");
            movieBtn.addClass("button-style movieButton");
            movieBtn.text(topics.movieYear[i]);
            movieBtn.attr("id", topics.buttonNumber[i]);
            $("#row-one").append(movieBtn);

        }
    }

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
                    movieImage.attr("src", movieURL);
                    movieImage.attr("alt", "movie-" + [i]);
                    $("#image").append(movieImage);
            }
            });
         };



    function addClickEvent() {
        for (var j = 0; topics.buttonNumber.length > j; j++) {
            $("#" + topics.buttonNumber[j]).on("click", function () {
                console.log(this.id);

                movieToBeSearched = (this.id);

                // build the images
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