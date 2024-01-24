from typing import List
import random
from copy import deepcopy

import networkx as nx
from networkx.drawing.nx_pydot import graphviz_layout
from networkx.drawing.nx_pydot import write_dot

from square_of_opposition.primitives import State
from square_of_opposition.graph import Graph


class SpanTree(Graph):
    INITIAL_NODE = "INIT"

    def __init__(self):
        super().__init__()

        self.expantion_nodes = [SpanTree.INITIAL_NODE]
        self._depth = 0
        self._graph.add_node(self.expantion_nodes[0], level=self._depth, label=str(self.expantion_nodes[0]))

    def expand(self, new_states: List[State], expanded_leaf: State = None):
        # TODO: check if leaf is correct

        # TODO: remove demo random choosing
        if expanded_leaf is None:
            expanded_leaf = random.choice(self.expantion_nodes)
        self.expantion_nodes = new_states
        self._depth += 1
        for new_state in new_states:
            self._graph.add_node(new_state, level=self._depth, label=str(new_state))
        self._graph.add_edges_from([(expanded_leaf, new_state)
                                  for new_state in new_states])

    def get_leaf_states(self) -> List[State]:
        return [node for node in self._graph.nodes() if self._graph.degree(node) == 1]

    def serialize(self):
        return super().serialize(["level"])
