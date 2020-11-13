import PriorityQueue from "../../PriorityQueue.js";
import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

export default class AStar extends PathfindingAlgorithm {
    constructor() {
        super();
    }

    async findPath(startNode, endNode, map) {
        'use strict';
        let pq = new PriorityQueue();
        let backtrace = {};
        let times = {};
        times[startNode] = 0;
        pq.enqueue([startNode, 0]);
        let current = startNode;
        while (!pq.isEmpty() && current !== endNode) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            if (currentNode !== startNode) {
                document.querySelector('#table').rows[map.getRow(currentNode)].cells[map.getColumn(currentNode)].classList.add("searched");
            }
            for (const neighbor of map.adjacencyList[currentNode]) {
                let newCost = times[currentNode] + neighbor.weight;
                if ((!times[neighbor.node] || newCost < times[neighbor.node]) && backtrace[currentNode] !== neighbor.node) {
                    times[neighbor.node] = newCost;
                    let priority = newCost + this.heuristic(startNode, endNode, neighbor.node, map);
                    pq.enqueue([neighbor.node, priority]);
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

    heuristic(startNode, endNode, nextNode, map) {
        return super.heuristic(startNode, endNode, nextNode, map);
    }

    generatePath(startNode, endNode, backtrace) {
        return super.generatePath(startNode, endNode, backtrace);
    }

    async timer(ms) {
        return await super.timer(ms);
    }

}
