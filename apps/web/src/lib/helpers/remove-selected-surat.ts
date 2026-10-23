// remove selected-surat item from localStorage
export function removeSelectedSurat() {
  if (localStorage.getItem("selected-surat") as string) {
    localStorage.removeItem("selected-surat");
  }
}
