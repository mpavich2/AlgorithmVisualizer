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
        return super.placeBefore(el1, el2);
    }

    async pause(delay) {
        await super.pause(delay);
    }
}