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

export const TransitionsPanel: FC = () => {
    const [transitions, setTransitions] = useState<Array<string>>([])
    const [newTransition, setNewTransition] = useState<string>("A")
    
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
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
                <button className="primary-button" onClick={() => {
                    setTransitions(transitions.concat(newTransition))
                }}>
                    Add transition
                </button>
            </div>
        </div>
    )
}

export const StateMachineController: FC = () => {
    return (
        <div className="state-machine-controller">
            <VariablesPanel/>
            <TransitionsPanel/>
        </div>
    )
}