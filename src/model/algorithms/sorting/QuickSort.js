import SortingAlgorithm from "./SortingAlgorithm.js";
import BarUtils from "../../../utils/BarUtils.js";

/**
 * The QuickSort sorting algorithm.
 */
export default class QuickSort extends SortingAlgorithm {
    #barUtils;

    /**
     * The default constructor for QuickSort. Creates an instance of QuickSort.
     */
    constructor() {
        super();
        this.#barUtils = new BarUtils();
    }

    /**
     * Sorts all of the elements by using the insertion sort sorting algorithm.
     *
     * @param delay
     * @returns {Promise<void>}
     */
    async sort(delay) {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        await this.quickSort(0, blocks.length - 1, delay);
    }

    /**
     * Selects a random index to be the pivot index.
     *
     * @param start - the start index
     * @param end - the end index
     * @returns the index of the pivot
     */
    choosePivot(start, end) {
        'use strict';
        return Math.floor(Math.random() * (end - start)) + start;
    }

    /**
     * Swaps the two specified elements
     *
     * @param el1 - the first element
     * @param el2 - the second element
     * @returns {Promise} - the promise to await
     */
    async swap(el1, el2) {
        'use strict';
        return new Promise(resolve => {
            const style1 = window.getComputedStyle(el1);
            const style2 = window.getComputedStyle(el2);

            const transform1 = style1.getPropertyValue("transform");
            el1.style.transform = style2.getPropertyValue("transform");
            el2.style.transform = transform1;

            window.requestAnimationFrame(function() {
                setTimeout(() => {
                    let firstBar = this.#barUtils.getBarHeight(el1);
                    let secondBar = this.#barUtils.getBarHeight(el2);
                    el1.style.height = `${secondBar}px`;
                    el2.style.height = `${firstBar}px`;
                    this.#barUtils.displayBarNumbers();
                    resolve();
                }, 250);
            }.bind(this));
        });
    }

    /**
     * Partitions the bars based on the given start and end indexes.
     *
     * @param start - the start index
     * @param end - the pivot index
     * @param delay - the time to delay the algorithm
     * @returns {Promise<number>}
     */
    async partition(start, end, delay) {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        let i = start + 1;
        let j = start + 1;
        while (j <= end) {
            this.setBarsToCompareColor([blocks[start]]);
            this.setBarsToLessThanPivotColor([blocks[j]]);
            await this.pause(delay);
            if (this.#barUtils.getBarHeight(blocks[j]) < this.#barUtils.getBarHeight(blocks[start])) {
                this.setBarsToSwapColor([blocks[j]]);
                await this.swap(blocks[i], blocks[j]);
                this.setBarsToSwapColor([blocks[i]]);
                this.setBarsToDefaultColor([blocks[j]]);
                await this.pause(delay);
                this.setBarsToLessThanPivotColor([blocks[j], blocks[i]]);
                await this.pause(delay);
                blocks = document.querySelectorAll(".bar");
                i += 1;
            }
            j += 1;
        }
        await this.swap(blocks[start], blocks[i - 1]);
        this.setBarsToSortedColor([blocks[i - 1]]);
        await this.pause(delay);
        this.#barUtils.resetAllBarsNotSorted();
        return i - 1;
    }

    /**
     * Sorts all of the elements by using the quick sort sorting algorithm.
     *
     * @param start - the start index
     * @param end - the end index
     * @param delay - the specified delay time
     * @returns {Promise<void>} - the promise to await
     */
    async quickSort(start, end, delay) {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        if (start >= end) {
            if (start === end) {
                this.setBarsToSortedColor([blocks[start]]);
                await this.pause(delay);
            }
            return null;
        }
        let pivot = this.choosePivot(start, end);
        this.setBarsToSwapColor([blocks[start]]);
        await this.swap(blocks[pivot], blocks[start]);
        this.setBarsToDefaultColor([blocks[start]]);
        pivot = await this.partition(start, end, delay);
        await this.quickSort(start, pivot - 1);
        await this.quickSort(pivot + 1, end);
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
     * Sets all the background colors of the bars array to the lessThanPivot color.
     *
     * @param bars - the array of bars
     */
    setBarsToLessThanPivotColor(bars) {
        super.setBarsToLessThanPivotColor(bars);
    }

    /**
     * Sets the description of the algorithm to the quick sort algorithm description.
     */
    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Quick Sort is an efficient, in-place sorting algorithm that in practice is faster than " +
            "MergeSort and HeapSort. However, it is not a stable sorting algorithm, meaning " +
            "that the relative positioning of equal sort items is not preserved.Quicksort is a " +
            "divide and conquer algorithm. Quicksort first divides a large array into two " +
            "smaller sub-arrays: the low elements and the high elements. Quicksort can " +
            "then recursively sort the sub-arrays.";
    }

    /**
     * Sets the name of the algorithm to the quick sort algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Quick Sort";
    }

    /**
     * Sets the worst time of the algorithm to the quick sort algorithm worst time.
     */
    setWorstTime() {
        let exponent = "2";
        document.getElementById("#worstTime").innerHTML = "Worst-case time complexity\tO(n" + exponent.sup() + ")";
    }

    /**
     * Sets the worst time of the algorithm to the quick sort algorithm average time.
     */
    setAverageTime() {
        document.getElementById("#averageTime").innerHTML = "Average time complexity\t\tO(nlogn)";
    }

    /**
     * Sets the worst time of the algorithm to the quick sort algorithm best time.
     */
    setBestTime() {
        document.getElementById("#bestTime").innerHTML = "Best-case time complexity\tO(nlogn)";
    }

    /**
     * Sets the worst time of the algorithm to the quick sort algorithm worst space.
     */
    setWorstSpace() {
        document.getElementById("#worstSpace").innerHTML = "Worst-case space complexity\tO(logn)";
    }
}