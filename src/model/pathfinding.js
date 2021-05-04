import Dijkstra from "./algorithms/pathfinding/Dijkstra.js";
import AStar from "./algorithms/pathfinding/AStar.js";
import GreedyBestFirst from "./algorithms/pathfinding/GreedyBestFirst.js";
import BreadthFirstSearch from "./algorithms/pathfinding/BreadthFirstSearch.js";
import DepthFirstSearch from "./algorithms/pathfinding/DepthFirstSearch.js";
import Graph from "./Graph.js";
import RecursiveDivision from "./algorithms/maze/RecursiveDivision.js";
import RandomWeightedMaze from "./algorithms/maze/RandomWeightedMaze.js";

let map;
let algorithm = new AStar();
let pathfindingInProgress = false;

/**
 * Adds all the nodes to the graph
 *
 * @param graph - the graph
 */
function addNodes(graph) {
    'use strict';
    let table = document.querySelector('#table');
    let currentNode = 0;
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].className !== "node-wall") {
                graph.addNode(currentNode);
            }
            currentNode++;
        }
    }
}

/**
 * Connects the nodes in the graph to their neighbors.
 *
 * @param graph - the graph
 */
function connectNodes(graph) {
    'use strict';
    let table = document.querySelector('#table');
    let currentNode = 0;
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].className !== "node-wall") {
                if (j !== 0 && table.rows[i].cells[j-1].className !== "node-wall") {
                    if (table.rows[i].cells[j-1].innerHTML !== "") {
                        graph.addEdge(currentNode, currentNode - 1, 15);
                    } else {
                        graph.addEdge(currentNode, currentNode - 1, 1);
                    }
                }
                if (i !== 0 && table.rows[i-1].cells[j].className !== "node-wall") {
                    if (table.rows[i-1].cells[j].innerHTML !== "") {
                        graph.addEdge(currentNode, currentNode - 50, 15);
                    } else {
                        graph.addEdge(currentNode, currentNode - 50, 1);
                    }
                }
                if (j !== table.rows[i].cells.length - 1 && table.rows[i].cells[j+1].className !== "node-wall") {
                    if (table.rows[i].cells[j + 1].innerHTML !== "") {
                        graph.addEdge(currentNode, currentNode + 1, 15);
                    } else {
                        graph.addEdge(currentNode, currentNode + 1, 1);
                    }
                }
                if (i !== table.rows.length - 1 && table.rows[i+1].cells[j].className !== "node-wall") {
                    if (table.rows[i + 1].cells[j].innerHTML !== "") {
                        graph.addEdge(currentNode, currentNode + 50, 15);
                    } else {
                        graph.addEdge(currentNode, currentNode + 50, 1);
                    }
                }
            }
            currentNode++;
        }
    }
}

/**
 * Finds the position of the cell by its class name.
 * This is for finding the start and end cell positions.
 *
 * @param className - the class name
 * @returns the x and y coordinates
 */
function getCellPositionByClass(className) {
    'use strict';
    let x = 0;
    let y = 0;
    let table = document.querySelector('#table');
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].className === className) {
                x = i;
                y = j;
            }
        }
    }
    return [x, y];
}

/**
 * Gets the selected pathfinding algorithm and instantiates it.
 * Sets the selected pathfinding algorithm information.
 *
 * @returns {Promise<void>} - the promise to await
 */
async function getPathfindingAlgorithm() {
    'use strict';
    let algorithmName = document.querySelector('#algorithms').value;
    if (algorithmName === "A*") {
        algorithm = new AStar();
    } else if (algorithmName === "Dijkstra") {
        algorithm = new Dijkstra();
    } else if (algorithmName === "BFS") {
        algorithm = new BreadthFirstSearch();
    } else if (algorithmName === "DFS") {
        algorithm = new DepthFirstSearch();
    } else if (algorithmName === "GBF") {
        algorithm = new GreedyBestFirst();
    }
}

/**
 * Starts the visualization of the pathfinding algorithm
 *
 * @returns {Promise<void>} - the promise to await
 */
async function visualize_button_handler() {
    'use strict';
    clear_button_handler();
    pathfindingInProgress = true;
    document.querySelector('#visualize').value = "clicked";
    disableAllButtons()
    generateGraph();
    let start = getCellPositionByClass("start");
    let end = getCellPositionByClass("end");
    let path = await algorithm.findPath(map.getNode(start[0],start[1]), map.getNode(end[0],end[1]), map);
    await displayPath(path, map);
    enableAllButtons();
    document.querySelector('#visualize').value = "not clicked";
    pathfindingInProgress = false;
}

