$(document ).ready(function() {
  console.log("ciao");

  $("#go").click(function(){
    // pulisco il div contenenti i risultati
    $(".results").html("");
    // salvo in una variabile il valore dell'input
    var query = $("#search").val();

    $.ajax(
      {
        url: "https://api.themoviedb.org/3/search/movie",
        method: "GET",
        data: {
          api_key : "d063f38fe3e1f45729834c95133aff40",
          language : "it-IT",
          query : query
        },
        success: function(data) {

          var movies = data.results;
          console.log(movies);
          for (var i = 0; i<movies.length; i++) {
            // salvo l'elemento i-esimo in una variabile
            var film = movies[i];
            var source   = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
            var context = {
              tipo: "Film",
              titolo: film.title,
              titolooriginale: film.original_title,
              lingua: languageWithFlag(film.original_language),
              voto: ratewithStars(film.vote_average)
            };
            var html = template(context);
            $(".results").append(html);
          }
        },
        error: function() {
          alert("Errore");
        }
      }
    )

    $.ajax(
      {
        url: "https://api.themoviedb.org/3/search/tv",
        method: "GET",
        data: {
          api_key : "d063f38fe3e1f45729834c95133aff40",
          language : "it-IT",
          query : query
        },
        success: function(data) {

          var series = data.results;
          console.log("serie: ", series);
          for (var i = 0; i<series.length; i++) {
            // salvo l'elemento i-esimo in una variabile
            var tv = series[i];
            var source   = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
            var context = {
              tipo: "Serie TV",
              titolo: tv.name,
              titolooriginale: tv.original_name,
              lingua: languageWithFlag(tv.original_language),
              voto: ratewithStars(tv.vote_average)
            };
            var html = template(context);
            $(".results").append(html);
          }
        },
        error: function() {
          alert("Errore");
        }
      }
    )
    // funzione per sostituire il voto con le stelle
    function ratewithStars(rate) {
      var rateRounded = Math.floor(rate/2);
      var stars = "";
      for (var i = 0; i < 5; i++) {
        if (i < rateRounded) {
          stars += '<i class="fas fa-star"></i>'
        } else {
          stars += '<i class="far fa-star"></i>'
        }
      }
      return(stars)
    }

    // funzione per indicare la lingua con la bandiera della nazione corrispondente
    function languageWithFlag(lang) {
      langarray = ["it", "en"];
      var flag = "";

      if (langarray.includes(lang)) {
        flag = "<img src='img/" + lang + ".svg' class='lang'>";
      } else {
        flag = lang;
      }
      return(flag)

    }
  })
});
