import React, { useState } from "react";
import "./App.css";

const App = () => {
  // Initialize a 3x3 grid with null values
  const [grid, setGrid] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );
  const [isLastClicked, setIsLastClicked] = useState(false); // Flag for final action

  const handleClick = (row, col) => {
    if (isLastClicked) return; // Prevent clicks after the final action

    // Update the clicked cell's color to green
    const updatedGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? "green" : cell
      )
    );

    setGrid(updatedGrid);

    // If the last box is clicked, turn all cells orange
    const flatGrid = updatedGrid.flat();
    const greenCount = flatGrid.filter((cell) => cell === "green").length;
    if (greenCount === 9) {
      setIsLastClicked(true);
      setGrid(
        grid.map((r) => r.map(() => "orange")) // Change all cells to orange
      );
    }
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="box"
            style={{ backgroundColor: color || "white" }}
            onClick={() => handleClick(rowIndex, colIndex)}
          ></div>
        ))
      )}
    </div>
  );
};

export default App;
