import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

/**
 * The depth first search pathfinding algorithm.
 */
export default class DepthFirstSearch extends PathfindingAlgorithm {
    /**
     * The default constructor for depth first search. Creates an instance of a depth first search.
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
        let stack = [];
        stack.push([startNode, 0]);
        let backtrace = {};
        let visited = [];
        let current = startNode;
        while (stack.length > 0 && current !== endNode) {
            let shortestStep = stack.pop();
            let currentNode = shortestStep[0];
            if (currentNode !== startNode) {
                document.querySelector('#table').rows[map.getRow(currentNode)].cells[map.getColumn(currentNode)].classList.add("node-visited");
                await this.pause(10);
            }
            visited.push(currentNode);
            for (const neighbor of map.adjacencyList[currentNode]) {
                if (!visited.includes(neighbor.node)) {
                    stack.push([neighbor.node, 0]);
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
        return await super.pause(delay);
    }

    /**
     * Sets the description of the algorithm to the depth first search pathfinding algorithm description.
     */
    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Depth First Search starts at the root node " +
            "(selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible " +
            "along each branch before backtracking."
    }

    /**
     * Sets the name of the algorithm to the depth first search pathfinding algorithm name.
     */
    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Depth First Search";
    }

    /**
     * Sets the weight of the algorithm to the depth first search pathfinding algorithm weight.
     */
    setWeight() {
        document.getElementById("#weight").innerHTML = "Algorithm is unweighted";
    }

    /**
     * Sets the completeness of the algorithm to the depth first search pathfinding algorithm completeness.
     */
    setCompleteness() {
        document.getElementById("#completeness").innerHTML = "Algorithm is not complete";
    }

    /**
     * Sets the optimality of the algorithm to the depth first search pathfinding algorithm optimality.
     */
    setOptimality() {
        document.getElementById("#optimality").innerHTML = "Algorithm is not optimal";
    }

    /**
     * Sets the shortest path of the algorithm to the depth first search pathfinding algorithm shortest path.
     */
    setShortestPath() {
        document.getElementById("#shortestPath").innerHTML = "Not guaranteed to find shortest path";
    }
}