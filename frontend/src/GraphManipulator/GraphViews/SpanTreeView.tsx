import React, { FC } from "react";
import { GraphView, GraphViewProps } from "./GraphView.tsx";

export const SpanTreeView: FC<Omit<GraphViewProps, "options">> = (props) => {
    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                nodeSpacing: 200,
                levelSeparation: 100
            }
        }
    }

    return <GraphView options={options} {...props}/>
}