export default class Graph {
    constructor() {
        'use strict';
        this.nodes = [];
        this.adjacencyList = [];
    }

    addNode(node) {
        'use strict';
        this.nodes.push(node);
        this.adjacencyList[node] = [];
    }

    addEdge(node1, node2, weight) {
        'use strict';
        if (!this.containsEdge(node1, node2)) {
            this.adjacencyList[node1].push({node:node2, weight: weight});
        }
        if (!this.containsEdge(node2, node1)) {
            this.adjacencyList[node2].push({node:node1, weight: weight});
        }
    }

    getNode(row, column) {
        'use strict';
        return (50 * row) + column;
    }

    getRow(node) {
        'use strict';
        return Math.floor(node / 50);
    }

    getColumn(node) {
        'use strict';
        return node % 50;
    }

    containsEdge(node1, node2) {
        'use strict';
        return this.adjacencyList[node1].some(x => x.node === node2);

    }
}