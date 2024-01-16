import { Graph } from "../models/node";
import { StateMachine } from "../models/stateMachine";

export function fetchStateMachine(): Promise<StateMachine> {
    return fetch('http://localhost:5000/state_machine') // TODO: do not hardcode
        .then(res => res.json() as Promise<StateMachine>)
}

export function createStateMachineTransition(from: string, to: string): Promise<StateMachine> {
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
    .then(res => res.json() as Promise<StateMachine>)
}

export function setStateMachineVariable(state: string, key: string, value: number): Promise<StateMachine> {
    return fetch(`http://localhost:5000/state_machine/${state}/variables`, {
        method: 'POST',
        body: JSON.stringify({
            key: key,
            value: value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json() as Promise<StateMachine>)
}

export function deleteStateMachineVariable(state: string, key: string) {
    return fetch(`http://localhost:5000/state_machine/${state}/variables/${key}`, {
        method: 'DELETE',
    })
    .then(res => res.json() as Promise<StateMachine>)
}