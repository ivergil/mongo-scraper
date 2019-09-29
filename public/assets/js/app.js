

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
$(".add-Note").on("click", function () {
  
  var thisId = $(this).attr("data-id")
debugger;
  $.ajax({
    method: "GET",
    url: "/api/seenotes/" + thisId,
  }).then(function (data) {
    console.log(data);
    debugger;
    $(".previousNotes").append("<h6>" + data.notes.body + "</h6>")
    window.location.href = "/articles/note/" + thisId
  })
});


//Handle Save Note button
$(".saveNote").on("click", function() {
  var thisId = $(this).attr("data-id");
  if (!$("#noteText" + thisId).val()) {
      alert("please enter a note to save")
  }else {
    $.ajax({
          method: "POST",
          url: "/notes/save/" + thisId,
          data: {
            text: $("#noteText" + thisId).val()
          }
        }).then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#noteText" + thisId).val("");
            $(".modalNote").modal("hide");
            window.location = "/articles/saved/"
        });
  }
});

//Handle Delete Note button
$(".deleteNote").on("click", function() {
  var noteId = $(this).attr("data-note-id");
  var articleId = $(this).attr("data-article-id");
  $.ajax({
      method: "DELETE",
      url: "/notes/delete/" + noteId + "/" + articleId
  }).done(function(data) {
      console.log(data)
      $(".modalNote").modal("hide");
      window.location = "/articles/saved/"
  })
});
