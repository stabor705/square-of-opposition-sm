from flask import Blueprint, g, jsonify

from square_of_opposition.span_tree import SpanTree
from square_of_opposition.square_of_opposition import SquareOfOpposition
from square_of_opposition.state_machine import StateMachine

def get_span_tree():
    if "span_tree" not in g:
        span_tree = SpanTree()
        first = SquareOfOpposition(
            "Taxiing", "Immobilising", "Stop", "~Immobilising")
        second = SquareOfOpposition("Engine on", "Open", "Engine off", "Steps")
        third = SquareOfOpposition("Unloading", "Locked", "Empty", "Cleaned")
        span_tree.expand(first.to_list_of_states())
        span_tree.expand(second.to_list_of_states())
        span_tree.expand(third.to_list_of_states())
        g.span_tree = span_tree
    return g.span_tree

def get_state_machine():
    if "state_machine" not in g:
        span_tree = SpanTree()
        first = SquareOfOpposition(
            "Taxiing", "Immobilising", "Stop", "~Immobilising")
        second = SquareOfOpposition("Engine on", "Open", "Engine off", "Steps")
        third = SquareOfOpposition("Unloading", "Locked", "Empty", "Cleaned")
        span_tree.expand(first.to_list_of_states())
        span_tree.expand(second.to_list_of_states())
        span_tree.expand(third.to_list_of_states())
        state_machine = StateMachine(span_tree.get_leaf_states())
        state_machine.add_random_transitions(8)
        g.state_machine = state_machine
    return g.state_machine


bp = Blueprint('graphs', __name__)

@bp.get('/span_tree')
def get_span_tree_endpoint():
    return jsonify(get_span_tree().serialize())

@bp.get('/state_machine')
def get_state_machine_endpoint():
    return jsonify(get_state_machine().serialize())