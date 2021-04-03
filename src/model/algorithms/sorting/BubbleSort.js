import SortingAlgorithm from "./SortingAlgorithm.js";

/**
 * The bubble sort sorting algorithm.
 */
export default class BubbleSort extends SortingAlgorithm {
    /**
     * The default constructor for bubble sort. Creates an instance of bubble sort.
     */
    constructor() {
        super();
    }

    /**
     * Sorts all of the elements by using the bubble sort sorting algorithm.
     *
     * @param delay - the specified delay time
     * @returns {Promise<void>} - the promise to await
     */
    async sort(delay) {
        'use strict';
        if (delay && typeof delay !== "number") {
            alert("sort: First argument must be a typeof Number");
            return;
        }
        let blocks = document.querySelectorAll(".bar");
        for (let i = 0; i < blocks.length - 1; i += 1) {
            for (let j = 0; j < blocks.length - i - 1; j += 1) {
                blocks[j].style.backgroundColor = "#fdffb6";
                blocks[j + 1].style.backgroundColor = "#fdffb6";
                await this.pause(delay);
                const value1 = Number(blocks[j].clientHeight);
                const value2 = Number(blocks[j + 1].clientHeight);
                if (value1 > value2) {
                    blocks[j].style.backgroundColor = "#FF4949";
                    blocks[j + 1].style.backgroundColor = "#FF4949";

                    await this.pause(delay);
                    await this.placeBefore(blocks[j], blocks[j + 1]);
                    blocks = document.querySelectorAll(".bar");
                }
                blocks[j].style.backgroundColor = "#ece8e1";
                blocks[j + 1].style.backgroundColor = "#ece8e1";
            }
            blocks[blocks.length - i - 1].style.backgroundColor = "#caffbf";
        }
        blocks[0].style.backgroundColor = "#caffbf";
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
        return await super.placeBefore(el1, el2);
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
     * Sets the description of the algorithm to the bubble sort algorithm description.
     */
    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, " +
            "compares adjacent elements and swaps them if they are in the wrong order.The " +
            "pass through the list is repeated until the list is sorted. The algorithm, which is a " +
            "comparison sort, is named for the way smaller or larger elements \"bubble\" to " +
            "the top of the list. Although the algorithm is simple, it is too slow and " +
            "impractical for most problems";
    }

    /**
     * Sets the name of the algorithm to the bubble sort algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Bubble Sort";
    }

    /**
     * Sets the worst time of the algorithm to the bubble sort algorithm worst time.
     */
    setWorstTime() {
        let exponent = "2";
        document.getElementById("#worstTime").innerHTML = "Worst-case time complexity\tO(n" + exponent.sup() + ")";
    }

    /**
     * Sets the worst time of the algorithm to the bubble sort algorithm average time.
     */
    setAverageTime() {
        let exponent = "2";
        document.getElementById("#averageTime").innerHTML = "Average time complexity\t\tO(n" + exponent.sup() + ")";
    }

    /**
     * Sets the worst time of the algorithm to the bubble sort algorithm best time.
     */
    setBestTime() {
        document.getElementById("#bestTime").innerHTML = "Best-case time complexity\tO(n)";
    }

    /**
     * Sets the worst time of the algorithm to the bubble sort algorithm worst space.
     */
    setWorstSpace() {
        document.getElementById("#worstSpace").innerHTML = "Worst-case space complexity\tO(1)";
    }
}