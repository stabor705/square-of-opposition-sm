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
    leaf_label = data["leaf"]
    leaf = span_tree.get_node_with_label(leaf_label)

    span_tree.expand(square.to_list_of_states(), leaf)
    state_machine = StateMachine(span_tree.get_leaf_states())
    return jsonify(span_tree.serialize())

@bp.patch('/state_machine')
def patch_state_machine_endpoint():
    data = request.get_json()

    start_node_label = data["from"]
    end_node_label = data["to"]
    start_node = state_machine.get_node_with_label(start_node_label)
    end_node = state_machine.get_node_with_label(end_node_label)

    state_machine.create_transition(start_node, end_node)
    return jsonify(state_machine.serialize())

@bp.delete('/state_machine/transitions/<u_str>/<v_str>')
def delete_transition(u_str, v_str):
    u = state_machine.get_node_with_label(u_str)
    v = state_machine.get_node_with_label(v_str)
    state_machine.remove_transition(u, v)
    return jsonify(state_machine.serialize())

@bp.delete('/state_machine/<state_str>/variables/<variable>')
def delete_variable(state_str, variable):
    state = state_machine.get_node_with_label(state_str)
    state_machine.del_variable(state, variable)
    return jsonify(state_machine.serialize())

@bp.post('/state_machine/<state_str>/variables')
def set_variable(state_str):
    state = state_machine.get_node_with_label(state_str)
    data = request.get_json()

    key = data["key"]
    value = data["value"]

    state_machine.set_variable(state, key, value)
    return jsonify(state_machine.serialize())

@bp.get('/code')
def get_code():
    return state_machine.generate_code()