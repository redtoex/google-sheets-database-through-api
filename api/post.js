const apiUrl = "https://script.google.com/macros/s/AKfycbxlaP_TlKRK9Gbhag5r9nd86xiZTdVwYs-g7kkP0K2c3ybixWfq_nchN4-BgZTldslJ5w/exec";

export function postData(row, value, label) {
    const payload = new URLSearchParams();
    payload.append("row", row);      // Targeted row number
    payload.append("label", label);  // Value for Column A
    payload.append("data", value);   // Value for Column B

    fetch(apiUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: payload
    });
}

// Scans a column for a value (1 = Column A, 2 = Column B)
export async function findRowByColumnValue(searchValue, columnIndex = 1) {
    const url = `${apiUrl}?searchValue=${encodeURIComponent(searchValue)}&column=${columnIndex}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.found) {
            console.log(`Match found at Row ${data.row}`);
            return data.row;
        } else {
            console.log("Value not found in column.");
            return null;
        }
    } catch (error) {
        console.error("Error scanning column:", error);
        return null;
    }
}

// Example usage: Writes "Workout" to Col A and "10" to Col B on Row 1
// postData(1, 10, "Workout");