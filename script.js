document.addEventListener('DOMContentLoaded', function() {
    // Целевая дата: 18 апреля 2025 года
    const targetDate = new Date('April 18, 2025 00:00:00').getTime();
    
    // Элементы для отображения времени
    const daysElement = document.getElementById('days');
    const weeksElement = document.getElementById('weeks');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const messageElement = document.getElementById('message');
    
    // Массив праздничных сообщений
    const messages = [
        "Готовимся к ДНЮ РОЖДЕНИЯ АРТЁМА!",
        "Скоро будет ДЕНЬ РОЖДЕНИЕ!",
        "Время бежит, ДЕНЬ РОЖДЕНИЕ приближается!",
        "Считаем дни до ЖЕСТКОГО ДНЯ РОЖДЕНИЯ!",
        "Скоро будем пить пиво на ДР АРТЁМА!",
        "Водка и пиво ждут своего часа!",
        "Готовим бокалы к празднику!",
        "Артём скоро станет на год старше!",
        "Будет самая крутая вечеринка!",
        "Ждём-не дождёмся праздника!"
    ];
    
    // Функция для обновления сообщения каждые 10 секунд
    function updateMessage() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        messageElement.textContent = messages[randomIndex];
    }
    
    // Обновляем сообщение каждые 10 секунд
    updateMessage();
    setInterval(updateMessage, 10000);
    
    // Функция для обновления счетчика
    function updateCountdown() {
        // Текущее время
        const now = new Date().getTime();
        
        // Разница между текущим и целевым временем
        const difference = targetDate - now;
        
        // Если целевая дата уже прошла
        if (difference < 0) {
            daysElement.textContent = '0';
            weeksElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            messageElement.textContent = "С ДНЁМ РОЖДЕНИЯ, АРТЁМ!!!";
            return;
        }
        
        // Расчет времени
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Обновление элементов на странице
        daysElement.textContent = days;
        weeksElement.textContent = weeks;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
        
        // Добавляем анимацию при изменении секунд
        secondsElement.classList.add('pulse');
        setTimeout(() => {
            secondsElement.classList.remove('pulse');
        }, 500);
    }
    
    // Обновляем счетчик каждую секунду
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Добавляем эффект при наведении на элементы счетчика
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1) translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    // Добавляем праздничный эффект конфетти при клике на заголовок
    const header = document.querySelector('h1');
    header.addEventListener('click', function() {
        createConfetti();
    });
    
    // Функция для создания конфетти
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 5 + 's';
            confettiContainer.appendChild(confetti);
        }
        
        // Удаляем конфетти через 7 секунд
        setTimeout(() => {
            confettiContainer.remove();
        }, 7000);
    }
    
    // Добавляем стили для конфетти
    const style = document.createElement('style');
    style.textContent = `
        .confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        }
        
        .confetti {
            position: absolute;
            top: -10px;
            width: 10px;
            height: 10px;
            animation: confetti-fall linear forwards;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        .pulse {
            animation: pulse 0.5s ease-in-out;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}); 