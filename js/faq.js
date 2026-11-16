const faqButtons = document.querySelectorAll('.faq-q');

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');

    // Zatvori sve ostale odgovore (najvise jedan otvoren istovremeno)
    faqButtons.forEach(otherButton => {
      if (otherButton !== button) {
        otherButton.setAttribute('aria-expanded', 'false');
        const otherAnswer = otherButton.nextElementSibling;
        if (otherAnswer) otherAnswer.hidden = true;
        const otherIcon = otherButton.querySelector('.faq-icon');
        if (otherIcon) otherIcon.textContent = '+';
      }
    });

    // Otvori ili zatvori trenutni
    if (isExpanded) {
      button.setAttribute('aria-expanded', 'false');
      if (answer) answer.hidden = true;
      if (icon) icon.textContent = '+';
    } else {
      button.setAttribute('aria-expanded', 'true');
      if (answer) answer.hidden = false;
      if (icon) icon.textContent = '−';
    }
  });
});