import { useState } from "react";
import { Network } from "vis-network";
import { Edge, Graph, Node } from "../models/node";

const mockSpanTreeNodes: Node[] = [
    { id: 1, label: "0", level: 0},
    { id: 2, label: "1a", level: 1},
    { id: 3, label: "1b", level: 1},
    { id: 4, label: "1c", level: 1},
    { id: 5, label: "2a", level: 2},
    { id: 6, label: "2b", level: 2},
    { id: 7, label: "2c", level: 2},
    { id: 8, label: "3a", level: 3},
    { id: 9, label: "3b", level: 3},
    { id: 10, label: "3c", level: 3},
]

const mockSpanTreeEdges: Edge[] = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 3, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 7, to: 8 },
    { from: 7, to: 9 },
    { from: 7, to: 10 }
]

export const useSpanTree = () => {
    const [spanTree, setSpanTree] = useState<Graph>({nodes: mockSpanTreeNodes, edges: mockSpanTreeEdges})

    return spanTree
}