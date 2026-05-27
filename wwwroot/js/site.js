document.addEventListener('DOMContentLoaded', () => {
    const shouldUppercase = (element) => {
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

    document.querySelectorAll('.copy-whatsapp-message').forEach((button) => {
        button.addEventListener('click', async () => {
            const message = button.dataset.message || '';
            const panel = button.closest('.delivery-panel, .no-print');
            const fallback = panel?.querySelector('.whatsapp-message-fallback');

            try {
                await navigator.clipboard.writeText(message);
                const original = button.textContent;
                button.textContent = 'Mensaje copiado';
                setTimeout(() => button.textContent = original, 1800);
            } catch {
                if (fallback) {
                    fallback.classList.remove('d-none');
                    fallback.focus();
                    fallback.select();
                }
            }
        });
    });

    document.querySelectorAll('.copy-public-link').forEach((button) => {
        button.addEventListener('click', async () => {
            const link = button.dataset.link || '';
            if (!link) return;

            try {
                await navigator.clipboard.writeText(link);
                const original = button.textContent;
                button.textContent = 'Enlace copiado';
                setTimeout(() => button.textContent = original, 1800);
            } catch {
                const input = document.getElementById('publicQuoteLink');
                if (input) {
                    input.focus();
                    input.select();
                }
            }
        });
    });
});
