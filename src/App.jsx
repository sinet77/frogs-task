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

  const [lake, setLake] = useState(initialLake);
  const [selectedFrogs, setSelectedFrogs] = useState([]);
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

  initialLake[0][0] = createNewFrog(0, 0, "male");
  initialLake[0][1] = createNewFrog(0, 1, "female");

  function selectFrog(row, column) {
    const frog = lake[row][column];
    if (frog) {
      const isAlreadySelected = selectedFrogs.some(
        (selectedFrog) =>
          selectedFrog.row === row && selectedFrog.column === column
      );

      if (isAlreadySelected) {
        setSelectedFrogs((prev) =>
          prev.filter(
            (selectedFrog) =>
              selectedFrog.row !== row || selectedFrog.column !== column
          )
        );
      } else {
        setSelectedFrogs((prev) => [...prev, frog]);
      }
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
    if (selectedFrogs.length === 1 && selectedField) {
      const frog = selectedFrogs[0];
      const jumpDistance = getJumpDistance(frog.gender);
      const distances = calculateDistance(frog, selectedField);

      if (isJumpValid(distances, jumpDistance)) {
        const updatedLake = updateLake(
          lake,
          { row: frog.row, column: frog.column },
          selectedField,
          frog
        );

        setLake(updatedLake);
        setSelectedFrogs([]);
        setSelectedField(null);
      } else {
        alert("Jump is invalid.");
      }
    } else {
      alert("Zaznacz dokładnie jedną żabę, aby wykonać skok.");
    }
  }

  function selectField(row, column) {
    console.log(`Selected field coordinates: column=${column}, row=${row}`);
    setSelectedField({ row, column });
  }

  function findAdjacentPositions(row, column) {
    return [
      { row: row - 1, column: column }, // up
      { row: row + 1, column: column }, // down
      { row: row, column: column - 1 }, // left
      { row: row, column: column + 1 }, // right
    ];
  }

  function reproduce(mother, father) {
    if (!mother || !father) {
      alert("Select one male and one female frog to reproduce.");
      return;
    }
    const adjacentPositions = findAdjacentPositions(mother.row, mother.column);

    const newPosition = adjacentPositions.find(
      ({ row, column }) =>
        row >= 0 &&
        row < lake.length &&
        column >= 0 &&
        column < lake[row].length &&
        !lake[row][column]
    );

    if (newPosition) {
      const gender = Math.random() > 0.5 ? "male" : "female";

      const height = mother.characteristics[0];
      const build = father.characteristics[1];
      const characteristics = [height, build];

      const newFrog = {
        row: newPosition.row,
        column: newPosition.column,
        gender,
        characteristics,
      };

      const updatedLake = [...lake];
      updatedLake[newPosition.row][newPosition.column] = newFrog;

      setLake(updatedLake);
    } else {
      alert("No available space for the new frog.");
    }
  }

  function handleReproduceClick() {
    const maleFrog = selectedFrogs.find((frog) => frog.gender === "male");
    const femaleFrog = selectedFrogs.find((frog) => frog.gender === "female");

    if (maleFrog && femaleFrog) {
      reproduce(femaleFrog, maleFrog);
    } else {
      alert("Select one male and one female frog to reproduce.");
    }
  }

  return (
    <div className="background">
      <div className="main">
        <Title />
        <Legend />
        <div className="buttons">
          <h3>Available actions: </h3>
          <button onClick={jump}>Jump</button>
          <button onClick={handleReproduceClick}>Reproduce</button>
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
                    isSelected={selectedFrogs.some(
                      (selectedFrog) =>
                        selectedFrog.row === rowIndex &&
                        selectedFrog.column === columnIndex
                    )}
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
