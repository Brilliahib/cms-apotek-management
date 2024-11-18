export function convertRupiah(amount: number | string): string {
  const numberAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  const numberString = numberAmount.toFixed(0);
  return "Rp " + numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
