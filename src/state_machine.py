from typing import List
import random
from itertools import combinations

import networkx as nx
from networkx.drawing.nx_pydot import write_dot
from pyvis.network import Network

from primitives import State


class StateMachine:
    def __init__(self, states: List[State]):
        self._graph = nx.DiGraph()
        # self._graph.add_nodes_from(states)
        self._graph.add_nodes_from([str(state) for state in states])

    def create_transition(self, start: State, end: State):
        self._graph.add_edge(start, end)

    def add_random_transitions(self, n: int):
        for (start, end) in random.sample(list(combinations(self._graph.nodes(), 2)), n):
            self.create_transition(start, end)

    def draw(self):
        write_dot(self._graph, "StateMachine")
        return
        net = Network(directed=True)
        net.from_nx(self._graph)
        net.show("test.html", notebook=False)
