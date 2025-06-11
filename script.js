// Hamburger menü işlevselliği
function hamburg(){
    const navbar = document.querySelector('.dropdown');
    navbar.classList.add('active'); // CSS sınıfı ile kontrol et
}

function cancel(){
    const navbar = document.querySelector('.dropdown');
    navbar.classList.remove('active'); // CSS sınıfı ile kontrol et
}

// Typewriter efekti
const texts = [
    "DEVELOPER",
    "DESIGNER",
    "PROGRAMMER"
];

let speed = 100; // Yazma hızı
let eraseSpeed = 50; // Silme hızı
let newTextDelay = 1000; // Yeni metne geçmeden önceki bekleme süresi

const textElements = document.querySelector('.typewriter-text');

let textIndex = 0;
let characterIndex = 0;

function typeWriter(){
    if(characterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, newTextDelay);
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, eraseSpeed);
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500); // Metin başlamadan önceki kısa bekleme
    }
}

// Sayfa yüklendiğinde typewriter'ı başlat
window.onload = typeWriter;

// Smooth Scroll (Yumuşak Kaydırma)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Varsayılan davranışı engelle

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Hamburger menü açıksa kapat
        const dropdown = document.querySelector('.dropdown');
        if (dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
        }

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Hedefi ekranın üstüne getir
            });
        }
    });
});

// AOS (Animate On Scroll) başlatma
// HTML içinde zaten tanımlanmış, bu kısım eğer script.js'e taşımak istersen.
// AOS.init({
//     offset: 50, // Animasyonların daha erken başlaması için
//     duration: 1000, // Animasyon süresi
//     easing: 'ease-in-out', // Animasyon hızı eğrisi
//     once: true // Animasyonun sadece bir kere çalışmasını sağla
// });

// Contact Form EmailJS (HTML'deki kodu buraya taşıdım, daha düzenli olması için)
document.addEventListener("DOMContentLoaded", function() {
    // EmailJS başlat
    (function () {
        emailjs.init("uRpv6bMYp5aReKr9JNGRb"); // <- Public Key'in
    })();

    document.getElementById("contactform").addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm("service_4bpl31v", "template_u3zeezn", this)
            .then(() => {
                const successMessage = document.getElementById("success-message");
                successMessage.textContent = "Your message has been sent successfully!";
                successMessage.style.backgroundColor = "rgba(0, 178, 0, 0.2)";
                successMessage.style.borderColor = "green";
                successMessage.style.display = "block";
                this.reset();
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 5000);
            }, (error) => {
                const successMessage = document.getElementById("success-message");
                successMessage.textContent = "An error occurred: " + JSON.stringify(error);
                successMessage.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
                successMessage.style.borderColor = "red";
                successMessage.style.display = "block";
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 7000); // Hata mesajı biraz daha uzun kalsın
            });
    });
});