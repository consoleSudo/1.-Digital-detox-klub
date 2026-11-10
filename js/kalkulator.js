const satiInput = document.getElementById('sati');
const satiVrijednost = document.getElementById('sati-vrijednost');
const godineInput = document.getElementById('godine');
const rezDani = document.getElementById('rez-dani');
const rezGodine = document.getElementById('rez-godine');
const rezKnjige = document.getElementById('rez-knjige');

function formatNumber(n) {
  return n.toLocaleString('bs-BA', {
    maximumFractionDigits: 1
  });
}

function izracunaj() {
  const sati = parseFloat(satiInput.value) || 0;
  let starost = parseInt(godineInput.value, 10);

  if (isNaN(starost) || starost < 10) {
    starost = 18;
  }

  if (satiVrijednost) {
    satiVrijednost.textContent = `${formatNumber(sati)} h`;
  }

  const dani = (sati * 365) / 24;
  const godine = (Math.max(0, 75 - starost) * sati) / 24;
  const knjige = Math.round((sati * 365) / 6);

  if (rezDani) {
    rezDani.textContent = `${formatNumber(dani)} dana`;
  }
  if (rezGodine) {
    rezGodine.textContent = `${formatNumber(godine)} god.`;
  }
  if (rezKnjige) {
    rezKnjige.textContent = `${formatNumber(knjige)} knjiga`;
  }
}

if (satiInput && godineInput) {
  satiInput.addEventListener('input', izracunaj);
  godineInput.addEventListener('input', izracunaj);
  izracunaj();
}
