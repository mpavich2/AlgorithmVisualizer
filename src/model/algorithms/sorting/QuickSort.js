import SortingAlgorithm from "./SortingAlgorithm.js";
import BarUtils from "../../../utils/BarUtils.js";

export default class QuickSort extends SortingAlgorithm {
    #barUtils;

    constructor() {
        super();
        this.#barUtils = new BarUtils();
    }

    async sort(delay) {
        let blocks = document.querySelectorAll(".bar");
        await this.quickSort(0, blocks.length - 1, delay);
        console.log("FINISHED");
    }

    choosePivot(start, end) {
        return Math.floor(Math.random() * (end - start)) + start;
    }

    async swap(el1, el2) {
        'use strict';
        let blocks = document.querySelectorAll(".bar");
        return new Promise(resolve => {
            const style1 = window.getComputedStyle(el1);
            const style2 = window.getComputedStyle(el2);

            const transform1 = style1.getPropertyValue("transform");
            const transform2 = style2.getPropertyValue("transform");

            el1.style.transform = transform2;
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

    async partition(start, end, delay) {
        let blocks = document.querySelectorAll(".bar");
        let i = start + 1;
        let j = start + 1;
        while (j <= end) {
            blocks[start].style.backgroundColor = "#fdffb6";
            blocks[j].style.backgroundColor = "#9bf6ff";
            await this.pause(delay);
            if (this.#barUtils.getBarHeight(blocks[j]) < this.#barUtils.getBarHeight(blocks[start])) {
                blocks[j].style.backgroundColor = "#FF4949";
                await this.swap(blocks[i], blocks[j]);
                blocks[i].style.backgroundColor = "#FF4949";
                blocks[j].style.backgroundColor = "#cfdbd5";
                await this.pause(delay);
                blocks[j].style.backgroundColor = "#9bf6ff";
                blocks[i].style.backgroundColor = "#9bf6ff";
                await this.pause(delay);
                blocks = document.querySelectorAll(".bar");
                i += 1;
            }
            j += 1;
        }
        await this.swap(blocks[start], blocks[i - 1]);
        blocks[i-1].style.backgroundColor = "#caffbf";
        await this.pause(delay);
        this.#barUtils.resetAllBarsNotSorted();
        return i - 1;
    }

    async quickSort(start, end, delay) {
        let blocks = document.querySelectorAll(".bar");
        if (start >= end) {
            if (start === end) {
                blocks[start].style.backgroundColor = "#caffbf";
                await this.pause(delay);
            }
            return null;
        }
        let pivot = this.choosePivot(start, end);
        blocks[start].style.backgroundColor = "#FF4949";
        await this.swap(blocks[pivot], blocks[start]);
        blocks[start].style.backgroundColor = "#cfdbd5";
        pivot = await this.partition(start, end, delay);
        await this.quickSort(start, pivot - 1);
        await this.quickSort(pivot + 1, end);
    }

    async placeBefore(el1, el2) {
        'use strict';
        return super.placeBefore(el1, el2);
    }

    async pause(delay) {
        await super.pause(delay);
    }

    setAlgorithmDescription() {
        let description = "Quick Sort is an efficient, in-place sorting algorith that in practice is faster than " +
            "MergeSort and HeapSort. However, it is not a stable sorting algorithm, meaning " +
            "that the relative positioning of equal sort items is not preserved.Quicksort is a " +
            "divide and conquer algorithm. Quicksort first divides a large array into two " +
            "smaller sub-arrays: the low elements and the high elements. Quicksort can " +
            "then recursively sort the sub-arrays.";
        document.getElementById("#algorithmDescription").innerHTML = description;
    }

    setAlgorithmName() {
        let name = "Quick Sort";
        document.getElementById("#algorithmName").innerHTML = name;
    }

    setWorstTime() {
        let exponent = "2";
        let worstTime = "Worst-case time complexity\tO(n" + exponent.sup() + ")";
        document.getElementById("#worstTime").innerHTML = worstTime;
    }

    setAverageTime() {
        let averageTime = "Average time complexity\tO(nlogn)";
        document.getElementById("#averageTime").innerHTML = averageTime;
    }

    setBestTime() {
        let bestTime = "Best-case time complexity\tO(nlogn)";
        document.getElementById("#bestTime").innerHTML = bestTime;
    }

    setWorstSpace() {
        let worstSpace = "Worst-case space complexity\tO(logn)";
        document.getElementById("#worstSpace").innerHTML = worstSpace;
    }
}