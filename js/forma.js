const forma = document.getElementById('forma');
const uspjehPanel = document.getElementById('uspjeh');
const uspjehPoruka = document.getElementById('uspjeh-poruka');

const inputIme = document.getElementById('ime');
const inputEmail = document.getElementById('email');
const selectRazred = document.getElementById('razred');
const selectIzazov = document.getElementById('izazov');
const textareaPoruka = document.getElementById('poruka');
const checkboxPravila = document.getElementById('pravila');
const brojac = document.getElementById('brojac');

const greskaIme = document.getElementById('greska-ime');
const greskaEmail = document.getElementById('greska-email');
const greskaRazred = document.getElementById('greska-razred');
const greskaIzazov = document.getElementById('greska-izazov');
const greskaPoruka = document.getElementById('greska-poruka');
const greskaPravila = document.getElementById('greska-pravila');

// Brojac karaktera za poruku
if (textareaPoruka && brojac) {
  textareaPoruka.addEventListener('input', () => {
    const duzina = textareaPoruka.value.length;
    brojac.textContent = `${duzina} / 300`;
    if (duzina > 300) {
      textareaPoruka.classList.add('invalid');
      greskaPoruka.textContent = 'Poruka je predugačka.';
    } else {
      textareaPoruka.classList.remove('invalid');
      greskaPoruka.textContent = '';
    }
  });
}

// Uklanjanje gresaka pri unosu
const postaviCiscenjeGreske = (element, greskaElement, provjera) => {
  const eventTip = element.tagName === 'SELECT' || element.type === 'checkbox' ? 'change' : 'input';
  element.addEventListener(eventTip, () => {
    if (provjera()) {
      element.classList.remove('invalid');
      greskaElement.textContent = '';
    }
  });
};

if (inputIme) postaviCiscenjeGreske(inputIme, greskaIme, () => inputIme.value.trim().length >= 2);
if (inputEmail) postaviCiscenjeGreske(inputEmail, greskaEmail, () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value.trim()));
if (selectRazred) postaviCiscenjeGreske(selectRazred, greskaRazred, () => selectRazred.value !== '');
if (selectIzazov) postaviCiscenjeGreske(selectIzazov, greskaIzazov, () => selectIzazov.value !== '');
if (checkboxPravila) postaviCiscenjeGreske(checkboxPravila, greskaPravila, () => checkboxPravila.checked);

// Validacija i slanje forme
if (forma) {
  forma.addEventListener('submit', (e) => {
    e.preventDefault();
    let ispravno = true;

    // 1. Ime i prezime
    const imeVal = inputIme.value.trim();
    if (imeVal.length < 2) {
      inputIme.classList.add('invalid');
      greskaIme.textContent = 'Upiši ime i prezime.';
      ispravno = false;
    } else {
      inputIme.classList.remove('invalid');
      greskaIme.textContent = '';
    }

    // 2. Email
    const emailVal = inputEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      inputEmail.classList.add('invalid');
      greskaEmail.textContent = 'Upiši ispravnu email adresu.';
      ispravno = false;
    } else {
      inputEmail.classList.remove('invalid');
      greskaEmail.textContent = '';
    }

    // 3. Razred
    if (!selectRazred.value) {
      selectRazred.classList.add('invalid');
      greskaRazred.textContent = 'Izaberi razred.';
      ispravno = false;
    } else {
      selectRazred.classList.remove('invalid');
      greskaRazred.textContent = '';
    }

    // 4. Izazov
    if (!selectIzazov.value) {
      selectIzazov.classList.add('invalid');
      greskaIzazov.textContent = 'Izaberi izazov.';
      ispravno = false;
    } else {
      selectIzazov.classList.remove('invalid');
      greskaIzazov.textContent = '';
    }

    // 5. Poruka (opcionalno, max 300)
    if (textareaPoruka.value.length > 300) {
      textareaPoruka.classList.add('invalid');
      greskaPoruka.textContent = 'Poruka je predugačka.';
      ispravno = false;
    } else {
      textareaPoruka.classList.remove('invalid');
      greskaPoruka.textContent = '';
    }

    // 6. Pravila kluba
    if (!checkboxPravila.checked) {
      checkboxPravila.classList.add('invalid');
      greskaPravila.textContent = 'Moraš prihvatiti pravila.';
      ispravno = false;
    } else {
      checkboxPravila.classList.remove('invalid');
      greskaPravila.textContent = '';
    }

    // Ako je sve ispravno, prikazi uspjeh
    if (ispravno) {
      forma.hidden = true;
      if (uspjehPoruka) {
        uspjehPoruka.textContent = `Prijava je primljena, ${imeVal}. Vidimo se offline.`;
      }
      if (uspjehPanel) {
        uspjehPanel.hidden = false;
      }
    }
  });
}