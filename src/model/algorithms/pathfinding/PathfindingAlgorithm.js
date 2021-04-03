/**
 * Defines the PathfindingAlgorithm abstract class.
 */
export default class PathfindingAlgorithm {
    /**
     * Sets the algorithm description, name, weight, completeness, optimality, and shortest path.
     */
    constructor() {
        if (new.target === PathfindingAlgorithm) {
            throw new TypeError("Cannot construct abstract instances directly");
        }
        this.setAlgorithmDescription();
        this.setAlgorithmName();
        this.setWeight();
        this.setCompleteness();
        this.setOptimality();
        this.setShortestPath();
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
        throw new Error("findPath must be implemented");
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
        let rowDifference = Math.abs(map.getRow(nextNode) - map.getRow(endNode))
        let columnDifference = Math.abs(map.getColumn(nextNode) - map.getColumn(endNode))
        let sum = rowDifference + columnDifference;
        sum *= (1.0 + 1/1000);
        return sum;
    }

    /**
     * Backtraces the map to find the path from the start node to the end node.
     *
     * @param startNode - the start node
     * @param endNode - the end node
     * @param backtrace - the map of nodes the algorithm passed through
     * @returns {Promise<[*]>} - the promise to await
     */
    async generatePath(startNode, endNode, backtrace) {
        let path = [endNode];
        let lastStep = endNode;
        while(lastStep !== startNode && lastStep !== undefined) {
            path.unshift(backtrace[lastStep])
            lastStep = backtrace[lastStep]
        }
        if (lastStep === undefined) {
            alert("no path could be found");
        }
        return path;
    }

    /**
     * Pauses the algorithm for the specified delay time in order to visualize the algorithm better.
     *
     * @param delay - the specified delay time
     * @returns {Promise<void>} - the promise to await
     */
    async pause(delay) {
        'use strict';
        return new Promise(res => setTimeout(res, delay));
    }

    /**
     * Sets the description of the algorithm to the specified pathfinding algorithm description.
     */
    setAlgorithmDescription() {
        throw new Error("set algorithm description must be implemented");
    }

    /**
     * Sets the name of the algorithm to the specified pathfinding algorithm name.
     */
    setAlgorithmName() {
        throw new Error("set algorithm name must be implemented");
    }

    /**
     * Sets the weight of the algorithm to the specified pathfinding algorithm weight.
     */
    setWeight() {
        throw new Error("set weight must be implemented");
    }

    /**
     * Sets the completeness of the algorithm to the specified pathfinding algorithm completeness.
     */
    setCompleteness() {
        throw new Error("set completeness must be implemented");
    }

    /**
     * Sets the optimality of the algorithm to the specified pathfinding algorithm optimality.
     */
    setOptimality() {
        throw new Error("set optimality must be implemented");
    }

    /**
     * Sets the shortest path of the algorithm to the specified pathfinding algorithm shortest path.
     */
    setShortestPath() {
        throw new Error("set shortest path must be implemented");
    }
}