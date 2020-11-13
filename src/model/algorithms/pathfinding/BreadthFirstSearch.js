import PriorityQueue from "../../PriorityQueue.js";
import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

export default class BreadthFirstSearch extends PathfindingAlgorithm {
    constructor() {
        super();

    }


    async findPath(startNode, endNode, map) {
        'use strict';
        let pq = new PriorityQueue();
        pq.enqueue([startNode, 0]);
        let backtrace = {};
        let current = startNode;
        while (!pq.isEmpty() && current !== endNode) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            if (currentNode !== startNode) {
                document.querySelector('#table').rows[map.getRow(currentNode)].cells[map.getColumn(currentNode)].classList.add("searched");
            }
            for (const neighbor of map.adjacencyList[currentNode]) {
                if (!backtrace[neighbor.node] && backtrace[currentNode] !== neighbor.node) {
                    pq.enqueue([neighbor.node, neighbor.weight]);
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
        'use strict';
        return await super.timer(ms);
    }
}