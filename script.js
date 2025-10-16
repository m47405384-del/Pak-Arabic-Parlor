const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const totalDisplay = document.getElementById('total');
const confirmBtn = document.getElementById('confirmBtn');
const sendBtn = document.getElementById('sendWhatsapp');

const nameInput = document.getElementById('customerName');
const timeInput = document.getElementById('visitTime');

const summaryBox = document.getElementById('summaryBox');
const summaryMsg = document.getElementById('summaryMessage');
const serviceList = document.getElementById('serviceList');
const totalPriceEl = document.getElementById('totalPrice');

// LIVE TOTAL
function updateTotal() {
  let total = 0;
  checkboxes.forEach(cb => { if (cb.checked) total += parseFloat(cb.value); });
  totalDisplay.textContent = total.toFixed(0);
}
checkboxes.forEach(cb => cb.addEventListener('change', updateTotal));

// CREATE SUMMARY
function buildSummary() {
  // reset
  serviceList.innerHTML = '';
  totalPriceEl.textContent = '';

  const name = (nameInput.value || 'Customer').trim();
  const timeVal = timeInput.value;
  const chosen = Array.from(checkboxes).filter(cb => cb.checked);

  if (!timeVal) {
    summaryBox.classList.add('active');
    summaryMsg.textContent = 'Please select your visit date and time.';
    summaryMsg.style.color = 'red';
    return { ok: false };
  }
  if (chosen.length === 0) {
    summaryBox.classList.add('active');
    summaryMsg.textContent = 'Please select at least one service.';
    summaryMsg.style.color = 'red';
    return { ok: false };
  }

  const when = new Date(timeVal);
  const whenText = when.toLocaleString();

  let total = 0;
  chosen.forEach(cb => {
    const price = parseFloat(cb.value);
    total += price;
    const li = document.createElement('li');
    li.textContent = `${cb.dataset.name} — ${price.toFixed(0)} SAR`;
    serviceList.appendChild(li);
  });

  summaryBox.classList.add('active');
  summaryMsg.innerHTML = `Appointment for <b>${name}</b> on <b>${whenText}</b>`;
  summaryMsg.style.color = '#16a34a';
  totalPriceEl.textContent = `Total Estimated: ${total.toFixed(0)} SAR`;

  return {
    ok: true,
    name,
    whenText,
    total,
    items: chosen.map(cb => `${cb.dataset.name} (${parseFloat(cb.value).toFixed(0)} SAR)`)
  };
}

// Confirm click
confirmBtn.addEventListener('click', buildSummary);

// WhatsApp click
sendBtn.addEventListener('click', () => {
  const result = buildSummary();
  if (!result.ok) return;

  const phone = '966582617487';
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

  const lines = [
    '*Pak Arabic Parlor Booking*',
    '',
    `Name: ${result.name}`,
    `Date & Time: ${result.whenText}`,
    '',
    '*Selected Services:*',
    ...result.items.map(s => `- ${s}`),
    '',
    `Total: ${result.total.toFixed(0)} SAR`,
    'Location: Al Khobar Shamalia (see Google Maps link on site)'
  ];

  const text = encodeURIComponent(lines.join('\n'));
  const url = isMobile
    ? `https://wa.me/${phone}?text=${text}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${text}`;

  window.open(url, '_blank');
});