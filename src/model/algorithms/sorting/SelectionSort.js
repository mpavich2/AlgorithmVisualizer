import SortingAlgorithm from "./SortingAlgorithm.js";

/**
 * The SelectionSort sorting algorithm.
 */
export default class SelectionSort extends SortingAlgorithm {

    /**
     * The default constructor for SelectionSort. Creates an instance of SelectionSort.
     */
    constructor() {
        super();
    }

    /**
     * Sorts all of the elements by using the SelectionSort sorting algorithm.
     *
     * @param delay - the specified delay time
     * @returns {Promise<void>} - the promise to await
     */
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

    /**
     * Place the second element before the first element
     *
     * @param el1 - the first element
     * @param el2 - the second element
     * @returns {Promise} - the promise to await
     */
    async placeBefore(el1, el2) {
        'use strict';
        return super.placeBefore(el1, el2);
    }

    /**
     * Pauses the algorithm for the specified delay time in order to visualize the algorithm better.
     *
     * @param delay - the specified delay time
     * @returns {Promise<void>} - the promise to await
     */
    async pause(delay) {
        await super.pause(delay);
    }

    /**
     * Sets the description of the algorithm to the selection sort algorithm description.
     */
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

    /**
     * Sets the name of the algorithm to the selection sort algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Selection Sort";
    }

    /**
     * Sets the worst time of the algorithm to the selection sort algorithm worst time.
     */
    setWorstTime() {
        let exponent = "2";
        document.getElementById("#worstTime").innerHTML = "Worst-case time complexity\tO(n" + exponent.sup() + ")";
    }

    /**
     * Sets the worst time of the algorithm to the selection sort algorithm average time.
     */
    setAverageTime() {
        let exponent = "2";
        document.getElementById("#averageTime").innerHTML = "Average time complexity\t\tO(n" + exponent.sup() + ")";
    }

    /**
     * Sets the worst time of the algorithm to the selection sort algorithm best time.
     */
    setBestTime() {
        let exponent = "2";
        document.getElementById("#bestTime").innerHTML = "Best-case time complexity\tO(n" + exponent.sup() + ")";
    }

    /**
     * Sets the worst time of the algorithm to the selection sort algorithm worst space.
     */
    setWorstSpace() {
        document.getElementById("#worstSpace").innerHTML = "Worst-case space complexity\tO(1)";
    }
}
