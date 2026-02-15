document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const reveals = document.querySelectorAll('.reveal');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));

    // Reservation Form dummy submission
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze bei Ihnen.');
            reservationForm.reset();
        });
    }

    // Smooth scroll fix for some browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Open/Closed Status Gimmick ---
    function updateStatus() {
        const statusIndicator = document.getElementById('open-status');
        const statusText = statusIndicator.querySelector('.status-text');

        const now = new Date();
        const currentHour = now.getHours();

        // Opening hours: 11:00 - 22:00
        const isOpen = currentHour >= 11 && currentHour < 22;

        if (isOpen) {
            statusIndicator.classList.remove('is-closed');
            statusIndicator.classList.add('is-open');
            statusText.textContent = 'Jetzt geöffnet';
        } else {
            statusIndicator.classList.remove('is-open');
            statusIndicator.classList.add('is-closed');
            statusText.textContent = 'Momentan geschlossen';
        }
    }

    // Initial check and set interval
    updateStatus();
    setInterval(updateStatus, 60000); // Update every minute
});
