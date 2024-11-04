import { lake } from "./lake.utils";
import Frog from "../Frog/Frog";

export default function Lake({
  frogs,
  selectField,
  selectedField,
  selectedFrogs,
}) {
  return (
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
          const className = `cell ${isEmptyFieldSelected ? "selected" : ""}`;

          return (
            <div
              key={key}
              className={className}
              onClick={() => selectField(row, col)}
            >
              {frog && (
                <Frog frog={frog} isSelected={selectedFrogs.includes(frog)} />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
