/**
 * ******************************************************************************************
 * Global variables
 * ******************************************************************************************
 */

// Select the generated colors block
const $generatedColors = document.getElementById("generatedColors");

// Make an array from the generated colors and input colors, so we can manipulate them
let generatedColorBlocks = Array.from($generatedColors.children);
const inputColorBlocks = Array.from(
  document.getElementById("inputColors").children
);

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
  const maxColorValue = 256; // 255, but as we are using Math.floor, we need to add 1
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

// Generate an array of 5 random colors
let colorsArray = genRandomColorsArray(5);

// Add the colors to the DOM function
function addColorsToDom(colorsArray) {
  document
    .querySelectorAll("#generatedColors .colors-block")
    .forEach((color, index) => {
      color.style.backgroundColor = colorsArray[index];
    });
}

// Add the colors to the DOM
addColorsToDom(colorsArray);

/**
 * ******************************************************************************************
 * Get the correct color
 * ******************************************************************************************
 */

function mixColors(colorsArray) {
  // Create an object to store the mixed color
  const mixedColor = {
    r: 0,
    g: 0,
    b: 0,
  };

  // Loop over the first 3 colors in the array
  colorsArray.slice(0, 3).forEach((color) => {
    // Get the RGB values of the color
    const colorValues = color
      .replace("rgb(", "")
      .replace(")", "")
      .split(", ")
      .map((value) => parseInt(value));

    // Add and count the RGB values par each letter to the object
    mixedColor.r += colorValues[0];
    mixedColor.g += colorValues[1];
    mixedColor.b += colorValues[2];
  });

  // Divide the RGB values by 3
  mixedColor.r = Math.floor(mixedColor.r / 3);
  mixedColor.g = Math.floor(mixedColor.g / 3);
  mixedColor.b = Math.floor(mixedColor.b / 3);

  return `rgb(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b})`;
}

// Display the correct color
let mixedCorrectColor = document.getElementById("mixedCorrectColor");
mixedCorrectColor.style.backgroundColor = mixColors(colorsArray);

/**
 * ******************************************************************************************
 * Shuffle and re-render the 5 generated colors
 * ******************************************************************************************
 */

function shuffleAndRenderColors() {
  // Create a copy of the colors array
  let shuffledColorsArray = [...colorsArray];

  // Shuffle the copied array
  for (let i = shuffledColorsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledColorsArray[i], shuffledColorsArray[j]] = [
      shuffledColorsArray[j],
      shuffledColorsArray[i],
    ];
  }

  // Display them again to the generated colors
  addColorsToDom(shuffledColorsArray);

  // Update the generatedColorBlocks array
  generatedColorBlocks = Array.from($generatedColors.children);

  return shuffledColorsArray;
}

// Shuffle the colors array and display them
colorsArray = shuffleAndRenderColors();

/**
 * ******************************************************************************************
 * Choose the 3 colors
 * ******************************************************************************************
 */

// Array to store the selected colors
const selectedColors = [];

// Function to handle color block click
function handleColorBlockClick(event) {
  const selectedColorBlock = event.target;

  // Check if the clicked color block is in the input colors
  if (inputColorBlocks.includes(selectedColorBlock)) {
    // Find the clicked color block in the selected colors
    const index = selectedColors.indexOf(
      selectedColorBlock.style.backgroundColor
    );

    // Move the clicked color block back to the generated colors and remove the color from the array
    if (index !== -1) {
      const emptyGeneratedBlock = generatedColorBlocks.find(
        (block) => !block.style.backgroundColor
      );
      if (emptyGeneratedBlock) {
        emptyGeneratedBlock.style.backgroundColor = selectedColors[index];
        selectedColorBlock.style.backgroundColor = "";
        selectedColors.splice(index, 1);
      }
    }
  } else if (selectedColors.length <= 3) {
    // Find the clicked color block in the generated colors
    const index = generatedColorBlocks.indexOf(selectedColorBlock);

    // Move the clicked color block to the input colors and add the color to the array
    if (index !== -1) {
      const color = generatedColorBlocks[index].style.backgroundColor;
      const emptyInputBlock = inputColorBlocks.find(
        (block) => !block.style.backgroundColor
      );
      if (emptyInputBlock) {
        emptyInputBlock.style.backgroundColor = color;
        generatedColorBlocks[index].style.backgroundColor = "";
        selectedColors.push(color);
      }
    }
  }
}

// Attach the click event listener to each color block in the generated colors and input colors
generatedColorBlocks.forEach((block) =>
  block.addEventListener("click", handleColorBlockClick)
);
inputColorBlocks.forEach((block) =>
  block.addEventListener("click", handleColorBlockClick)
);

/**
 * ******************************************************************************************
 * Check if the colors are correct
 * ******************************************************************************************
 */

// Select the check button
const $checkButton = document.getElementById("mixColors");
const $mixedColorBlock = document.querySelector("#mixedColor .colors-block");

$checkButton.addEventListener("click", () => {
  // Check if the selected colors are 3
  if (selectedColors.length !== 3) {
    alert("Please select 3 colors!");
    return;
  }

  const mixedColor = mixColors(selectedColors);
  const correctColor = mixedCorrectColor.style.backgroundColor;
  const $score = document.getElementById("score");

  $mixedColorBlock.style.backgroundColor = mixedColor;
  if (mixedColor === correctColor) {
    $score.innerHTML = parseInt($score.innerHTML) + 1;
    // Start the game again
    selectedColors.length = 0;
    colorsArray = genRandomColorsArray(5);
    // Display the correct color
    mixedCorrectColor.style.backgroundColor = mixColors(colorsArray);
    // Shuffle the colors array and display them
    colorsArray = shuffleAndRenderColors();

    $mixedColorBlock.style.backgroundColor = "";

    // Reset the input colors
    inputColorBlocks.forEach((block) => (block.style.backgroundColor = ""));

    // Reset the mixed color
    $mixedColorBlock.style.backgroundColor = "";
  }
});
