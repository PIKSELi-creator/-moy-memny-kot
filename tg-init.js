// Инициализация Telegram WebApp SDK
const tg = window.Telegram.WebApp;

// Сообщаем Telegram, что приложение полностью загрузилось и готово к отрисовке
tg.ready();

// Автоматически разворачиваем Mini App на максимальную высоту экрана смартфона
tg.expand();

// Ждем, пока загрузится вся HTML-страница, чтобы безопасно изменить текст
document.addEventListener("DOMContentLoaded", () => {
    const usernameEl = document.getElementById('username');
    
    // Проверяем, запущены ли мы внутри Telegram и доступны ли данные пользователя
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        // Берем имя пользователя из Телеграма
        usernameEl.innerText = `Хозяин: ${tg.initDataUnsafe.user.first_name}`;
    } else {
        // Заглушка, если мы открыли файл просто в обычном браузере на ПК
        usernameEl.innerText = "Хозяин мемного кота";
    }
});

/**
 * Универсальная функция для вызова нативного виброотклика смартфона
 * @param {string} type - Тип вибрации ('light', 'medium', 'success')
 */
function triggerVibration(type = 'light') {
    if (tg.HapticFeedback) {
        switch (type) {
            case 'light':
                tg.HapticFeedback.impactOccurred('light'); // Легкий "тук" при обычном тапе
                break;
            case 'medium':
                tg.HapticFeedback.impactOccurred('medium'); // Вибрация посильнее
                break;
            case 'success':
                tg.HapticFeedback.notificationOccurred('success'); // Двойной вибро-сигнал успешного действия
                break;
        }
    }
}
