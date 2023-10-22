from typing import Hashable, Optional, Dict
from enum import Enum


class Corner:
    def __init__(self, top: bool, left: bool):
        self.top = top
        self.left = left

    def __eq__(self, other):
        if not isinstance(other, Corner):
            return False
        return self.top == other.top and self.left == other.left

    def __hash__(self):
        return hash((self.top, self.left))

    def find_diagonal(self):
        return Corner(not self.top, not self.left)

    def find_vertically_opposed(self):
        return Corner(self.top, not self.left)

    def find_horizontally_opposed(self):
        return Corner(not self.top, self.left)


class Corners:
    TopLeft = Corner(top=True, left=True)
    TopRight = Corner(top=True, left=False)
    BotRight = Corner(top=False, left=False)
    BotLeft = Corner(top=False, left=True)


class Relation(Enum):
    Contradictory = 1,
    Contrary = 2,
    Subcontrary = 3,
    Subaltern = 4


Preposition = Hashable


class SquareOfOpposition:
    def __init__(self, top_left: Preposition, top_right: Preposition,
                 bot_right: Preposition, bot_left: Preposition):
        self.top_left = top_left
        self.top_right = top_right
        self.bot_right = bot_right
        self.bot_left = bot_left

        self._corner_from_preposition: Dict[Preposition, Corner] = {
            self.top_left: Corners.TopLeft,
            self.top_right: Corners.TopRight,
            self.bot_right: Corners.BotRight,
            self.bot_left: Corners.BotLeft
        }
        self._preposition_from_corner: Dict[Corner, Preposition] = {
            Corners.TopLeft: self.top_left,
            Corners.TopRight: self.top_right,
            Corners.BotRight: self.bot_right,
            Corners.BotLeft: self.bot_left
        }

    def find_from_relation(self, preposition: Preposition,
                           relation: Relation) -> Optional[Preposition]:
        if preposition not in self._corner_from_preposition:
            raise PrepositionNotInSquare(preposition)
        corner = self._corner_from_preposition[preposition]

        match relation:
            case Relation.Contradictory:
                return self._preposition_from_corner[corner.find_diagonal()]
            case Relation.Contrary if corner.top:
                return self._preposition_from_corner[corner.find_vertically_opposed()]
            case Relation.Subcontrary if not corner.top:
                return self._preposition_from_corner[corner.find_vertically_opposed()]
            case Relation.Subaltern:
                return self._preposition_from_corner[corner.find_horizontally_opposed()]
            case _:
                return None


class PrepositionNotInSquare(Exception):
    def __init__(self, preposition: Preposition):
        super().__init__(f"Preposition ${preposition} is nowhere in square")
