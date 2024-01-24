import { StateMachine } from "../models/stateMachine";

// TODO: Deduplicate mapping

export function fetchStateMachine(): Promise<StateMachine> {
    return fetch('http://localhost:5000/state_machine') // TODO: do not hardcode
        .then(res => res.json())
        .then(res => ({...res, ['variables']: res['variables'].map(obj => new Map(Object.entries(obj)))}) as Promise<StateMachine>)
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
    .then(res => res.json())
    .then(res => ({...res, ['variables']: res['variables'].map(obj => new Map(Object.entries(obj)))}) as Promise<StateMachine>)
}

export function deleteStateMachineTransition(from: string, to: string): Promise<StateMachine> {
    return fetch(`http://localhost:5000/state_machine/transitions/${from}/${to}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => ({...res, ['variables']: res['variables'].map(obj => new Map(Object.entries(obj)))}) as Promise<StateMachine>)
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
    .then(res => res.json())
    .then(res => ({...res, ['variables']: res['variables'].map(obj => new Map(Object.entries(obj)))}) as Promise<StateMachine>)
}

export function deleteStateMachineVariable(state: string, key: string) {
    return fetch(`http://localhost:5000/state_machine/${state}/variables/${key}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => ({...res, ['variables']: res['variables'].map(obj => new Map(Object.entries(obj)))}) as Promise<StateMachine>)
}