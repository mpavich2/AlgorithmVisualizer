import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

export default class DepthFirstSearch extends PathfindingAlgorithm{
    constructor() {
        super();
    }

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
                    stack.push([neighbor.node, neighbor.weight]);
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

    generatePath(startNode, endNode, backtrace) {
        return super.generatePath(startNode, endNode, backtrace);
    }

    async pause(ms) {
        return await super.pause(ms);
    }

    setAlgorithmDescription() {
        document.getElementById("#algorithmDescription").innerHTML = "Depth First Search starts at the root node " +
            "(selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible " +
            "along each branch before backtracking."
    }

    setAlgorithmName() {
        document.getElementById("#algorithmName").innerHTML = "Depth First Search";
    }

    setWeight() {
        document.getElementById("#weight").innerHTML = "Algorithm is unweighted";
    }

    setCompleteness() {
        document.getElementById("#completeness").innerHTML = "Algorithm is not complete";
    }

    setOptimality() {
        document.getElementById("#optimality").innerHTML = "Algorithm is not optimal";
    }

    setShortestPath() {
        document.getElementById("#shortestPath").innerHTML = "Not guaranteed to find shortest path";
    }
}