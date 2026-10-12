const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const clearButton = document.getElementById("clearFilters");
const rows = Array.from(document.querySelectorAll("#callsTable tbody tr"));

function normalize(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matches(row, status, query) {
  const rowStatus = row.dataset.status;
  const caller = normalize(row.cells[0].textContent);
  const statusOk = status === "all" || rowStatus === status;
  const searchOk = query === "" || caller.includes(query);
  return statusOk && searchOk;
}

function updateCount(visible) {
  resultCount.textContent = "Showing " + visible + " of " + rows.length + " calls";
  emptyState.hidden = visible !== 0;
}

function applyFilters() {
  const status = statusFilter.value;
  const query = normalize(searchInput.value);
  let visible = 0;

  rows.forEach(function (row) {
    const show = matches(row, status, query);
    row.hidden = !show;
    if (show) {
      visible += 1;
    }
  });

  updateCount(visible);
}

statusFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);

clearButton.addEventListener("click", function () {
  statusFilter.value = "all";
  searchInput.value = "";
  applyFilters();
});

applyFilters();
