export const heights = ["tall", "short"];
export const builds = ["fat", "slim"];

export function generateRandomCharacteristics() {
  const height = heights[Math.floor(Math.random() * heights.length)];
  const build = builds[Math.floor(Math.random() * builds.length)];
  return [height, build];
}

export function createNewFrog(row, column, gender, characteristics) {
  return {
    row,
    column,
    gender,
    characteristics: characteristics ?? generateRandomCharacteristics(),
  };
}

export function getJumpDistance(gender) {
  return gender === "male" ? 3 : 2;
}

export function calculateDistance(from, to) {
  return {
    distanceByColumns: Math.abs(to.column - from.column),
    distanceByRows: Math.abs(to.row - from.row),
  };
}

export function isJumpValid(distances, jumpDistance) {
  const { distanceByColumns, distanceByRows } = distances;
  return (
    (distanceByColumns === jumpDistance && distanceByRows === 0) ||
    (distanceByRows === jumpDistance && distanceByColumns === 0) ||
    (distanceByColumns === jumpDistance && distanceByRows === jumpDistance)
  );
}

export function findAdjacentPositions(row, column) {
  return [
    { row: row - 1, column: column }, // up
    { row: row + 1, column: column }, // down
    { row: row, column: column - 1 }, // left
    { row: row, column: column + 1 }, // right
  ];
}

export const lake = Array.from({ length: 6 }, (_, rowIdx) =>
  Array.from({ length: 10 }, (_, colIdx) => ({ col: colIdx, row: rowIdx }))
);

export function inheritCharacteristics(mother, father) {
  const randomMotherCharacteristic = Math.floor(Math.random() * 2);
  const randomFatherCharacteristic = Math.abs(randomMotherCharacteristic - 1);

  return {
    height: mother.characteristics[randomMotherCharacteristic],
    build: father.characteristics[randomFatherCharacteristic],
  };
}
