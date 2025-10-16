/* 🌸 Pak Arabic Parlor & Stitching Point – Script (Revised) */

// --- Auto-update monthly banner ---
const banner = document.querySelector('.banner');
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const now = new Date();
if (banner) banner.textContent = `✨ ${months[now.getMonth()]} Glow Offer – 10% OFF All Services! ✨`;

// --- Elements ---
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const totalDisplay = document.getElementById('total');
const sendBtn = document.getElementById('send');
const clearBtn = document.getElementById('clear');
const nameInput = document.getElementById('customerName');
const searchInput = document.getElementById('searchInput');

// --- Update total ---
function updateTotal() {
  let total = 0;
  checkboxes.forEach(cb => { if (cb.checked) total += Number(cb.value || 0); });
  totalDisplay.textContent = total.toFixed(0);
}
checkboxes.forEach(cb => cb.addEventListener('change', updateTotal));

// --- Build WhatsApp message safely (encode full text) ---
function buildWhatsAppUrl() {
  const selections = Array.from(checkboxes)
    .filter(c => c.checked)
    .map(c => `${c.dataset.name} (${Number(c.value).toFixed(0)} SAR)`);

  if (!selections.length) {
    alert('Please select at least one service.');
    return null;
  }

  const name = (nameInput.value || 'Customer').trim();
  const total = totalDisplay.textContent;

  const plain =
`*Pak Arabic Parlor Booking*

👩 Name: ${name}

*Selected Services:*
- ${selections.join('\n- ')}

💰 *Total:* ${total} SAR
📍 Al Khobar Shamalia
⏰ 12:00 PM – 12:00 AM

🌸 Thank you!`;

  const encoded = encodeURIComponent(plain);
  const phone = '966582617487';
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  const base = isMobile
    ? `https://wa.me/${phone}?text=`
    : `https://web.whatsapp.com/send?phone=${phone}&text=`;

  // Safety check using encoded length
  const fullUrl = base + encoded;
  if (fullUrl.length > 2000) {
    alert('Message is too long for WhatsApp. Please send in two parts or select fewer items.');
    return null;
  }
  return fullUrl;
}

// --- Send to WhatsApp ---
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const url = buildWhatsAppUrl();
    if (!url) return;

    // Anchor click (more reliable than window.open on some environments)
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}

// --- Clear selections ---
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    checkboxes.forEach(c => (c.checked = false));
    nameInput.value = '';
    updateTotal();
  });
}

// --- Live search ---
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();
    const services = document.querySelectorAll('.service');
    services.forEach(s => {
      const text = s.textContent.toLowerCase();
      s.style.display = text.includes(term) ? 'flex' : 'none';
    });
  });
}
