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