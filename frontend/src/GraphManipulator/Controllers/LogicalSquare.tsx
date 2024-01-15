import React, { FC, useState } from "react";
import './Controllers.css';

export type Node = string;

export interface Square {
    top_left: string
    top_right: string
    bot_right: string
    bot_left: string
}

export interface LogicalSquareProps {
    selectedNode: Node
    onSubmit: (square: Square) => void
}

export const LogicalSquare: FC<LogicalSquareProps> = (props) => {
    const [ topLeft, setTopLeft ] = useState("");
    const [ topRight, setTopRight ] = useState("");
    const [ bottomRight, setBottomRight ] = useState("");
    const [ bottomLeft, setBottomLeft ] = useState("");

    const validate = () => {
        return topLeft.length > 0 &&
            topRight.length > 0 &&
            bottomRight.length > 0 &&
            bottomLeft.length > 0
    }

    return (<>
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
            <div className="buttons-panel">
                <button className="primary-button" onClick={() => {
                    if (validate()) {
                        props.onSubmit({
                            top_left: topLeft,
                            top_right: topRight,
                            bot_right: bottomRight,
                            bot_left: bottomLeft
                        })
                    }
                }}>
                    Submit
                </button>
            </div>
        </div>
    </>)
}