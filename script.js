
/* 🌸 Pak Arabic Parlor – Dynamic App (Embedded JSON, No Fetch Required) */

document.addEventListener("DOMContentLoaded", () => {
  // 🔧 BASIC INFO
  const salonInfo = {
    phone: "966582617487",
    offerMonth: new Date().toLocaleString("en-US", { month: "long" }),
    offerName: "Glow Offer",
    discount: 10 // %
  };

  // ✨ OFFER BANNER
  document.querySelector(".banner").textContent =
    `✨ ${salonInfo.offerMonth} ${salonInfo.offerName} – ${salonInfo.discount}% OFF All Services! ✨`;

  // 🌸 ELEMENT REFERENCES
  const totalDisplay = document.getElementById("total");
  const sendBtn = document.getElementById("send");
  const clearBtn = document.getElementById("clear");
  const nameInput = document.getElementById("customerName");
  const timeInput = document.getElementById("customerTime");
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const backToTop = document.getElementById("backToTop");
  const serviceContainer = document.getElementById("serviceList");
  const summaryBtn = document.getElementById("summary");
  const summaryArea = document.getElementById("summaryArea");
  const summaryText = document.getElementById("summaryText");

  // ⏰ LIVE CLOCK
  const dateTimeDisplay = document.getElementById("currentDateTime");
  function updateDateTime() {
    const now = new Date();
    dateTimeDisplay.textContent = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  setInterval(updateDateTime, 1000);
  updateDateTime();

  // 📍 LOCATION
  document.getElementById("locationBtn").addEventListener("click", () => {
    window.open("https://goo.gl/maps/ttfrKNCARaquVyWb9", "_blank");
  });

  // 🧾 EMBEDDED JSON DATA
  const data = [
    { "category": "Manicure & Pedicure", "service": "Light Manicure", "old": 60 },
    { "category": "Manicure & Pedicure", "service": "Special Manicure", "old": 70 },
    { "category": "Manicure & Pedicure", "service": "Regular Manicure", "old": 50 },
    { "category": "Manicure & Pedicure", "service": "Nail Cut & Filing (Hands)", "old": 20 },
    { "category": "Manicure & Pedicure", "service": "Nail Polish (Hands)", "old": 15 },
    { "category": "Manicure & Pedicure", "service": "Light Pedicure", "old": 70 },
    { "category": "Manicure & Pedicure", "service": "Special Pedicure", "old": 90 },
    { "category": "Manicure & Pedicure", "service": "Regular Pedicure", "old": 80 },
    { "category": "Manicure & Pedicure", "service": "Nail Cut & Filing (Feet)", "old": 20 },
    { "category": "Manicure & Pedicure", "service": "Nail Polish (Feet)", "old": 15 },

    { "category": "Waxing", "service": "Full Body Wax", "old": 200 },
    { "category": "Waxing", "service": "Legs – Full", "old": 100 },
    { "category": "Waxing", "service": "Legs – Half", "old": 50 },
    { "category": "Waxing", "service": "Arms – Full", "old": 90 },
    { "category": "Waxing", "service": "Arms – Half", "old": 45 },
    { "category": "Waxing", "service": "Underarms", "old": 30 },
    { "category": "Waxing", "service": "Hands (Wax)", "old": 15 },
    { "category": "Waxing", "service": "Feet (Wax)", "old": 15 },

    { "category": "Facial & Skin Treatments", "service": "Deep Clean Up", "old": 70 },
    { "category": "Facial & Skin Treatments", "service": "Regular Facial", "old": 80 },
    { "category": "Facial & Skin Treatments", "service": "Golden Facial + Whitening Facial", "old": 120 },
    { "category": "Facial & Skin Treatments", "service": "Bleach Only", "old": 40 },
    { "category": "Facial & Skin Treatments", "service": "Skin Polish", "old": 80 },
    { "category": "Facial & Skin Treatments", "service": "Herbal Whitening", "old": 110 },
    { "category": "Facial & Skin Treatments", "service": "Skin Whitening", "old": 100 },
    { "category": "Facial & Skin Treatments", "service": "Skin Lightening Pack", "old": 130 },
    { "category": "Facial & Skin Treatments", "service": "Clean & Glow 24K Whitening Gold Facial", "old": 120 },
    { "category": "Facial & Skin Treatments", "service": "Christine Whitening Facial", "old": 100 },
    { "category": "Facial & Skin Treatments", "service": "B-Cute Facial", "old": 130 },
    { "category": "Facial & Skin Treatments", "service": "Gold Series Facial", "old": 140 },
    { "category": "Facial & Skin Treatments", "service": "Doctor Derma Facial", "old": 140 },
    { "category": "Facial & Skin Treatments", "service": "Glowta White Special Facial", "old": 150 },
    { "category": "Facial & Skin Treatments", "service": "Hydra Facial", "old": 150 },
    { "category": "Facial & Skin Treatments", "service": "Silky Cool Gold Facial", "old": 160 },
    { "category": "Facial & Skin Treatments", "service": "Silky Cool Diamond Facial", "old": 160 },
    { "category": "Facial & Skin Treatments", "service": "Doctor Romeo Rice Facial", "old": 100 },
    { "category": "Facial & Skin Treatments", "service": "Doctor Romeo Vitamin C Facial", "old": 100 },
    { "category": "Facial & Skin Treatments", "service": "ANN Facial", "old": 100 },
    { "category": "Facial & Skin Treatments", "service": "Botanic Gold & Whitening Facial", "old": 120 },

    { "category": "Threading & Bleach", "service": "Face Threading", "old": 50 },
    { "category": "Threading & Bleach", "service": "Face Waxing", "old": 60 },
    { "category": "Threading & Bleach", "service": "Face Bleach", "old": 30 },
    { "category": "Threading & Bleach", "service": "Upper Lip + Chin", "old": 15 },
    { "category": "Threading & Bleach", "service": "Eyebrow", "old": 20 },
    { "category": "Threading & Bleach", "service": "Bleach (Item)", "old": 20 },
    { "category": "Threading & Bleach", "service": "Color (Item)", "old": 20 },
    { "category": "Threading & Bleach", "service": "Face Side (Wax)", "old": 25 },
    { "category": "Threading & Bleach", "service": "Face Side (Thread)", "old": 25 },
    { "category": "Threading & Bleach", "service": "Nose Inside", "old": 10 },
    { "category": "Threading & Bleach", "service": "Forehead", "old": 10 },
    { "category": "Threading & Bleach", "service": "Neck", "old": 10 },

    { "category": "Hair Services", "service": "Front Cut", "old": 20 },
    { "category": "Hair Services", "service": "Trimming", "old": 30 },
    { "category": "Hair Services", "service": "U/V Straight", "old": 40 },
    { "category": "Hair Services", "service": "Layer Step (Based on Length)", "old": 80 },
    { "category": "Hair Services", "service": "Blow Dry – Short", "old": 40 },
    { "category": "Hair Services", "service": "Blow Dry – Medium", "old": 50 },
    { "category": "Hair Services", "service": "Blow Dry – Long", "old": 60 },
    { "category": "Hair Services", "service": "Oil Hair SPA", "old": 40 },
    { "category": "Hair Services", "service": "Henna/Hair Fall + Treatment", "old": 90 },
    { "category": "Hair Services", "service": "Roots Highlights", "old": 200 },
    { "category": "Hair Services", "service": "Baby Girl (Hair)", "old": 30 },
    { "category": "Hair Services", "service": "Sticking (According to Hair Condition)", "old": 250 },
    { "category": "Hair Services", "service": "Straightening", "old": 600 },
    { "category": "Hair Services", "service": "Rebonding", "old": 700 },
    { "category": "Hair Services", "service": "Keratin + Protein Straightening Treatment", "old": 800 },
    { "category": "Hair Services", "service": "Hair Dye (Without Color)", "old": 40 },
    { "category": "Hair Services", "service": "Hair Dye (With Color)", "old": 70 },

    { "category": "Henna Designs", "service": "Hand Front Side Only", "old": 15 },
    { "category": "Henna Designs", "service": "Hand Back Side Only", "old": 15 },
    { "category": "Henna Designs", "service": "Hand to Half Arms", "old": 25 },
    { "category": "Henna Designs", "service": "Hand to Full Arms", "old": 35 },
    { "category": "Henna Designs", "service": "Baby Girl Hand", "old": 10 },

    { "category": "Extra Items", "service": "Organic Pakistani Original Red Hair Mehindi", "old": 100 },
    { "category": "Extra Items", "service": "Organic Fast Hair Growth Oil – 200 ml", "old": 100 },
    { "category": "Extra Items", "service": "Organic Fast Hair Growth Oil – 100 ml", "old": 50 },
    { "category": "Extra Items", "service": "Organic Fast Hair Growth Oil – 50 ml", "old": 25 },
    { "category": "Extra Items", "service": "Herbal Skin Whitening Botanic Mask (per pack)", "old": 20 },
    { "category": "Extra Items", "service": "Full Body Massage", "old": 150 },
    { "category": "Extra Items", "service": "All Face Problems Whitening Cream", "old": 20 }
  ];

  buildServices(data);

  // 🧱 BUILD SERVICES
  function buildServices(data) {
    const categories = {};
    const rate = salonInfo.discount / 100;

    data.forEach(item => {
      const cat = item.category.trim();
      if (!categories[cat]) categories[cat] = [];
      const newPrice = Math.round(item.old * (1 - rate));
      categories[cat].push({ ...item, new: newPrice });
    });

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

      if (![...categoryFilter.options].some(o => o.text === cat)) {
        const opt = document.createElement("option");
        opt.value = cat.toLowerCase();
        opt.text = cat;
        categoryFilter.add(opt);
      }
    });

    attachListeners();
  }

  // 🎛 ALL EVENT LISTENERS (same as before)
  function attachListeners() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb =>
      cb.addEventListener("change", updateTotal)
    );

    // 🔍 Search
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

    // 🧭 Category Filter
    categoryFilter.addEventListener("change", e => {
      const selected = e.target.value;
      document.querySelectorAll("section.box[data-category]").forEach(sec => {
        sec.style.display = selected === "all" || sec.dataset.category === selected ? "block" : "none";
      });
      searchInput.value = "";
      clearSearch.style.display = "none";
      document.querySelectorAll(".service").forEach(s => (s.style.display = "flex"));
    });

    // 🔄 Clear Button
    clearBtn.addEventListener("click", () => {
      document.querySelectorAll('input[type="checkbox"]').forEach(c => (c.checked = false));
      nameInput.value = "";
      timeInput.value = "";
      updateTotal();
      summaryArea.hidden = true;
      summaryText.innerHTML = "No summary yet.";
    });

    // 🧾 Summary
    summaryBtn.addEventListener("click", () => {
      const checked = [...document.querySelectorAll('input[type="checkbox"]:checked')];
      if (!checked.length) { alert("Please select at least one service."); return; }

      const selected = checked.map(c => `${c.dataset.name} (${Number(c.value).toFixed(0)} SAR)`).join("<br>");
      const customer = (nameInput.value || "Customer").trim();
      const apptTime = timeInput.value ? new Date(timeInput.value).toLocaleString() : "Not selected";
      const total = totalDisplay.textContent;

      summaryText.innerHTML = `
        <p><b>Name:</b> ${customer}</p>
        <p><b>Appointment:</b> ${apptTime}</p>
        <p><b>Selected Services:</b><br>${selected}</p>
        <p><b>Total:</b> ${total} SAR</p>
      `;
      summaryArea.hidden = false;
      summaryArea.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // 💬 WhatsApp Send
    sendBtn.addEventListener("click", () => {
      const checked = [...document.querySelectorAll('input[type="checkbox"]:checked')];
      if (!checked.length) { alert("Please select at least one service."); return; }

      const selected = checked.map(c => `- ${c.dataset.name} (${Number(c.value).toFixed(0)} SAR)`).join("\n");
      const customer = (nameInput.value || "Customer").trim();
      const apptTime = timeInput.value ? new Date(timeInput.value).toLocaleString() : "Not selected";
      const total = totalDisplay.textContent;

      const plain = `*Pak Arabic Parlor Booking*

👩 Name: ${customer}
🕒 Appointment: ${apptTime}

*Selected Services:*
${selected}

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
      window.open(url, "_blank", "noopener");
    });

    // ⬆ Back to Top
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 250 ? "block" : "none";
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // 💰 TOTAL
  function updateTotal() {
    let total = 0;
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (cb.checked) total += Number(cb.value);
    });
    totalDisplay.textContent = total.toFixed(0);
  }
});

