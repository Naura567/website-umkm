const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

if (form && preview) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const nama = data.get("nama") || "-";
    const email = data.get("email") || "-";
    const telepon = data.get("telepon") || "-";
    const paket = data.get("paket") || "-";
    const topik = data.get("topik") || "-";
    const waktu = data.get("waktu") || "-";
    const pesan = data.get("pesan") || "-";

    preview.textContent = [
      "=== DATA PEMESANAN BAKPIA.ID ===",
      `Nama Pemesan    : ${nama}`,
      `Alamat Email    : ${email}`,
      `Nomor WhatsApp  : ${telepon}`,
      `Paket Bakpia    : ${paket}`,
      `Jenis Pesanan   : ${topik}`,
      `Waktu Kontak    : ${waktu}`,
      `Catatan Pesanan : ${pesan}`,
      "================================",
      "Status: Form terkirim sukses tanpa reload. Tim Bakpia.id akan segera memproses pesanan Anda.",
    ].join("\n");
  });
}
