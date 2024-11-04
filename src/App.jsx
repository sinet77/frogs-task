import "./App.css";
import { useState } from "react";
import Frog from "./components/Frog/Frog";
import Legend from "./components/Legend/Legend";
import Title from "./components/Title/Title";
import {
  lake,
  createNewFrog,
  getJumpDistance,
  calculateDistance,
  isJumpValid,
  findAdjacentPositions,
  inheritCharacteristics,
} from "./components/Lake/lake.utils";

function App() {
  const [frogs, setFrogs] = useState([
    createNewFrog(0, 0, "male"),
    createNewFrog(0, 1, "female"),
  ]);
  const [selectedFrogs, setSelectedFrogs] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  function jump() {
    if (selectedFrogs.length !== 1 || !selectedField) {
      alert("Zaznacz dokładnie jedną żabę, aby wykonać skok.");
      return;
    }
    const frog = selectedFrogs[0];
    const jumpDistance = getJumpDistance(frog.gender);
    const distances = calculateDistance(frog, selectedField);

    if (!isJumpValid(distances, jumpDistance)) {
      alert("Nieprawidłowy skok.");
      return;
    }

    setFrogs((prev) =>
      prev.map((frog) => {
        if (frog === selectedFrogs[0]) {
          return {
            ...frog,
            characteristics: [...frog.characteristics],
            row: selectedField.row,
            column: selectedField.column,
          };
        }
        return frog;
      })
    );

    setSelectedFrogs([]);
    setSelectedField(null);
  }

  function selectField(row, column) {
    setSelectedField({ row, column });

    const frog = frogs.find(
      (frog) => frog.row === row && frog.column === column
    );

    if (!frog) {
      return;
    }

    const isAlreadySelected = selectedFrogs.includes(frog);
    setSelectedFrogs((prev) =>
      isAlreadySelected
        ? prev.filter((selectedFrog) => selectedFrog !== frog)
        : [...prev, frog]
    );
  }

  function reproduce({ father, mother }) {
    const adjacentPositions = findAdjacentPositions(mother.row, mother.column);

    const newPosition = adjacentPositions.find(
      ({ row, column }) =>
        row >= 0 &&
        row < lake.length &&
        column >= 0 &&
        column < lake[row].length &&
        !frogs.some((frog) => frog.row === row && frog.column === column)
    );

    if (!newPosition) {
      alert("No available space for the new frog.");
      return;
    }

    const gender = Math.random() > 0.5 ? "male" : "female";
    const { height, build } = inheritCharacteristics(mother, father);
    const characteristics = [height, build];

    const newFrog = createNewFrog(
      newPosition.row,
      newPosition.column,
      gender,
      characteristics
    );

    setFrogs((prev) => [...prev, newFrog]);
  }

  function handleReproduceClick() {
    if (selectedFrogs.length !== 2) {
      alert("Select exactly two frogs to reproduce.");
      return;
    }

    const father = selectedFrogs.find((frog) => frog.gender === "male");
    const mother = selectedFrogs.find((frog) => frog.gender === "female");

    if (!father || !mother) {
      alert("Select one male and one female frog to reproduce.");
      return;
    }

    reproduce({ father, mother });
  }

  return (
    <div className="background">
      <div className="main">
        <Title />
        <Legend />
        <div className="buttons">
          <h2>Available actions: </h2>
          <button onClick={jump}>Jump</button>
          <button onClick={handleReproduceClick}>Reproduce</button>
        </div>
        <div className="lake">
          {lake.map((row) =>
            row.map(({ row, col }) => {
              const frog = frogs.find(
                (frog) => frog.row === row && frog.column === col
              );
              const isEmptyFieldSelected =
                selectedField?.row === row &&
                selectedField?.column === col &&
                !frog;

              const key = `${row}-${col}`;
              const className = `cell ${
                isEmptyFieldSelected ? "selected" : ""
              }`;

              return (
                <div
                  key={key}
                  className={className}
                  onClick={() => selectField(row, col)}
                >
                  {frog && (
                    <Frog
                      frog={frog}
                      isSelected={selectedFrogs.includes(frog)}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
