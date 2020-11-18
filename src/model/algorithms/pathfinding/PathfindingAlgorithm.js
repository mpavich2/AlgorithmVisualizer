export default class PathfindingAlgorithm {
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

    async findPath(startNode, endNode, map) {
        throw new Error("findPath must be implemented");
    }

    heuristic(startNode, endNode, nextNode, map) {
        let rowDifference = Math.abs(map.getRow(nextNode) - map.getRow(endNode))
        let columnDifference = Math.abs(map.getColumn(nextNode) - map.getColumn(endNode))
        let sum = rowDifference + columnDifference;
        sum *= (1.0 + 1/1000);
        return sum;
    }

    async generatePath(startNode, endNode, backtrace, map) {
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

    async pause(ms) {
        'use strict';
        return new Promise(res => setTimeout(res, ms));
    }

    setAlgorithmDescription() {
        throw new Error("set algorithm description must be implemented");
    }

    setAlgorithmName() {
        throw new Error("set algorithm name must be implemented");
    }

    setWeight() {
        throw new Error("set weight must be implemented");
    }

    setCompleteness() {
        throw new Error("set completeness must be implemented");
    }

    setOptimality() {
        throw new Error("set optimality must be implemented");
    }

    setShortestPath() {
        throw new Error("set shortest path must be implemented");
    }
}