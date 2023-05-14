import secureLocalStorage from "react-secure-storage";

export function removeSelectedSurat() {
  if (secureLocalStorage.getItem("selected-surat")) {
    secureLocalStorage.removeItem("selected-surat");
  }
}
