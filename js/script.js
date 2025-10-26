let currentRow = null;

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  document.querySelectorAll(".menu a").forEach(a => a.classList.remove("active"));
  event.target.classList.add("active");
}

function openModal(button) {
  currentRow = button.closest("tr");
  const roomCode = currentRow.cells[0].innerText;
  document.getElementById("roomName").innerText = `Phòng: ${roomCode}`;
  document.getElementById("statusModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("statusModal").style.display = "none";
}

function saveStatus() {
  const newStatus = document.getElementById("newStatus").value;
  const statusCell = currentRow.cells[2];
  statusCell.innerHTML = `<span class="status ${getStatusClass(newStatus)}">${newStatus}</span>`;
  closeModal();
  showToast();
}

function getStatusClass(status) {
  if (status === "Đang ở") return "dango";
  if (status === "Trống") return "trong";
  if (status === "Giữ chỗ") return "giu";
}

function filterRooms() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const statusFilter = document.getElementById("statusFilter").value;
  const rows = document.querySelectorAll("#roomTable tbody tr");

  rows.forEach(row => {
    const roomCode = row.cells[0].innerText.toLowerCase();
    const floor = row.cells[1].innerText.toLowerCase();
    const status = row.cells[2].innerText.trim();

    const matchesSearch = roomCode.includes(searchValue) || floor.includes(searchValue);
    const matchesStatus = statusFilter === "" || status === statusFilter;

    row.style.display = (matchesSearch && matchesStatus) ? "" : "none";
  });
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function generateReport() {
  const type = document.getElementById("reportType").value;
  const output = document.getElementById("reportResult");
  if (!type) {
    output.innerHTML = "<p style='color:red;'>⚠️ Vui lòng chọn loại báo cáo trước.</p>";
    return;
  }

  let html = "<h4>Kết quả báo cáo:</h4><table border='1' cellpadding='10'><tr><th>STT</th><th>Nội dung</th><th>Giá trị</th></tr>";

  if (type === "phong") {
    html += "<tr><td>1</td><td>Tổng số phòng</td><td>25</td></tr><tr><td>2</td><td>Phòng đang ở</td><td>18</td></tr><tr><td>3</td><td>Phòng trống</td><td>7</td></tr>";
  } else if (type === "taichinh") {
    html += "<tr><td>1</td><td>Doanh thu tháng</td><td>56,000,000 VNĐ</td></tr><tr><td>2</td><td>Chi phí vận hành</td><td>15,000,000 VNĐ</td></tr>";
  } else if (type === "dangky") {
    html += "<tr><td>1</td><td>Số sinh viên đăng ký</td><td>400</td></tr><tr><td>2</td><td>Số sinh viên đang ở</td><td>360</td></tr>";
  }

  html += "</table>";
  output.innerHTML = html;
}
