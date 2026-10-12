/* =========================================================
   Bakpia.id — Form Handler (js/form.js)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const formKontak = document.querySelector("#form-kontak");
  const preview = document.querySelector("#preview");

  if (!formKontak || !preview) return;

  formKontak.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(formKontak);
    const nama = data.get("nama")?.trim();
    const email = data.get("email")?.trim();
    const paket = data.get("paket") || "Paket Belum Dipilih";
    const wa = data.get("wa")?.trim();
    const waktu = data.get("waktu") || "Fleksibel";
    const pesan = data.get("pesan")?.trim();

    let pesanText = `Terima kasih, ${nama}! Kami telah mencatat pesanan untuk "${paket}". `;
    pesanText += `Konfirmasi akan kami kirimkan via WhatsApp ke ${wa} pada waktu ${waktu} (Email: ${email}).`;

    if (pesan) {
      pesanText += ` Catatan: "${pesan}".`;
    }

    preview.textContent = pesanText;

    // Reset form setelah submit berhasil
    formKontak.reset();
  });
});
