from typing import List
import random
from itertools import combinations
from copy import deepcopy

import networkx as nx
from networkx.drawing.nx_pydot import write_dot

from square_of_opposition.primitives import State
from square_of_opposition.graph import Graph

CODE_CLASS_TEMPLATE = """
class StateMachine:
    def __init__(self):
        #{variables}
        self.state = #{initial_state} # Here you can change initial state
        
    #{actions}

    #{conditions}

    #{states}

    def run():
        self.state()
"""

class StateMachine(Graph):
    def __init__(self, states: List[State]):
        super().__init__()
        for state in states:
            self._graph.add_node(state, label=str(state))
        self._variables = { state: dict() for state in states }

    def create_transition(self, start: State, end: State):
        self._graph.add_edge(start, end)
    
    def remove_transition(self, start: State, end: State):
        self._graph.remove_edge(start, end)
    
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

    def generate_code(self):
        def generate_function(name: str, body: str):
            return f"""
    def {name}():
        {body}
"""

        def generate_empty_function(name: str):
            return generate_function(name, "pass")

        def generate_empty_boolean_function(name: str):
            return generate_function(name, "return True")

        def generate_variable_initialization(var: str):
            return f"self.{var} = 0"
        
        def generate_state_function(state: State):
            action_func_name = f"action_{encode_state_name(state)}"
            conditions = list()
            for u, v in self._graph.out_edges(state):
                conditions.append(f"        if condition_{encode_state_name(u)}_to_{encode_state_name(v)}():\n            self.state_{encode_state_name(v)}()")
            conditions_str = "".join(conditions)
            variables = [f"        self.{var} = {value}" for var, value in self._variables[state].items()]
            variables_str = "\n".join(variables)
            body = f"""
{variables_str}
        self.{action_func_name}()

{conditions_str}
"""
            return generate_function(f"state_{encode_state_name(state)}", body)
        def encode_state_name(state: State):
            return f"{state[0]}AND{state[1]}"

        all_variables = list()
        for state_variables in self._variables.values():
            all_variables.extend(state_variables.keys())
        all_variables = set(all_variables)
        variables_initializations = [generate_variable_initialization(var) for var in all_variables]
        action_functions = list()
        condition_functions = list()
        state_functions = list()

        for node in self._graph.nodes:
            print(type(node))
            action_functions.append(generate_empty_function(f"action_{encode_state_name(node)}"))
            state_functions.append(generate_state_function(node))
        
        for u, v in self._graph.edges:
            condition_functions.append(generate_empty_boolean_function(f"condition_{encode_state_name(u)}_to_{encode_state_name(v)}"))

        code = CODE_CLASS_TEMPLATE
        code = code.replace("#{variables}", "\n".join(variables_initializations))
        code = code.replace("#{actions}", "".join(action_functions))
        code = code.replace("#{conditions}", "".join(condition_functions))
        code = code.replace("#{states}", "".join(state_functions))
        if self._graph.number_of_nodes() > 0:
            code = code.replace("#{initial_state}", f"StateMachine.state_{encode_state_name(list(self._graph.nodes)[0])}")
        return code


        