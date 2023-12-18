import React, { FC, HTMLProps, useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import { Graph, NodeSelectEvent } from "../../models/node";
import './GraphViews.css';

export interface GraphViewProps extends HTMLProps<HTMLDivElement> {
    graph: Graph,
    options: any,
    onNodeSelected?: (node: NodeSelectEvent) => void
}

export const GraphView: FC<GraphViewProps> = (props) => {
    const {
        graph,
        options,
        onNodeSelected
    } = props
    const containerRef = useRef<HTMLDivElement>(null);
    const [network, setNetwork] = useState<Network | undefined>(undefined);

    useEffect(() => {
        if (containerRef?.current === null) {
            return;
        }
        const network = new Network(containerRef.current, graph, options);
        if (onNodeSelected !== undefined) {
            network.on('select', onNodeSelected)
        }
        setNetwork(network);
    }, [containerRef])

    useEffect(() => {
        network?.setData(graph)
    }, [graph])

    return <div ref={containerRef} className="GraphView"></div>
}