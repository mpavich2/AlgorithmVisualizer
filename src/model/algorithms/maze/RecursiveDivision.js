export default class RecursiveDivision {
    #walls;

    async generateMaze(startNode, endNode, map) {
        'use strict';
        let vertical = this.range(map.getColumnCount());
        let horizontal = this.range(map.getRowCount());
        this.#walls = [];
        this.divide(vertical, horizontal, map, startNode, endNode);
        for (let wall of this.#walls) {
            let node = map.getNode(wall[0], wall[1]);
            document.querySelector('#table').rows[map.getRow(node)].cells[map.getColumn(node)].classList.toggle("node-wall");
            await this.pause(10);
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

    range(len) {
        'use strict';
        let result = [];
        for (let i = 0; i < len; i++) {
            result.push(i);
        }
        return result;
    }

    divide(vertical, horizontal, map, startNode, endNode) {
        'use strict';
        if (vertical.length < 2 || horizontal.length < 2) {
            return;
        }
        let dir;
        let num;
        if (vertical.length > horizontal.length) {
            dir = 0;
            num = this.generateOddRandomNumber(vertical);
        }
        if (vertical.length <= horizontal.length) {
            dir = 1;
            num = this.generateOddRandomNumber(horizontal);
        }

        if (dir === 0) {
            this.addWall(dir, num, vertical, horizontal, map, startNode, endNode);
            this.divide(vertical.slice(0, vertical.indexOf(num)), horizontal, map, startNode, endNode);
            this.divide(vertical.slice(vertical.indexOf(num) + 1), horizontal, map, startNode, endNode);
        } else {
            this.addWall(dir, num, vertical, horizontal, map, startNode, endNode);
            this.divide(vertical, horizontal.slice(0, horizontal.indexOf(num)), map, startNode, endNode);
            this.divide(vertical, horizontal.slice(horizontal.indexOf(num) + 1), map, startNode, endNode);
        }
    }

    generateOddRandomNumber(array) {
        'use strict';
        let max = array.length - 1;
        let randomNum =
            Math.floor(Math.random() * (max / 2)) +
            Math.floor(Math.random() * (max / 2));
        if (randomNum % 2 === 0) {
            if (randomNum === max) {
                randomNum -= 1;
            } else {
                randomNum += 1;
            }
        }
        return array[randomNum];
    }

    addWall(dir, num, vertical, horizontal, map, startNode, endNode) {
        'use strict';
        let isStartFinish = false;
        let tempWalls = [];
        if (dir === 0) {
            if (horizontal.length === 2) {
                return;
            }
            for (let temp of horizontal) {
                let startRow = map.getRow(startNode);
                let startColumn = map.getColumn(startNode);
                let endRow = map.getRow(endNode);
                let endColumn = map.getColumn(endNode);
                if ((temp === startRow && num === startColumn) || (temp === endRow && num === endColumn)) {
                    isStartFinish = true;
                    continue;
                }
                tempWalls.push([temp, num]);
            }
        } else {
            if (vertical.length === 2) {
                return;
            }
            for (let temp of vertical) {
                let startRow = map.getRow(startNode);
                let startColumn = map.getColumn(startNode);
                let endRow = map.getRow(endNode);
                let endColumn = map.getColumn(endNode);
                if ((num === startRow && temp === startColumn) || (num === endRow && temp === endColumn)) {
                    isStartFinish = true;
                    continue;
                }
                tempWalls.push([num, temp]);
            }
        }
        if (!isStartFinish) {
            tempWalls.splice(this.generateRandomNumber(tempWalls.length), 1);
        }
        for (let wall of tempWalls) {
            this.#walls.push(wall);
        }
    }

    generateRandomNumber(max) {
        'use strict';
        let randomNum =
            Math.floor(Math.random() * (max / 2)) +
            Math.floor(Math.random() * (max / 2));
        if (randomNum % 2 !== 0) {
            if (randomNum === max) {
                randomNum -= 1;
            } else {
                randomNum += 1;
            }
        }
        return randomNum;
    }
}