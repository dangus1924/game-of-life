import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import freshGrid from './clearGrid'

// create the amount of rows and column that will be used in the app
// This is a global variable so I can access it anywhere
const amountOfRows = 25;
const amountOfCols = 25;

// help with the duplicate, this is to check each neighbor to compare
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const Grid: React.FC = () => {
  // will be using the state to store the 0,1 on and ff
  const [grid, setGrid] = useState(() => {
    return freshGrid();
  });
  // add start in a state set to false
  const [start, setStart] = useState(false);
  // this will make sure state is current and uptodate no cause a problem
  const startRef = useRef(start);
  startRef.current = start;

  // we want to make sure that this function is onl created once so the usecallback help.
  const startSimulation = useCallback(() => {
    if (!startRef.current) {
      return;
    }
    // for loop with the rules of dead or alive
    setGrid((grid) => {
      // this code goes throuhg ever cell of th grid and checks
      // check to see that it does not go out of range because end cell only have certain amount of neighbors
      return produce(grid, (gridCopy) => {
        for (let i = 0; i < amountOfRows; i++) {
          for (let j = 0; j < amountOfCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              // this is to check to make sure to dont do more than we should

              if (
                newI >= 0 &&
                newI < amountOfRows &&
                newJ >= 0 &&
                newJ < amountOfCols
              ) {
                neighbors += grid[newI][newJ];
              }
            });
            // check to see how much neighbor to determine the life of cell
            // this check to see if the current cell has 2 or more neighbors

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (grid[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(startSimulation, 1000);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setStart(!start);
          if (!start) {
            startRef.current = true;
            startSimulation();
          }
        }}
      >
        {start ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          setGrid(freshGrid());
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          const rows = [];

          for (let i = 0; i < amountOfRows; i++) {
            rows.push(
              Array.from(Array(amountOfCols), () =>
                Math.random() > 0.7 ? 1 : 0
              )
            );
          }
          setGrid(rows);
        }}
      >
        random
      </button>

      <div
        // used already css grid to make my grid
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${amountOfCols},20px)`,
        }}
      >
        {grid.map((rows, r) =>
          rows.map((col, c) => (
            <div
              key={`${r}-${c}`}
              // we will use the immer library to help us with the state of adding 1
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[r][c] = grid[r][c] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[r][c] ? "black" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
};
export default Grid;
