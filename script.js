function getAllMovies() {
  $("#daftar-film").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "72155a49",
      s: $("#search-input").val(),
    },
    success: function (hasil) {
      if (hasil.Response == "True") {
        let movie = hasil.Search;
        $.each(movie, function (i, data) {
          $("#daftar-film").append(`
            <div class="col-md-3">
            <div class="card mb-3">
              <img src="${data.Poster}" class="img-card-top">
              <div class="card-body">
                <h5 class="card-title">${data.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                <a href="#" class="card-link detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">Lihat Detail</a>
              </div>
            </div>
            </div>`);
        });
        $("#search-input").val("");
      } else {
        $("#daftar-film").html(`<h2 class="text-center text-secondary">Film tidak ditemukan.</h2>`);
      }
    },
  });
}

$("#search-button").on("click", function () {
  getAllMovies();
});

$("#search-input").on("keyup", function (e) {
  if (e.which === 13) {
    getAllMovies();
  }
});

$("#daftar-film").on("click", ".detail", function () {
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "72155a49",
      i: $(this).data("id"),
    },
    success: function (hasil) {
      if (hasil.Response === "True") {
        $(".modal-body").html(`
        <div class="container-fluid">
        <div class="row">
        <div class="col-md-4">
        <img src="${hasil.Poster}" class="img-fluid">
        </div>

        <div class="col-md-8">
        <ul class="list-group">
  <li class="list-group-item"><h3>${hasil.Title}</h3></li>
  <li class="list-group-item"><b>Rilis</b> : ${hasil.Released}</li>
  <li class="list-group-item"><b>Director</b> : ${hasil.Director}</li>
  <li class="list-group-item"><b>Actor</b> : ${hasil.Actors}</li>
  <li class="list-group-item"><b>Genre</b> : ${hasil.Genre}</li>
  <li class="list-group-item"><b>Sinopsis</b> : ${hasil.Plot}</li>
</ul>
        </div>
        </div>
        </div>`);
      }
    },
  });
});
