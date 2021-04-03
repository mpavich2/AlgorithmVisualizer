import PriorityQueue from "../../PriorityQueue.js";
import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

/**
 * The dijkstra pathfinding algorithm.
 */
export default class Dijkstra extends PathfindingAlgorithm {
    /**
     * The default constructor for dijkstra. Creates an instance of a dijkstra.
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
                document.querySelector('#table').rows[map.getRow(currentNode)].cells[map.getColumn(currentNode)].classList.add("node-visited");
                await this.pause(10);
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
                        await this.pause(1);
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
        return await super.pause(delay);
    }

    /**
     * Sets the description of the algorithm to the dijkstra pathfinding algorithm description.
     */
    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Dijkstra's algorithm picks the unvisited vertex with " +
            "the lowest distance, calculates the distance through it to each unvisited neighbor, and updates " +
            "the neighbor's distance if smaller."
    }

    /**
     * Sets the name of the algorithm to the dijkstra pathfinding algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Dijkstra's";
    }

    /**
     * Sets the weight of the algorithm to the dijkstra pathfinding algorithm weight.
     */
    setWeight() {
        document.getElementById("#weight").innerHTML = "Algorithm is weighted. Acts as BFS when unweighted";
    }

    /**
     * Sets the completeness of the algorithm to the dijkstra pathfinding algorithm completeness.
     */
    setCompleteness() {
        document.getElementById("#completeness").innerHTML = "Algorithm is complete";
    }

    /**
     * Sets the optimality of the algorithm to the dijkstra pathfinding algorithm optimality.
     */
    setOptimality() {
        document.getElementById("#optimality").innerHTML = "Algorithm is optimal";
    }

    /**
     * Sets the shortest path of the algorithm to the dijkstra pathfinding algorithm shortest path.
     */
    setShortestPath() {
        document.getElementById("#shortestPath").innerHTML = "Guaranteed to find shortest path";
    }
}
