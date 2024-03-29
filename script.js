const title = document.querySelector('.title')
const leaf1 = document.querySelector('.leaf1')
const leaf2 = document.querySelector('.leaf2')
const bush2 = document.querySelector('.bush2')
const mount1 = document.querySelector('.mount1')
const mount2 = document.querySelector('.mount2')

document.addEventListener('scroll', function() {
    let value = window.scrollY
    title.style.marginTop = value * 1.1 + 'px'

    leaf1.style.marginLeft = -value + 'px'
    leaf2.style.marginLeft = value + 'px'

    bush2.style.marginBottom = -value + 'px'

    mount1.style.marginBottom = -value * 1.1 + 'px'
    mount2.style.marginBottom = -value * 1.2 + 'px'
})

document.addEventListener("DOMContentLoaded", () => {
    // Функция для плавной прокрутки
    const smoothScroll = (targetElement, duration) => {
        const targetPosition = targetElement.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        let startTime = null;

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition - startPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    // Подключаем функцию плавной прокрутки к ссылкам навигации
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            smoothScroll(targetElement, 800); // 800 мс - длительность прокрутки
        });
    });

    // Прокрутка к верху страницы
    const backToTopButton = document.getElementById('backToTopButton');
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(document.body, 800);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.getElementById('backToTopButton');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
});
