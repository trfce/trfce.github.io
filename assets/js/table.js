// Difficulty Table
$(function () {
  // Table Load Message
  $("#table_int, #video_int").before(
    "<p class='table_load_message'>Loading...</p>"
  );
  // Make Table
  $.getJSON($("meta[name=bmstable]").attr("content"), function (header) {
    makeChangelog();
    $.getJSON(header.data_url, function (information) {
      makeBMSTable(information, header.symbol);
      makeAUTOPLAY(information);
      $(".table_load_message").hide();
      $(".tablesorter").tablesorter({
        sortList: [
          [4, 1],
          [0, 0],
        ],
      });
    });
  });
});

// Changelog
function makeChangelog() {
  var $changelog = $("#changelog");
  var $show_log = $("#show_log");
  $changelog.load("change.txt");
  $show_log.click(function () {
    if (
      $changelog.css("display") == "none" &&
      $show_log.html() == "VIEW CHANGELOG"
    ) {
      $changelog.show();
      $show_log.html("HIDE CHANGELOG");
    } else {
      $changelog.hide();
      $show_log.html("VIEW CHANGELOG");
    }
  });
}

// BMS Table
function makeBMSTable(info, mark) {
  var obj = $("#table_int");
  // Table Clear
  obj.html("");
  $(
    "<thead>" +
      "<tr>" +
      "<th style='width:5%'>" +
      "Lv <i class='fas fa-arrows-alt-v'></i>" +
      "</th>" +
      "<th style='width:5%'>" +
      "Movie" +
      "</th>" +
      "<th style='width:20%'>" +
      "Title <i class='fas fa-arrows-alt-v'></i>" +
      "</th>" +
      "<th style='width:17%'>" +
      "Artist <i class='fas fa-arrows-alt-v'></i>" +
      "</th>" +
      "<th style='width:7%'>" +
      "Update <i class='fas fa-arrows-alt-v'></i>" +
      "</th>" +
      "<th style='width:3%'>" +
      "DL" +
      "</th>" +
      "<th width='3%'>" +
      "Score" +
      "</th>" +
      "<th width='23%'>" +
      "Comment <i class='fas fa-arrows-alt-v'></i>" +
      "</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody></tbody>"
  ).appendTo(obj);
  info.forEach((i) => {
    // Main
    var str = $("<tr class='tr_normal'></tr>");
    if (i.state == 1) {
      str = $("<tr class='tr_new'></tr>");
    }
    if (i.state == 2) {
      str = $("<tr class='tr_update'></tr>");
    }
    // Level
    $("<td>" + mark + i.level + "</td>").appendTo(str);
    // YouTube
    if (i.movie_link) {
      $(
        "<td>" +
          "<a href='https://www.youtube.com/watch?v=" +
          i.movie_link.slice(-11) +
          "' class='icon brands fa-2x fa-youtube' target='_blank'></a>" +
          "</td>"
      ).appendTo(str);
    } else {
      $(
        "<td>" +
          "<a href='javascript:void(0)' class='icon brands fa-2x fa-youtube'></a>" +
          "</td>"
      ).appendTo(str);
    }
    // Title
    $(
      "<td>" +
        "<a href='http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" +
        i.md5 +
        "' target='_blank'>" +
        i.title +
        "</a>" +
        "</td>"
    ).appendTo(str);
    // Artist
    var artistStr = "";
    if (i.url != "入手困難") {
      if (i.artist) {
        artistStr = "<a href='" + i.url + "'>" + i.artist + "</a>";
      } else {
        artistStr = "<a href='" + i.url + "'>" + i.url + "</a>";
      }
    } else {
      if (i.artist) {
        artistStr = i.artist + " (入手困難)";
      }
    }
    $("<td>" + artistStr + "</td>").appendTo(str);
    // Date
    if (i.date != "undefined") {
      var addDate = new Date(i.date);
      var dateStr =
        addDate.getFullYear() +
        "." +
        ("0" + (addDate.getMonth() + 1)).slice(-2) +
        "." +
        ("0" + addDate.getDate()).slice(-2);
      $("<td>" + dateStr + "</td>").appendTo(str);
    } else {
      $("<td>Undefined</td>").appendTo(str);
    }
    // Chart
    if (i.url_diff) {
      if (i.name_diff) {
        $(
          "<td>" +
            "<a href='" +
            i.url_diff +
            "' target='_blank'>" +
            i.name_diff +
            "</a>" +
            "</td>"
        ).appendTo(str);
      } else {
        $(
          "<td>" +
            "<a href='" +
            i.url_diff +
            "' class='fas fa-lg fa-arrow-down'></a>" +
            "</td>"
        ).appendTo(str);
      }
    } else {
      if (i.name_diff) {
        $("<td>'" + i.name_diff + "'</td>").appendTo(str);
      } else {
        $("<td>同梱</td>").appendTo(str);
      }
    }
    // Score
    $(
      "<td>" +
        "<a href='http://www.ribbit.xyz/bms/score/view?md5=" +
        i.md5 +
        "' class='fas fa-lg fa-music' target='_blank'></a>" +
        "</td>"
    ).appendTo(str);

    // Comment
    $("<td>" + i.comment + "</td>").appendTo(str);
    str.appendTo(obj);
  });
}

// AUTOPLAY List
function makeAUTOPLAY(info) {
  var videoObj = $("#video_int");
  videoObj.html("");
  info
    .filter(function (song) {
      return !!song.date && !!song.movie_link;
    })
    .sort(function (a, b) {
      var aDate = new Date(a.date);
      var bDate = new Date(b.date);
      return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
    })
    .slice(0, 6)
    .map(function (i) {
      var str = $("<section></section>");
      if (i.title) {
        $(
          "<span class='icon solid major brands fa-youtube'></span>" +
            "<h3>" +
            i.title +
            "</h3>"
        ).appendTo(str);
      } else {
        $("<h3>Nothing</h3>").appendTo(str);
      }
      if (i.movie_link) {
        $(
          "<p class='video_wrap'>" +
            "<iframe src='https://www.youtube.com/embed/" +
            i.movie_link.slice(-11) +
            "' srcdoc='" +
            "<style>" +
            "* {" +
            "padding: 0;" +
            "margin: 0;" +
            "overflow: hidden" +
            "}" +
            "html,body {" +
            "height: 100%" +
            "}" +
            "img,span {" +
            "position: absolute;" +
            "width: 100%;" +
            "top: 0;" +
            "bottom: 0;" +
            "margin: auto" +
            "}" +
            "span {" +
            "height: 1.5em;" +
            "text-align: center;" +
            "font: 48px/1.5 sans-serif;" +
            "color: white;" +
            "text-shadow: 0 0 0.5em black" +
            "}" +
            "</style>" +
            "<a href=https://www.youtube.com/embed/" +
            i.movie_link.slice(-11) +
            "?autoplay=1>" +
            "<img src=https://img.youtube.com/vi/" +
            i.movie_link.slice(-11) +
            "/hqdefault.jpg>" +
            "<span>▶</span>" +
            "</a>" +
            "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>" +
            "</iframe>" +
            "</p>"
        ).appendTo(str);
      } else {
        $("<p>Nothing</p>").appendTo(str);
      }
      str.appendTo(videoObj);
    });
}
