from flask import Blueprint, g, jsonify, request

from square_of_opposition.span_tree import SpanTree
from square_of_opposition.square_of_opposition import SquareOfOpposition
from square_of_opposition.state_machine import StateMachine

span_tree = SpanTree()
state_machine = StateMachine(span_tree.get_leaf_states())

bp = Blueprint('graphs', __name__)

@bp.get('/span_tree')
def get_span_tree_endpoint():
    return jsonify(span_tree.serialize())

@bp.get('/state_machine')
def get_state_machine_endpoint():
    return jsonify(state_machine.serialize())

@bp.patch('/span_tree')
def patch_span_tree_endpoint():
    global state_machine

    data = request.get_json()

    # TODO: validation

    square_data = data["square"]
    square = SquareOfOpposition(
        square_data["top_left"],
        square_data["top_right"],
        square_data["bot_right"],
        square_data["bot_left"]
    )
    leaf = data["leaf"]

    span_tree.expand(square.to_list_of_states(), leaf)
    state_machine = StateMachine(span_tree.get_leaf_states())
    return jsonify(span_tree.serialize())

@bp.patch('/state_machine')
def patch_state_machine_endpoint():
    data = request.get_json()

    start_node = data["from"]
    end_node = data["to"]

    state_machine.create_transition(start_node, end_node)
    return jsonify(state_machine.serialize())

@bp.delete('/state_machine/<state>/variables/<variable>')
def delete_variable(state, variable):
    state_machine.del_variable(state, variable)
    return jsonify(state_machine.serialize())

@bp.post('/state_machine/<state>/variables')
def set_variable(state):
    data = request.get_json()

    key = data["key"]
    value = data["value"]

    state_machine.set_variable(state, key, value)
    return jsonify(state_machine.serialize())