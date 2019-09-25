

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


$(".add-note").on("click", function () {

  var thisId = $(this).attr("data-id")
  // if (!$("#noteText" + thisId).val()) {
  //   alert("please enter a note to save")
  // } else {
    $.ajax({
      method: "GET",
      url: "/api/articles/note/" + thisId,
    }).then(function (data) {
      // console.log(data);
      window.location.href = "/articles/note/" + thisId
    })
  // }
});

// When you click the savenote button
// $(".saveNote").on("click", function() {
//   var thisId = $(this).attr("data-id");
//   if (!$("#noteText" + thisId).val()) {
//       alert("please enter a note to save")
//   }else {
//     $.ajax({
//           method: "POST",
//           url: "/api/notes/save/" + thisId,
//           data: {
//             text: $("#noteText" + thisId).val()
//           }
//         }).done(function(data) {
//             // Log the response
//             console.log(data);
//             // Empty the notes section
//             $("#noteText" + thisId).val("");
//             $(".modalNote").modal("hide");
//             window.location = "/articles/saved"
//         });
//   }
// });