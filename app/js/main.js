/**
 * ******************************************************************************************
 * Get random number for RGB color
 * ******************************************************************************************
 */

function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

/**
 * ******************************************************************************************
 * Generate random RGB color
 * ******************************************************************************************
 */

function genRandomRgbColor() {
  const maxColorValue = 256;
  return `rgb(${getRandomNumber(maxColorValue)}, ${getRandomNumber(
    maxColorValue
  )}, ${getRandomNumber(maxColorValue)})`;
}

/**
 * ******************************************************************************************
 * Generate random colors array
 * ******************************************************************************************
 */

function genRandomColorsArray(arrayLength) {
  // Create an empty array to store the colors
  let colorsArray = [];

  // Loop over the array length
  for (let i = 0; i < arrayLength; i++) {
    // Generate a random rgb color
    let randomColor = genRandomRgbColor();

    // Check if the color already exists
    while (colorsArray.includes(randomColor)) {
      // If the color already exists, generate a new one
      randomColor = genRandomRgbColor();
    }

    // Add the new color to the array of colors
    colorsArray.push(randomColor);
  }

  return colorsArray;
}

/**
 * ******************************************************************************************
 * Add the colors to the DOM
 * ******************************************************************************************
 */

const colorsArray = genRandomColorsArray(6);

function addColorsToDom(colorsArray) {
  document
    .querySelectorAll("#generatedColors .colors-block")
    .forEach((color, index) => {
      color.style.backgroundColor = colorsArray[index];
    });
}

addColorsToDom(colorsArray);

/**
 * ******************************************************************************************
 * Get the correct color
 * ******************************************************************************************
 */

function mixColors(colorsArray) {
  const mixedColor = {
    r: 0,
    g: 0,
    b: 0,
  };

  colorsArray.slice(0, 3).forEach((color) => {
    const colorValues = color
      .replace("rgb(", "")
      .replace(")", "")
      .split(", ")
      .map((value) => parseInt(value));

    mixedColor.r += colorValues[0];
    mixedColor.g += colorValues[1];
    mixedColor.b += colorValues[2];
  });

  console.log(colorsArray);
  console.log(mixedColor);

  mixedColor.r = Math.floor(mixedColor.r / 3);
  mixedColor.g = Math.floor(mixedColor.g / 3);
  mixedColor.b = Math.floor(mixedColor.b / 3);

  return `rgb(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b})`;
}

// Display the correct color
const mixedCorrectColor = document.getElementById("mixedCorrectColor");
mixedCorrectColor.style.backgroundColor = mixColors(colorsArray);
