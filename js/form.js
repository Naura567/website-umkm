const promo = document.querySelector("#promoButton") || document.querySelector("#promo");
if (promo) {
  promo.addEventListener("click", () => {
    promo.textContent = "Diskon 10% untuk pembelian 2 box atau lebih hari ini!";
  });
}

const headings = [...document.querySelectorAll("h1, h2, h3")];

console.log("Daftar heading pada halaman Bakpia.id:");
headings.forEach((heading) => {
  console.log(heading.tagName, "-", heading.textContent.trim());
});

// ===== P12: VALIDATION DAN localStorage =====

// Langkah 4: DOM selection dan helper error
const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");
const formFeedback = document.querySelector("#form-feedback");
const fields = ["nama", "email", "telepon", "paket", "pesan", "setuju"].map((id) => document.querySelector(`#${id}`));
const topikInputs = document.querySelectorAll('input[name="topik"]');

function getFieldError(field) {
  const validity = field.validity;

  if (validity.valueMissing) return "Bagian ini wajib diisi.";
  if (validity.typeMismatch) return "Format data belum sesuai.";
  if (validity.tooShort) return `Isi minimal ${field.minLength} karakter.`;
  if (validity.patternMismatch) return "Format belum sesuai contoh yang diminta.";

  return "";
}

// Langkah 5: Constraint Validation API dan focus management
function tampilkanError(field, pesan) {
  const error = document.querySelector(`#${field.id}-error`);
  field.setCustomValidity(pesan);
  field.setAttribute("aria-invalid", pesan ? "true" : "false");

  if (error) {
    error.textContent = pesan;
  }
}

function validasiField(field) {
  field.setCustomValidity("");
  const pesan = getFieldError(field);
  tampilkanError(field, pesan);
  return pesan === "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const semuaValid = fields.every((field) => validasiField(field));
  const topikValid = Array.from(topikInputs).some((input) => input.checked);

  if (!semuaValid || !topikValid || !form.checkValidity()) {
    formFeedback.textContent = "Periksa kembali bagian yang ditandai.";
    formFeedback.classList.remove("success");
    form.reportValidity();
    form.querySelector(":invalid")?.focus();
    return;
  }

  tampilkanPreview();
  simpanPreferensi();
});

// Langkah 6: preview hanya saat data valid
function tampilkanPreview() {
  const data = new FormData(form);
  preview.textContent = [
    `Nama: ${data.get("nama")}`,
    `Email: ${data.get("email")}`,
    `Telepon: ${data.get("telepon")}`,
    `Paket: ${data.get("paket")}`,
    `Topik: ${data.get("topik")}`,
    `Pesan: ${data.get("pesan")}`,
  ].join("\n");

  formFeedback.textContent = "Form valid. Preview berhasil dibuat.";
  formFeedback.classList.add("success");
}

// Langkah 7: localStorage dan JSON serialization
const STORAGE_KEY = "kopi-nusa-preferensi-kontak";

function simpanPreferensi() {
  const data = new FormData(form);
  const preferensi = {
    paket: data.get("paket"),
    topik: data.get("topik"),
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferensi));
}

function muatPreferensi() {
  try {
    const tersimpan = localStorage.getItem(STORAGE_KEY);
    if (!tersimpan) return;

    const preferensi = JSON.parse(tersimpan);
    document.querySelector("#paket").value = preferensi.paket ?? "";
    const topik = document.querySelector(`input[name="topik"][value="${preferensi.topik}"]`);
    if (topik) topik.checked = true;
  } catch (error) {
    console.warn("Preferensi tidak valid.", error);
    localStorage.removeItem(STORAGE_KEY);
  }
}

muatPreferensi();
