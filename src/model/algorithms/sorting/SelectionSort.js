import SortingAlgorithm from "./SortingAlgorithm.js";

export default class SelectionSort extends SortingAlgorithm {
    constructor() {
        super();
    }

    async sort(delay) {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        for (let i = 0; i < blocks.length - 1; i += 1) {
            let minIndex = i;
            for (let j = i + 1; j < blocks.length ; j += 1) {
                blocks[minIndex].style.backgroundColor = "#fdffb6";
                blocks[j].style.backgroundColor = "#fdffb6";
                await this.pause(delay);
                if (Number(blocks[minIndex].clientHeight) > Number(blocks[j].clientHeight)) {
                    blocks[minIndex].style.backgroundColor = "#FF4949";
                    blocks[j].style.backgroundColor = "#FF4949";
                    await this.pause(delay);
                    blocks[minIndex].style.backgroundColor = "#ece8e1";
                    blocks[j].style.backgroundColor = "#ece8e1";
                    minIndex = j;
                }
                blocks[minIndex].style.backgroundColor = "#ece8e1";
                blocks[j].style.backgroundColor = "#ece8e1";
                }
                if (minIndex !== i) {
                    await this.placeBefore(blocks[i], blocks[minIndex]);
                    blocks = document.querySelectorAll(".bar");
                }
                blocks[i].style.backgroundColor = "#caffbf";
            }
            blocks[blocks.length - 1].style.backgroundColor = "#caffbf";
        }

    async placeBefore(el1, el2) {
        'use strict';
        return super.placeBefore(el1, el2);
    }

    async pause(delay) {
        await super.pause(delay);
    }

    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Selection Sort is an in-place comparison sorting algorithm that divides the " +
            "input list into two parts: the sublist of items already sorted, which is built up " +
            "from left to right at the front (left) of the list, and the sublist of items remaining " +
            "to be sorted that occupy the rest of the list. Initially, the sorted sublist is empty " +
            "and the unsorted sublist is the entire input list. The algorithm proceeds by " +
            "finding the smallest element in the unsorted sublist, exchanging (swapping) it " +
            "with the leftmost unsorted element (putting it in sorted order), and moving the " +
            "sublist boundaries one element to the right.";
    }

    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Selection Sort";
    }

    setWorstTime() {
        let exponent = "2";
        document.getElementById("#worstTime").innerHTML = "Worst-case time complexity\tO(n" + exponent.sup() + ")";
    }

    setAverageTime() {
        let exponent = "2";
        document.getElementById("#averageTime").innerHTML = "Average time complexity\t\tO(n" + exponent.sup() + ")";
    }

    setBestTime() {
        let exponent = "2";
        document.getElementById("#bestTime").innerHTML = "Best-case time complexity\tO(n" + exponent.sup() + ")";
    }

    setWorstSpace() {
        document.getElementById("#worstSpace").innerHTML = "Worst-case space complexity\tO(1)";
    }
}
