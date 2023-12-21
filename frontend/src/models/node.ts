export interface NodeSelectEvent {
    node?: string
    isLeaf?: boolean
}

export interface Node {
    id: number
    label: string
    level?: number
}

export interface Edge {
    from: number
    to: number
}

export interface Graph {
    nodes: Node[]
    edges: Edge[]
}