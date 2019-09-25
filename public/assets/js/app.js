

$(".scrape").on("click", function () {
  $.ajax({
    method: "GET",
    url: "/scrape",
  }).then(function (data) {
    // console.log(data)
    window.location.href = "/"
  })
});

// Save the Article
$(".save-article").on("click", function () {

  var thisId = $(this).attr("data-id")

  $.ajax({
    method: "POST",
    url: "/api/articles/saved/" + thisId,
  }).then(function (data) {
    // console.log(data);
    window.location.href = "/"
  })
});

$(".delete-article").on("click", function () {

  var thisId = $(this).attr("data-id")

  $.ajax({
    method: "POST",
    url: "/api/articles/delete/" + thisId,
  }).then(function (data) {
    // console.log(data);
    window.location.href = "/articles/saved/"
  })
});

// grabbing specific article to save notes
$(".add-note").on("click", function () {

  var thisId = $(this).attr("data-id")

  $.ajax({
    method: "GET",
    url: "/api/articles/note/" + thisId,
  }).then(function (data) {
    window.location.href = "/articles/note/" + thisId
  })
});

$(".saveNote").on("click", function () {
  
  var thisId = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/api/notes/save/" + thisId,
      data: {
        // Value taken from title input
        body: $("#noteText").val()
      }
    })
    .then(function (data) {

    });
  $("#noteText").val("");
  // alert("Saved");
  window.location.href = "/articles/saved"
});

$(".see-notes").on("click", function () {
  
  var thisId = $(this).attr("data-id");
debugger
    $.ajax({
      method: "GET",
      url: "/api/seenote/" + thisId,
    })
    .then(function (data) {
      console.log(data);
      window.location.href = "/see/notes/" +thisId
    });
  $("#noteText").val("");
  // alert("Saved");
  
});
