// function to check if the value is empty or not
function emptyValueCheck(value, errorElement, errorMessage) {
  // Check if the value is empty, not a number, or less than or equal to 0
  if (value === "" || isNaN(value) || value <= 0) {
    // Display an error message
    errorElement.innerHTML = errorMessage;
    return false; //Indicate that the value was invalid
  }

  // Clear any previous error
  errorElement.innerHTML = ""; //Clear any previous error
  return true; //Indicate that the value is valid
}

// Function to get the stock amount
function getStockAmount(event) {
  event.preventDefault(); // Prevent the form from being submitted and the page from reloading

  // Get the available funds and stock price from the form
  const availableFunds = parseFloat(
    document.getElementById("availableFunds").value
  );
  // Get the stock price from the form
  const stockPrice = parseFloat(document.getElementById("stockPrice").value);

  // Find the elements where we will show the errors
  const availableFundsError = document.getElementById("availableFundsError");
  const stockPriceError = document.getElementById("stockPriceError");

  // Check if the available funds and stock price are valid
  const isAvailableFundsValid = emptyValueCheck(
    availableFunds,
    availableFundsError,
    "Please enter a valid value for available funds."
  );

  // Check if the stock price is valid
  const isStockPriceValid = emptyValueCheck(
    stockPrice,
    stockPriceError,
    "Please enter a valid value for stock price."
  );

  // If both values are valid, calculate the number of stocks
  if (isAvailableFundsValid && isStockPriceValid) {
    const numStocks = Math.floor(availableFunds / stockPrice);
    document.getElementById("totalShares").innerText = `${numStocks} SHARES`;

    // Calculate profits and display them
    calculateProfit(numStocks, stockPrice);
  }
}

// Function to calculate profits
function calculateProfit(numStocks, stockPrice) {
  // Define an array with profit percentages from 1% to 10%
  const profitPercentages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Find the element where we will show the profits
  const profitOutput = document.getElementById("profitOutput");

  // Calculate the profit for each percentage
  const profits = profitPercentages.map(function (percent) {
    // Calculate profit for the current percentage
    const profit = (numStocks * stockPrice * percent) / 100;

    // Calculate the new share price after profit
    const newSharePrice = stockPrice + profit / numStocks;

    // We return both the profit and newSharePrice to use later in the output
    return { profit, newSharePrice };
  });

  // Create a string that shows each profit percentage and the corresponding amount
  const profitText = profitPercentages
    .map(function (percent, index) {
      // Extract profit and newSharePrice from the object returned by map
      const { profit, newSharePrice } = profits[index];

      // Return the formatted string with profit and new share price
      return `
        <p class="profit">
          ${percent}%:(<span>$${profit.toFixed(2)}</span>) Stock Price: <span>$${newSharePrice.toFixed(2)}</span>
        </p>`;
    })
    .join(""); // Join the array into a single string without any separator

  // Display the profit text in the profitOutput element
  profitOutput.innerHTML = profitText;
}
