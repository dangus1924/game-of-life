
// create the amount of rows and column that will be used in the app
// This is a global variable so I can access it anywhere
const amountOfRows = 25;
const amountOfCols = 25;

const freshGrid = () => {
  const rows = [];
  // for loop iterate through rows which is 25 and the assign that index to be zero
  for (let i = 0; i < amountOfRows; i++) {
    // this push a array of zero into the grid
    rows.push(Array.from(Array(amountOfCols), () => 0));
  }
  return rows;
};

export default freshGrid
