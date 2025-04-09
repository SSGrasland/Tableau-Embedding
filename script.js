console.log("Hello Back to School!");

// Get the Tableau viz custom element from the DOM
const viz = document.getElementById("tableauViz");

// Variables to store the workbook, active sheet, and worksheets
let workbook, dashboards, vizActiveSheet, listSheets;

// Variables for specific sheets to filter (adjust names to match your workbook)
let saleMap, totalSales, salesByProduct, salesBySegment;

// Declare and define buttons using their unique IDs
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");
const filterRangeButton = document.getElementById("filter_range");

/**
 * Function: logWorkbookInformation
 * -------------------------------
 * Gets workbook information once the viz becomes interactive.
 * Logs the workbook name, iterates through dashboards and worksheets,
 * and assigns specific worksheet objects for filtering.
 */
function logWorkbookInformation() {
  // Access the workbook from the embed (if using the custom element, properties are available)
  workbook = viz.workbook;
  console.log("The workbook name is: " + workbook.name);

  // Get an array of published sheets (dashboards) and log each one
  dashboards = workbook.publishedSheetsInfo;
  dashboards.forEach(logDashboard);

  // Get the active sheet (this might be a dashboard) and log its name
  vizActiveSheet = workbook.activeSheet;
  console.log("The active sheet is: " + vizActiveSheet.name);

  // Get the worksheets within the active sheet and log each one
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach(logActiveSheet);

  // Assign specific worksheets to variables based on their names
  // (Make sure these names match exactly your workbook's worksheet names)
  saleMap = listSheets.find((ws) => ws.name === "SaleMap");
  totalSales = listSheets.find((ws) => ws.name === "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name === "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name === "SalesbySegment");
}

/**
 * Function: logDashboard
 * -------------------------------
 * Logs the dashboard name and index.
 */
function logDashboard(dashboard) {
  let index = dashboard.index;
  console.log("The dashboard with index [" + index + "] is: " + dashboard.name);
}

/**
 * Function: logActiveSheet
 * -------------------------------
 * Logs each worksheet’s name and index.
 */
function logActiveSheet(worksheet) {
  let index = worksheet.index;
  console.log("The worksheet with index [" + index + "] is: " + worksheet.name);
}

// Add an event listener for when the viz becomes interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

/**
 * Function: oregonWashingtonFunction
 * -------------------------------
 * Applies a filter to the designated worksheets to show only Washington and Oregon.
 */
function oregonWashingtonFunction() {
  console.log(oregonWashingtonButton.value);
  if (saleMap)
    saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  if (totalSales)
    totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  if (salesByProduct)
    salesByProduct.applyFilterAsync(
      "State",
      ["Washington", "Oregon"],
      "replace"
    );
  if (salesBySegment)
    salesBySegment.applyFilterAsync(
      "State",
      ["Washington", "Oregon"],
      "replace"
    );
}

/**
 * Function: clearStateFilter
 * -------------------------------
 * Clears the "State" filter from the designated worksheets.
 */
function clearStateFilter() {
  console.log(clearFilterButton.value);
  if (saleMap) saleMap.clearFilterAsync("State");
  if (totalSales) totalSales.clearFilterAsync("State");
  if (salesByProduct) salesByProduct.clearFilterAsync("State");
  if (salesBySegment) salesBySegment.clearFilterAsync("State");
}

/**
 * Function: unDo
 * -------------------------------
 * Calls the Tableau API undoAsync() method to undo the last action.
 */
function unDo() {
  console.log(undoButton.value);
  viz.undoAsync();
}

// Adding the range filter function on the "saleMap" worksheet.
// It reads min and max values from inputs, converts them to numbers,
// and then applies a range filter for "SUM(Sales)".
filterRangeButton.addEventListener("click", function filterRangeFunction() {
  const minValue = parseFloat(document.getElementById("minValue").value);
  const maxValue = parseFloat(document.getElementById("maxValue").value);
  console.log("Range Filter - Min:", minValue, "Max:", maxValue);
  if (saleMap) {
    saleMap.applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    });
  }
});

// Add event listeners for the primary button actions
oregonWashingtonButton.addEventListener("click", oregonWashingtonFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDo);
