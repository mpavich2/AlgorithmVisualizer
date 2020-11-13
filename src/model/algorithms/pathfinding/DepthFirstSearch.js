import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

export default class DepthFirstSearch extends PathfindingAlgorithm{
    constructor() {
        super();
    }

    async findPath(startNode, endNode, map) {
        'use strict';
        let stack = [];
        stack.push([startNode, 0]);
        let backtrace = {};
        let visited = [];
        let current = startNode;
        while (stack.length > 0 && current !== endNode) {
            let shortestStep = stack.pop();
            let currentNode = shortestStep[0];
            if (currentNode !== startNode) {
                document.querySelector('#table').rows[map.getRow(currentNode)].cells[map.getColumn(currentNode)].classList.add("searched");
            }
            visited.push(currentNode);
            for (const neighbor of map.adjacencyList[currentNode]) {
                if (!visited.includes(neighbor.node)) {
                    stack.push([neighbor.node, neighbor.weight]);
                    backtrace[neighbor.node] = currentNode;
                    await this.timer(1);
                    if (neighbor.node === endNode) {
                        current = neighbor.node;
                    }
                }
            }
        }
        return this.generatePath(startNode, endNode, backtrace);
    }

    generatePath(startNode, endNode, backtrace) {
        return super.generatePath(startNode, endNode, backtrace);
    }

    async timer(ms) {
        return await super.timer(ms);
    }
}