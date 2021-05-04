import PriorityQueue from "../../PriorityQueue.js";
import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

/**
 * The breadth first search pathfinding algorithm
 */
export default class BreadthFirstSearch extends PathfindingAlgorithm {
    /**
     * The default constructor for breadth first search. Creates an instance of a breadth first search.
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
                if (!backtrace[neighbor.node] && backtrace[currentNode] !== neighbor.node) {
                    pq.enqueue([neighbor.node, 0]);
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
        'use strict';
        return await super.pause(delay);
    }

    /**
     * Sets the description of the algorithm to the breadth first search pathfinding algorithm description.
     */
    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Breadth First Search starts at the root node and explores all " +
            "of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level."
    }

    /**
     * Sets the name of the algorithm to the breadth first search pathfinding algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Breadth First Search";
    }

    /**
     * Sets the weight of the algorithm to the breadth first search pathfinding algorithm weight.
     */
    setWeight() {
        document.getElementById("#weight").innerHTML = "Algorithm is unweighted";
    }

    /**
     * Sets the completeness of the algorithm to the breadth first search pathfinding algorithm completeness.
     */
    setCompleteness() {
        document.getElementById("#completeness").innerHTML = "Algorithm is complete";
    }

    /**
     * Sets the optimality of the algorithm to the breadth first search pathfinding algorithm optimality.
     */
    setOptimality() {
        document.getElementById("#optimality").innerHTML = "Algorithm is optimal";
    }

    /**
     * Sets the shortest path of the algorithm to the breadth first search pathfinding algorithm shortest path.
     */
    setShortestPath() {
        document.getElementById("#shortestPath").innerHTML = "Guaranteed to find shortest path";
    }
}