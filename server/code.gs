// Handles GET requests
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  
  const searchValue = e.parameter.searchValue;
  const colIndex = parseInt(e.parameter.column) || 1;
  
  if (!searchValue) {
    const rowNumber = parseInt(e.parameter.row) || 1;
    const lastColumn = sheet.getLastColumn() || 1;
    const rowValues = sheet.getRange(rowNumber, 1, 1, lastColumn).getValues()[0];
    return ContentService.createTextOutput(JSON.stringify(rowValues))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    return ContentService.createTextOutput(JSON.stringify({ found: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const columnValues = sheet.getRange(1, colIndex, lastRow, 1).getValues();

  for (let i = 0; i < columnValues.length; i++) {
    if (columnValues[i][0] == searchValue) {
      return ContentService.createTextOutput(JSON.stringify({
        found: true,
        row: i + 1,
        value: columnValues[i][0]
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ found: false }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handles POST requests
function doPost(e) {
  const targetRow = parseInt(e.parameter.row) || 1; 
  const labelValue = e.parameter.label || ""; // Goes to Column A
  const dataValue = e.parameter.data || "";   // Goes to Column B
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  
  // Column A (1) = Label | Column B (2) = Value
  sheet.getRange(targetRow, 1).setValue(labelValue);
  sheet.getRange(targetRow, 2).setValue(dataValue);
  
  return ContentService.createTextOutput("200");
}