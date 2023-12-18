from typing import List

import networkx as nx

class Graph:
    DEFAULT_ATTRIBS = ["label"]

    def __init__(self):
        self._graph = nx.DiGraph()

    def serialize(self, additional_attribs: List[str] = []):
        indexed_graph = nx.convert_node_labels_to_integers(self._graph, label_attribute="label")

        def map_to_serialized_node(idx, attribs):
            attrib_names = additional_attribs + Graph.DEFAULT_ATTRIBS
            serialized_node = { key: str(val) for key, val in attribs.items() if key in attrib_names }
            serialized_node["id"] = idx
            return serialized_node
        
        def map_to_serialized_edge(v, w, attribs):
            return {
                "from": v,
                "to": w
            }

        serialized_nodes = [map_to_serialized_node(idx, attribs) for idx, attribs in indexed_graph.nodes.data()]
        serialized_edges = [map_to_serialized_edge(v, w, attribs) for v, w, attribs in indexed_graph.edges.data()]

        return {
            "nodes": serialized_nodes,
            "edges": serialized_edges
        }
