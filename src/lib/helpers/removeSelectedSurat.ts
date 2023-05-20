import { decryptedDataToUtf8 } from "./decryptedDataToUtf8";

// remove selected-surat item from localStorage
export function removeSelectedSurat() {
  if (decryptedDataToUtf8(localStorage.getItem("selected-surat") as string)) {
    localStorage.removeItem("selected-surat");
  }
}
