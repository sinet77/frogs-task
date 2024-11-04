import "./App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Lake from "./components/Lake/Lake";

function App() {
  const [frogs, setFrogs] = useState([
    createNewFrog(0, 0, "male"),
    createNewFrog(0, 1, "female"),
  ]);
  const [selectedFrogs, setSelectedFrogs] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  function jump() {
    if (selectedFrogs.length !== 1 || !selectedField) {
      toast.error("Select only one frog to make a jump");
      return;
    }
    const frog = selectedFrogs[0];
    const jumpDistance = getJumpDistance(frog.gender);
    const distances = calculateDistance(frog, selectedField);

    if (!isJumpValid(distances, jumpDistance)) {
      toast.error("Invalid jump");
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
      toast.warning("No available space for the new frog.");
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
      toast.warning("Select exactly two frogs to reproduce.");
      return;
    }

    const father = selectedFrogs.find((frog) => frog.gender === "male");
    const mother = selectedFrogs.find((frog) => frog.gender === "female");

    if (!father || !mother) {
      toast.warning("Select one male and one female frog to reproduce.");
      return;
    }

    reproduce({ father, mother });
  }

  return (
    <div className="background">
      <div className="main">
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          limit={10}
          theme="light"
        />
        <Title />
        <Legend />
        <div className="buttons">
          <h2>Available actions: </h2>
          <button onClick={jump} className="actionButton">
            Jump
          </button>
          <button onClick={handleReproduceClick} className="actionButton">
            Reproduce
          </button>
        </div>
        <Lake
          frogs={frogs}
          selectedField={selectedField}
          selectField={selectField}
          selectedFrogs={selectedFrogs}
        />
      </div>
    </div>
  );
}

export default App;
