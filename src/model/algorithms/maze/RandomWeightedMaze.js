export default class RandomWeightedMaze {
    #weights;
    async generateWeightMaze(startNode, endNode, map) {
        'use strict';
        let column = map.getColumnCount()
        let row = map.getRowCount()
        this.#weights = [];
        this.getRandomCells(column, row);
        for (let weight of this.#weights) {
            let node = map.getNode(weight[0], weight[1]);
            if (node !== startNode && node !== endNode) {
                document.querySelector('#table').rows[map.getRow(node)].cells[map.getColumn(node)].style.padding = "1px";
                document.querySelector('#table').rows[map.getRow(node)].cells[map.getColumn(node)].innerHTML = "<i style='font-size: 0.5rem; padding: 0; height: 0.5rem' class=\"fas fa-weight-hanging fa-xs\"></i>";
                await this.pause(1);
            }
        }
    }

    getRandomNode(row, column) {
        'use strict';
        let randomX = Math.round(Math.random() * (column));

        return [row, randomX];
    }

    getRandomCells(column, row) {
        'use strict';
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < 35; j++) {
                this.#weights.push(this.getRandomNode(i, column - 1));
            }
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
        return new Promise(res => setTimeout(res, delay));
    }
}