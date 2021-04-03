import PriorityQueue from "../../PriorityQueue.js";
import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

/**
 * The a star pathfinding algorithm.
 */
export default class AStar extends PathfindingAlgorithm {

    /**
     * The default constructor for a star. Creates an instance of a start.
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
                    let priority = newCost + this.heuristic(endNode, neighbor.node, map);
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
    * Sets the description of the algorithm to the a star pathfinding algorithm description.
    */
    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "A* uses the same min-heap data structure that is implemented " +
            "in Dijkstra's, but it expands upon Dijkstra's criteria for selecting the next node to explore. Dijkstra's chooses the node with " +
            "the smallest distance from the starting node to be explored next. However, A* ranks nodes differently: it has a heuristic " +
            "function that evaluates how far a node has traveled from the starting node and how far it is from the end node. This " +
            "heuristic function makes the algorithm 'smart' since it is able to expand in a direction of interest."
    }

    /**
     * Sets the name of the algorithm to the a star pathfinding algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "A* Search";
    }

    /**
     * Sets the weight of the algorithm to the a star pathfinding algorithm weight.
     */
    setWeight() {
        document.getElementById("#weight").innerHTML = "Algorithm is weighted";
    }

    /**
     * Sets the completeness of the algorithm to the a star pathfinding algorithm completeness.
     */
    setCompleteness() {
        document.getElementById("#completeness").innerHTML = "Algorithm is complete";
    }

    /**
     * Sets the optimality of the algorithm to the a star pathfinding algorithm optimality.
     */
    setOptimality() {
        document.getElementById("#optimality").innerHTML = "Algorithm is optimal";
    }

    /**
     * Sets the shortest path of the algorithm to the a star pathfinding algorithm shortest path.
     */
    setShortestPath() {
        document.getElementById("#shortestPath").innerHTML = "Guaranteed to find shortest path";
    }
}
