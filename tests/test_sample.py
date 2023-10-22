from src.square_of_opposition import SquareOfOpposition, Relation


def test_squre_finding_from_relation():
    square = SquareOfOpposition("A", "E", "O", "I")
    assert square.find_from_relation("A", Relation.Contradictory) == "O"
    assert square.find_from_relation("E", Relation.Contrary) == "A"
    assert square.find_from_relation("I", Relation.Contrary) is None
    assert square.find_from_relation("I", Relation.Subcontrary) == "O"
    assert square.find_from_relation("A", Relation.Subcontrary) is None
    assert square.find_from_relation("E", Relation.Subaltern) == "O"
    assert square.find_from_relation("I", Relation.Subaltern) == "A"
