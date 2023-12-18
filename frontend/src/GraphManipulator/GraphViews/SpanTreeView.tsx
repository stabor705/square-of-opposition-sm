import React, { FC } from "react";
import { useSpanTree } from "../../data-access/useSpanTree.ts";
import { GraphView, GraphViewProps } from "./GraphView.tsx";

export const SpanTreeView: FC<Pick<GraphViewProps, "onNodeSelected">> = (props) => {
    const spanTree = useSpanTree()
    const options = {
        layout: {
            hierarchical: {
                enabled: true
            }
        }
    }
    return <GraphView graph={spanTree} options={options} {...props}/>
}