document.getElementById("confirmBtn").addEventListener("click", () => {
  const name = document.getElementById("customerName").value.trim();
  const timeInput = document.getElementById("visitTime").value;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const summaryBox = document.getElementById("summaryBox");
  const summaryMsg = document.getElementById("summaryMessage");
  const serviceList = document.getElementById("serviceList");
  const totalPrice = document.getElementById("totalPrice");

  serviceList.innerHTML = "";
  totalPrice.textContent = "";

  if (!timeInput) {
    summaryBox.classList.add("active");
    summaryMsg.textContent = "⚠️ Please select your visit date and time.";
    summaryMsg.style.color = "red";
    return;
  }

  if (checkboxes.length === 0) {
    summaryBox.classList.add("active");
    summaryMsg.textContent = "⚠️ Please select at least one service.";
    summaryMsg.style.color = "red";
    return;
  }

  const date = new Date(timeInput);
  const formatted = date.toLocaleString();
  let total = 0;

  checkboxes.forEach(cb => {
    const price = parseFloat(cb.value);
    total += price;
    const li = document.createElement("li");
    li.textContent = `${cb.dataset.name} – ${price.toFixed(0)} SAR`;
    serviceList.appendChild(li);
  });

  summaryBox.classList.add("active");
  summaryMsg.innerHTML = `✅ Appointment confirmed for <b>${name || "Customer"}</b> on <b>${formatted}</b>`;
  summaryMsg.style.color = "#16a34a";
  totalPrice.textContent = `💰 Total Estimated: ${total.toFixed(0)} SAR`;
});