const promo = document.querySelector("#promo");

if (promo) {
  promo.addEventListener("click", () => {
    promo.textContent = "Promo: Beli 2 Box Gratis 1 Box Mini!";
  });
}