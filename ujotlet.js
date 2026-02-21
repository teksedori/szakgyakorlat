/*const zoomBox = document.getElementById('zoomBox');
const mainLogo = document.getElementById('mainLogo');
const heroSubtext = document.getElementById('heroSubtext');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const animationRange = vh * 2;
    
    let progress = Math.min(Math.max(scrollY / animationRange, 0), 1);

    // 1. Doboz növekedése
    const w = 40 + (60 * progress);
    const h = 30 + (70 * progress);
    zoomBox.style.setProperty('--box-w', `${w}%`);
    zoomBox.style.setProperty('--box-h', `${h}%`);

    // 2. Logó mérete
    const currentSize = 3 - (1.5 * progress);
    zoomBox.style.setProperty('--logo-size', `${currentSize}vw`);

    // 3. Logó felcsúszása
    // A logó tökéletesen középről indul, majd a tágulás végén a navbarba ér
    const moveY = progress * -41.5; 
    mainLogo.style.transform = `translateY(${moveY}vh)`;

    // 4. Navigáció korábbi elövétele (0.5 progressnél kezdődik)
    /*if (progress > 0.5) {
        const navOpacity = (progress - 0.5) / 0.2; 
        navOverlay.style.opacity = Math.min(navOpacity, 1);
    } else {
        navOverlay.style.opacity = "0";
    }

    // 5. Hero Alszöveg elegáns előtűnése a legvégén
    if (progress > 0.85) {
        heroSubtext.style.opacity = "1";
        heroSubtext.style.transform = "translateY(0)"; // Beúszik a helyére
    } else {
        heroSubtext.style.opacity = "0";
        heroSubtext.style.transform = "translateY(20px)"; // Kicsit lejjebb várakozik
    }

    if (progress > 0.85) {
        // Hero szöveg megjelenítése (eredeti kódod)
        heroSubtext.style.opacity = "1";
        heroSubtext.style.transform = "translateY(0)";

        // Logó átalakítása
        mainLogo.style.opacity = "0";
        navLogoImg.style.opacity = "1";
        navLogoImg.style.transform = `translateY(${moveY}vh) translateY(0)`;
    } else {
        // Hero szöveg elrejtése
        heroSubtext.style.opacity = "0";
        heroSubtext.style.transform = "translateY(20px)";

        // Logó visszaállítása
        mainLogo.style.opacity = "1";
        navLogoImg.style.opacity = "0";
        navLogoImg.style.transform = `translateY(${moveY}vh) translateY(20px)`;
    }

    // A mozgást továbbra is mindkét elemre alkalmazni kell a folytonosságért
    mainLogo.style.transform = `translateY(${moveY}vh)`;

});

*/

const zoomBox = document.getElementById('zoomBox');
const mainLogo = document.getElementById('mainLogo');
const heroSubtext = document.getElementById('heroSubtext');


function updateScroll() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const animationRange = vh * 2;
    
    let progress = Math.min(Math.max(scrollY / animationRange, 0), 1);

    // 1. Doboz növekedése (40% -> 100%)
    const w = 40 + (60 * progress);
    const h = 30 + (70 * progress);
    zoomBox.style.setProperty('--box-w', `${w}%`);
    zoomBox.style.setProperty('--box-h', `${h}%`);

    // 2. Logó mérete (3vw -> ~1.2vw)
    // Kicsit visszavettem a zsugorodásból is, hogy olvashatóbb maradjon
    const currentSize = 3 - (1.3 * progress); 
    zoomBox.style.setProperty('--logo-size', `${currentSize}vw`);

    // 3. Logó felcsúszása - FINOMHANGOLVA
    // -42.8-ról visszavettük -41.8-ra, így egy kicsit lejjebb áll meg
    const moveY = progress * -42.3; 
    mainLogo.style.transform = `translateY(${moveY}vh)`;

    // 4. Hero Alszöveg megjelenítése
    if (progress > 0.85) {
        heroSubtext.style.opacity = "1";
        heroSubtext.style.transform = "translateY(0)";
    } else {
        heroSubtext.style.opacity = "0";
        heroSubtext.style.transform = "translateY(20px)";
    }

    // A logó végig látható
    mainLogo.style.opacity = "1";
}

window.addEventListener('scroll', updateScroll);
// Azonnali hívás a betöltéskori ugrás kiküszöbölésére
updateScroll();

// --- h2 Animáció a tartalom elérésekor ---

const observerTarget = document.querySelector('.main-content h2');

const observerOptions = {
    // 0.2 azt jelenti, hogy akkor indul, ha a h2 20%-a már látszik a képernyőn
    threshold: 0.2,
    // Ezzel eltolhatod, hogy kicsit korábban vagy később kezdődjön az animáció
    rootMargin: "0px 0px -50px 0px" 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Amikor a main-content h2 a képernyőre ér, megkapja az osztályt
            entry.target.classList.add('visible');
            // Ha egyszer megjelent, ne figyelje tovább (így nem tűnik el újra)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (observerTarget) {
    observer.observe(observerTarget);
}

