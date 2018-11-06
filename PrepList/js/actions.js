let host = "http://localhost:3000"


$("#getPrepList").click(function() {
  $("#displayItems").html("");
  $.ajax({
    url: host + "/prepMain",
    success: function(result) {

      console.log(result)

      var firstRun = true;
      for (i = 0; i < result.length; i++) {
        if (firstRun) {
          firstRun = false;
        }

        let html = "<tr class='tableRow' data-userid = '" + result[i].dishID + "''>"
        html += "<td class='findToDos' data-currentDish='" + result[i].dishID + "'>" + result[i].dishName + "</td>";
        html += "</tr>"
        html += "<tr class='subRow' id=subRow" + result[i].dishID + "></tr>"
        $("#displayItems").append(html);
      }
    }
  });
});



$("#displayItems").on("click", ".findToDos", function() {

  let currentDish = $(this).data("currentdish");

  console.log("Getting prep for: " + currentDish);

  $("#subRow" + currentDish).html("");

  $.ajax({
    url: host + "/prepSub",
    success: function(result) {
      console.log(result)
      var firstRun = true;
      for (i = 0; i < result.length; i++) {
        if (firstRun) {
          $("#subRow" + result[i].dishID).append();
          firstRun = false;
        }
        if (currentDish === result[i].dishID) {
          let html = "<tr class='subRow'>"
          html += "<td>" + result[i].subItem + "</td>";
          html += "<td>" + result[i].completed + "</td>";
          html += "<td>" + result[i].notes + "</td>";
          html += "</tr>"
          $("#subRow" + result[i].dishID).append(html);
        }
      }
    }
  });
});
