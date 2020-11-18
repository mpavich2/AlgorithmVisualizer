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
                document.querySelector('#table').rows[map.getRow(currentNode)].cells[map.getColumn(currentNode)].classList.add("node-visited");
                await this.pause(10);
            }
            for (const neighbor of map.adjacencyList[currentNode]) {
                let newCost = times[currentNode] + neighbor.weight;
                if ((!times[neighbor.node] || newCost < times[neighbor.node]) && backtrace[currentNode] !== neighbor.node) {
                    times[neighbor.node] = newCost;
                    let priority = newCost + this.heuristic(startNode, endNode, neighbor.node, map);
                    pq.enqueue([neighbor.node, priority]);
                    backtrace[neighbor.node] = currentNode;
                    await this.pause(1);
                    if (neighbor.node === endNode) {
                        current = neighbor.node;
                    }
                }
            }
        }
        return this.generatePath(startNode, endNode, backtrace, map);
    }

    heuristic(startNode, endNode, nextNode, map) {
        return super.heuristic(startNode, endNode, nextNode, map);
    }

    generatePath(startNode, endNode, backtrace) {
        return super.generatePath(startNode, endNode, backtrace);
    }

    async pause(ms) {
        return await super.pause(ms);
    }

    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "A* uses the same min-heap data structure that is implemented " +
            "in Dijkstra's, but it expands upon Dijkstra's criteria for selecting the next node to explore. Dijkstra's chooses the node with " +
            "the smallest distance from the starting node to be explored next. However, A* ranks nodes differently: it has a heuristic " +
            "function that evaluates how far a node has traveled from the starting node and how far it is from the end node. This " +
            "heuristic function makes the algorithm 'smart' since it is able to expand in a direction of interest."
    }

    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "A* Search";
    }

    setWeight() {
        document.getElementById("#weight").innerHTML = "Algorithm is weighted";
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
