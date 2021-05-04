import SortingAlgorithm from "./SortingAlgorithm.js";
import BarUtils from "../../../utils/BarUtils.js";

/**
 * The insertion sort sorting algorithm.
 */
export default class InsertionSort extends  SortingAlgorithm {
    #barUtils;

    /**
     * The default constructor for insertion sort. Creates an instance of insertion sort.
     */
    constructor() {
        super();
        this.#barUtils = new BarUtils();
    }

    /**
     * Sorts all of the elements by using the insertion sort sorting algorithm.
     *
     * @param delay - the specified delay time
     * @returns {Promise<void>} - the promise to await
     */
    async sort(delay) {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        for (let i = 1; i < blocks.length ; i++) {
            let value = this.#barUtils.getBarHeight(blocks[i]);
            let hole = i;
            this.setBarsToCompareColor([blocks[hole]]);
            await this.pause(delay);
            while (hole > 0 && this.#barUtils.getBarHeight(blocks[hole - 1]) > value) {
                this.setBarsToCompareColor([blocks[hole]]);
                this.setBarsToSwapColor([blocks[hole - 1]]);
                await this.pause(delay);
                blocks[hole].style.height = blocks[hole - 1].style.height;
                blocks = document.querySelectorAll(".bar");
                this.setBarsToSwapColor([blocks[hole]]);
                await this.pause(delay);
                this.#barUtils.displayBarNumbers();
                this.setBarsToDefaultColor([blocks[hole], blocks[hole - 1]]);
                hole -= 1;
            }
            if (this.#barUtils.getBarHeight(blocks[hole]) !== value) {
                this.setBarsToOverwriteFromMemoryColor([blocks[hole]]);
                await this.pause(delay);
                blocks[hole].style.height = `${value}px`;
                blocks = document.querySelectorAll(".bar");
                this.#barUtils.displayBarNumbers();
                this.setBarsToDefaultColor([blocks[hole]]);
            }
        }
        this.#barUtils.makeAllBarsGreen();
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
        'use strict';
        await super.pause(delay);
    }

    /**
     * Sets all the background colors of the bars array to the default color.
     *
     * @param bars - the array of bars
     */
    setBarsToDefaultColor(bars) {
        'use strict';
        super.setBarsToDefaultColor(bars);
    }

    /**
     * Sets all the background colors of the bars array to the swap color.
     *
     * @param bars - the array of bars
     */
    setBarsToSwapColor(bars) {
        'use strict';
        super.setBarsToSwapColor(bars);
    }

    /**
     * Sets all the background colors of the bars array to the compare color.
     *
     * @param bars - the array of bars
     */
    setBarsToCompareColor(bars) {
        'use strict';
        super.setBarsToCompareColor(bars);
    }

    /**
     * Sets all the background colors of the bars array to the sorted color.
     *
     * @param bars - the array of bars
     */
    setBarsToSortedColor(bars) {
        'use strict';
        super.setBarsToSortedColor(bars);
    }

    /**
     * Sets all the background colors of the bars array to the overwriteFromMemory color.
     *
     * @param bars - the array of bars
     */
    setBarsToOverwriteFromMemoryColor(bars) {
        'use strict';
        super.setBarsToOverwriteFromMemoryColor(bars);
    }

    /**
     * Sets the description of the algorithm to the insertion sort algorithm description.
     */
    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Insertion Sort is a simple sorting algorithm that iterates through an array and at " +
            "each iteration it removes one element from the array, finds the location it " +
            "belongs to in the sorted list and inserts it there, repeating until no elements " +
            "remain in the unsorted list. It is an in-place, stable sorting algorithm that is " +
            "inefficient on large input arrays but works well for data sets that are almost " +
            "sorted. It is more efficient in practice compared to other quadratic sorting " +
            "algorithms like bubble sort and selection sort.";
    }

    /**
     * Sets the name of the algorithm to the insertion sort algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Insertion Sort";
    }

    /**
     * Sets the worst time of the algorithm to the insertion sort algorithm worst time.
     */
    setWorstTime() {
        let exponent = "2";
        document.getElementById("#worstTime").innerHTML = "Worst-case time complexity\tO(n" + exponent.sup() + ")";
    }

    /**
     * Sets the worst time of the algorithm to the insertion sort algorithm average time.
     */
    setAverageTime() {
        let exponent = "2";
        document.getElementById("#averageTime").innerHTML = "Average time complexity\t\tO(n" + exponent.sup() + ")";
    }

    /**
     * Sets the worst time of the algorithm to the insertion sort algorithm best time.
     */
    setBestTime() {
        document.getElementById("#bestTime").innerHTML = "Best-case time complexity\tO(n)";
    }

    /**
     * Sets the worst time of the algorithm to the insertion sort algorithm worst space.
     */
    setWorstSpace() {
        document.getElementById("#worstSpace").innerHTML = "Worst-case space complexity\tO(1)";
    }
}