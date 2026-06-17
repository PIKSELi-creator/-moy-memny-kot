let balance = 0;
let hunger = 100;
let energy = 100;

let balanceCountEl, hungerEl, energyEl, mainCatEl, catStatusEl;

// Теперь храним пути к двум картинкам текущего кота
window.currentCatClose = 'assets/cats/default_close.png'; 
window.currentCatOpen = 'assets/cats/default_open.png'; 

document.addEventListener("DOMContentLoaded", () => {
    balanceCountEl = document.getElementById('balance-count');
    hungerEl = document.getElementById('hunger');
    energyEl = document.getElementById('energy');
    mainCatEl = document.getElementById('main-cat');
    catStatusEl = document.getElementById('cat-status');

    mainCatEl.addEventListener('click', tapCat);
    startCatLifeCycles();
});

function tapCat() {
    if (energy <= 0) {
        catStatusEl.innerText = "Кот устал и спит... Не трогай его 💤";
        triggerVibration('medium');
        return;
    }

    balance += 1;
    energy = Math.max(0, energy - 1);

    balanceCountEl.innerText = balance;
    energyEl.innerText = energy + '%';
    catStatusEl.innerText = "Мур! Отличный тап 🐾";

    triggerVibration('light');

    // Анимация "Стикера": меняем картинку на открытый рот/удивление
    if (mainCatEl.src !== window.currentCatOpen) {
        mainCatEl.src = window.currentCatOpen;
        setTimeout(() => {
            // Возвращаем обычное состояние стикера
            mainCatEl.src = window.currentCatClose;
        }, 80);
    }
}

function feedCat() {
    if (balance < 5) {
        catStatusEl.innerText = "Не хватает МемКоинов на корм! 🐟";
        triggerVibration('medium');
        return;
    }

    if (hunger >= 100) {
        catStatusEl.innerText = "Кот уже сыт! 🍗";
        return;
    }

    balance -= 5;
    hunger = Math.min(100, hunger + 20);

    balanceCountEl.innerText = balance;
    hungerEl.innerText = hunger + '%';
    catStatusEl.innerText = "Ням-ням! Стикер доволен 🍗";

    triggerVibration('success');
}

function startCatLifeCycles() {
    setInterval(() => {
        if (hunger > 0) {
            hunger -= 1;
            hungerEl.innerText = hunger + '%';
        } else {
            catStatusEl.innerText = "Кот проголодался! 🙀";
        }
    }, 5000);

    setInterval(() => {
        if (energy < 100) {
            energy += 1;
            energyEl.innerText = energy + '%';
        }
    }, 7000);
}

