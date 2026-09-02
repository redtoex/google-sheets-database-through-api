import { readRow } from "/api/read.js"; 

export async function scan(value, type, options) { 
  if (type !== "data" && type !== "label") {
    console.error("Invalid type specified. Use 'data' or 'label'.");
    return null;
  }

  let rowIndex = 1; 

  while (true) { 
    try { 
      // 1. Fixed undefined variable 'an' to 'rowIndex'
      const data = await readRow(rowIndex, "array"); 
      console.log('Reading row:', rowIndex, 'Data:', data); 

        if (type === "data" && data[1] === value) {
        
            return data[1];
        } else if (type === "label" && data[0] === value) {
            
            return data[0];
        }

      console.log("Value not found in row."); 
      rowIndex++; 

      // 100ms rate-limiting delay
      await new Promise(resolve => setTimeout(resolve, 100)); 

    } catch (error) { 
      console.error("Error reading row or end of data reached:", error); 
      break; 
    } 
  } 

  return null; 
}