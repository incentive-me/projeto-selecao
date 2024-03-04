export function HideRow(id: number) {
  const paymentSelected = document.querySelector(
    `.MuiDataGrid-row[data-id="${id}"]`
  ) as HTMLDivElement | null;

  if (paymentSelected) {
    paymentSelected.style.display = "none";
  }
}
