from typing import List
import random

import pydot
import networkx as nx
from networkx.drawing.nx_pydot import graphviz_layout
from networkx.drawing.nx_pydot import write_dot
import matplotlib.pyplot as plt

from primitives import State


class SpanTree:
    INITIAL_NODE = "INIT"

    def __init__(self):
        self.expantion_nodes = [SpanTree.INITIAL_NODE]
        self._tree = nx.Graph()
        self._tree.add_node(self.expantion_nodes[0])

    def expand(self, new_states: List[State], expanded_leaf: State = None):
        # TODO: check if leaf is correct

        # TODO: remove demo random choosing
        if expanded_leaf is None:
            expanded_leaf = random.choice(self.expantion_nodes)
        self.expantion_nodes = new_states
        self._tree.add_edges_from([(expanded_leaf, new_state)
                                  for new_state in new_states])

    def get_leaf_states(self) -> List[State]:
        return [node for node in self._tree.nodes() if self._tree.degree(node) == 1]

    def draw(self):
        options = {
            "node_color": "white",
            "edgecolors": "white",
            "node_size": 2500,
        }
        pos = graphviz_layout(self._tree, prog="dot")
        nx.draw_networkx(self._tree, pos, **options)
        plt.show()
        write_dot(self._tree, "SpanTree")
