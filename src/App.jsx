import "./App.css";
import { useState } from "react";
import Frog from "./components/Frog/Frog";
import Legend from "./components/Legend/Legend";
import Title from "./components/Title/Title";

function App() {
  const heights = ["tall", "short"];
  const builds = ["fat", "slim"];

  function generateRandomCharacteristics() {
    const height = heights[Math.floor(Math.random() * heights.length)];
    const build = builds[Math.floor(Math.random() * builds.length)];
    return [height, build];
  }

  const initialLake = Array(6)
    .fill()
    .map(() => Array(10).fill());

  initialLake[0][0] = createNewFrog(0, 0, "male");
  initialLake[0][1] = createNewFrog(0, 1, "female");

  const [lake, setLake] = useState(initialLake);
  const [selectedFrog, setSelectedFrog] = useState(null);
  const [selectedField, setSelectedField] = useState(null);

  function createNewFrog(row, column, gender) {
    const characteristics = generateRandomCharacteristics();
    return {
      row,
      column,
      gender,
      characteristics,
    };
  }

  function selectFrog(row, column) {
    const frog = lake[row][column];
    if (frog) {
      setSelectedFrog(frog);
    }
  }

  function getJumpDistance(gender) {
    return gender === "male" ? 3 : 2;
  }

  function calculateDistance(from, to) {
    return {
      distanceByColumns: Math.abs(to.column - from.column),
      distanceByRows: Math.abs(to.row - from.row),
    };
  }

  function isJumpValid(distances, jumpDistance) {
    const { distanceByColumns, distanceByRows } = distances;
    return (
      (distanceByColumns === jumpDistance && distanceByRows === 0) ||
      (distanceByRows === jumpDistance && distanceByColumns === 0) ||
      (distanceByColumns === jumpDistance && distanceByRows === jumpDistance)
    );
  }

  function updateLake(lake, from, to, frog) {
    const updatedLake = lake.map((row) => [...row]);
    updatedLake[from.row][from.column] = undefined;
    updatedLake[to.row][to.column] = frog;
    return updatedLake;
  }

  function jump() {
    if (!selectedFrog || !selectedField) return;

    const { gender } = selectedFrog.frog;
    const jumpDistance = getJumpDistance(gender);
    const distances = calculateDistance(
      { row: selectedFrog.row, column: selectedFrog.column },
      { row: selectedField.row, column: selectedField.column }
    );

    const isValidJump = isJumpValid(distances, jumpDistance);

    if (
      isValidJump &&
      lake[selectedField.row][selectedField.column] === undefined
    ) {
      const updatedLake = updateLake(
        lake,
        { row: selectedFrog.row, column: selectedFrog.column },
        { row: selectedField.row, column: selectedField.column },
        selectedFrog.frog
      );
      setLake(updatedLake);
      setSelectedFrog(null);
      setSelectedField(null);
    }
  }

  function selectField(row, column) {
    console.log(`Selected field coordinates: column=${column}, row=${row}`);
    setSelectedField({ row, column });
  }

  function reproduce(mother, father) {
    const newRow = mother.row + 1;
    const newColumn = mother.column;

    const gender = Math.random() > 0.5 ? "male" : "female";

    const height = mother.characteristics[0];
    const build = father.characteristics[1];
    const characteristics = [height, build];

    const newFrog = { row: newRow, column: newColumn, gender, characteristics };
    const updatedLake = [...lake];
    updatedLake[newRow][newColumn] = newFrog;

    setLake(updatedLake);
  }

  console.log(selectedFrog);
  console.log(selectedField);

  return (
    <div className="background">
      <div className="main">
        <Title />
        <Legend />
        <div className="buttons">
          <h3>Available actions: </h3>
          <button onClick={jump}>Jump</button>
          <button
            onClick={() => {
              if (selectedFrog) {
                reproduce(selectedFrog.frog, selectedFrog.frog);
              }
            }}
          >
            Reproduce
          </button>
        </div>
        <div className="lake">
          {lake.map((row, rowIndex) =>
            row.map((cell, columnIndex) => (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className={`cell ${
                  selectedField?.row === rowIndex &&
                  selectedField?.column === columnIndex
                    ? "selected"
                    : ""
                }`}
                onClick={() => {
                  if (cell) {
                    selectFrog(rowIndex, columnIndex);
                  } else {
                    selectField(rowIndex, columnIndex);
                  }
                }}
              >
                {cell && (
                  <Frog
                    frog={cell}
                    isSelected={
                      selectedFrog?.row === rowIndex &&
                      selectedFrog?.column === columnIndex
                    }
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
