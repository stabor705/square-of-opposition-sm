import React, { FC } from "react";
import { GraphView, GraphViewProps } from "./GraphView.tsx";
import { useStateMachine } from "../../data-access/useStateMachine.ts";

export const StateMachineView: FC<Omit<GraphViewProps, "options">> = (props) => {
    const options = {
        edges: {
            arrows: "to"
        }
    }
    return <GraphView options={options} {...props}/>
}