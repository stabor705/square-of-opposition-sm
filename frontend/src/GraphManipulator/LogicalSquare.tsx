import React, { FC, HTMLProps, useState } from "react";
import './GraphManipulator.css';

export type Node = number;

export interface LogicalSquareProps extends HTMLProps<HTMLDivElement> {
    selectedNode: Node
}

export const LogicalSquare: FC<LogicalSquareProps> = (props) => {
    const [ topLeft, setTopLeft ] = useState("");
    const [ topRight, setTopRight ] = useState("");
    const [ bottomRight, setBottomRight ] = useState("");
    const [ bottomLeft, setBottomLeft ] = useState("");

    return (
        <div className="LogicalSquare">
            <div className="inputs">
                <input type="text" onChange={e => setTopLeft(e.target.value)}/>
                <input type="text" onChange={e => setTopRight(e.target.value)}/>
                <input type="text" onChange={e => setBottomRight(e.target.value)}/>
                <input type="text" onChange={e => setBottomLeft(e.target.value)}/>
            </div>
            <img src="square.svg" className="square"/>
            <div className="relations">
                <div className="relation">contrary</div>
                <div className="relation">
                    <div>subalternation</div>
                    <div>superalternation</div>
                </div>
                <div className="relation">
                    <div>subalternation</div>
                    <div>superalternation</div>
                </div>
                <div className="relation">contradictory</div>
                <div className="relation">subcontrary</div>
            </div>
        </div>
    )
}