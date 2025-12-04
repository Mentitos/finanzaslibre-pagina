document.addEventListener('DOMContentLoaded', function() {

    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            } else {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }
        });
    }

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        });
    }

    const languageSwitcher = document.querySelectorAll('[data-lang]');
    const elementsToTranslate = document.querySelectorAll('[data-key]');

    const setLanguage = (lang) => {
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
    };

    const getBrowserLanguage = () => {
        const lang = navigator.language.split('-')[0];
        return ['en', 'es'].includes(lang) ? lang : 'en';
    };

    languageSwitcher.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = switcher.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    setLanguage(getBrowserLanguage());

});