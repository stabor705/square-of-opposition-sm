import React, { FC, useState } from "react";

export interface VariablesPanelProps {
    variables: Map<string, number>
    onVariableSet: (key: string, value: number) => void
    onVariableRemoved: (key: string) => void
}

const VariablesPanel: FC<VariablesPanelProps> = (props) => {
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")

    const validateVariable = (key: string, value: string): boolean => {
        if (key.length === 0 || value.length === 0) {
            return false
        }
        const decimalRegex = /^\d+(\.\d+)?$/
        if (!decimalRegex.test(value)) {
            return false
        }
        return true
    }

    const addVariable = () => {
        if (!validateVariable(key, value)) {
            console.error(`Variable ${key}: ${value} is invalid!`)
            return
        }

        props.onVariableSet(key, parseFloat(value))
        setKey("")
        setValue("")
    }

    return (
        <div className="variables-panel">
            <h3>Variables</h3>
            {[...props.variables.entries()].map(([key, value]) => (
                <ul>
                    <li key={key} className="variables-list-item">
                        <span>{key}={value}</span>
                        <button
                            className="remove-button"
                            onClick={() => props.onVariableRemoved(key)}
                        >
                            -
                        </button>
                    </li>
                </ul>
            ))}
            <div className="variable-add">
                <input type="text" onChange={e => setKey(e.target.value)} value={key}/>
                <span>-</span>
                <input type="text" onChange={e => setValue(e.target.value)} value={value}/>
                <button className="primary-button" onClick={addVariable}>
                    Add variable
                </button>
            </div>
        </div>
    )
}

export interface TransitionsPanelProps {
    availableTransitions: string[]
    transitions: string[]
    onTransitionAdded: (to: string) => void
    onTransitionRemoved: (to: string) => void
}

export const TransitionsPanel: FC<TransitionsPanelProps> = (props) => {
    const [newTransition, setNewTransition] = useState<string>(props.availableTransitions[0])
    
    return (
        <div>
            <h3>Transitions</h3>
            {props.transitions.map((transition, idx) => (
                <ul key={`transition-list-item-${idx}`}>
                    <li className="transition-list-item">
                        <span>Transition to {transition}</span>
                        <button
                            className="remove-button"
                            onClick={() => props.onTransitionRemoved(transition)}
                        >
                            -
                        </button>
                    </li>
                </ul>
            ))}
            <div className="transition-add-panel">
                <span>To</span>
                <select name="transition" id="transition-select" onChange={e => {
                    setNewTransition(e.target.value)
                }}>
                    {props.availableTransitions.map(transition => (
                        <option value={transition} key={transition}>{transition}</option>
                    ))}
                </select>
                <button className="primary-button" onClick={() => {
                    props.onTransitionAdded(newTransition)
                }}>
                    Add transition
                </button>
            </div>
        </div>
    )
}

export type StateMachineControllerProps = TransitionsPanelProps & VariablesPanelProps

export const StateMachineController: FC<StateMachineControllerProps> = (props) => {
    return (
        <div className="state-machine-controller">
            <VariablesPanel variables={props.variables} onVariableSet={props.onVariableSet} onVariableRemoved={props.onVariableRemoved}/>
            <TransitionsPanel availableTransitions={props.availableTransitions} onTransitionAdded={props.onTransitionAdded} transitions={props.transitions} onTransitionRemoved={props.onTransitionRemoved}/>
        </div>
    )
}