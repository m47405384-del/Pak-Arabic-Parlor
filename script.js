/* 🌸 Pak Arabic Parlor – Fully Dynamic with JSON & Discount */

// 🔧 EDIT THESE MONTHLY (or anytime)
const salonInfo = {
  phone: "966582617487",
  offerMonth: new Date().toLocaleString("en-US", { month: "long" }),
  offerName: "Glow Offer",
  discount: 10 // 👈 change to 20, 30, 40 ... prices auto-recalculate
};

// Update banner text
document.querySelector(".banner").textContent =
  `✨ ${salonInfo.offerMonth} ${salonInfo.offerName} – ${salonInfo.discount}% OFF All Services! ✨`;

// Elements
const totalDisplay = document.getElementById("total");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");
const nameInput = document.getElementById("customerName");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const categoryFilter = document.getElementById("categoryFilter");
const backToTop = document.getElementById("backToTop");
const serviceContainer = document.getElementById("serviceList");

// Load prices from JSON
fetch("prices.json")
  .then(res => res.json())
  .then(data => buildServices(data))
  .catch(err => {
    console.error("Error loading JSON:", err);
    serviceContainer.innerHTML = `<section class="box"><h3>Services</h3><p>Could not load services. Please check prices.json.</p></section>`;
  });

function buildServices(data) {
  // Group by category and calculate discount
  const categories = {};
  const rate = salonInfo.discount / 100;
  data.forEach(item => {
    const cat = item.category.trim();
    if (!categories[cat]) categories[cat] = [];
    const newPrice = Math.round(item.old * (1 - rate)); // clean rounding
    categories[cat].push({ ...item, new: newPrice });
  });

  // Build sections
  Object.keys(categories).forEach(cat => {
    const section = document.createElement("section");
    section.className = "box";
    section.dataset.category = cat.toLowerCase();
    section.innerHTML = `
      <h3>${cat}</h3>
      ${categories[cat].map(s => `
        <label class="service">${s.service}
          <span class="price">
            <span class="old">${s.old} SAR</span>
            <span class="new">${s.new} SAR</span>
            <input type="checkbox" value="${s.new}" data-name="${s.service}">
          </span>
        </label>
      `).join("")}
    `;
    serviceContainer.appendChild(section);

    // Add category to dropdown if not already present
    const exists = Array.from(categoryFilter.options).some(o => o.text === cat);
    if (!exists) {
      const opt = document.createElement("option");
      opt.value = cat.toLowerCase();
      opt.text = cat;
      categoryFilter.add(opt);
    }
  });

  // Attach listeners after DOM built
  attachListeners();
}

/* -- Listeners -- */
function attachListeners() {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb =>
    cb.addEventListener("change", updateTotal)
  );

  // Search
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();
    document.querySelectorAll(".service").forEach(s => {
      s.style.display = s.textContent.toLowerCase().includes(term) ? "flex" : "none";
    });
    clearSearch.style.display = term ? "block" : "none";
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.style.display = "none";
    document.querySelectorAll(".service").forEach(s => (s.style.display = "flex"));
  });

  // Category filter
  categoryFilter.addEventListener("change", e => {
    const selected = e.target.value; // 'all' or category value
    document.querySelectorAll("section.box[data-category]").forEach(sec => {
      sec.style.display = selected === "all" || sec.dataset.category === selected ? "block" : "none";
    });
  });

  // Clear all
  clearBtn.addEventListener("click", () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(c => (c.checked = false));
    nameInput.value = "";
    updateTotal();
  });

  // WhatsApp send
  sendBtn.addEventListener("click", () => {
    const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    if (!checked.length) return alert("Please select at least one service.");

    const selected = checked.map(c => `${c.dataset.name} (${Number(c.value).toFixed(0)} SAR)`);
    const customer = (nameInput.value || "Customer").trim();
    const total = totalDisplay.textContent;

    const plain =
`*Pak Arabic Parlor Booking*

👩 Name: ${customer}

*Selected Services:*
- ${selected.join('\n- ')}

💰 *Total:* ${total} SAR
📍 Al Khobar Shamalia
⏰ 12:00 PM – 12:00 AM`;

    const encoded = encodeURIComponent(plain);
    const base = /Android|iPhone|iPad/i.test(navigator.userAgent)
      ? `https://wa.me/${salonInfo.phone}?text=`
      : `https://web.whatsapp.com/send?phone=${salonInfo.phone}&text=`;

    const url = base + encoded;
    if (url.length > 2000) {
      alert("Message is too long for WhatsApp. Please select fewer services.");
      return;
    }
    const a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
  });

  // Back to top
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 250 ? "block" : "none";
  });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* -- Total calculation -- */
function updateTotal() {
  let total = 0;
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    if (cb.checked) total += Number(cb.value);
  });
  totalDisplay.textContent = total.toFixed(0);
}
