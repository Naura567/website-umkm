"use strict";

console.log("P09 JavaScript aktif");

// Data produk (array of object) - Bakpia.id
const produkBakpia = [
  { nama: "Kacang Hijau Klasik", kategori: "Klasik", harga: 35000, stok: 12, unggulan: true, diskonPersen: 0 },
  { nama: "Basah Original", kategori: "Klasik", harga: 36000, stok: 4, unggulan: false, diskonPersen: 10 },
  { nama: "Crispy Ubi Susu", kategori: "Crispy", harga: 38000, stok: 0, unggulan: false, diskonPersen: 0 },
  { nama: "Kukus Cokelat Melt", kategori: "Kukus", harga: 40000, stok: 8, unggulan: true, diskonPersen: 0 },
  { nama: "Pandan Wangi", kategori: "Pandan", harga: 42000, stok: 20, unggulan: false, diskonPersen: 0 },
];

console.table(produkBakpia);

// Formatter rupiah
const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkBakpia[0].harga));

// Conditional status stok (if / else)
function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }
  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "" };
}

// Conditional ringkas: switch
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

// Challenge: harga setelah diskon (aritmatika, dibulatkan agar tetap valid)
function hargaSetelahDiskon(harga, diskonPersen) {
  return Math.round(harga - (harga * diskonPersen) / 100);
}

// Render ke DOM
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return; // halaman lain tidak punya target render
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkBakpia) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    // Pengayaan: badge hanya muncul jika unggulan === true
    const badgeUnggulan = produk.unggulan
      ? `<span class="product-badge">Produk unggulan</span>`
      : "";

    // Challenge: tampilkan harga normal + promo jika ada diskon
    const hargaHtml =
      produk.diskonPersen > 0
        ? `<p class="harga"><s>${formatRupiah.format(produk.harga)}</s> ${formatRupiah.format(
            hargaSetelahDiskon(produk.harga, produk.diskonPersen)
          )} <span>diskon ${produk.diskonPersen}%</span></p>`
        : `<p class="harga">${formatRupiah.format(produk.harga)}</p>`;

    markup =
      markup +
      `
      <article class="js-product-card">
        ${badgeUnggulan}
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        ${hargaHtml}
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkBakpia.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);
