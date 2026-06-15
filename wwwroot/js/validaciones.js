document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.quote-form');
    if (!form) return;

    // Mapping card numbers in DOM to stepper indexes (1-6)
    const cardToStepMap = {
        1: 1, // Datos del solicitante (Card 1) -> Paso 1
        2: 1, // Dirección del solicitante (Card 2) -> Paso 1
        3: 2, // Información / Pasajero (Card 3) -> Paso 2
        4: 3, // Servicio y unidad (Card 4) -> Paso 3
        5: 4, // Sucursal y destino (Card 5) -> Paso 4
        6: 5  // Costos adicionales (Card 6) -> Paso 5
    };

    // Mapping steps to card index in querySelectorAll('.form-section-card')
    const stepToCardIndexMap = {
        1: 0, // Card 1 (Datos)
        2: 2, // Card 3 (Pasajero)
        3: 3, // Card 4 (Servicio)
        4: 4, // Card 5 (Ruta)
        5: 5  // Card 6 (Costos)
    };

    // Relas de validacion
    const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    const regexTelefono = /^\d{10}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexCP = /^\d{5}$/;
    const regexTextoGenerico = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;:'"()\-#]+$/;



    // Selector de elementos en sus respectivos limpiadores
    const sanitizersMap = [
        { ids: ['strNombreSolicitante', 'strApellidoPaternoSolicitante', 'strApellidoMaternoSolicitante', 'strNombrePasajero', 'strColoniaSolicitante', 'strMunicipioSolicitante', 'strEstadoSolicitante'], fn: sanitizeLettersOnly },
        { ids: ['strTelefonoCelular', 'strTelefonoFijo', 'strCodigoPostalSolicitante', 'intCantidadPasajeros'], fn: sanitizeDigitsOnly },
        { ids: ['intDistanciaKm', 'intTiempoViajeMin', 'intPagoChoferDia', 'intPeajes', 'intEstacionamiento'], fn: sanitizeDecimalOnly },
        { ids: ['strNumeroExteriorSolicitante', 'strNumeroInteriorSolicitante'], fn: sanitizeAlphanumericDash },
        { ids: ['strCalleSolicitante', 'strDestino', 'strReferenciasDireccionSolicitante', 'strReferenciasDestino', 'strObservacionesAtencion', 'strObservaciones'], fn: sanitizeGeneralText }
    ];

    function setupSanitizers() {
        sanitizersMap.forEach(({ ids, fn }) => {
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                
                const handler = () => {
                    const originalVal = el.value;
                    const cleanedVal = fn(originalVal);
                    if (originalVal !== cleanedVal) {
                        const selectionStart = el.selectionStart;
                        const selectionEnd = el.selectionEnd;
                        el.value = cleanedVal;
                        try {
                            el.setSelectionRange(selectionStart, selectionEnd);
                        } catch (err) {}
                    }
                };

                el.addEventListener('input', handler);
                el.addEventListener('paste', () => setTimeout(handler, 0));
                el.addEventListener('blur', () => {
                    el.value = el.value.trim();
                    handler();
                });
            });
        });
    }

    setupSanitizers();

    let activeStep = 1;
    let maxStepVisited = 1;

    function marcarElemento(el, state) {
        if (!el) return;
        el.classList.remove('is-valid', 'is-warning', 'is-invalid');
        
        // Determinar a qué paso pertenece el campo
        const card = el.closest('.form-section-card');
        if (card) {
            const numEl = card.querySelector('.form-section-number');
            if (numEl) {
                const cardNum = parseInt(numEl.textContent.trim());
                const stepNum = cardToStepMap[cardNum];
                // Evitamos mostrar estilos de validación en pasos que el usuario no ha visitado aún
                if (stepNum > maxStepVisited) {
                    return;
                }
            }
        }

        if (state === 'valid') el.classList.add('is-valid');
        else if (state === 'warning') el.classList.add('is-warning');
        else if (state === 'invalid') el.classList.add('is-invalid');
    }

    function validarCampoTexto(el, required, regex = null) {
        if (!el) return 'valid';
        const val = stripEmojis(el.value).trim();
        if (required && val === '') {
            marcarElemento(el, 'warning');
            return 'missing';
        }
        if (val !== '') {
            if (regex && !regex.test(val)) {
                marcarElemento(el, 'invalid');
                return 'invalid';
            }
            marcarElemento(el, 'valid');
            return 'valid';
        }
        if (required) {
            marcarElemento(el, 'warning');
            return 'missing';
        }
        // Opcional y vacío
        el.classList.remove('is-valid', 'is-warning', 'is-invalid');
        return 'valid';
    }

    function validarCorreo(el, required) {
        if (!el) return 'valid';
        const val = stripEmojis(el.value).trim().toLowerCase();
        if (required && val === '') {
            marcarElemento(el, 'warning');
            return 'missing';
        }
        if (val !== '') {
            if (!validateEmailDomain(val)) {
                marcarElemento(el, 'invalid');
                return 'invalid';
            }
            marcarElemento(el, 'valid');
            return 'valid';
        }
        if (required) {
            marcarElemento(el, 'warning');
            return 'missing';
        }
        el.classList.remove('is-valid', 'is-warning', 'is-invalid');
        return 'valid';
    }

    function validarSelect(el, required) {
        if (!el) return 'valid';
        const val = el.value;
        if (required && val === '') {
            marcarElemento(el, 'warning');
            return 'missing';
        }
        marcarElemento(el, 'valid');
        return 'valid';
    }

    function validarNumero(el, required, min = null) {
        if (!el) return 'valid';
        const val = stripEmojis(el.value).trim();
        if (required && val === '') {
            marcarElemento(el, 'warning');
            return 'missing';
        }
        if (val !== '') {
            const num = Number(val);
            if (isNaN(num) || (min !== null && num < min)) {
                marcarElemento(el, 'invalid');
                return 'invalid';
            }
            // Verificar la validacion
            if (/[^0-9.]/.test(val)) {
                marcarElemento(el, 'invalid');
                return 'invalid';
            }
            marcarElemento(el, 'valid');
            return 'valid';
        }
        if (required) {
            marcarElemento(el, 'warning');
            return 'missing';
        }
        el.classList.remove('is-valid', 'is-warning', 'is-invalid');
        return 'valid';
    }

    function validarRadios(name) {
        const radios = document.getElementsByName(name);
        let checked = false;
        for (let r of radios) {
            if (r.checked) {
                checked = true;
                break;
            }
        }
        
        const container = radios[0]?.closest('.segmented-options');
        
        // Si el paso no ha sido visitado todavía, no aplicar la clase visual de warning
        const card = radios[0]?.closest('.form-section-card');
        let shouldMark = true;
        if (card) {
            const numEl = card.querySelector('.form-section-number');
            if (numEl) {
                const cardNum = parseInt(numEl.textContent.trim());
                const stepNum = cardToStepMap[cardNum];
                if (stepNum > maxStepVisited) shouldMark = false;
            }
        }

        if (!checked) {
            if (container && shouldMark) container.classList.add('is-warning');
            return 'missing';
        } else {
            if (container) container.classList.remove('is-warning', 'is-invalid');
            return 'valid';
        }
    }

    function validarFechaViaje(elFecha, elHora) {
        if (!elFecha) return 'valid';
        const fechaVal = elFecha.value.trim();
        const horaVal = elHora ? elHora.value.trim() : '';

        if (fechaVal === '') {
            marcarElemento(elFecha, 'warning');
            return 'missing';
        }

        // Comprobar formato y fecha lógica
        const viajeDate = new Date(`${fechaVal}T${horaVal || '00:00'}`);
        if (isNaN(viajeDate.getTime())) {
            marcarElemento(elFecha, 'invalid');
            return 'invalid';
        }

        // Comparar con el día de hoy
        const hoy = new Date();
        const hoyString = hoy.toISOString().split('T')[0];

        if (fechaVal < hoyString) {
            marcarElemento(elFecha, 'invalid');
            return 'invalid';
        }

        // Si es hoy, comprobar la hora
        if (fechaVal === hoyString && horaVal !== '') {
            const [hH, hM] = horaVal.split(':').map(Number);
            const hoyH = hoy.getHours();
            const hoyM = hoy.getMinutes();
            if (hH < hoyH || (hH === hoyH && hM < hoyM)) {
                if (elHora) marcarElemento(elHora, 'invalid');
                marcarElemento(elFecha, 'invalid');
                return 'invalid';
            }
        }

        marcarElemento(elFecha, 'valid');
        if (elHora && horaVal !== '') marcarElemento(elHora, 'valid');
        return 'valid';
    }

    function validarPaso1() {
        const results = [];
        results.push(validarCampoTexto(document.getElementById('strNombreSolicitante'), true, regexSoloLetras));
        results.push(validarCampoTexto(document.getElementById('strApellidoPaternoSolicitante'), true, regexSoloLetras));
        validarCampoTexto(document.getElementById('strApellidoMaternoSolicitante'), false, regexSoloLetras);
        results.push(validarCampoTexto(document.getElementById('strTelefonoCelular'), true, regexTelefono));
        validarCampoTexto(document.getElementById('strTelefonoFijo'), false, regexTelefono);
        results.push(validarCorreo(document.getElementById('strCorreo'), false));

        // Dirección radio buttons
        const radioState = validarRadios('RegistrarDireccionSolicitante');
        results.push(radioState);

        // Dirección condicional
        const registrarDireccionSi = document.getElementById('strRegistrarDireccionSolicitanteSi');
        if (registrarDireccionSi && registrarDireccionSi.checked) {
            results.push(validarCampoTexto(document.getElementById('strCalleSolicitante'), true, regexTextoGenerico));
            results.push(validarCampoTexto(document.getElementById('strNumeroExteriorSolicitante'), true));
            validarCampoTexto(document.getElementById('strNumeroInteriorSolicitante'), false);
            results.push(validarCampoTexto(document.getElementById('strColoniaSolicitante'), true, regexSoloLetras));
            results.push(validarCampoTexto(document.getElementById('strMunicipioSolicitante'), true, regexSoloLetras));
            results.push(validarCampoTexto(document.getElementById('strEstadoSolicitante'), true, regexSoloLetras));
            results.push(validarCampoTexto(document.getElementById('strCodigoPostalSolicitante'), true, regexCP));
        } else {
            const inputsDireccion = [
                'strCalleSolicitante', 'strNumeroExteriorSolicitante', 'strNumeroInteriorSolicitante',
                'strColoniaSolicitante', 'strMunicipioSolicitante', 'strEstadoSolicitante', 'strCodigoPostalSolicitante'
            ];
            inputsDireccion.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('is-valid', 'is-warning', 'is-invalid');
            });
        }

        if (results.includes('invalid')) return 'invalid';
        if (results.includes('missing')) return 'missing';
        return 'valid';
    }

    function validarPaso2() {
        const results = [];
        results.push(validarCampoTexto(document.getElementById('strNombrePasajero'), true, regexSoloLetras));
        results.push(validarNumero(document.getElementById('intCantidadPasajeros'), true, 1));
        
        // Atención especial condicional
        const requiereAtencion = document.getElementById('strRequiereAtencionEspecial');
        if (requiereAtencion && requiereAtencion.value === 'true') {
            results.push(validarSelect(document.getElementById('strTipoAtencionEspecial'), true));
        } else {
            const tipoAtencion = document.getElementById('strTipoAtencionEspecial');
            if (tipoAtencion) tipoAtencion.classList.remove('is-valid', 'is-warning', 'is-invalid');
            const obsAtencion = document.getElementById('strObservacionesAtencion');
            if (obsAtencion) obsAtencion.classList.remove('is-valid', 'is-warning', 'is-invalid');
        }

        if (results.includes('invalid')) return 'invalid';
        if (results.includes('missing')) return 'missing';
        return 'valid';
    }

    function validarPaso3() {
        const results = [];
        results.push(validarSelect(document.getElementById('intServicioId'), true));
        results.push(validarSelect(document.getElementById('strTipoCombustible'), true));
        return results.includes('invalid') ? 'invalid' : (results.includes('missing') ? 'missing' : 'valid');
    }

    function validarPaso4() {
        const results = [];
        results.push(validarSelect(document.getElementById('intSucursalId'), true));
        results.push(validarCampoTexto(document.getElementById('strDestino'), true, regexTextoGenerico));
        
        // Validar rango fecha y hora
        const fv = document.getElementById('strFechaViaje');
        const hv = document.getElementById('strHoraViaje');
        results.push(validarFechaViaje(fv, hv));

        results.push(validarNumero(document.getElementById('intDistanciaKm'), true, 0.01));
        results.push(validarNumero(document.getElementById('intTiempoViajeMin'), true, 0.1));
        return results.includes('invalid') ? 'invalid' : (results.includes('missing') ? 'missing' : 'valid');
    }

    function validarPaso5() {
        const results = [];
        results.push(validarNumero(document.getElementById('intPeajes'), false, 0));
        results.push(validarNumero(document.getElementById('intEstacionamiento'), false, 0));
        results.push(validarNumero(document.getElementById('intPagoChoferDia'), false, 0));
        return results.includes('invalid') ? 'invalid' : (results.includes('missing') ? 'missing' : 'valid');
    }

    function validarPaso(pasoNum) {
        if (pasoNum === 1) return validarPaso1();
        if (pasoNum === 2) return validarPaso2();
        if (pasoNum === 3) return validarPaso3();
        if (pasoNum === 4) return validarPaso4();
        if (pasoNum === 5) return validarPaso5();
        
        if (pasoNum === 6) {
            const estados = [validarPaso1(), validarPaso2(), validarPaso3(), validarPaso4(), validarPaso5()];
            if (estados.includes('invalid')) return 'invalid';
            if (estados.includes('missing')) return 'missing';
            return 'valid';
        }
        return 'valid';
    }

    function actualizarStepper() {
        const steps = document.querySelectorAll('.stepper .step');
        steps.forEach((step, idx) => {
            const pasoNum = idx + 1;
            const state = validarPaso(pasoNum);
            
            step.classList.remove('success', 'warning', 'error');
            
            // Solo colorear los pasos que el usuario ya visitó o el actual
            if (pasoNum <= maxStepVisited) {
                if (state === 'valid') step.classList.add('success');
                else if (state === 'missing') step.classList.add('warning');
                else if (state === 'invalid') step.classList.add('error');
            }
        });
    }

    function activarPaso(stepNum) {
        activeStep = stepNum;
        if (stepNum > maxStepVisited) {
            maxStepVisited = stepNum;
        }

        const steps = document.querySelectorAll('.stepper .step');
        steps.forEach((step, idx) => {
            if (idx + 1 === stepNum) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        actualizarStepper();
    }

    // Navegación con clics
    const steps = document.querySelectorAll('.stepper .step');
    steps.forEach((step, idx) => {
        step.style.cursor = 'pointer';
        step.addEventListener('click', () => {
            const stepNum = idx + 1;
            
            // Permitir navegación a pasos visitados o al siguiente paso inmediato
            if (stepNum <= maxStepVisited + 1) {
                activarPaso(stepNum);
                
                // Desplazarse suavemente
                const cardIndex = stepToCardIndexMap[stepNum];
                if (cardIndex !== undefined) {
                    const cards = document.querySelectorAll('.form-section-card');
                    if (cards[cardIndex]) {
                        cards[cardIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else if (stepNum === 6) {
                    const sidePanel = document.querySelector('.quote-side-panel') || document.querySelector('.form-action-bar');
                    if (sidePanel) {
                        sidePanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        });
    });

    // Detectar el paso activo en tarjetas
    document.addEventListener('focusin', (e) => {
        const card = e.target.closest('.form-section-card');
        if (card) {
            const numEl = card.querySelector('.form-section-number');
            if (numEl) {
                const cardNum = parseInt(numEl.textContent.trim());
                const stepNum = cardToStepMap[cardNum];
                if (stepNum) {
                    activarPaso(stepNum);
                }
            }
        } else if (e.target.closest('.quote-side-panel') || e.target.closest('.form-action-bar')) {
            activarPaso(6);
        }
    });

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.form-section-card');
        if (card) {
            const numEl = card.querySelector('.form-section-number');
            if (numEl) {
                const cardNum = parseInt(numEl.textContent.trim());
                const stepNum = cardToStepMap[cardNum];
                if (stepNum && stepNum !== activeStep) {
                    activarPaso(stepNum);
                }
            }
        }
    });

    // Validación interactiva
    form.addEventListener('input', actualizarStepper);
    form.addEventListener('change', actualizarStepper);

    // Evitar envío del formulario si contiene errores
    form.addEventListener('submit', (e) => {
        maxStepVisited = 6; // Validamos todo al enviar
        actualizarStepper();
        
        const finalState = validarPaso(6);
        if (finalState !== 'valid') {
            e.preventDefault();
            
            // Buscar primer error para hacer scroll
            let firstInvalidEl = null;
            for (let pasoNum = 1; pasoNum <= 5; pasoNum++) {
                if (validarPaso(pasoNum) !== 'valid') {
                    const cardIndex = stepToCardIndexMap[pasoNum];
                    const cards = document.querySelectorAll('.form-section-card');
                    if (cards[cardIndex]) {
                        firstInvalidEl = cards[cardIndex];
                        activarPaso(pasoNum);
                        break;
                    }
                }
            }
            
            if (firstInvalidEl) {
                firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            alert('Por favor, complete todos los campos obligatorios requeridos y corrija los errores marcados.');
        }
    });

    // Validación inicial
    actualizarStepper();

    // ── Stepper flotante: sigue el scroll ──
    initStepperFloat();
});
