/**
 * ==============================================================================
 * IMPORTS / CONSTANTS
 * ==============================================================================
 */
const generatedColors = document.getElementById("generatedColors");
const mixedCorrectColor = document.getElementById("mixedCorrectColor");

/**
 * ******************************************************************************************
 * Get random number for rgb color
 * ******************************************************************************************
 */

function getRandomNumber() {
  return Math.floor(Math.random() * 256);
}

/**
 * ******************************************************************************************
 * Generate random rgb color
 * ******************************************************************************************
 */

function genRandomColor() {
  return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
}

/**
 * ******************************************************************************************
 * Add color to color-block, if the color already exists, generate a new one
 * ******************************************************************************************
 */

let generatedColorsArray = [];

function addGeneratedColors() {
  // Select all elements with the class name "colors-block"
  let colorBlocks = generatedColors.children;

  // Loop over the selected elements
  for (let i = 0; i < colorBlocks.length; i++) {
    // Generate a random color
    let randomColor = genRandomColor();

    // Check if the color already exists
    while (generatedColorsArray.includes(randomColor)) {
      // If the color already exists, generate a new one
      randomColor = genRandomColor();
    }

    // Add the new color to the array of generated colors
    generatedColorsArray.push(randomColor);

    // Assign the random color as the background color of the current element
    colorBlocks[i].style.backgroundColor = randomColor;
  }
}

addGeneratedColors();

/**
 * ******************************************************************************************
 * Mix the last 3 colors of the generated colors and add to the mixedCorrectColor block
 * ******************************************************************************************
 */

function mixColors() {
  // Get the last 3 colors of the generated colors array
  let last3Colors = generatedColorsArray.slice(-3);

  // Get the rgb values of the last 3 colors
  let rgbValues = last3Colors.map((color) => {
    return color.match(/\d+/g);
  });

  // Calculate the average of the rgb values

  /**
   * ******************************************************************************************
   * HIER BEZIG
   * ******************************************************************************************
   */
}

mixColors();
