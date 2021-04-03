import PriorityQueue from "../../PriorityQueue.js";
import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

export default class GreedyBestFirst extends PathfindingAlgorithm{
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
                if (!backtrace[neighbor.node]) {
                    let priority = this.heuristic(endNode, neighbor.node, map);
                    pq.enqueue([neighbor.node, priority]);
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

    heuristic(endNode, nextNode, map) {
        return super.heuristic(endNode, nextNode, map);
    }

    generatePath(startNode, endNode, backtrace) {
        return super.generatePath(startNode, endNode, backtrace);
    }

    async pause(ms) {
        return await super.pause(ms);
    }

    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Greedy Best First Search tries to expand the node that " +
            "is closest to the goal, on the grounds that this is likely to lead to a solution quickly. " +
            "It evaluates nodes on a heuristic function."
    }

    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Greedy Best First Search";
    }

    setWeight() {
        document.getElementById("#weight").innerHTML = "Algorithm is weighted.";
    }

    setCompleteness() {
        document.getElementById("#completeness").innerHTML = "Algorithm is complete";
    }

    setOptimality() {
        document.getElementById("#optimality").innerHTML = "Algorithm is not optimal";
    }

    setShortestPath() {
        document.getElementById("#shortestPath").innerHTML = "Not guaranteed to find shortest path";
    }
}