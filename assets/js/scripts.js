// Language toggle functionality
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.documentElement.setAttribute('lang', currentLang);
    document.body.setAttribute('dir', currentLang === 'en' ? 'ltr' : 'rtl');
    document.querySelector('.lang-toggle').setAttribute('dir', currentLang === 'en' ? 'ltr' : 'rtl');
    
    // Update button text
    const langToggle = document.querySelector('.lang-toggle');
    langToggle.textContent = currentLang === 'en' ? 'عربي' : 'English';
    
    // Update all elements with data-en and data-ar attributes
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        el.textContent = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ar');
    });
}

// Scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form Validation with Error Handling
function validateForm() {
    let isValid = true;

    try {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');

        // Clear previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // Name validation
        if (!name.value.trim() || name.value.length < 2) {
            name.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Phone validation (optional but if provided, must be valid)
        if (phone.value && !/^[\d\s\+\-\(\)]+$/.test(phone.value)) {
            phone.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Message validation
        if (!message.value.trim() || message.value.length < 10) {
            message.closest('.form-group').classList.add('error');
            isValid = false;
        }

        return isValid;
    } catch (error) {
        console.error('Validation error:', error);
        alert('Form validation error. Please check your inputs.');
        return false;
    }
}

// Form Submission with Error Handling
async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return false;

    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMsg');
    const formData = new FormData(form);

    // Show loading spinner
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span><div class="spinner"></div>';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            successMsg.classList.add('show');
            form.reset();
            setTimeout(() => successMsg.classList.remove('show'), 5000);
        } else {
            const data = await response.json();
            throw new Error(data.error || 'Form submission failed');
        }
    } catch (err) {
        alert('Failed to send. Please email us directly at sales@etacompany.org');
        console.error('Submission error:', err);
    } finally {
        // Restore button text
        const btnText = currentLang === 'en' ? 'Send Message' : 'إرسال الرسالة';
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>${btnText}</span>`;
    }

    return false;
}

// Smooth scroll for navigation links with Error Handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                try {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } catch (error) {
                    console.error('Navigation error:', error);
                }
            });
        });
    } catch (error) {
        console.error('Event listener initialization error:', error);
    }
    
    // Chart.js initialization
    function cssVar(name) {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }
    
    const accent = cssVar('--accent') || '#e53935';
    const dark = cssVar('--dark') || '#111827';
    const gray = '#9ca3af';
    const lightGray = '#e5e7eb';

    // Major hotel projects distribution pie
    const majorHotelCanvas = document.getElementById('majorHotelProjectsChart');
    if (majorHotelCanvas && window.Chart) {
        new Chart(majorHotelCanvas, {
            type: 'pie',
            data: {
                labels: [
                    'Nefertari Hotel (EGOTH)',
                    'Cataract Hotel',
                    'Movenpick Resort',
                    'Other Major Projects'
                ],
                datasets: [{
                    data: [70, 20, 5, 5], // placeholder percentages
                    backgroundColor: [dark, accent, '#ef4444', gray],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12 } },
                    tooltip: { enabled: true }
                }
            }
        });
    }

    // Civil & Mechanical distribution pie
    const civilMechCanvas = document.getElementById('civilMechDistribution');
    if (civilMechCanvas && window.Chart) {
        new Chart(civilMechCanvas, {
            type: 'pie',
            data: {
                labels: ['Hotel Renovations', 'Swimming Pool Works', 'Fire Systems', 'HVAC Systems', 'Other Civil Works'],
                datasets: [{
                    data: [40, 20, 15, 15, 10],
                    backgroundColor: [accent, '#ef4444', gray, dark, lightGray],
                    borderColor: '#fff', borderWidth: 2
                }]
            },
            options: { plugins: { legend: { position: 'bottom' } } }
        });
    }

    // Electrical projects by value bar
    const electricalBar = document.getElementById('electricalProjectsBar');
    if (electricalBar && window.Chart) {
        new Chart(electricalBar, {
            type: 'bar',
            data: {
                labels: ['Solar System', 'Electric Panel', 'High Voltage', 'Emergency Generator', 'New Year Lighting'],
                datasets: [{
                    label: 'Value (EGP)',
                    data: [79600, 12000, 90000, 15000, 30000],
                    backgroundColor: [accent, '#ef4444', dark, gray, '#6b7280']
                }]
            },
            options: {
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { display: false }, tooltip: { enabled: true } }
            }
        });
    }

    // Mobile nav toggle
    const nav = document.querySelector('header nav');
    const menuToggle = document.querySelector('.menu-toggle');
    if (nav && menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('nav-open', isOpen);
        });
        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('nav-open');
                }
            });
        });
    }
});