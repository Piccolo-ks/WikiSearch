$("#searchForm").submit(function(event) {
  var searchTerm = $("#searchTerm").val();
  event.preventDefault();
  $.ajax({
    url: `https://sq.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchTerm}&limit=20&callback=?`,
    method: "GET",
    dataType: "jsonp",
    success: function(data) {
      $("#output").html(""); // clears out contents from earlier searches
      $("#output").append("<h5>Shkruani per te kerkuar:</h5>")
      for (var i = 0; i < data[1].length; i++) {
        $("#output").append(`<a href='${data[3][i]}' target='_blank'><div class='card horizontal hoverable'><div class='row'><div id='image${i}' class='card-image col s3 valign-wrapper'></div><div class='card-stacked col s9'><div class='card-content'><span class='card-title truncate'>${data[1][i]}</span><p>${data[2][i]}&nbsp;</p></div></div></div></div></a>`);
      }
      $.ajax({
        url: `https://sq.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=20`,
        method: "GET",
        dataType: "jsonp",
        success: function(newData) {
          for (var i = 0; i < 20; i++) {
            if (newData.query.pages[i].hasOwnProperty("thumbnail") === true) {
              $("#image" + (newData.query.pages[i].index - 1)).html(`<img src='${newData.query.pages[i].thumbnail.source}' class='responsive-img valign'>`);
            } else {
              $("#image" + (newData.query.pages[i].index - 1)).html("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Article_icon_cropped.svg/512px-Article_icon_cropped.svg.png' class='responsive-img valign articleIcon'>");
            }
          }
        },
        error: function() {
          console.log("second call unsuccessful");
        }
      })
    },
    error: function() {
      alert("Error, please try again");
    }
  });
});

$("#clear").click(function() {
  $("#searchTerm").val("").focus();
  $("#output").html("");
});