import React, { FC } from "react";
import { GraphView, GraphViewProps } from "./GraphView.tsx";
import { useStateMachine } from "../../data-access/useStateMachine.ts";

export const StateMachineView: FC<Pick<GraphViewProps, "onNodeSelected">> = (props) => {
    const stateMachine = useStateMachine()
    const options = {
        edges: {
            arrows: "to"
        }
    }
    return <GraphView graph={stateMachine} options={options} {...props}/>
}