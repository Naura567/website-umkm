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

// ===== 3. RENDER: baca target DOM, guard, isi halaman =====
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid && !ringkasan && !unggulan) {
    return;
  }

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok);
  });
  console.table(produkUmkm);

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";
}

document.addEventListener("DOMContentLoaded", renderProduk);

// ===== 4. TES CEPAT (untuk evidence E03 & E04) =====
console.log(formatRupiah(85000));
console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));
