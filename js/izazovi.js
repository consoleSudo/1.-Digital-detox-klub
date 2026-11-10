const filterButtons = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');

if (filterButtons.length && cards.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Ažuriranje active klase i aria-pressed atributa na dugmadi
      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });

      // Filtriranje kartica: "svi" prikazuje sve, ostalo odgovarajući nivo težine
      cards.forEach((card) => {
        const tezina = card.dataset.tezina;
        if (filter === 'svi' || tezina === filter) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', '');
        }
      });
    });
  });
}
