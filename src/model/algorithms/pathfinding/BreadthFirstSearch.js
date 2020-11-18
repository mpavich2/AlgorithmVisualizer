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
                document.querySelector('#table').rows[map.getRow(currentNode)].cells[map.getColumn(currentNode)].classList.add("node-visited");
                await this.pause(10);
            }
            for (const neighbor of map.adjacencyList[currentNode]) {
                if (!backtrace[neighbor.node] && backtrace[currentNode] !== neighbor.node) {
                    pq.enqueue([neighbor.node, neighbor.weight]);
                    backtrace[neighbor.node] = currentNode;
                    await this.pause(1);
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

    async pause(ms) {
        'use strict';
        return await super.pause(ms);
    }

    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Breadth First Search starts at the root node and explores all " +
            "of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level."
    }

    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Breadth First Search";
    }

    setWeight() {
        document.getElementById("#weight").innerHTML = "Algorithm is unweighted";
    }

    setCompleteness() {
        document.getElementById("#completeness").innerHTML = "Algorithm is complete";
    }

    setOptimality() {
        document.getElementById("#optimality").innerHTML = "Algorithm is optimal";
    }

    setShortestPath() {
        document.getElementById("#shortestPath").innerHTML = "Guaranteed to find shortest path";
    }
}