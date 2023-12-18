import { useEffect, useState } from "react";
import { Graph } from "../models/node";

export const useSpanTree = () => {
    const [spanTree, setSpanTree] = useState<Graph>()

    useEffect(() => {
        fetch('http://localhost:5000/span_tree') // TODO: do not hardcode
            .then(res => res.json() as Promise<Graph>)
            .then(data => {
                console.log(data)
                setSpanTree(data)
            })
            .catch(console.error) // TODO: implement visual error handling
    }, [])

    return spanTree
}