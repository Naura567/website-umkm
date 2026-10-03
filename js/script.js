// --- KODE UNTUK TOMBOL PROMO (Index) ---
const promo = document.querySelector("#promo");

if (promo) {
  promo.addEventListener("click", () => {
    promo.textContent = "Promo: Beli 2 Box Gratis 1 Box Mini!";
  });
}

// Menghitung jumlah baris produk di tabel
const rows = document.querySelectorAll("tbody tr");
if (rows.length > 0) {
    console.log("Jumlah produk pada tabel:", rows.length);
}

// Mengambil teks caption tabel
const caption = document.querySelector("caption");
if (caption) {
    console.log("Caption tabel:", caption.textContent);
}