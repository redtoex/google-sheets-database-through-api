const baseUrl = "https://script.google.com/macros/s/AKfycbxlaP_TlKRK9Gbhag5r9nd86xiZTdVwYs-g7kkP0K2c3ybixWfq_nchN4-BgZTldslJ5w/exec";

export
  async function readRow(rowNumber, format) {
  const targetRow = rowNumber;

  try {
    const response = await fetch(`${baseUrl}?row=${targetRow}`);
    const data = await response.json();

    if (format === "array") {
      console.log(data);
    } else if (format === "columns") {
      console.log("Column A:", data[0]);
      console.log("Column B:", data[1]);
      console.log("Column C:", data[2]);
      console.log("Column D:", data[3]);
    } else {
      console.log("Invalid format specified. Use 'array' or 'columns'.");
    }
    return data;
  } catch (error) {
    console.error("Error reading row:", error);
  }
}
