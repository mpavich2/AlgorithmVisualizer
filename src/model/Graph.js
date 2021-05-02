/**
 * The graph class that manages the nodes.
 */
export default class Graph {
    /**
     * The default constructor for graph. Instantiates a new instance of the graph.
     */
    constructor(rows, columns) {
        'use strict';
        this.nodes = [];
        this.adjacencyList = [];
        this.rows = rows;
        this.columns = columns;
    }

    /**
     * Adds a new node to the graph.
     *
     * @param node - the node to add
     */
    addNode(node) {
        'use strict';
        this.nodes.push(node);
        this.adjacencyList[node] = [];
    }

    /**
     * Adds an edge between the two nodes with the specified weight
     *
     * @param node1 - the first node
     * @param node2 - the second node
     * @param weight - the weight between the nodes
     */
    addEdge(node1, node2, weight) {
        'use strict';
        if (!this.containsEdge(node1, node2)) {
            this.adjacencyList[node1].push({node:node2, weight: weight});
        }
        if (!this.containsEdge(node2, node1)) {
            this.adjacencyList[node2].push({node:node1, weight: weight});
        }
    }

    /**
     * Gets the node index at the specified coordinates
     *
     * @param row - the specified row
     * @param column - the specified column
     * @returns the node index
     */
    getNode(row, column) {
        'use strict';
        return (50 * row) + column;
    }

    /**
     * Gets the row of the specified node index
     *
     * @param node - the node index
     * @returns the row the node is on
     */
    getRow(node) {
        'use strict';
        return Math.floor(node / 50);
    }

    /**
     * Gets the count of rows in the graph
     *
     * @returns the row count
     */
    getRowCount() {
        'use strict';
        return this.rows;
    }

    /**
     * Gets the column of the specified node index
     *
     * @param node - the node index
     * @returns the column the node is on
     */
    getColumn(node) {
        'use strict';
        return node % 50;
    }

    /**
     * Gets the count of columns in the graph
     *
     * @returns {*}
     */
    getColumnCount() {
        'use strict';
        return this.columns;
    }

    /**
     * Check if there is an edge between the specified nodes
     *
     * @param node1 - the first node
     * @param node2 - the second node
     * @returns True if there is an edge. False if there is no edge.
     */
    containsEdge(node1, node2) {
        'use strict';
        return this.adjacencyList[node1].some(x => x.node === node2);

    }
}