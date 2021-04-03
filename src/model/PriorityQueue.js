/**
 * An implementation of a priority queue.
 */
export default class PriorityQueue {
    /**
     * The default constructor for PriorityQueue. Instantiates an instance of PriorityQueue.
     */
    constructor() {
        'use strict';
        this.collection = [];
    }

    /**
     * Adds a new element to the queue.
     *
     * @param element
     */
    enqueue(element) {
        'use strict';
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++) {
                if (element[1] < this.collection[i-1][1]) {
                    this.collection.splice(i-1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    };

    /**
     * Removes the first element from the queue.
     *
     * @returns the removed element
     */
    dequeue() {
        'use strict';
        return this.collection.shift();
    };

    /**
     * Checks if the queue is empty
     *
     * @returns True if it is empty. False if it is not empty.
     */
    isEmpty() {
        'use strict';
        return (this.collection.length === 0);
    };
}