/**
 * Starts the visualization of the recursive maze division algorithm for the wall type.
 *
 * @returns {Promise<void>} - the promise to await
 */
async function generate_maze_button_handler() {
    'use strict';
    reset_board_button_handler();
    disableAllButtons();
    let recursiveDivision = new RecursiveDivision();
    let start = getCellPositionByClass("start");
    let end = getCellPositionByClass("end");
    await recursiveDivision.generateMaze(map.getNode(start[0],start[1]), map.getNode(end[0],end[1]), map);
    enableAllButtons();
}

/**
 * Starts the visualization of the recursive maze division algorithm for the weight type.
 *
 * @returns {Promise<void>} - the promise to await
 */
async function generate_weights_button_handler() {
    'use strict';
    reset_board_button_handler();
    disableAllButtons();
    let weightMaze = new RandomWeightedMaze();
    let start = getCellPositionByClass("start");
    let end = getCellPositionByClass("end");
    await weightMaze.generateWeightMaze(map.getNode(start[0],start[1]), map.getNode(end[0],end[1]), map);
    enableAllButtons();
}

/**
 * Disables all buttons
 */
function disableAllButtons() {
    document.querySelector('#clearPath').disabled = true;
    document.querySelector('#resetBoard').disabled = true;
    document.querySelector('#visualize').disabled = true;
    document.querySelector('#generateMaze').disabled = true;
    document.querySelector('#generateWeights').disabled = true;
}

/**
 * Enables all buttons
 */
function enableAllButtons() {
    document.querySelector('#clearPath').disabled = false;
    document.querySelector('#resetBoard').disabled = false;
    document.querySelector('#visualize').disabled = false;
    document.querySelector('#generateMaze').disabled = false;
    document.querySelector('#generateWeights').disabled = false;
}

/**
 * Clears the visited nodes and the shortest path nodes in the grid.
 */
function clear_button_handler() {
    'use strict';
    if (!pathfindingInProgress) {
        $('.node-shortest-path').removeClass('node-shortest-path');
        $('.node-visited').removeClass('node-visited');
    }

}

/**
 * Resets the grid to its default settings.
 */
function reset_board_button_handler() {
    'use strict';
    clear_button_handler();
    $('.node-wall').removeClass('node-wall');
    $('.start').removeClass('start');
    $('.end').removeClass('end');
    placeStartAndEndCells();
    let table = document.querySelector('#table');
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            table.rows[i].cells[j].innerHTML = "";
        }
    }
}

/**
 * Places the start and end cells in the grid.
 */
function placeStartAndEndCells() {
    'use strict';
    document.querySelector('#table').rows[8].cells[10].classList.add("start");
    document.querySelector('#table').rows[22].cells[39].classList.add("end");
}

/**
 * Displays the path found by the algorithm
 *
 * @param path - the found path
 * @param map - the map of nodes
 * @returns {Promise<void>} - the promise to await
 */
async function displayPath(path, map) {
    'use strict';
    for (const cell of path) {
        if (cell !== path[0] && cell !== path[path.length - 1]) {
            let x = map.getRow(cell);
            let y = map.getColumn(cell);
            document.querySelector('#table').rows[x].cells[y].classList.add("node-shortest-path");
            await algorithm.pause(10);
        }
    }
}

/**
 * Binds all the buttons event listeners.
 */
function bindButtons() {
    'use strict';
    document.querySelector('#visualize').addEventListener('click', visualize_button_handler);
    document.querySelector('#clearPath').addEventListener('click', clear_button_handler);
    document.querySelector('#resetBoard').addEventListener('click', reset_board_button_handler);
    document.querySelector('#table').addEventListener('click', clear_button_handler);
    document.querySelector('#algorithms').addEventListener('change', getPathfindingAlgorithm);
    document.querySelector('#generateMaze').addEventListener('click', generate_maze_button_handler);
    document.querySelector('#generateWeights').addEventListener('click', generate_weights_button_handler);
}

function generateGraph() {
    let table = document.querySelector('#table');
    map = new Graph(table.rows.length, table.rows[0].cells.length);
    addNodes(map);
    connectNodes(map);
}

/**
 * The main entry point of the pathfinding page. Binds all the buttons, sets up the grid,
 * and sets up the pathfinding algorithm to the default one.
 *
 * @returns {Promise<void>} - the promise to await
 */
async function main() {
    'use strict';
    bindButtons();
    placeStartAndEndCells();
    generateGraph();
}

/**
 * Initializes the pathfinding page on load by calling the main method.
 *
 * @returns {Promise<void>} - the promise to await
 */
async function init() {
    'use strict';
    await main();
}

window.addEventListener("load", init);
