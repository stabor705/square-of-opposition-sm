import React, { FC, useState } from "react";
import Switch from "react-switch";
import { GraphSelector } from "./GraphViews/GraphSelector.tsx";
import './GraphManipulator.css';
import { OperationsView } from "./OperationsView.tsx";
import { NodeSelectEvent } from "../models/node.ts";
import { Node } from "./LogicalSquare.tsx";

export const GraphManipulator: FC = () => {
    const [selectedNode, setSelectedNode] = useState<number | undefined>(undefined);
    const [mode, setMode] = useState(false)

    const onNodeSelect = (event: NodeSelectEvent) => {
        console.log("onNodeSelect")
        if (event.nodes.length > 0) {
            setSelectedNode(event.nodes[0]);
        } else {
            setSelectedNode(undefined);
        }
    }

    return (
        <div className="GraphManipulator">
            <div className="graph-switch">
                <h3>Span Tree</h3>
                <Switch onChange={value => setMode(value)} checked={mode}/>
                <h3>State Machine</h3>
            </div>
            <div className="graph-manipulator-panels">
                <OperationsView selectedNode={selectedNode}/>
                <GraphSelector onNodeSelected={onNodeSelect} graphViewSelection={mode}/>
            </div>
        </div>
    )
}