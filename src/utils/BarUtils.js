export default class BarUtils {
    displayBarNumbers() {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        let num = Number(document.querySelector('#size').value)
        if (num < 25) {
            for (let i = 0; i <= blocks.length - 1; i++) {
                while (blocks[i].lastElementChild) {
                    blocks[i].removeChild(blocks[i].lastElementChild);
                }
                let blockLabel = document.createElement("label");
                blockLabel.classList.add("block__id");
                blockLabel.innerHTML = parseInt(blocks[i].style.height,10).toString();
                blocks[i].appendChild(blockLabel);
            }
        } else {
            for (let i = 0; i <= blocks.length - 1; i++) {
                while (blocks[i].lastElementChild) {
                    blocks[i].removeChild(blocks[i].lastElementChild);
                }
            }
        }
    }

    getBarHeight(bar) {
        'use strict';
        return parseInt(bar.style.height,10);
    }

    makeAllBarsGreen() {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        for (let i = 0; i <= blocks.length - 1; i++) {
            blocks[i].style.backgroundColor = "#caffbf";
        }
    }

    makeAllNonSortedBarsBlue() {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        for (let i = 0; i <= blocks.length - 1; i++) {
            if (blocks[i].style.backgroundColor !== "rgb(202, 255, 191)") {
                blocks[i].style.backgroundColor = "#9bf6ff";
            }
        }
    }

    resetAllBarsNotSorted() {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        for (let i = 0; i <= blocks.length - 1; i++) {
            if (blocks[i].style.backgroundColor !== "rgb(202, 255, 191)") {
                blocks[i].style.backgroundColor = "#ece8e1";
            }
        }
    }

    hexToRgb(hex) {
        'use strict';
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}