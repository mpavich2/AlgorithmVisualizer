import BubbleSort from "./algorithms/sorting/BubbleSort.js";
import SelectionSort from "./algorithms/sorting/SelectionSort.js";
import InsertionSort from "./algorithms/sorting/InsertionSort.js";
import QuickSort from "./algorithms/sorting/QuickSort.js";

function randomNumber(min, max) {
    'use strict';
    return Math.random() * (max - min) + min;
}

function randomizeHeights() {
    'use strict';
    let blocks = document.querySelectorAll(".bar");
    for (let i = 0; i <= blocks.length - 1; i++) {
        let height = Math.trunc(randomNumber(1, 350));
        blocks[i].style.height = `${height}px`;
        blocks[i].style.backgroundColor = "#cfdbd5";
        while (blocks[i].lastElementChild) {
            blocks[i].removeChild(blocks[i].lastElementChild);
        }
        let blockLabel = document.createElement("label");
        blockLabel.classList.add("block__id");
        blockLabel.innerHTML = height.toString();
        blocks[i].appendChild(blockLabel);
    }
}

async function getSortingAlgorithm(algorithmName, speed) {
    'use strict';
    let algorithm;
    if (algorithmName === "BubbleSort") {
        algorithm = new BubbleSort();
        await algorithm.sort(speed);
    } else if (algorithmName === "SelectionSort") {
        algorithm = new SelectionSort();
        await algorithm.sort(speed);
    } else if (algorithmName === "InsertionSort") {
        algorithm = new InsertionSort();
        await algorithm.sort(speed);
    } else if (algorithmName === "QuickSort") {
        algorithm = new QuickSort();
        await algorithm.sort(speed);
    }
}

async function sort(speed) {
    'use strict';
    await getSortingAlgorithm(document.querySelector('#algorithms').value, speed);
}

function randomize_button_handler() {
    'use strict';
    randomizeHeights();
}

function visualize_button_handler() {
    'use strict';
    document.querySelector('#visualize').value = "clicked";
    disableAllButtons();
    sort(400);
    enableAllButtons();
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
}

async function main() {
    'use strict';
    bindButtons();
    randomize_button_handler();
}

async function init() {
    'use strict';
    await main();
}

window.addEventListener("load", init);