import { Graph } from "./node";

export interface StateMachine extends Graph {
    variables: Array<Map<string, number>>
}