
var cards = Array.from(document.querySelectorAll('.card'));

cards.forEach(function(card) {
  card.addEventListener("click", () => {
    card.classList.toggle('rotate');
  });
});