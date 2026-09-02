import { postData } from "./post.js";

export function deleteRow(row) {
    postData(row, "", "");
    console.log(`Row ${row} has been deleted.`);
}