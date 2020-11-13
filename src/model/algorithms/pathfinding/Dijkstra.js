import PriorityQueue from "../../PriorityQueue.js";
import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

export default class Dijkstra extends PathfindingAlgorithm{
    constructor() {
        super();
    }

    async findPath(startNode, endNode, map) {
        'use strict';
        let times = {};
        let backtrace = {};
        let pq = new PriorityQueue();
        times[startNode] = 0;

        map.nodes.forEach(node => {
            if (node !== startNode) {
                times[node] = Infinity
            }
        });
        pq.enqueue([startNode, 0]);
        let current = startNode;
        while (!pq.isEmpty() && current !== endNode) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            if (currentNode !== startNode) {
                document.querySelector('#table').rows[map.getRow(currentNode)].cells[map.getColumn(currentNode)].classList.add("searched");
            }
            for (const neighbor of map.adjacencyList[currentNode]) {
                let time = times[currentNode] + neighbor.weight;
                if (time < times[neighbor.node]) {
                    times[neighbor.node] = time;
                    backtrace[neighbor.node] = currentNode;
                    if (neighbor.node === endNode) {
                        current = endNode;
                    } else {
                        pq.enqueue([neighbor.node, time]);
                        await this.timer(1);
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
