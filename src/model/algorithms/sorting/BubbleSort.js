import SortingAlgorithm from "./SortingAlgorithm.js";

export default class BubbleSort extends SortingAlgorithm {
    constructor() {
        super();
    }

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
                blocks[j].style.backgroundColor = "#cfdbd5";
                blocks[j + 1].style.backgroundColor = "#cfdbd5";
            }
            blocks[blocks.length - i - 1].style.backgroundColor = "#caffbf";
        }
        blocks[0].style.backgroundColor = "#caffbf";
    }

    async placeBefore(el1, el2) {
        'use strict';
        return await super.placeBefore(el1, el2);
    }

    async pause(delay) {
        await super.pause(delay);
    }

    setAlgorithmDescription() {
        let description = "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, " +
            "compares adjacent elements and swaps them if they are in the wrong order.The " +
            "pass through the list is repeated until the list is sorted. The algorithm, which is a " +
            "comparison sort, is named for the way smaller or larger elements \"bubble\" to " +
            "the top of the list. Although the algorithm is simple, it is too slow and " +
            "impractical for most problems";
        document.getElementById("#algorithmDescription").innerHTML = description;
    }

    setAlgorithmName() {
        let name = "Bubble Sort";
        document.getElementById("#algorithmName").innerHTML = name;
    }

    setWorstTime() {
        let exponent = "2";
        let worstTime = "Worst-case time complexity\tO(n" + exponent.sup() + ")";
        document.getElementById("#worstTime").innerHTML = worstTime;
    }

    setAverageTime() {
        let exponent = "2";
        let averageTime = "Average time complexity\tO(n" + exponent.sup() + ")";
        document.getElementById("#averageTime").innerHTML = averageTime;
    }

    setBestTime() {
        let bestTime = "Best-case time complexity\tO(n)";
        document.getElementById("#bestTime").innerHTML = bestTime;
    }

    setWorstSpace() {
        let worstSpace = "Worst-case space complexity\tO(1)";
        document.getElementById("#worstSpace").innerHTML = worstSpace;
    }
}