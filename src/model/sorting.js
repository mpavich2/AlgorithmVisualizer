import BubbleSort from "./algorithms/sorting/BubbleSort.js";
import SelectionSort from "./algorithms/sorting/SelectionSort.js";
import InsertionSort from "./algorithms/sorting/InsertionSort.js";
import QuickSort from "./algorithms/sorting/QuickSort.js";

let algorithm = new BubbleSort();
let sorted = false;

/**
 * Generate a random number between two given numbers.
 *
 * @param min - the minimum number
 * @param max - the maximum number
 * @returns random number between two given numbers.
 */
function randomNumber(min, max) {
    'use strict';
    return Math.random() * (max - min) + min;
}

/**
 * Randomizes the heights of the bars.
 */
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

/**
 * Initializes the correct sorting algorithm based on the algorithm name.
 */
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

/**
 * Sorts the bars using the selected algorithms sorting method.
 *
 * @param delay - the amount of time to delay the algorithm
 * @returns {Promise<void>}
 */
async function sort(delay) {
    'use strict';
    getSortingAlgorithm();
    disableAllButtons();
    await algorithm.sort(delay);
    sorted = true;
    document.querySelector('#randomize').disabled = false;
}

/**
 * Removes all the bars in the chart.
 */
function removeAllBars() {
    let blocks = document.querySelectorAll(".barChart");
    for (let i = 0; i <= blocks.length - 1; i++) {
        while (blocks[i].lastElementChild) {
            blocks[i].removeChild(blocks[i].lastElementChild);
        }
    }
}

/**
 * Generates new bars with random heights and adds it to the bar chart.
 */
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

/**
 * Randomizes the bars heights and enables all the buttons.
 */
function randomize_button_handler() {
    'use strict';
    randomizeHeights();
    enableAllButtons();
}

/**
 * Sorts the bars in the bar charts.
 *
 * @returns {Promise<void>}
 */
async function visualize_button_handler() {
    'use strict';
    document.querySelector('#visualize').value = "clicked";
    await sort(Number(document.querySelector('#speed').value));
}

/**
 * Disables all the buttons.
 */
function disableAllButtons() {
    'use strict';
    document.querySelector('#randomize').disabled = true;
    document.querySelector('#visualize').disabled = true;
}

/**
 * Enables all the buttons
 */
function enableAllButtons() {
    'use strict';
    document.querySelector('#randomize').disabled = false;
    document.querySelector('#visualize').disabled = false;
}

/**
 * Binds all the buttons event listeners.
 */
function bindButtons() {
    'use strict';
    document.querySelector('#visualize').addEventListener('click', visualize_button_handler);
    document.querySelector('#randomize').addEventListener('click', randomize_button_handler);
    document.querySelector('#size').addEventListener('change', generateBlocks);
    document.querySelector('#algorithms').addEventListener('change', getSortingAlgorithm)
}

/**
 * The main entry point of the sorting page. Binds all the buttons, sets up all the bars in the bar chart,
 * and sets up the sorting algorithm to the default one.
 *
 * @returns {Promise<void>} - the promise to await
 */
async function main() {
    'use strict';
    bindButtons();
    randomize_button_handler();
    generateBlocks();
    getSortingAlgorithm();
}

/**
 * Initializes the sorting page on load by calling the main method.
 *
 * @returns {Promise<void>} - the promise to await
 */
async function init() {
    'use strict';
    await main();
}

window.addEventListener("load", init);