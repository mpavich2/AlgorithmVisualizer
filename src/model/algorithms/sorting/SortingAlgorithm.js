import TimerUtils from "../../../utils/TimerUtils.js";

export default class SortingAlgorithm {
    #timerUtils;

    constructor() {
        if (new.target === SortingAlgorithm) {
            throw new TypeError("Cannot construct abstract instances directly");
        }
        this.#timerUtils = new TimerUtils();
        this.setAlgorithmDescription();
        this.setAlgorithmName();
        this.setWorstTime();
        this.setAverageTime();
        this.setBestTime();
        this.setWorstSpace();
    }

    async sort() {
        throw new Error("sort must be implemented");
    }

    async placeBefore(el1, el2) {
        'use strict';
        const container = document.querySelector(".barChart");
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
                    container.insertBefore(el2, el1);
                    resolve();
                }, 250);
            });
        });
    }

    async pause(delay) {
        await this.#timerUtils.pause(delay);
    }

    setAlgorithmDescription() {
        throw new Error("set algorithm description must be implemented");
    }

    setAlgorithmName() {
        throw new Error("set algorithm name must be implemented");
    }

    setWorstTime() {
        throw new Error("set worst time must be implemented");
    }

    setAverageTime() {
        throw new Error("set average time must be implemented");
    }

    setBestTime() {
        throw new Error("set best time must be implemented");
    }

    setWorstSpace() {
        throw new Error("set worst space must be implemented");
    }
}
