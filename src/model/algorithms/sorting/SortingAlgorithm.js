import TimerUtils from "../../../utils/TimerUtils.js";

/**
 * Defines the SortingAlgorithm abstract class.
 */
export default class SortingAlgorithm {
    #timerUtils;

    /**
     * Sets the algorithm description, name, worst time, average time, best time, and worst space.
     */
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

    /**
     * Sorts all of the elements by using the specified sorting algorithm.
     *
     * @param delay - the specified delay time
     * @returns {Promise<void>}
     */
    async sort(delay) {
        throw new Error("sort must be implemented");
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
        const container = document.querySelector(".barChart");
        return new Promise(resolve => {
            const style1 = window.getComputedStyle(el1);
            const style2 = window.getComputedStyle(el2);

            el1.style.transform = style2.getPropertyValue("transform");
            el2.style.transform = style1.getPropertyValue("transform");

            window.requestAnimationFrame(function() {
                setTimeout(() => {
                    container.insertBefore(el2, el1);
                    resolve();
                }, 250);
            });
        });
    }

    /**
     * Pauses the algorithm for the specified delay time in order to visualize the algorithm better.
     *
     * @param delay - the specified delay time
     * @returns {Promise<void>} - the promise to await
     */
    async pause(delay) {
        await this.#timerUtils.pause(delay);
    }

    /**
     * Sets the description of the algorithm to the specified sort algorithm description.
     */
    setAlgorithmDescription() {
        throw new Error("set algorithm description must be implemented");
    }

    /**
     * Sets the name of the algorithm to the specified sort algorithm name.
     */
    setAlgorithmName() {
        throw new Error("set algorithm name must be implemented");
    }

    /**
     * Sets the worst time of the algorithm to the specified sort algorithm worst time.
     */
    setWorstTime() {
        throw new Error("set worst time must be implemented");
    }

    /**
     * Sets the worst time of the algorithm to the specified sort algorithm average time.
     */
    setAverageTime() {
        throw new Error("set average time must be implemented");
    }

    /**
     * Sets the worst time of the algorithm to the specified sort algorithm best time.
     */
    setBestTime() {
        throw new Error("set best time must be implemented");
    }

    /**
     * Sets the worst time of the algorithm to the specified sort algorithm worst space.
     */
    setWorstSpace() {
        throw new Error("set worst space must be implemented");
    }
}
