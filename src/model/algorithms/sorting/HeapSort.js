import SortingAlgorithm from "./SortingAlgorithm.js";
import BarUtils from "../../../utils/BarUtils.js";

/**
 * The HeapSort sorting algorithm.
 */
export default class HeapSort extends  SortingAlgorithm  {
    #barUtils;

    /**
     * The default constructor for HeapSort. Creates an instance of HeapSort.
     */
    constructor() {
        super();
        this.#barUtils = new BarUtils();
    }

    /**
     * Sorts all of the elements by using the heap sort sorting algorithm.
     *
     * @param delay
     * @returns {Promise<void>}
     */
    async sort(delay) {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        let n = blocks.length;

        for (let i = n / 2 - 1; i >= 0; i--) {
            await this.heapify(blocks, n, Math.trunc(i), delay);
        }

        for (let i = n - 1; i > 0; i--) {
            this.#barUtils.makeAllNonSortedBarsBlue();
            await this.pause(delay);
            this.#barUtils.resetAllBarsNotSorted();
            this.setBarsToSwapColor([blocks[0], blocks[i]]);
            await this.swap(blocks[0], blocks[i]);
            this.setBarsToDefaultColor([blocks[0]]);
            this.setBarsToSortedColor([blocks[i]]);
            await this.heapify(blocks, i, 0, delay);
        }
        this.setBarsToSortedColor([blocks[0]]);
    }

    /**
     * To heapify a subtree rooted with node i which is an index in arr[].
     *
     * @param blocks - the bars
     * @param n - size of heap
     * @param i - index in array
     * @param delay - the specified delay time
     * @returns {Promise<void>} - the promise to await
     */
    async heapify(blocks, n, i, delay) {
        'use strict';
        let largest = Math.trunc(i);
        let left = Math.trunc(2 * i + 1);
        let right = Math.trunc(2 * i + 2);

        if (left < n) {
            this.setBarsToCompareColor([blocks[left], blocks[largest]]);
            await this.pause(delay);
            this.setBarsToDefaultColor([blocks[largest], blocks[left]]);
        }
        if (left < n && this.#barUtils.getBarHeight(blocks[left]) > this.#barUtils.getBarHeight(blocks[largest])) {
            largest = left;
        }
        if (right < n) {
            this.setBarsToCompareColor([blocks[right], blocks[largest]]);
            await this.pause(delay);
            this.setBarsToDefaultColor([blocks[largest], blocks[right]]);
        }
        if (right < n && this.#barUtils.getBarHeight(blocks[right]) > this.#barUtils.getBarHeight(blocks[largest])) {
            largest = right;
        }

        if (largest !== i) {
            this.setBarsToSwapColor([blocks[largest], blocks[i]]);
            await this.swap(blocks[i], blocks[largest]);
            this.setBarsToDefaultColor([blocks[largest], blocks[i]]);
            await this.heapify(blocks, n, largest, delay);
        }
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

            // Wait for the transition to end!
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
     * Sets the description of the algorithm to the heap sort algorithm description.
     */
    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Heap sort can be thought of as an improved selection sort that uses the heap " +
            "data structure rather than a linear-time search to find the maximum or " +
            "minimum element. It is an in-place sorting algorithm that is not stable and has " +
            "a somewhat slower running time than quick sort in practice.";
    }

    /**
     * Sets the name of the algorithm to the heap sort algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Heap Sort";
    }

    /**
     * Sets the worst time of the algorithm to the heap sort algorithm worst time.
     */
    setWorstTime() {
        document.getElementById("#worstTime").innerHTML = "Worst-case time complexity\tO(nlogn)";
    }

    /**
     * Sets the worst time of the algorithm to the heap sort algorithm average time.
     */
    setAverageTime() {
        document.getElementById("#averageTime").innerHTML = "Average time complexity\t\tO(nlogn)";
    }

    /**
     * Sets the worst time of the algorithm to the heap sort algorithm best time.
     */
    setBestTime() {
        document.getElementById("#bestTime").innerHTML = "Best-case time complexity\tO(nlogn)";
    }

    /**
     * Sets the worst time of the algorithm to the heap sort algorithm worst space.
     */
    setWorstSpace() {
        document.getElementById("#worstSpace").innerHTML = "Worst-case space complexity\tO(1)";
    }
}