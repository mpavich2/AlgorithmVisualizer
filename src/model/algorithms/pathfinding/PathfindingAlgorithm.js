export default class PathfindingAlgorithm {
    constructor() {
        if (new.target === PathfindingAlgorithm) {
            throw new TypeError("Cannot construct abstract instances directly");
        }
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

    generatePath(startNode, endNode, backtrace) {
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

    async timer(ms) {
        'use strict';
        return new Promise(res => setTimeout(res, ms));
    }
}