from square_of_opposition import SquareOfOpposition
from span_tree import SpanTree
from state_machine import StateMachine


def get_example_span_tree():
    span_tree = SpanTree()
    first = SquareOfOpposition(
        "Taxiing", "Immobilising", "Stop", "~Immobilising")
    second = SquareOfOpposition("Engine on", "Open", "Engine off", "Steps")
    third = SquareOfOpposition("Unloading", "Locked", "Empty", "Cleaned")

    span_tree.expand(first.to_list_of_states())
    span_tree.expand(second.to_list_of_states())
    span_tree.expand(third.to_list_of_states())
    return span_tree


if __name__ == "__main__":
    span_tree = get_example_span_tree()
    print(span_tree.serialize())
    state_machine = StateMachine(span_tree.get_leaf_states())
    state_machine.add_random_transitions(8)
    with open('out.py', 'w') as fp:
        fp.write(state_machine.generate_code())
    
