document.addEventListener('DOMContentLoaded', () => {
    const shouldUppercase = (element) => {
        if (element.classList.contains('no-uppercase') || element.hasAttribute('data-no-uppercase')) return false;

        const name = (element.getAttribute('name') || element.id || '').toLowerCase();
        const type = (element.getAttribute('type') || '').toLowerCase();

        if (['email', 'tel', 'number', 'date', 'time', 'hidden', 'checkbox', 'radio'].includes(type)) return false;
        if (name.includes('correo') || name.includes('telefono') || name.includes('lat') || name.includes('lng')) return false;
        return element.matches('input[type="text"], input:not([type]), textarea, .text-uppercase-input');
    };

    document.querySelectorAll('input, textarea').forEach((element) => {
        if (!shouldUppercase(element)) return;

        element.classList.add('text-uppercase-input');
        element.addEventListener('input', () => {
            const start = element.selectionStart;
            const end = element.selectionEnd;
            element.value = element.value.toLocaleUpperCase('es-MX');
            if (start !== null && end !== null) element.setSelectionRange(start, end);
        });
    });

    // Inicializar selectores de diseño personalizado de forma automática
    initializeCustomSelects();
});

// Funciones de Limpieza y Validaciones
function stripEmojis(val) {
    if (!val) return '';
    return val.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '');
}

function sanitizeLettersOnly(val) {
    let clean = stripEmojis(val);
    clean = clean.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    return clean.replace(/\s+/g, ' ');
}

function sanitizeDigitsOnly(val) {
    if (!val) return '';
    return val.replace(/\D/g, '');
}

function sanitizeDecimalOnly(val) {
    let clean = stripEmojis(val);
    clean = clean.replace(/[^0-9.]/g, '');
    const parts = clean.split('.');
    if (parts.length > 2) {
        clean = parts[0] + '.' + parts.slice(1).join('');
    }
    return clean;
}

function sanitizeAlphanumericDash(val) {
    let clean = stripEmojis(val);
    clean = clean.replace(/[^a-zA-Z0-9\s\-/]/g, '');
    return clean.replace(/\s+/g, ' ');
}

function sanitizeGeneralText(val) {
    let clean = stripEmojis(val);
    clean = clean.replace(/[<>[\]{}$%^*+=|\\~`]/g, '');
    return clean;
}

function validateEmailDomain(email) {
    const val = email.trim().toLowerCase();
    if (!val) return true;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(val)) return false;
    
    const allowedEmailDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    const domain = val.split('@')[1];
    return allowedEmailDomains.includes(domain);
}

function initStepperFloat(stepperSelector = '.stepper') {
    const stepper = document.querySelector(stepperSelector);
    if (!stepper) return;

    const navbar = document.querySelector('.cavex-navbar');
    const NAVBAR_H = navbar ? navbar.offsetHeight : 92;
    document.documentElement.style.setProperty('--navbar-h', NAVBAR_H + 'px');
    let stepperNaturalTop = 0;
    let stepperH = 0;
    let floating = false;

    // Check if placeholder already exists
    let placeholder = stepper.parentNode.querySelector('.stepper-placeholder');
    if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.className = 'stepper-placeholder';
        stepper.parentNode.insertBefore(placeholder, stepper.nextSibling);
    }

    function recalculate() {
        if (!floating) {
            stepperNaturalTop = stepper.getBoundingClientRect().top + window.scrollY;
            stepperH = stepper.offsetHeight;
        }
    }

    function onScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const shouldFloat = scrollY + NAVBAR_H > stepperNaturalTop;

        if (shouldFloat && !floating) {
            floating = true;
            placeholder.style.height = stepperH + 'px';
            placeholder.classList.add('visible');
            stepper.classList.add('is-floating');
        } else if (!shouldFloat && floating) {
            floating = false;
            placeholder.classList.remove('visible');
            stepper.classList.remove('is-floating');
        }
    }

    requestAnimationFrame(() => {
        recalculate();
        onScroll();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { floating = false; stepper.classList.remove('is-floating'); recalculate(); }, { passive: true });
}

// Inicialización de selectores dropdown personalizados para toda la aplicación
function initializeCustomSelects() {
    document.querySelectorAll('.form-group select, select.form-select').forEach(select => {
        if (select.dataset.customSelectInitialized) return;
        select.dataset.customSelectInitialized = "true";

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';

        // Reemplazar el select conservando su posición en el DOM
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        select.style.display = 'none';

        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        
        const triggerText = document.createElement('span');
        triggerText.className = 'custom-select-trigger-text';
        triggerText.textContent = select.options[select.selectedIndex] ? select.options[select.selectedIndex].textContent : 'Seleccionar...';
        trigger.appendChild(triggerText);

        const arrow = document.createElement('span');
        arrow.className = 'custom-select-arrow';
        arrow.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.2s;"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        trigger.appendChild(arrow);
        wrapper.appendChild(trigger);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'custom-select-options';

        const rebuildOptions = () => {
            optionsContainer.innerHTML = '';
            Array.from(select.options).forEach((opt, idx) => {
                const optDiv = document.createElement('div');
                optDiv.className = 'custom-select-option';
                optDiv.textContent = opt.textContent;
                optDiv.dataset.value = opt.value;
                optDiv.dataset.index = idx;

                if (opt.disabled) {
                    optDiv.classList.add('disabled');
                    optDiv.style.opacity = '0.5';
                    optDiv.style.cursor = 'not-allowed';
                }
                if (opt.selected) {
                    optDiv.classList.add('selected');
                }

                optDiv.addEventListener('click', (e) => {
                    if (opt.disabled) return;
                    e.stopPropagation();

                    select.selectedIndex = idx;
                    triggerText.textContent = opt.textContent;

                    optionsContainer.querySelectorAll('.custom-select-option').forEach(el => el.classList.remove('selected'));
                    optDiv.classList.add('selected');

                    optionsContainer.classList.remove('show');
                    trigger.classList.remove('active');

                    select.dispatchEvent(new Event('change', { bubbles: true }));
                });

                optionsContainer.appendChild(optDiv);
            });
        };

        rebuildOptions();
        wrapper.appendChild(optionsContainer);

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-select-options.show').forEach(openContainer => {
                if (openContainer !== optionsContainer) {
                    openContainer.classList.remove('show');
                    openContainer.previousSibling.classList.remove('active');
                }
            });

            rebuildOptions();
            optionsContainer.classList.toggle('show');
            trigger.classList.toggle('active');
        });

        // Mutación para sincronizar cambios dinámicos (cascade dropdowns)
        const observer = new MutationObserver(() => {
            rebuildOptions();
            const currentSelOpt = select.options[select.selectedIndex];
            triggerText.textContent = currentSelOpt ? currentSelOpt.textContent : 'Seleccionar...';
        });
        observer.observe(select, { childList: true, subtree: true });

        select.addEventListener('change', () => {
            const currentSelOpt = select.options[select.selectedIndex];
            triggerText.textContent = currentSelOpt ? currentSelOpt.textContent : 'Seleccionar...';
            optionsContainer.querySelectorAll('.custom-select-option').forEach((el, index) => {
                if (index === select.selectedIndex) {
                    el.classList.add('selected');
                } else {
                    el.classList.remove('selected');
                }
            });
        });
    });
}

// Cerrar selectores al dar click fuera
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-options.show').forEach(container => {
        container.classList.remove('show');
        container.previousSibling.classList.remove('active');
    });
});

window.initializeCustomSelects = initializeCustomSelects;

