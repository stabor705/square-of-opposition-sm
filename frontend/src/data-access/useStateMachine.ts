import { useState } from "react";
import { Edge, Graph, Node } from "../models/node";

const mockStateMachineNodes: Node[] = [
    { id: 2, label: "1a" },
    { id: 4, label: "1c" },
    { id: 5, label: "2a" },
    { id: 6, label: "2b" },
    { id: 8, label: "3a" },
    { id: 9, label: "3b" },
    { id: 10, label: "3c" }
]

const mockStateMachineEdges: Edge[] = [
    { from: 2, to: 5 },
    { from: 2, to: 4 },
    { from: 5, to: 6 },
    { from: 4, to: 2 },
    { from: 4, to: 6 },
    { from: 4, to: 10},
    { from: 10, to: 9},
    { from: 9, to: 10},
    { from: 9, to: 8},
    { from: 8, to: 4}
]

export const useStateMachine = () => {
    const [stateMachine, setStateMachine] = useState<Graph>({nodes: mockStateMachineNodes, edges: mockStateMachineEdges})
    
    return stateMachine
}