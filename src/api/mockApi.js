export function fetchExtractionData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { field: "Invoice Number", value: "INV-2025" },
        { field: "Vendor", value: "Magic Systems" },
        { field: "Amount", value: "$2,430.00" },
        { field: "Date", value: "23 Feb 2026" },
        { field: "Status", value: "Completed" },
      ]);
    }, 900);
  });
}