"use strict";

console.log("P10 JavaScript aktif");

// ===== 1. DATA: array of object (struktur konsisten) =====
const produkUmkm = [
  { nama: "Kacang Hijau Klasik", kategori: "Klasik", harga: 35000, stok: 12, unggulan: true, diskonPersen: 0 },
  { nama: "Basah Original", kategori: "Klasik", harga: 36000, stok: 4, unggulan: false, diskonPersen: 10 },
  { nama: "Crispy Ubi Susu", kategori: "Crispy", harga: 38000, stok: 0, unggulan: false, diskonPersen: 0 },
  { nama: "Kukus Cokelat Melt", kategori: "Kukus", harga: 40000, stok: 8, unggulan: true, diskonPersen: 0 },
  { nama: "Pandan Wangi", kategori: "Pandan", harga: 42000, stok: 20, unggulan: false, diskonPersen: 0 },
];

// ===== 2. FUNCTION PENGOLAH DATA =====

// Kontrak: parameter nilai (angka) -> return teks rupiah. Tidak mengubah DOM.
function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

// Kontrak: parameter stok (angka) -> return { label, className }. Tidak mengubah DOM.
function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

// Kontrak: parameter kategori (teks) -> return deskripsi singkat (teks).
function labelKategori(kategori) {
  switch (kategori) {
    case "Klasik":
      return "Bakpia legendaris";
    case "Crispy":
      return "Bakpia renyah";
    case "Kukus":
      return "Bakpia lembut";
    case "Pandan":
      return "Bakpia aroma pandan";
    default:
      return "Produk UMKM";
  }
}

// Kontrak: parameter harga & diskonPersen (angka) -> return harga akhir (bilangan bulat).
function hargaSetelahDiskon(harga, diskonPersen) {
  return Math.round(harga - (harga * diskonPersen) / 100);
}

// Kontrak: menerima SATU object produk -> return HTML string. Tidak mengubah DOM.
function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  const badgeUnggulan = produk.unggulan
    ? `<span class="product-badge">Produk unggulan</span>`
    : "";

  const hargaHtml =
    produk.diskonPersen > 0
      ? `<s>${formatRupiah(produk.harga)}</s> ${formatRupiah(
          hargaSetelahDiskon(produk.harga, produk.diskonPersen)
        )} <span>diskon ${produk.diskonPersen}%</span>`
      : formatRupiah(produk.harga);

  return `
    <article class="js-product-card">
      ${badgeUnggulan}
      <h3>${produk.nama}</h3>
      <p class="category-note">${labelKategori(produk.kategori)}</p>
      <p class="price">${hargaHtml}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

// ===== 3. P11: DOM SELECTION =====
const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

// ===== 4. P11: BUAT ELEMEN PRODUK =====
function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  card.append(title, category, price, stock);

  // Latihan remove() (langkah 8)
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("ghost-button");

  removeButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
  });

  card.append(removeButton);

  return card;
}

// ===== 5. P11: EMPTY STATE =====
function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

// ===== 6. P11: RENDER PRODUK =====
function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

renderProduk();

// ===== 7. P11: EVENT LISTENER DAN classList =====
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

// ===== 4. TES CEPAT (untuk evidence E03 & E04) =====
console.log(formatRupiah(85000));
console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));
