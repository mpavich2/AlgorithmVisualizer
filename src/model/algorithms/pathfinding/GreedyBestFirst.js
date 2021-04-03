import PriorityQueue from "../../PriorityQueue.js";
import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

/**
 * The greedy best first search pathfinding algorithm.
 */
export default class GreedyBestFirst extends PathfindingAlgorithm {
    /**
     * The default constructor for greedy best first. Creates an instance of a greedy best first.
     */
    constructor() {
        super();
    }

    /**
     * Finds the path from the start to the goal in the map.
     *
     * @param startNode - the start node
     * @param endNode - the end node
     * @param map - the map of nodes
     * @returns {Promise<void>} - the promise to await
     */
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

    /**
     * Gets the estimated cost from the next node to the end node in the map
     *
     * @param endNode - the end node
     * @param nextNode - the next node
     * @param map - the map of nodes
     * @returns the estimated distance
     */
    heuristic(endNode, nextNode, map) {
        return super.heuristic(endNode, nextNode, map);
    }

    /**
     * Backtraces the map to find the path from the start node to the end node.
     *
     * @param startNode - the start node
     * @param endNode - the end node
     * @param backtrace - the map of nodes the algorithm passed through
     * @returns {Promise<[*]>} - the promise to await
     */
    generatePath(startNode, endNode, backtrace) {
        return super.generatePath(startNode, endNode, backtrace);
    }

    /**
     * Pauses the algorithm for the specified delay time in order to visualize the algorithm better.
     *
     * @param delay - the specified delay time
     * @returns {Promise<void>} - the promise to await
     */
    async pause(delay) {
        return await super.pause(delay);
    }

    /**
     * Sets the description of the algorithm to the greedy best first pathfinding algorithm description.
     */
    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Greedy Best First Search tries to expand the node that " +
            "is closest to the goal, on the grounds that this is likely to lead to a solution quickly. " +
            "It evaluates nodes on a heuristic function."
    }

    /**
     * Sets the name of the algorithm to the greedy best first pathfinding algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Greedy Best First Search";
    }

    /**
     * Sets the weight of the algorithm to the greedy best first pathfinding algorithm weight.
     */
    setWeight() {
        document.getElementById("#weight").innerHTML = "Algorithm is weighted";
    }

    /**
     * Sets the completeness of the algorithm to the greedy best first pathfinding algorithm completeness.
     */
    setCompleteness() {
        document.getElementById("#completeness").innerHTML = "Algorithm is complete";
    }

    /**
     * Sets the optimality of the algorithm to the greedy best first pathfinding algorithm optimality.
     */
    setOptimality() {
        document.getElementById("#optimality").innerHTML = "Algorithm is not optimal";
    }

    /**
     * Sets the shortest path of the algorithm to the greedy best first pathfinding algorithm shortest path.
     */
    setShortestPath() {
        document.getElementById("#shortestPath").innerHTML = "Not guaranteed to find shortest path";
    }
}