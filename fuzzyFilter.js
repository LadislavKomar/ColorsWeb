// Function to calculate Levenshtein distance
function levenshtein(a, b) {
  const matrix = [];

  // Create the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          ) // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Function to filter colors based on input
function filterColors(colors, input) {
  return colors.filter(
    (color) => levenshtein(color.toLowerCase(), input.toLowerCase()) <= 2
  );
}

// Fetch color names from external file
fetch("./colors.json")
  .then((response) => response.json())
  .then((colors) => {
    const colorInput = document.getElementById("searchInputId");
    const colorList = document.getElementById("colorList");

    colorInput.addEventListener("input", () => {
      const input = colorInput.value;
      const filteredColors = filterColors(colors, input);

      // Clear the list
      colorList.innerHTML = "";

      filteredColors.forEach((color) => {
        const li = document.createElement("li");
        li.textContent = color;

        // Add click event to each list item
        li.addEventListener("click", () => {
          colorInput.value = color; // Set input value to the clicked color
          colorList.innerHTML = ""; // Clear the list after selection
        });

        colorList.appendChild(li);
      });
    });
  })
  .catch((error) => console.error("Error fetching color names:", error));
