// Наша коллекция мемных стикеров
const memeCatsCollection = [
    { 
        name: 'Обычный Кот', 
        cost: 0, 
        unlocked: true,
        imgClose: 'assets/cats/default_close.png',
        imgOpen: 'assets/cats/default_open.png'
    },
    { 
        name: 'Huh-Кэт (А?)', 
        cost: 15, 
        unlocked: false,
        imgClose: 'assets/cats/huh_close.png',
        imgOpen: 'assets/cats/huh_open.png'
    },
    { 
        name: 'Кот Максвелл', 
        cost: 50, 
        unlocked: false,
        imgClose: 'assets/cats/maxwell_close.png',
        imgOpen: 'assets/cats/maxwell_open.gif' // тут может быть даже гифка!
    },
    { 
        name: 'Поп-Кэт', 
        cost: 120, 
        unlocked: false,
        imgClose: 'assets/cats/pop_close.png',
        imgOpen: 'assets/cats/pop_open.png'
    }
];

let currentCatShopIndex = 0;

function openShop() {
    currentCatShopIndex = (currentCatShopIndex + 1) % memeCatsCollection.length;
    const targetCat = memeCatsCollection[currentCatShopIndex];

    const catStatusEl = document.getElementById('cat-status');
    const mainCatEl = document.getElementById('main-cat');
    const balanceCountEl = document.getElementById('balance-count');

    if (targetCat.unlocked) {
        // Меняем текущие текстуры кота
        window.currentCatClose = targetCat.imgClose;
        window.currentCatOpen = targetCat.imgOpen;
        
        mainCatEl.src = targetCat.imgClose;
        catStatusEl.innerText = `Стикер изменен: ${targetCat.name} ✨`;
        triggerVibration('light');
        return;
    }

    if (balance >= targetCat.cost) {
        balance -= targetCat.cost;
        targetCat.unlocked = true;

        window.currentCatClose = targetCat.imgClose;
        window.currentCatOpen = targetCat.imgOpen;
        
        mainCatEl.src = targetCat.imgClose;
        balanceCountEl.innerText = balance;
        catStatusEl.innerText = `Разблокирован стикер: ${targetCat.name} 🎉`;
        
        triggerVibration('success');
    } else {
        currentCatShopIndex = (currentCatShopIndex - 1 + memeCatsCollection.length) % memeCatsCollection.length;
        catStatusEl.innerText = `🔒 ${targetCat.name} стоит ${targetCat.cost} МемКоинов!`;
        triggerVibration('medium');
    }
}
