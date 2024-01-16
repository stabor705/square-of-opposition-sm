from typing import List
import random
from itertools import combinations
from copy import deepcopy

import networkx as nx
from networkx.drawing.nx_pydot import write_dot

from square_of_opposition.primitives import State
from square_of_opposition.graph import Graph


class StateMachine(Graph):
    def __init__(self, states: List[State]):
        super().__init__()
        self._graph.add_nodes_from([str(state) for state in states])
        self._variables = { state: dict() for state in states }

    def create_transition(self, start: State, end: State):
        self._graph.add_edge(start, end)
    
    def set_variable(self, state: State, key: str, value: float):
        self._variables[state][key] = value

    def del_variable(self, state: State, key: str):
        if key in self._variables[state]:
            del self._variables[state][key]

    def add_random_transitions(self, n: int):
        for (start, end) in random.sample(list(combinations(self._graph.nodes(), 2)), n):
            self.create_transition(start, end)
    
    def serialize(self):
        serialized = super().serialize()
        serialized["variables"] = [self._variables[node] for node in self._graph.nodes]
        return serialized
