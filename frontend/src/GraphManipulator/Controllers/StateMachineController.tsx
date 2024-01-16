import React, { FC, useState } from "react";

const updated = <T,>(arr: Array<T>, newValue: T, idx: number): Array<T> => {
    return arr.map((value, i) => {
        if (i === idx) {
            return newValue
        } 
        return value
    })
}

const elementRemoved = <T,>(arr: Array<T>, idx: number): Array<T> => {
    return arr.filter((_, i) => i !== idx)
}

export interface VariablesPanelProps {
    variables: Map<string, number>
    onVariableSet: (key: string, value: number) => void
    onVariableRemoved: (key: string) => void
}

const VariablesPanel: FC = () => {
    const [variableNames, setVariableNames] = useState<Array<string>>([])
    const [variableValues, setVariableValues] = useState<Array<number>>([])

    const addVariable = () => {
        if (variableNames.includes("")) {
            return
        }
        setVariableNames(variableNames.concat(""))
        setVariableValues(variableValues.concat(0))
        console.log(variableNames)
        console.log(variableValues)
    }


    return (
        <div className="variables-panel">
            <h3>Variables</h3>
            {variableNames.map((name, idx) => (
                <div key={`variable-list-item-${idx}`} className="variable-list-item">
                    <input type="text" value={name} onChange={e => {
                        if (e.target.value === "") {
                            return
                        }
                        setVariableNames(updated(variableNames, e.target.value, idx))
                    }}/>
                    <span>-</span>
                    <input type="text" value={variableValues[idx]} onChange={e => {
                        setVariableValues(updated(variableValues, parseFloat(e.target.value), idx))
                    }}/>
                    <button className="button" onClick={() => {
                        setVariableNames(elementRemoved(variableNames, idx))
                        setVariableValues(elementRemoved(variableValues, idx))
                    }}>
                        -
                    </button>
                </div>
            ))}
            <button onClick={addVariable} className="primary-button">
                Add variable
            </button>
        </div>
    )
}

export interface TransitionsPanelProps {
    availableTransitions: string[]
    onTransitionAdded: (to: string) => void
}

export const TransitionsPanel: FC<TransitionsPanelProps> = (props) => {
    const [transitions, setTransitions] = useState<Array<string>>([])
    const [newTransition, setNewTransition] = useState<string>(props.availableTransitions[0])
    
    return (
        <div>
            <h3>Transitions</h3>
            {transitions.map((transition, idx) => (
                <ul key={`transition-list-item-${idx}`}>
                    <li className="transition-list-item">
                        <span>Transitions to {transition}</span>
                        <button onClick={() => {
                            setTransitions(elementRemoved(transitions, idx))
                        }}>
                            -
                        </button>
                    </li>
                </ul>
            ))}
            <div className="transition-add-panel">
                <span>Transition to</span>
                <select name="transition" id="transition-select" onChange={e => {
                    setNewTransition(e.target.value)
                }}>
                    {props.availableTransitions.map(transition => (
                        <option value={transition} key={transition}>{transition}</option>
                    ))}
                </select>
                <button className="primary-button" onClick={() => {
                    props.onTransitionAdded(props.selectedNode, newTransition)
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
            <VariablesPanel/>
            <TransitionsPanel availableTransitions={props.availableTransitions} onTransitionAdded={props.onTransitionAdded}/>
        </div>
    )
}