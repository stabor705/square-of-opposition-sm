import { Square } from "../GraphManipulator/Controllers/LogicalSquare"
import { Graph } from "../models/node"

export function fetchSpanTree(): Promise<Graph> {
    return fetch('http://localhost:5000/span_tree') // TODO: do not hardcode
        .then(res => res.json() as Promise<Graph>)
}

export function expandSpanTree(square: Square, leaf: string) {
    return fetch('http://localhost:5000/span_tree', {
        method: 'PATCH',
        body: JSON.stringify({
            square: square,
            leaf: leaf
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json() as Promise<Graph>)
    .then(data => {
        return data
    })
}
