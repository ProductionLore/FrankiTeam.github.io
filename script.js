// Общие функции
document.addEventListener('DOMContentLoaded', function() {
   // Проверка авторизации
function checkAuth() {
    if (localStorage.getItem('isAuthenticated')) {
        window.location.href = 'Profil.html';
    }
}

// Список пользователей
const users = [
    { login: 'Franki', password: '2462' },
    { login: 'Listik', password: 'Akashi' },
    { login: 'zxc', password: 'yaroslav228' },
    { login: 'F7s9j1g9', password: 'J88A612qe' } // Новый пользователь
];

// Обработчик формы входа
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        
        // Проверка логина и пароля
        const user = users.find(u => u.login === username && u.password === password);
        
        if (user) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', username);
            window.location.href = 'Profil.html';
        } else {
            errorMessage.textContent = 'Неверный логин или пароль';
            errorMessage.style.display = 'block';
        }
    });
}


    // Инициализация бокового меню
    initSidebar();
    
    // Инициализация страницы
    if (window.location.pathname.includes('Profil.html')) {
        initProfilePage();
    } else if (window.location.pathname.includes('Settings.html')) {
        initSettingsPage();
    } else if (window.location.pathname.includes('Download.html')) {
        initDownloadPage();
    }

    // Применение сохранённой темы
    applySavedTheme();
});

// Проверка авторизации
function checkAuth() {
    if (localStorage.getItem('isAuthenticated')) {
        window.location.href = 'Profil.html';
    }
}

// Инициализация бокового меню
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && sidebarToggle && mainContent) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            mainContent.classList.toggle('shifted');
        });
    }
    
    // Выход из системы
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isAuthenticated');
            window.location.href = 'index.html';
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const dynamicText = document.getElementById('dynamicText');
    const words = ["FrankiTeam", "Добавим в некст обнове!", "Жди обновлений!", "Здесь что-то будет..."];
    let currentIndex = 0;

    // Функция для смены текста
    function changeText() {
        currentIndex = (currentIndex + 1) % words.length; // Переход по массиву слов
        dynamicText.textContent = words[currentIndex];
    }

    // Меняем текст каждые 2 секунды
    setInterval(changeText, 1000);
});

// Инициализация страницы профиля
function initProfilePage() {
    // Генерация ID если его нет
    if (!localStorage.getItem('userId')) {
        const userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    
    document.getElementById('userid').value = localStorage.getItem('userId');
    
    // Загрузка ника
    if (localStorage.getItem('nickname')) {
        document.getElementById('nickname').value = localStorage.getItem('nickname');
    }
    
    // Загрузка аватарки
    if (localStorage.getItem('avatar')) {
        document.getElementById('avatar').src = localStorage.getItem('avatar');
    }
    
    // Обработчик изменения аватарки
    document.getElementById('avatarInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('avatar').src = event.target.result;
                localStorage.setItem('avatar', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Сохранение профиля
    document.getElementById('saveProfile').addEventListener('click', function() {
        const nickname = document.getElementById('nickname').value;
        localStorage.setItem('nickname', nickname);
        alert('Изменения сохранены!');
    });
    
    // Обработчик формы входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'Profil.html';
        });
    }
}

// Инициализация страницы настроек
function initSettingsPage() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.body.className = theme + '-theme';
            localStorage.setItem('selectedTheme', theme);
        });
    });
}

// Инициализация страницы загрузок
function initDownloadPage() {
    const startDownloadBtn = document.getElementById('startDownload');
    const progressContainer = document.querySelector('.download-progress-container');
    const progressBar = document.querySelector('.download-progress-bar');
    const progressText = document.querySelector('.download-progress-text');
    
    if (startDownloadBtn) {
        startDownloadBtn.addEventListener('click', function() {
            startDownloadBtn.style.display = 'none';
            progressContainer.style.display = 'block';
            
            let progress = 0;
            const totalTime = 3 * 60 * 60 * 1000; // 3 часа в миллисекундах
            const interval = 1000; // Обновление каждую секунду
            const increment = (interval / totalTime) * 100;
            
            const downloadInterval = setInterval(() => {
                progress += increment;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(downloadInterval);
                }
                
                const progressPercent = Math.min(progress, 100).toFixed(2);
                progressBar.style.width = progressPercent + '%';
                progressText.textContent = progressPercent + '%';
                
                // Расчет оставшегося времени
                const remainingTime = totalTime * (1 - progress/100);
                const hours = Math.floor(remainingTime / (60 * 60 * 1000));
                const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
                
                document.querySelector('.download-time').textContent = 
                    `Осталось: ~${hours} ч ${minutes} мин`;
            }, interval);
        });
    }
}

// Применение сохранённой темы
function applySavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.body.className = savedTheme + '-theme';
    }
}

// script.js

// Можно добавить функционал для проверки или сохранения данных
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.dropdown-button');
    dropdownButton.addEventListener('click', function() {
        alert('Вы выбрали пункт "Отзывы"');
    });
});

// script.js

// Можно добавить дополнительную логику для взаимодействия с меню
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    
    // Появление выпадающего меню на странице
    dropdown.classList.add('open');
});
