import BubbleSort from "./algorithms/sorting/BubbleSort.js";
import SelectionSort from "./algorithms/sorting/SelectionSort.js";
import InsertionSort from "./algorithms/sorting/InsertionSort.js";
import QuickSort from "./algorithms/sorting/QuickSort.js";

let algorithm = new BubbleSort();
let sorted = false;

function randomNumber(min, max) {
    'use strict';
    return Math.random() * (max - min) + min;
}

function randomizeHeights() {
    'use strict';
    sorted = false;
    let blocks = document.querySelectorAll(".bar");
    let num = Number(document.querySelector('#size').value)
    if (num < 25) {
        for (let i = 0; i <= blocks.length - 1; i++) {
            let height = Math.trunc(randomNumber(1, 350));
            blocks[i].style.height = `${height}px`;
            blocks[i].style.backgroundColor = "#ece8e1";
            while (blocks[i].lastElementChild) {
                blocks[i].removeChild(blocks[i].lastElementChild);
            }
            let blockLabel = document.createElement("label");
            blockLabel.classList.add("block__id");
            blockLabel.innerHTML = height.toString();
            blocks[i].appendChild(blockLabel);
        }
    } else {
        for (let i = 0; i <= blocks.length - 1; i++) {
            let height = Math.trunc(randomNumber(1, 350));
            blocks[i].style.height = `${height}px`;
            blocks[i].style.backgroundColor = "#ece8e1";
        }
    }
}

function getSortingAlgorithm() {
    'use strict';
    if (sorted) {
        randomizeHeights();
    }
    let algorithmName = document.querySelector('#algorithms').value
    if (algorithmName === "BubbleSort") {
        algorithm = new BubbleSort();
    } else if (algorithmName === "SelectionSort") {
        algorithm = new SelectionSort();
    } else if (algorithmName === "InsertionSort") {
        algorithm = new InsertionSort();
    } else if (algorithmName === "QuickSort") {
        algorithm = new QuickSort();
    }
    document.querySelector('#visualize').disabled = false;
}

async function sort(speed) {
    'use strict';
    getSortingAlgorithm();
    disableAllButtons();
    await algorithm.sort(speed);
    sorted = true;
    document.querySelector('#randomize').disabled = false;
}

function removeAllBars() {
    let blocks = document.querySelectorAll(".barChart");
    for (let i = 0; i <= blocks.length - 1; i++) {
        while (blocks[i].lastElementChild) {
            blocks[i].removeChild(blocks[i].lastElementChild);
        }
    }
}

function generateBlocks() {
    removeAllBars();
    let barChart = document.querySelector(".barChart");
    let num = Number(document.querySelector('#size').value)
    let width = (98 / num) - .1;
    for (let i = 0; i < num; i += 1) {
        const block = document.createElement("div");
        block.classList.add("bar");
        block.style.height = `150px`;
        block.style.width = `${width}%`;
        block.style.backgroundColor = "#ece8e1";
        barChart.appendChild(block);
    }
    randomizeHeights();
}

function randomize_button_handler() {
    'use strict';
    randomizeHeights();
    enableAllButtons();
}

async function visualize_button_handler() {
    'use strict';
    document.querySelector('#visualize').value = "clicked";
    await sort(Number(document.querySelector('#speed').value));
}

function disableAllButtons() {
    'use strict';
    document.querySelector('#randomize').disabled = true;
    document.querySelector('#visualize').disabled = true;
}

function enableAllButtons() {
    'use strict';
    document.querySelector('#randomize').disabled = false;
    document.querySelector('#visualize').disabled = false;
}

function bindButtons() {
    'use strict';
    document.querySelector('#visualize').addEventListener('click', visualize_button_handler);
    document.querySelector('#randomize').addEventListener('click', randomize_button_handler);
    document.querySelector('#size').addEventListener('change', generateBlocks);
    document.querySelector('#algorithms').addEventListener('change', getSortingAlgorithm)
}

async function main() {
    'use strict';
    bindButtons();
    randomize_button_handler();
    generateBlocks();
    getSortingAlgorithm();
}

async function init() {
    'use strict';
    await main();
}

window.addEventListener("load", init);