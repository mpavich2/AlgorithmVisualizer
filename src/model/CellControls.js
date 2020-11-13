$(function () {
    'use strict';
    let isMouseDown = false;
    $("td")
        .mousedown(function () {
            if (document.querySelector('#visualize').value.toString() === "not clicked" && !$(this).hasClass("start") && !$(this).hasClass("end")) {
                isMouseDown = true;
                $(this).toggleClass("highlight");
                return false;
            }
        })
        .mouseover(function () {
            if (isMouseDown && !$(this).hasClass("start") && !$(this).hasClass("end")) {
                $(this).toggleClass("highlight");
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
            if ($(this).hasClass("start")) {
                isMouseDown = true;
                return false;
            }
        })
        .mouseover(function () {
            if (isMouseDown) {
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
            if ($(this).hasClass("end")) {
                isMouseDown = true;
                return false;
            }
        })
        .mouseover(function () {
            if (isMouseDown) {
                $(".end").removeClass("end");
                $(this).toggleClass("end");
            }
        });

    $(document)
        .mouseup(function () {
            isMouseDown = false;
        });
});