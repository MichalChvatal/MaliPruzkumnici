# Implementation Plan - Malí průzkumníci Website
- **Colors**: Primary `#c0a99d` (Earthy Pink/Beige).
- **Secondary**: Soft Sage Green, Cream/Off-white background for readability.
- **Typography**: Clean sans-serif (e.g., 'Outfit' or 'Quicksand' from Google Fonts) to match the playful yet calm Montessori vibe.
- **Layout**: Clean sections with plenty of whitespace.

### Components

#### [MODIFY] index.html
- **Header**: Sticky nav with smooth scroll links.
- **Hero**: Atmospheric image + Motto "Cesta objevování beze spěchu".
- **About**: Cards for Aneta and her friend.
- **Principles**: Icon grid or list for Montessori principles.
- **Info**: Clear table or grid for dates, price, location.
- **Form**: HTML5 form with validation.
- **FAQ**: Accordion style questions.
- **Footer**: Contacts and links.

#### [NEW] style.css
- CSS Reset.
- Variables for coloring.
- Flexbox/Grid layouts.
- Media queries for mobile (max-width 768px).

#### [NEW] script.js
- Form `submit` event listener.
- Data collection/Validation.
- Navigation toggling.

## Verification Plan

### Automated Tests
- None (Static site).

### Manual Verification
- **Visual**: Check responsiveness on mobile/desktop dimensions.
- **Functional**: Fill out the form and verify input validation.
- **Aesthetic**: Verify color harmony and font loading.
