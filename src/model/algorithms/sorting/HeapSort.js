import SortingAlgorithm from "./SortingAlgorithm.js";
import BarUtils from "../../../utils/BarUtils.js";

/**
 * The heap sort sorting algorithm.
 */
export default class HeapSort extends  SortingAlgorithm  {
    #barUtils;

    constructor() {
        super();
        this.#barUtils = new BarUtils();
    }

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
            blocks[0].style.backgroundColor = "#FF4949";
            blocks[i].style.backgroundColor = "#FF4949";
            await this.swap(blocks[0], blocks[i]);
            blocks[0].style.backgroundColor = "#ece8e1";
            blocks[i].style.backgroundColor = "#caffbf";
            await this.heapify(blocks, i, 0, delay);
        }
        blocks[0].style.backgroundColor = "#caffbf";
    }

    async heapify(blocks, n, i, delay) {
        let largest = Math.trunc(i);
        let left = Math.trunc(2 * i + 1);
        let right = Math.trunc(2 * i + 2);

        if (left < n) {
            blocks[left].style.backgroundColor = "#fdffb6";
            blocks[largest].style.backgroundColor = "#fdffb6";
            await this.pause(delay);
            blocks[largest].style.backgroundColor = "#ece8e1";
            blocks[left].style.backgroundColor = "#ece8e1";
        }
        if (left < n && this.#barUtils.getBarHeight(blocks[left]) > this.#barUtils.getBarHeight(blocks[largest])) {
            largest = left;
        }
        if (right < n) {
            blocks[right].style.backgroundColor = "#fdffb6";
            blocks[largest].style.backgroundColor = "#fdffb6";
            await this.pause(delay);
            blocks[largest].style.backgroundColor = "#ece8e1";
            blocks[right].style.backgroundColor = "#ece8e1";
        }
        if (right < n && this.#barUtils.getBarHeight(blocks[right]) > this.#barUtils.getBarHeight(blocks[largest])) {
            largest = right;
        }

        if (largest !== i) {
            blocks[largest].style.backgroundColor = "#FF4949";
            blocks[i].style.backgroundColor = "#FF4949";
            await this.swap(blocks[i], blocks[largest]);
            blocks[largest].style.backgroundColor = "#ece8e1";
            blocks[i].style.backgroundColor = "#ece8e1";
            await this.heapify(blocks, n, largest, delay);
        }
    }

    async pause(delay) {
        await super.pause(delay);
    }

    async placeBefore(el1, el2) {
        'use strict';
        return await super.placeBefore(el1, el2);
    }

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