import SortingAlgorithm from "./SortingAlgorithm.js";
import BarUtils from "../../../utils/BarUtils.js";

export default class InsertionSort extends  SortingAlgorithm {
    #barUtils;

    constructor() {
        super();
        this.#barUtils = new BarUtils();
    }

    async sort(delay) {
        let blocks = document.querySelectorAll(".bar");
        for (let i = 1; i < blocks.length ; i++) {
            let value = this.#barUtils.getBarHeight(blocks[i]);
            let hole = i;
            blocks[hole].style.backgroundColor = "#fdffb6";
            await this.pause(delay);
            while (hole > 0 && this.#barUtils.getBarHeight(blocks[hole - 1]) > value) {
                blocks[hole].style.backgroundColor = "#fdffb6";
                blocks[hole - 1].style.backgroundColor = "#FF4949";
                await this.pause(delay);
                blocks[hole].style.height = blocks[hole - 1].style.height;
                blocks = document.querySelectorAll(".bar");
                blocks[hole].style.backgroundColor = "#FF4949";
                await this.pause(delay);
                this.#barUtils.displayBarNumbers();
                blocks[hole].style.backgroundColor = "#ece8e1";
                blocks[hole - 1].style.backgroundColor = "#ece8e1";
                hole -= 1;
            }
            if (this.#barUtils.getBarHeight(blocks[hole]) !== value) {
                blocks[hole].style.backgroundColor = "#ffadad";
                await this.pause(delay);
                blocks[hole].style.height = `${value}px`;
                blocks = document.querySelectorAll(".bar");
                this.#barUtils.displayBarNumbers();
                blocks[hole].style.backgroundColor = "#ece8e1";
            }
        }
        this.#barUtils.makeAllBarsGreen();
    }

    async placeBefore(el1, el2) {
        'use strict';
        return super.placeBefore(el1, el2);
    }

    async pause(delay) {
        await super.pause(delay);
    }

    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Insertion Sort is a simple sorting algorithm that iterates through an array and at " +
            "each iteration it removes one element from the array, finds the location it " +
            "belongs to in the sorted list and inserts it there, repeating until no elements " +
            "remain in the unsorted list. It is an in-place, stable sorting algorithm that is " +
            "inefficient on large input arrays but works well for data sets that are almost " +
            "sorted. It is more efficient in practice compared to other quadratic sorting " +
            "algorithms like bubble sort and selection sort.";
    }

    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Insertion Sort";
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
        document.getElementById("#bestTime").innerHTML = "Best-case time complexity\tO(n)";
    }

    setWorstSpace() {
        document.getElementById("#worstSpace").innerHTML = "Worst-case space complexity\tO(1)";
    }
}