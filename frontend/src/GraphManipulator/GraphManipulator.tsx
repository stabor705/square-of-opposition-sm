import React, { FC, useEffect, useState } from "react";
import Switch from "react-switch";
import './GraphManipulator.css';
import { Graph, NodeSelectEvent } from "../models/node.ts";
import { expandSpanTree, fetchSpanTree } from "../data-access/spanTreeService.ts";
import { fetchStateMachine } from "../data-access/stateMachineService.ts";
import { StateMachineView } from "./GraphViews/StateMachineView.tsx";
import { SpanTreeView } from "./GraphViews/SpanTreeView.tsx";
import { LogicalSquare, Square } from "./Controllers/LogicalSquare.tsx";
import { StateMachineController } from "./Controllers/StateMachineController.tsx";

export const GraphManipulator: FC = () => {
    const [selectedNode, setSelectedNode] = useState<string | undefined>(undefined);
    const [spanTree, setSpanTree] = useState<Graph>({nodes: [], edges: []})
    const [stateMachine, setStateMachine] = useState<Graph>({nodes: [], edges: []})
    const [mode, setMode] = useState(false)

    useEffect(() => {
        fetchSpanTree()
            .then(data => setSpanTree(data))
        fetchStateMachine()
            .then(data => setStateMachine(data))
    }, [])


    const onNodeSelect = (event: NodeSelectEvent) => {
        setSelectedNode(event.node)
    }

    const onSquareSubmit = (square: Square) => {
        if (selectedNode === undefined) {
            return
        }

        expandSpanTree(square, selectedNode)
            .then(data => setSpanTree(data))
        fetchStateMachine()
            .then(data => setStateMachine(data))
        setSelectedNode(undefined)
    }

    const Graph = mode ? StateMachineView : SpanTreeView
    const graph = mode ? stateMachine : spanTree
    const Controller = mode ? StateMachineController : LogicalSquare
    const emptyState = mode ? (
        <div className="EmptyState">Select state</div>
    ) : (
        <div className="EmptyState">Select a leaf node by clicking on it</div>
    )

    return (
        <div className="GraphManipulator">
            <div className="graph-switch">
                <h3>Span Tree</h3>
                    <Switch onChange={value => setMode(value)} checked={mode}/>
                <h3>State Machine</h3>
            </div>
            <div className="graph-manipulator-panels">
                <div className="OperationsView">
                    {(selectedNode !== undefined) ? <Controller selectedNode={selectedNode} onSubmit={onSquareSubmit}/> : emptyState}
                </div>
                <div className="GraphSelector">
                    <Graph onNodeSelected={onNodeSelect} graph={graph}/>
                </div>
            </div>
        </div>
    )
}