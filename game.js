// Игровые переменные (состояние кота и кошелька)
let balance = 0;
let hunger = 100;
let energy = 100;

// Ссылки на элементы интерфейса (будут заполнены при загрузке)
let balanceCountEl, hungerEl, energyEl, mainCatEl, catStatusEl;

// Переменная для хранения текущего эмодзи-скина кота (чтобы анимация тапа его не ломала)
window.currentCatMeme = '🐱'; 

document.addEventListener("DOMContentLoaded", () => {
    // Находим все нужные элементы на странице
    balanceCountEl = document.getElementById('balance-count');
    hungerEl = document.getElementById('hunger');
    energyEl = document.getElementById('energy');
    mainCatEl = document.getElementById('main-cat');
    catStatusEl = document.getElementById('cat-status');

    // Навешиваем клик (тап) на самого кота
    mainCatEl.addEventListener('click', tapCat);

    // Запускаем жизненные циклы кота (уменьшение сытости, восстановление энергии)
    startCatLifeCycles();
});

/**
 * Функция тапа по коту — зарабатываем МемКоины и тратим энергию
 */
function tapCat() {
    // Если энергия на нуле — кот не реагирует
    if (energy <= 0) {
        catStatusEl.innerText = "Кот устал и спит... Не трогай его 💤";
        triggerVibration('medium');
        return;
    }

    // Начисляем валюту и отнимаем 1 единицу энергии
    balance += 1;
    energy = Math.max(0, energy - 1);

    // Обновляем цифры на экране
    balanceCountEl.innerText = balance;
    energyEl.innerText = energy + '%';
    catStatusEl.innerText = "Мур! Продолжай тапать 🐾";

    // Вызываем легкую вибрацию из tg-init.js
    triggerVibration('light');

    // Эффект "Pop Cat" — кот на мгновение открывает рот при клике
    if (mainCatEl.innerText !== '😮') {
        mainCatEl.innerText = '😮';
        setTimeout(() => {
            // Возвращаем текущий мемный скин обратно
            mainCatEl.innerText = window.currentCatMeme;
        }, 80);
    }
}

/**
 * Функция кормления кота (вызывается по кнопке "Покормить")
 */
function feedCat() {
    // Проверяем, есть ли деньги на еду (порция стоит 5 МемКоинов)
    if (balance < 5) {
        catStatusEl.innerText = "Не хватает МемКоинов на корм! Потапай кота 🐟";
        triggerVibration('medium');
        return;
    }

    // Если кот уже полностью сыт
    if (hunger >= 100) {
        catStatusEl.innerText = "Кот уже сыт по горло! 🍗";
        return;
    }

    // Списываем баланс, добавляем сытость
    balance -= 5;
    hunger = Math.min(100, hunger + 20);

    // Обновляем интерфейс
    balanceCountEl.innerText = balance;
    hungerEl.innerText = hunger + '%';
    catStatusEl.innerText = "Ням-ням! Кот доволен 🍗";

    // Двойной виброотклик успешного действия
    triggerVibration('success');
}

/**
 * Пассивные таймеры для изменения статов со временем
 */
function startCatLifeCycles() {
    // Каждые 5 секунд сытость кота падает на 1%
    setInterval(() => {
        if (hunger > 0) {
            hunger -= 1;
            hungerEl.innerText = hunger + '%';
        } else {
            catStatusEl.innerText = "Кот голодает! Срочно покорми его! 🙀";
        }
    }, 5000);

    // Каждые 7 секунд энергия восстанавливается на 1% (пассивный отдых)
    setInterval(() => {
        if (energy < 100) {
            energy += 1;
            energyEl.innerText = energy + '%';
        }
    }, 7000);
}
