/* =========================================================
   Bakpia.id — Script utama P05
   ========================================================= */

// Tombol Promo (Beranda)
const promoButton = document.querySelector("#promo");

if (promoButton) {
  promoButton.addEventListener("click", () => {
    promoButton.textContent = "🎉 Promo: Beli 2 Box Gratis 1 Box Mini!";
  });
}

// Info tabel (Produk) — latihan dev console
const rows = document.querySelectorAll("tbody tr");
if (rows.length > 0) {
  console.log("Jumlah produk pada tabel:", rows.length);
}

const caption = document.querySelector("caption");
if (caption) {
  console.log("Caption tabel:", caption.textContent);
}

// Preview Form Kontak — pakai simbol ✓ agar status tidak bergantung warna saja
const formKontak = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview");

if (formKontak && preview) {
  formKontak.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(formKontak);
    const nama = data.get("nama");
    const wa = data.get("wa");
    const waktu = data.get("waktu");

    preview.textContent = `✓ Terima kasih, ${nama}. Kami akan balas ke ${wa} pada waktu ${waktu}.`;

    formKontak.reset();
  });
}