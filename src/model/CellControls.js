$(function () {
    'use strict';
    let isMouseDown = false;
    $("td")
        .mousedown(function () {
            if (document.querySelector('#visualize').value.toString() === "not clicked" && !$(this).hasClass("start") && !$(this).hasClass("end")) {
                isMouseDown = true;
                $(this).toggleClass("node-wall");
                return false;
            }
        })
        .mouseover(function () {
            if (isMouseDown && !$(this).hasClass("start") && !$(this).hasClass("end")) {
                $(this).toggleClass("node-wall");
            }
        });

    $(document)
        .mouseup(function () {
            isMouseDown = false;
        });
});

$(function () {
    'use strict';
    let isMouseDown = false;
    $("td")
        .mousedown(function () {
            if ($(this).hasClass("start") && document.querySelector('#visualize').value.toString() === "not clicked") {
                isMouseDown = true;
                return false;
            }
        })
        .mouseover(function () {
            if (isMouseDown && document.querySelector('#visualize').value.toString() === "not clicked" && !$(this).hasClass("end") && !$(this).hasClass("node-wall")) {
                $(".start").removeClass("start");
                $(this).toggleClass("start");
            }
        });

    $(document)
        .mouseup(function () {
            isMouseDown = false;
        });
});

$(function () {
    'use strict';
    let isMouseDown = false;
    $("td")
        .mousedown(function () {
            if ($(this).hasClass("end") && document.querySelector('#visualize').value.toString() === "not clicked") {
                isMouseDown = true;
                return false;
            }
        })
        .mouseover(function () {
            if (isMouseDown && document.querySelector('#visualize').value.toString() === "not clicked" && !$(this).hasClass("start") && !$(this).hasClass("node-wall")) {
                $(".end").removeClass("end");
                $(this).toggleClass("end");
            }
        });

    $(document)
        .mouseup(function () {
            isMouseDown = false;
        });
});