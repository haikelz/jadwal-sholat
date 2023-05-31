import secureLocalStorage from "react-secure-storage";

// remove selected-surat item from localStorage
export function removeSelectedSurat() {
  if (secureLocalStorage.getItem("selected-surat") as string) {
    secureLocalStorage.removeItem("selected-surat");
  }
}
