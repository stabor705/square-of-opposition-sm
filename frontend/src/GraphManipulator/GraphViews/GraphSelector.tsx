import React, { FC, useState } from 'react';
import './GraphViews.css';
import { GraphViewProps } from './GraphView.tsx';
import { SpanTreeView } from './SpanTreeView.tsx';
import { StateMachineView } from './StateMachineView.tsx';

export interface GraphSelectorProps
extends Pick<GraphViewProps, "onNodeSelected"> {
    graphViewSelection: boolean
}

export const GraphSelector: FC<GraphSelectorProps> = ({graphViewSelection, ...props}) => {
    return (
        <div className="GraphSelector">
            {!graphViewSelection && <SpanTreeView {...props}/>}
            {graphViewSelection && <StateMachineView {...props}/>}
        </div>
    );
}