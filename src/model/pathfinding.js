import Dijkstra from "./algorithms/pathfinding/Dijkstra.js";
import AStar from "./algorithms/pathfinding/AStar.js";
import GreedyBestFirst from "./algorithms/pathfinding/GreedyBestFirst.js";
import BreadthFirstSearch from "./algorithms/pathfinding/BreadthFirstSearch.js";
import DepthFirstSearch from "./algorithms/pathfinding/DepthFirstSearch.js";
import Graph from "./Graph.js";

function addNodes(graph) {
    'use strict';
    let table = document.querySelector('#table');
    let currentNode = 0;
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].className !== "highlight") {
                graph.addNode(currentNode);
            }
            currentNode++;
        }
    }
}

function connectNodes(graph) {
    'use strict';
    let table = document.querySelector('#table');
    let currentNode = 0;
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].className !== "highlight") {
                if (j !== 0 && table.rows[i].cells[j-1].className !== "highlight") {
                    graph.addEdge(currentNode, currentNode - 1, 1);
                }
                if (i !== 0 && table.rows[i-1].cells[j].className !== "highlight") {
                    graph.addEdge(currentNode, currentNode - 50, 1);
                }
                if (j !== table.rows[i].cells.length - 1 && table.rows[i].cells[j+1].className !== "highlight") {
                    graph.addEdge(currentNode, currentNode + 1, 1);
                }
                if (i !== table.rows.length - 1 && table.rows[i+1].cells[j].className !== "highlight") {
                    graph.addEdge(currentNode, currentNode + 50, 1);
                }
            }
            currentNode++;
        }
    }
}

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

async function getPath(algorithmName, map) {
    'use strict';
    let path;
    let start = getCellPositionByClass("start");
    let end = getCellPositionByClass("end");
    let algorithm;
    if (algorithmName === "A*") {
        algorithm = new AStar();
        path = await algorithm.findPath(map.getNode(start[0],start[1]), map.getNode(end[0],end[1]), map);
    } else if (algorithmName === "Dijkstra") {
        algorithm = new Dijkstra();
        path = await algorithm.findPath(map.getNode(start[0],start[1]), map.getNode(end[0],end[1]), map);
    } else if (algorithmName === "BFS") {
        algorithm = new BreadthFirstSearch();
        path = await algorithm.findPath(map.getNode(start[0],start[1]), map.getNode(end[0],end[1]), map);
    } else if (algorithmName === "DFS") {
        algorithm = new DepthFirstSearch();
        path = await algorithm.findPath(map.getNode(start[0],start[1]), map.getNode(end[0],end[1]), map);
    } else if (algorithmName === "GBF") {
        algorithm = new GreedyBestFirst();
        path = await algorithm.findPath(map.getNode(start[0],start[1]), map.getNode(end[0],end[1]), map);
    }
    return path;
}

async function visualize_button_handler() {
    'use strict';
    document.querySelector('#visualize').value = "clicked";
    clear_button_handler();
    disableAllButtons()
    let map = new Graph();
    addNodes(map);
    connectNodes(map);
    let path = await getPath(document.querySelector('#algorithms').value, map);
    await displayPath(path, map);
    enableAllButtons();
}

function disableAllButtons() {
    document.querySelector('#clearPath').disabled = true;
    document.querySelector('#resetBoard').disabled = true;
    document.querySelector('#visualize').disabled = true;
}

function enableAllButtons() {
    document.querySelector('#clearPath').disabled = false;
    document.querySelector('#resetBoard').disabled = false;
    document.querySelector('#visualize').disabled = false;
}

function clear_button_handler() {
    'use strict';
    $('.path').removeClass('path');
    $('.searched').removeClass('searched');
    document.querySelector('#visualize').value = "not clicked";
}

function reset_board_button_handler() {
    'use strict';
    clear_button_handler();
    $('.highlight').removeClass('highlight');
    $('.start').removeClass('start');
    $('.end').removeClass('end');
    placeStartAndEndCells();
}

function placeStartAndEndCells() {
    'use strict';
    document.querySelector('#table').rows[15].cells[5].classList.add("start");
    document.querySelector('#table').rows[15].cells[40].classList.add("end");
}

async function displayPath(path, map) {
    'use strict';
    for (const cell of path) {
        if (cell !== path[0] && cell !== path[path.length - 1]) {
            let x = map.getRow(cell);
            let y = map.getColumn(cell);
            document.querySelector('#table').rows[x].cells[y].classList.add("path");
            await timer(1);
        }
    }
}

function bindButtons() {
    'use strict';
    document.querySelector('#visualize').addEventListener('click', visualize_button_handler);
    document.querySelector('#clearPath').addEventListener('click', clear_button_handler);
    document.querySelector('#resetBoard').addEventListener('click', reset_board_button_handler);
}

async function timer(ms) {
    'use strict';
    return new Promise(res => setTimeout(res, ms));
}

async function main() {
    'use strict';
    bindButtons();
    placeStartAndEndCells();
}

async function init() {
    'use strict';
    await main();
}

window.addEventListener("load", init);
