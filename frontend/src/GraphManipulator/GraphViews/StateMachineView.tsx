import React, { FC } from "react";
import { GraphView, GraphViewProps } from "./GraphView.tsx";

export const StateMachineView: FC<Omit<GraphViewProps, "options">> = (props) => {
    const options = {
        edges: {
            arrows: "to"
        },
        layout: {
            randomSeed: 6009
        }
    }
    return <GraphView options={options} {...props}/>
}