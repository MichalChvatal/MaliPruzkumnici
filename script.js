document.addEventListener('DOMContentLoaded', () => {
    // CONFIGURATION: Paste your Google Apps Script Web App URL here
    // See google_sheets_setup.md for instructions
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7vbEh_TfUu8blSV-eR-1Tcba15U3skhHRVvSbHs0DZlZuiO3bFJOrh7h5Z0wdVBxp/exec';

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

    // Custom Czech Validation Messages
    const inputs = document.querySelectorAll('input[required]');

    // Function to check validity and set Czech message immediately
    const validate = (input) => {
        // First reset validty to allow re-checking against native constraints
        input.setCustomValidity('');

        // If it's invalid according to browser (type, pattern, required), apply our Czech message
        if (input.validity.valueMissing) {
            input.setCustomValidity('Toto pole je povinné.');
        } else if (input.validity.typeMismatch) {
            if (input.type === 'email') {
                input.setCustomValidity('Zadejte prosím platný e-mail (např. jmeno@email.cz).');
            } else {
                input.setCustomValidity('Zadejte prosím platnou hodnotu.');
            }
        } else if (input.validity.patternMismatch) {
            if (input.type === 'tel') {
                input.setCustomValidity('Zadejte prosím telefon ve formátu 123 456 789 nebo +420 123 456 789.');
            } else {
                input.setCustomValidity('Zadejte prosím hodnotu ve správném formátu.');
            }
        }
    };

    inputs.forEach(input => {
        // Check on invalid (submit attempt)
        input.addEventListener('invalid', () => validate(input));

        // CRITICAL: Check on every keystroke. This prevents the browser from reverting 
        // to English messages when custom validity is cleared.
        input.addEventListener('input', () => validate(input));
    });

    // Form Submission Handling
    const form = document.querySelector('#registration-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Manual validation trigger because 'novalidate' is on
        // This ensures the hover tooltips are gone, but we still validate on submit
        inputs.forEach(input => validate(input));

        if (!form.checkValidity()) {
            form.reportValidity(); // Shows our Czech bubbles now
            return;
        }

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
                // We transmit as text/plain to avoid CORS preflight, but we MUST use default CORS mode (not no-cors)
                // to read the response. Google Apps Script handles CORS automatically.
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' }
                });

                const result = await response.json();

                if (result.result === 'success') {
                    // Show custom success modal
                    document.getElementById('successModal').style.display = 'flex';
                    form.reset();
                } else {
                    // Server returned an error (e.g. validation)
                    const modal = document.getElementById('successModal');
                    document.getElementById('successModalTitle').textContent = 'Chyba';
                    document.getElementById('successModalMessage').textContent = 'Došlo k chybě při odesílání. Zkuste to prosím znovu nebo nás kontaktujte e-mailem.';
                    modal.style.display = 'flex';
                }
            }

            // form.reset() is called inside success block now
        } catch (error) {
            console.error('Error:', error);
            const modal = document.getElementById('successModal');
            document.getElementById('successModalTitle').textContent = 'Chyba';
            document.getElementById('successModalMessage').textContent = 'Došlo k chybě při odesílání. Zkuste to prosím znovu nebo nás kontaktujte e-mailem.';
            modal.style.display = 'flex';
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
