// Table Load Message
$(".tableflame").append("<div id='tableLoading'>Loading...</div>");

// Difficulty Table
$(document).ready(function() {
    $.getJSON($("meta[name=bmstable]").attr("content"), function(header) {
        makeChangelog();
        $.getJSON(header.data_url, function(information) {
            makeBMSTable(information, header.symbol);
            $("#tableLoading").remove();
            $(".tablesorter").tablesorter({
                sortList: [
                    [4, 1],
                    [0, 0]
                ]
            });
        });
    });
});

// Changelog
function makeChangelog() {
    $("#changelog").load("change.txt");
    $("#show_log").click(function() {
        if ($("#changelog").css("display") == "none" && $(this).html() == "VIEW CHANGELOG") {
            $("#changelog").show();
            $(this).html("HIDE CHANGELOG");
        } else {
            $("#changelog").hide();
            $(this).html("VIEW CHANGELOG");
        }
    });
}

// BMS Table
function makeBMSTable(info, mark) {
    var x = "";
    var ev = "";
    var count = 0;
    var obj = $("#table_int");
    // 表のクリア
    obj.html("");
    $("<thead><tr><th width='5%'>Lv <i class='fas fa-arrows-alt-v'></i></th><th width='5%'>Movie</th><th width='20%'>Title <i class='fas fa-arrows-alt-v'></i></th><th width='17%'>Artist <i class='fas fa-arrows-alt-v'></i></th><th width='7%'>Update <i class='fas fa-arrows-alt-v'></i></th><th width='3%'>DL</th><th width='3%'>Score</th><th width='23%'>Comment <i class='fas fa-arrows-alt-v'></i></th></tr></thead><tbody></tbody>").appendTo(obj);
    var obj_sep = null;
    for (var i = 0; i < info.length; i++) {
        if (x != info[i].level) {
            count = 0;
            x = info[i].level;
        }
        // 本文
        var str = $("<tr class='tr_normal'></tr>");
        if (info[i].state == 1) {
            str = $("<tr class='tr_new'></tr>");
        }
        if (info[i].state == 2) {
            str = $("<tr class='tr_update'></tr>");
        }
        // レベル表記
        $("<td width='5%'>" + mark + x + "</td>").appendTo(str);
        // Youtube差分動画
        if (info[i].movie_link != "") {
            $("<td width='3%'><a href='" + info[i].movie_link + "' class='icon brands fa-2x fa-youtube' target='_blank'></a></td>").appendTo(str);
        } else {
            $("<td width='3%'><a href='javascript:void(0)' class='icon brands fa-2x fa-youtube'></td>").appendTo(str);
        }
        // タイトル
        $("<td width='20%'>" + "<a href='http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" + info[i].md5 + "' target='_blank'>" + info[i].title + "</a></td>").appendTo(str);
        // アーティスト
        var astr = "";
        if (info[i].url != "入手困難") {
            if (info[i].artist != "") {
                astr = "<a href='" + info[i].url + "'>" + info[i].artist + "</a>";
            } else {
                astr = "<a href='" + info[i].url + "'>" + info[i].url + "</a>";
            }
        } else {
            if (info[i].artist != "") {
                astr = info[i].artist + " (入手困難)";
            }
        }
        $("<td width='17%'>" + astr + "</td>").appendTo(str);
        // Added Date
        if (info[i].date != "undefined") {
            var addedDate = new Date(info[i].date);
            var year = addedDate.getFullYear();
            var month = addedDate.getMonth() + 1;
            var day = addedDate.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            $("<td width='7%'>" + year + "." + "" + month + "." + "" + day + "</td>").appendTo(str);
        } else {
            $("<td width='7%'>Undefined</td>").appendTo(str);
        }
        // 差分
        if (info[i].url_diff != "") {
            if (info[i].name_diff != "") {
                $("<td width='3%'><a href='" + info[i].url_diff + "' target='_blank'>" + info[i].name_diff + "</a></td>").appendTo(str);
            } else {
                $("<td width='3%'><a href='" + info[i].url_diff + "' class='fas fa-lg fa-arrow-down'></a></td>").appendTo(str);
            }
        } else {
            if (info[i].name_diff != "") {
                $("<td width='3%'>'" + info[i].name_diff + "'</td>").appendTo(str);
            } else {
                $("<td width='3%'>同梱</td>").appendTo(str);
            }
        }
        // Score
        $("<td width='3%'><a href='http://www.ribbit.xyz/bms/score/view?md5=" + info[i].md5 + "' class='fas fa-lg fa-music' target='_blank'></a></td>").appendTo(str);

        // コメント
        $("<td width='23%'>" + info[i].comment + "</td>").appendTo(str);
        str.appendTo(obj);
        count++;

    }
}