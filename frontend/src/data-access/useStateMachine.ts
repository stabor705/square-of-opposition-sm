import { useEffect, useState } from "react";
import { Graph } from "../models/node";

export const useStateMachine = () => {
    const [stateMachine, setStateMachine] = useState<Graph>()

    useEffect(() => {
        fetch('http://localhost:5000/state_machine') // TODO: do not hardcode
            .then(res => res.json() as Promise<Graph>)
            .then(data => setStateMachine(data))
            .catch(console.error) // TODO: implement visual error handling
    }, [])
    
    return stateMachine
}