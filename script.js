document.addEventListener('DOMContentLoaded', () => {
    // CONFIGURATION: Paste your Google Apps Script Web App URL here
    // See google_sheets_setup.md for instructions
    const GOOGLE_SCRIPT_URL = '';

    // Mobile Navigation Toggle
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('main-nav');

    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggleBtn.classList.toggle('open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggleBtn.classList.remove('open');
        });
    });

    // Form Submission Handling
    const form = document.querySelector('#registration-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Odesílám...';
        btn.disabled = true;

        // Collect data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Handling Checkboxes (FormData only includes them if checked, and value is 'on')
        // We want true/false or explicit values for the spreadsheet
        data.gdpr = formData.get('gdpr') ? true : false;
        data.photos = formData.get('photos') ? true : false;
        data.responsibility = formData.get('responsibility') ? true : false;

        try {
            if (!GOOGLE_SCRIPT_URL) {
                // Simulation mode
                console.warn('Google Script URL is empty. Running in simulation mode.');
                await new Promise(r => setTimeout(r, 1500));
                alert("TEST MODE: Data valid! (See console). To make this real, connect the Google Sheet following the guide.");
                console.log("Form Data Payload:", data);
            } else {
                // Real submission
                // We use no-cors mode or text/plain to avoid CORS preflight complexity with simple GAS web apps
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain' }
                });
                alert("Přihláška byla úspěšně odeslána! Brzy vás budeme kontaktovat.");
            }

            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert("Došlo k chybě při odesílání. Zkuste to prosím znovu nebo nás kontaktujte e-mailem.");
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
