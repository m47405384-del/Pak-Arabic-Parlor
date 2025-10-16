document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('servicesContainer');
  const totalDisplay = document.getElementById('total');
  const searchInput = document.getElementById('serviceSearch');
  const clearBtn = document.getElementById('clearSearch');
  const confirmBtn = document.getElementById('confirmBtn');
  const sendBtn = document.getElementById('sendWhatsapp');
  const summaryBox = document.getElementById('summaryBox');
  const summaryMsg = document.getElementById('summaryMessage');
  const serviceList = document.getElementById('serviceList');
  const totalPriceEl = document.getElementById('totalPrice');
  const nameInput = document.getElementById('customerName');
  const timeInput = document.getElementById('visitTime');
  const offerPercentEl = document.getElementById('offerPercent');

  // Load services & discount from prices.json
  fetch('prices.json')
    .then(res => res.json())
    .then(data => {
      if (offerPercentEl) offerPercentEl.textContent = `${data.discount}%`;
      buildServices(data);
      attachEvents();
    })
    .catch(err => {
      console.error('Error loading prices.json', err);
      container.innerHTML = '<p style="color:red;text-align:center;">Failed to load prices list.</p>';
    });

  // Build services into the DOM
  function buildServices(data){
    container.innerHTML = ''; // clear
    const discount = Number(data.discount) || 0;

    data.services.forEach(section => {
      const sec = document.createElement('section');
      sec.className = 'box service-group';
      const h = document.createElement('h3');
      h.textContent = section.category;
      sec.appendChild(h);

      section.items.forEach(item => {
        const original = Number(item.price) || 0;
        const discounted = Math.round(original * (1 - discount/100));

        const row = document.createElement('div');
        row.className = 'service';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;

        const priceSpan = document.createElement('span');
        priceSpan.className = 'price';
        priceSpan.innerHTML = `<span class="old">${original} SAR</span> <span class="new">${discounted} SAR</span>`;

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = String(discounted);
        cb.setAttribute('data-name', item.name);

        row.appendChild(nameSpan);
        row.appendChild(priceSpan);
        row.appendChild(cb);
        sec.appendChild(row);
      });

      container.appendChild(sec);
    });
  }

  function attachEvents(){
    const checkboxes = document.querySelectorAll('.service input[type="checkbox"]');
    checkboxes.forEach(cb => cb.addEventListener('change', updateTotal));
    updateTotal();

    function num(v){ return parseFloat(v) || 0; }

    function updateTotal(){
      let total = 0;
      checkboxes.forEach(c => { if (c.checked) total += num(c.value); });
      totalDisplay.textContent = total.toFixed(0);
    }

    function filterServices(){
      const q = (searchInput.value || '').trim().toLowerCase();
      const groups = document.querySelectorAll('.service-group');
      groups.forEach(g => {
        let any = false;
        g.querySelectorAll('.service').forEach(r => {
          const txt = r.innerText.toLowerCase();
          const match = q === '' || txt.includes(q);
          r.style.display = match ? '' : 'none';
          if (match) any = true;
        });
        g.style.display = any ? '' : 'none';
      });
    }

    searchInput.addEventListener('input', filterServices);
    clearBtn.addEventListener('click', () => {
      searchInput.value = ''; filterServices(); searchInput.focus();
    });

    confirmBtn.addEventListener('click', buildSummary);
    sendBtn.addEventListener('click', sendWhatsApp);

    function buildSummary(){
      // clear previous
      serviceList.innerHTML = '';
      totalPriceEl.textContent = '';

      const chosen = Array.from(checkboxes).filter(c => c.checked);
      const name = (nameInput.value || 'Customer').trim();
      const timeVal = timeInput.value;

      if (!timeVal){
        summaryBox.classList.add('active');
        summaryMsg.textContent = 'Please select date and time.';
        summaryMsg.style.color = 'red';
        return { ok:false };
      }
      if (chosen.length === 0){
        summaryBox.classList.add('active');
        summaryMsg.textContent = 'Please select at least one service.';
        summaryMsg.style.color = 'red';
        return { ok:false };
      }

      const when = new Date(timeVal).toLocaleString();

      let total = 0;
      chosen.forEach(c => {
        total += num(c.value);
        const li = document.createElement('li');
        li.textContent = `${c.dataset.name} — ${num(c.value).toFixed(0)} SAR`;
        serviceList.appendChild(li);
      });

      summaryBox.classList.add('active');
      summaryMsg.innerHTML = `Appointment for <b>${name}</b> on <b>${when}</b>`;
      summaryMsg.style.color = '#16a34a';
      totalPriceEl.textContent = `Total Estimated: ${total.toFixed(0)} SAR`;

      return { ok:true, name, when, total, items: chosen.map(c => `${c.dataset.name} (${num(c.value).toFixed(0)} SAR)`) };
    }

    function sendWhatsApp(){
      const r = buildSummary(); if (!r.ok) return;

      const phone = '966582617487';
      const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

      const lines = [
        '*Pak Arabic Parlor Booking*',
        '',
        `Name: ${r.name}`,
        `Date & Time: ${r.when}`,
        '',
        '*Selected Services:*',
        ...r.items.map(s => `- ${s}`),
        '',
        `Total: ${r.total.toFixed(0)} SAR`,
        'Location: Al Khobar Shamalia'
      ];

      const text = encodeURIComponent(lines.join('\n'));
      const url = isMobile
        ? `https://wa.me/${phone}?text=${text}`
        : `https://web.whatsapp.com/send?phone=${phone}&text=${text}`;

      const win = window.open(url, '_blank');
      if (!win) alert('Please allow pop-ups to open WhatsApp.');
    }
  }
});