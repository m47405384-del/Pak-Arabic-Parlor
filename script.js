const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const totalDisplay = document.getElementById('total');
const sendBtn = document.getElementById('send');
const nameInput = document.getElementById('customerName');

checkboxes.forEach(cb => cb.addEventListener('change', updateTotal));

function updateTotal() {
  let total = 0;
  checkboxes.forEach(c => { if (c.checked) total += parseFloat(c.value); });
  totalDisplay.textContent = total.toFixed(0);
}

sendBtn.addEventListener('click', () => {
  const selected = Array.from(checkboxes)
    .filter(c => c.checked)
    .map(c => `${c.dataset.name} (${parseFloat(c.value).toFixed(0)} SAR)`);

  const customer = nameInput.value.trim() || "Customer";

  if (selected.length === 0) {
    alert("Please select at least one service.");
    return;
  }

  const total = totalDisplay.textContent;
  const message =
    `*Pak Arabic Parlor Booking*%0A%0A` +
    `👩 Name: ${encodeURIComponent(customer)}%0A%0A` +
    `*Selected Services:*%0A- ${selected.join('%0A- ')}%0A%0A` +
    `💰 *Total:* ${total} SAR%0A` +
    `📍 Al Khobar Shamalia%0A⏰ 12 PM – 12 AM`;

  const phone = "966582617487";
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  const url = isMobile
    ? `https://wa.me/${phone}?text=${message}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;

  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
});
