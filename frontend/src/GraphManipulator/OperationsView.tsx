import React, { FC } from "react";
import { LogicalSquare, LogicalSquareProps } from "./LogicalSquare.tsx";
import './GraphManipulator.css'

export interface OperationsViewProps extends Partial<LogicalSquareProps> {}

export const OperationsView: FC<OperationsViewProps> = (props) => {
    const content = props.selectedNode === undefined ?
        <div className="EmptyState">
            Select a node by clicking on it.
        </div>
    :   
        <LogicalSquare selectedNode={props.selectedNode}/>

    return (
        <div className="OperationsView">
            {content}
        </div>
    )
}