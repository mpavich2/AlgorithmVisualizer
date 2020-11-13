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
                    blocks[minIndex].style.backgroundColor = "#cfdbd5";
                    blocks[j].style.backgroundColor = "#cfdbd5";
                    minIndex = j;
                }
                blocks[minIndex].style.backgroundColor = "#cfdbd5";
                blocks[j].style.backgroundColor = "#cfdbd5";
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
}
