import { Graph } from "../models/node";

export function fetchStateMachine(): Promise<Graph> {
    return fetch('http://localhost:5000/state_machine') // TODO: do not hardcode
        .then(res => res.json() as Promise<Graph>)
}

export function createStateMachineTransition(from: string, to: string): Promise<Graph> {
    return fetch('http://localhost:5000/state_machine', {
        method: 'PATCH',
        body: JSON.stringify({
            from: from,
            to: to
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