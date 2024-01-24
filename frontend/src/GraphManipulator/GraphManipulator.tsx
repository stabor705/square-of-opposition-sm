import React, { FC, useEffect, useState } from "react";
import Switch from "react-switch";
import './GraphManipulator.css';
import { Graph, NodeSelectEvent } from "../models/node.ts";
import { expandSpanTree, fetchSpanTree } from "../data-access/spanTreeService.ts";
import { createStateMachineTransition, deleteStateMachineTransition, deleteStateMachineVariable, fetchStateMachine, setStateMachineVariable } from "../data-access/stateMachineService.ts";
import { StateMachineView } from "./GraphViews/StateMachineView.tsx";
import { SpanTreeView } from "./GraphViews/SpanTreeView.tsx";
import { LogicalSquare, Square } from "./Controllers/LogicalSquare.tsx";
import { StateMachineController } from "./Controllers/StateMachineController.tsx";
import { StateMachine } from "../models/stateMachine.ts";

export const GraphManipulator: FC = () => {
    const [selectedNode, setSelectedNode] = useState<string | undefined>(undefined);
    const [spanTree, setSpanTree] = useState<Graph>({nodes: [], edges: []})
    const [stateMachine, setStateMachine] = useState<StateMachine>({nodes: [], edges: [], variables: []})
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

    const onTransitionAdded = (to: string) => {
        if (selectedNode === undefined) {
            return
        }

        createStateMachineTransition(selectedNode, to)
            .then(setStateMachine)
            .catch(console.error)
    }

    const onTransitionRemoved = (to: string) => {
        if (selectedNode === undefined) {
            return
        }

        deleteStateMachineTransition(selectedNode, to)
            .then(setStateMachine)
            .catch(console.error)
    }

    const onVariableSet = (key: string, value: number) => {
        if (selectedNode === undefined) {
            return
        }

        setStateMachineVariable(selectedNode, key, value)
            .then(setStateMachine)
            .catch(console.error)
    }
    const onVariableRemoved = (key: string) => {
        if (selectedNode === undefined) {
            return
        }

        deleteStateMachineVariable(selectedNode, key)
            .then(setStateMachine)
            .catch(console.error)
    }

    const Graph = mode ? StateMachineView : SpanTreeView
    const graph = mode ? stateMachine : spanTree
    const emptyState = mode ? (
        <div className="EmptyState">Select state</div>
    ) : (
        <div className="EmptyState">Select a leaf node by clicking on it</div>
    )
    const selectedNodeIdx = stateMachine.nodes.findIndex(node => node.label === selectedNode)
    const transitions = stateMachine.edges.filter(edge => edge.from === selectedNodeIdx)
        .map(edge => edge.to)
        .map(nodeIdx => stateMachine.nodes[nodeIdx].label)
    const availableTransitions = stateMachine.nodes
        .filter(node => (
            stateMachine.edges
                .find(edge => (
                    edge.from === selectedNodeIdx && edge.to === node.id
                )) === undefined
            )
        )
        .map(node => node.label)

    return (
        <div className="GraphManipulator">
            <div className="graph-switch">
                <h3>Span Tree</h3>
                    <Switch onChange={value => setMode(value)} checked={mode}/>
                <h3>State Machine</h3>
            </div>
            <div className="graph-manipulator-panels">
                <div className="OperationsView">
                    {(selectedNode !== undefined)
                        ? (
                            mode
                            ? <StateMachineController
                                availableTransitions={availableTransitions}
                                onTransitionAdded={onTransitionAdded}
                                onTransitionRemoved={onTransitionRemoved}
                                transitions={transitions}
                                onVariableRemoved={onVariableRemoved}
                                onVariableSet={onVariableSet}
                                variables={stateMachine.variables[selectedNodeIdx]}
                            />
                            : <LogicalSquare selectedNode={selectedNode} onSubmit={onSquareSubmit}/>
                        )
                        : emptyState
                    }
                </div>
                <div className="GraphSelector">
                    <Graph onNodeSelected={onNodeSelect} graph={graph}/>
                </div>
            </div>
        </div>
    )
}