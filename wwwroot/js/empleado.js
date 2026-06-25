let maxStepVisited = 1;
let activeStep = 1;

function agregarExperiencia() {
    const container = document.getElementById('experiencias-container');
    const primero = container.querySelector('.experiencia-item');
    const nuevo = primero.cloneNode(true);
    
    // Limpiar los valores de los inputs y sus estados de error
    nuevo.querySelectorAll('input').forEach(i => {
        i.value = '';
        delete i.dataset.touched;
        const group = i.closest('.form-group');
        if (group) {
            group.classList.remove('has-error', 'has-success');
            const errorDiv = group.querySelector('.error-message');
            if (errorDiv) errorDiv.remove();
        }
    });
    
    // Buscar o crear el header
    let header = nuevo.querySelector('.experiencia-header');
    if (!header) {
        header = document.createElement('div');
        header.className = 'experiencia-header';
        const title = document.createElement('span');
        title.className = 'experiencia-title';
        title.textContent = 'Experiencia laboral';
        header.appendChild(title);
        nuevo.insertBefore(header, nuevo.firstChild);
    }
    
    // Limpiar botones de eliminar previos si los hubiera
    const oldBtn = header.querySelector('.btn-eliminar-exp');
    if (oldBtn) {
        oldBtn.remove();
    }
    
    // Crear el botón de eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.className = 'btn-eliminar-exp';
    btnEliminar.title = 'Eliminar experiencia';
    btnEliminar.innerHTML = '&#x2715; Eliminar';
    btnEliminar.onclick = function () { nuevo.remove(); actualizarNombresDinamicos(); actualizarStepperEmpleado(); };
    
    header.appendChild(btnEliminar);
    container.appendChild(nuevo);
    actualizarNombresDinamicos();
    actualizarStepperEmpleado();
}

function agregarReferencia() {
    const container = document.getElementById('referencias-container');
    const primero = container.querySelector('.referencia-item');
    const nuevo = primero.cloneNode(true);
    
    // Limpiar los valores de los inputs y sus estados de error/touched
    nuevo.querySelectorAll('input').forEach(i => {
        i.value = '';
        delete i.dataset.touched;
        const group = i.closest('.form-group');
        if (group) {
            group.classList.remove('has-error', 'has-success');
            const errorDiv = group.querySelector('.error-message');
            if (errorDiv) errorDiv.remove();
        }
    });
    
    // Buscar o crear el header
    let header = nuevo.querySelector('.experiencia-header');
    if (!header) {
        header = document.createElement('div');
        header.className = 'experiencia-header';
        const title = document.createElement('span');
        title.className = 'experiencia-title';
        title.textContent = 'Referencia personal';
        header.appendChild(title);
        nuevo.insertBefore(header, nuevo.firstChild);
    }
    
    // Limpiar botones de eliminar previos si los hubiera
    const oldBtn = header.querySelector('.btn-eliminar-exp');
    if (oldBtn) {
        oldBtn.remove();
    }
    
    // Crear el botón de eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.className = 'btn-eliminar-exp';
    btnEliminar.title = 'Eliminar referencia';
    btnEliminar.innerHTML = '&#x2715; Eliminar';
    btnEliminar.onclick = function () { nuevo.remove(); actualizarNombresDinamicos(); actualizarStepperEmpleado(); };
    
    header.appendChild(btnEliminar);
    container.appendChild(nuevo);
    actualizarNombresDinamicos();
    actualizarStepperEmpleado();
}

// Funciones de validación visual
function mostrarError(input, mensaje) {
    if (!input) return;
    
    // Determinar paso correspondiente al input
    const card = input.closest('.empleado-card');
    let shouldMark = input.dataset.touched === "true";
    if (card) {
        const numEl = card.querySelector('.card-num');
        if (numEl) {
            const cardNum = parseInt(numEl.textContent.trim());
            if (cardNum > maxStepVisited) {
                shouldMark = false;
            }
        }
    }
    
    const group = input.closest('.form-group');
    if (!group) return;
    
    group.classList.remove('has-success', 'has-error');
    
    if (shouldMark) {
        group.classList.add('has-error');
        let errorDiv = group.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('span');
            errorDiv.className = 'error-message';
            group.appendChild(errorDiv);
        }
        errorDiv.textContent = mensaje;
    } else {
        const errorDiv = group.querySelector('.error-message');
        if (errorDiv) errorDiv.remove();
    }
}

function limpiarError(input) {
    if (!input) return;
    
    // Determinar paso correspondiente al input
    const card = input.closest('.empleado-card');
    let shouldMark = input.dataset.touched === "true";
    if (card) {
        const numEl = card.querySelector('.card-num');
        if (numEl) {
            const cardNum = parseInt(numEl.textContent.trim());
            if (cardNum > maxStepVisited) {
                shouldMark = false;
            }
        }
    }
    
    const group = input.closest('.form-group');
    if (!group) return;
    
    group.classList.remove('has-error', 'has-success');
    if (shouldMark) {
        group.classList.add('has-success');
    }
    
    const errorDiv = group.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function calcularEdad(fechaString) {
    if (!fechaString) return '';
    const hoy = new Date();
    const cumpleanos = new Date(fechaString);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad >= 0 ? edad : '';
}

function validarNombre(input) {
    const valor = input.value.trim();
    if (!valor) {
        if (input.hasAttribute('required')) {
            mostrarError(input, 'Este campo es obligatorio.');
            return false;
        }
        limpiarError(input);
        return true;
    }
    
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!regex.test(valor)) {
        mostrarError(input, 'Solo letras y espacios (sin números ni signos).');
        return false;
    }
    
    limpiarError(input);
    return true;
}

function validarCampoTextoGenerico(input) {
    const valor = input.value.trim();
    if (!valor) {
        if (input.hasAttribute('required')) {
            mostrarError(input, 'Este campo es obligatorio.');
            return false;
        }
        limpiarError(input);
        return true;
    }
    // Letras, números, espacios y puntuación básica
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;:'"()\-]+$/;
    if (!regex.test(valor)) {
        mostrarError(input, 'Caracteres inválidos. No se permiten símbolos especiales.');
        return false;
    }
    limpiarError(input);
    return true;
}

function validarFechaLogica(input) {
    if (!input.value && input.hasAttribute('required')) {
        mostrarError(input, 'Este campo es obligatorio.');
        return false;
    }
    if (input.value) {
        const dateObj = new Date(input.value);
        const year = dateObj.getFullYear();
        if (year < 1900 || year > 2100) {
            mostrarError(input, 'Ingrese un año válido (entre 1900 y 2100).');
            return false;
        }
    }
    limpiarError(input);
    return true;
}

function validarSelect(input) {
    if (!input.value && input.hasAttribute('required')) {
        mostrarError(input, 'Debe seleccionar una opción.');
        return false;
    }
    limpiarError(input);
    return true;
}

function validarDropZone(key) {
    const input = document.getElementById('file-' + key);
    const zone = document.getElementById('drop-zone-' + key);
    if (!input || !zone) return true;
    
    let shouldMark = (7 <= maxStepVisited) && (input.dataset.touched === "true");
    
    if (input.hasAttribute('required') && (!input.files || input.files.length === 0)) {
        if (shouldMark) zone.classList.add('has-error');
        return false;
    }
    zone.classList.remove('has-error');
    return true;
}

function validarRFC(input) {
    const valor = input.value.trim().toUpperCase();
    input.value = valor;
    
    if (!valor) {
        if (input.hasAttribute('required')) {
            mostrarError(input, 'El RFC es obligatorio.');
            return false;
        }
        limpiarError(input);
        return true;
    }
    
    // Soporta tanto 12 (personas morales) como 13 (personas físicas) caracteres
    const regex = /^[A-Z&Ññ]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
    if (!regex.test(valor)) {
        mostrarError(input, 'RFC inválido. Formato esperado: XXXX000000XXX o XXX000000XXX.');
        return false;
    }
    
    limpiarError(input);
    return true;
}

function validarCURP(input) {
    const valor = input.value.trim().toUpperCase();
    input.value = valor;
    
    if (!valor) {
        if (input.hasAttribute('required')) {
            mostrarError(input, 'La CURP es obligatoria.');
            return false;
        }
        limpiarError(input);
        return true;
    }
    
    const regex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;
    if (!regex.test(valor)) {
        mostrarError(input, 'CURP inválida (Ej: XXXX000000XXXXXX00).');
        return false;
    }
    
    limpiarError(input);
    return true;
}

function validarCodigoPostal(input) {
    const valor = input.value.trim();
    
    if (!valor) {
        if (input.hasAttribute('required')) {
            mostrarError(input, 'El código postal es obligatorio.');
            return false;
        }
        limpiarError(input);
        return true;
    }
    
    const regex = /^[0-9]{5}$/;
    if (!regex.test(valor)) {
        mostrarError(input, 'Debe tener exactamente 5 dígitos.');
        return false;
    }
    
    limpiarError(input);
    return true;
}

function validarCorreo(input) {
    const valor = input.value.trim().toLowerCase();
    if (!valor) {
        if (input.hasAttribute('required')) {
            mostrarError(input, 'El correo electrónico es obligatorio.');
            return false;
        }
        limpiarError(input);
        return true;
    }
    if (!validateEmailDomain(valor)) {
        mostrarError(input, 'Solo se permiten correos de gmail.com, hotmail.com, outlook.com o yahoo.com.');
        return false;
    }
    
    limpiarError(input);
    return true;
}

function validarTelefono(input, obligatorio = false) {
    const valor = input.value.trim();
    if (!valor) {
        if (obligatorio) {
            mostrarError(input, 'Este teléfono es obligatorio.');
            return false;
        }
        limpiarError(input);
        return true;
    }
    const regex = /^[0-9]{10}$/;
    if (!regex.test(valor)) {
        mostrarError(input, 'Debe tener exactamente 10 dígitos.');
        return false;
    }
    limpiarError(input);
    return true;
}

function validarNSS(input) {
    const valor = input.value.trim();
    if (!valor) {
        if (input.hasAttribute('required')) {
            mostrarError(input, 'El NSS es obligatorio.');
            return false;
        }
        limpiarError(input);
        return true;
    }
    const regex = /^[0-9]{11}$/;
    if (!regex.test(valor)) {
        mostrarError(input, 'El NSS debe tener exactamente 11 dígitos.');
        return false;
    }
    limpiarError(input);
    return true;
}

// Configuración principal al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-empleado');
    const txtNombre = document.getElementById('txtNombre');
    const txtApellidoPaterno = document.getElementById('txtApellidoPaterno');
    const txtApellidoMaterno = document.getElementById('txtApellidoMaterno');
    const txtFechaNacimiento = document.getElementById('txtFechaNacimiento');
    const txtEdad = document.getElementById('txtEdad');
    const txtRFC = document.getElementById('txtRFC');
    const txtCURP = document.getElementById('txtCURP');
    const txtCodigoPostal = document.getElementById('txtCodigoPostal');
    const txtCorreo = document.getElementById('txtCorreo');
    const txtTelefonoFijo = document.getElementById('txtTelefonoFijo');
    const txtTelefonoCelular = document.getElementById('txtTelefonoCelular');
    const txtNSS = document.getElementById('txtNSS');



    function sanitizeRFCOnly(val) {
        let clean = stripEmojis(val);
        clean = clean.replace(/[^a-zA-Z0-9&ñÑ]/g, '');
        return clean.toUpperCase();
    }

    function sanitizeCURPOnly(val) {
        let clean = stripEmojis(val);
        clean = clean.replace(/[^a-zA-Z0-9]/g, '');
        return clean.toUpperCase();
    }

    // Step by Step en tiempo real
    document.addEventListener('input', (e) => {
        const el = e.target;
        if (!el.matches('input, textarea')) return;

        let fn = null;

        if (el.id === 'txtNombre' || el.id === 'txtApellidoPaterno' || el.id === 'txtApellidoMaterno' ||
            el.id === 'txtNivelEstudios' || el.id === 'txtCarrera' || el.id === 'txtEstatus' ||
            el.classList.contains('txtRefNombre') || el.classList.contains('txtRefParentesco') ||
            el.classList.contains('txtExpPuesto') || el.classList.contains('txtExpArea')) {
            fn = sanitizeLettersOnly;
        } else if (el.id === 'txtTelefonoFijo' || el.id === 'txtTelefonoCelular' || el.id === 'txtCodigoPostal' || el.id === 'txtNSS' || el.classList.contains('txtRefTelefono')) {
            fn = sanitizeDigitsOnly;
        } else if (el.id === 'txtRFC') {
            fn = sanitizeRFCOnly;
        } else if (el.id === 'txtCURP') {
            fn = sanitizeCURPOnly;
        } else if (el.id === 'txtNumeroExterior' || el.id === 'txtNumeroInterior' || el.classList.contains('txtExpEmpresa')) {
            fn = sanitizeAlphanumericDash;
        } else if (el.type === 'text' || el.tagName.toLowerCase() === 'textarea') {
            fn = sanitizeGeneralText;
        }

        if (fn) {
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
        }
    });

    document.addEventListener('paste', (e) => {
        const el = e.target;
        if (el.matches('input, textarea')) {
            setTimeout(() => {
                const event = new Event('input', { bubbles: true });
                el.dispatchEvent(event);
            }, 0);
        }
    });

    // Step by Step (al tocar)
    document.addEventListener('blur', (e) => {
        if (e.target.matches('input, select, textarea')) {
            e.target.dataset.touched = "true";
            actualizarStepperEmpleado();
        }
    }, true);

    document.addEventListener('change', (e) => {
        if (e.target.matches('select, input[type="date"], input[type="checkbox"], input[type="file"]')) {
            e.target.dataset.touched = "true";
            actualizarStepperEmpleado();
        }
    });

    // Auto-calculo Edad y límite de 18 años en la fecha de nacimiento
    if (txtFechaNacimiento) {
        const today = new Date();
        const maxYear = today.getFullYear() - 18;
        const maxMonth = String(today.getMonth() + 1).padStart(2, '0');
        const maxDay = String(today.getDate()).padStart(2, '0');
        txtFechaNacimiento.setAttribute('max', `${maxYear}-${maxMonth}-${maxDay}`);

        txtFechaNacimiento.addEventListener('change', () => {
            if (txtFechaNacimiento.value) {
                const dateObj = new Date(txtFechaNacimiento.value);
                const year = dateObj.getFullYear();
                if (year < 1900 || year > maxYear) {
                    mostrarError(txtFechaNacimiento, 'Debe ser mayor de 18 años y una fecha válida (año >= 1900).');
                    if (txtEdad) txtEdad.value = '';
                } else {
                    if (txtEdad) {
                        txtEdad.value = calcularEdad(txtFechaNacimiento.value);
                    }
                    limpiarError(txtFechaNacimiento);
                }
            } else {
                if (txtEdad) txtEdad.value = '';
                mostrarError(txtFechaNacimiento, 'La fecha de nacimiento es obligatoria.');
            }
        });
    }

    // Funciones auxiliares de estado para el stepper
    function obtenerEstadoInput(input, validationFn, isRequired = false) {
        if (!input) return 'valid';
        const val = input.value.trim();
        if (val === '') {
            if (isRequired || input.hasAttribute('required')) {
                validationFn(input); 
                return 'missing';
            }
            limpiarError(input);
            return 'valid';
        }
        const isValid = validationFn(input);
        return isValid ? 'valid' : 'invalid';
    }

    // Validaciones de Pasos individuales
    function validarPasoEmpleado1() {
        const results = [];
        results.push(obtenerEstadoInput(txtNombre, validarNombre, true));
        results.push(obtenerEstadoInput(txtApellidoPaterno, validarNombre, true));
        results.push(obtenerEstadoInput(txtApellidoMaterno, validarNombre, false));
        
        if (!txtFechaNacimiento.value) {
            mostrarError(txtFechaNacimiento, 'La fecha de nacimiento es obligatoria.');
            results.push('missing');
        } else {
            const dateObj = new Date(txtFechaNacimiento.value);
            const year = dateObj.getFullYear();
            const maxYear = new Date().getFullYear() - 18;
            if (year < 1900 || year > maxYear) {
                mostrarError(txtFechaNacimiento, 'Debe ser mayor de 18 años y una fecha válida (año >= 1900).');
                results.push('invalid');
            } else {
                limpiarError(txtFechaNacimiento);
                results.push('valid');
            }
        }

        results.push(obtenerEstadoInput(txtRFC, validarRFC, true));
        results.push(obtenerEstadoInput(txtCURP, validarCURP, true));
        results.push(obtenerEstadoInput(document.getElementById('idGenero'), validarSelect, true));
        results.push(obtenerEstadoInput(document.getElementById('ddlEstadoCivil'), validarSelect, true));
        results.push(obtenerEstadoInput(document.getElementById('ddlNacionalidad'), validarSelect, true));
        results.push(obtenerEstadoInput(txtCorreo, validarCorreo, true));
        results.push(obtenerEstadoInput(txtTelefonoCelular, (i) => validarTelefono(i, true), true));
        results.push(obtenerEstadoInput(txtTelefonoFijo, (i) => validarTelefono(i, false), false));
        results.push(obtenerEstadoInput(txtNSS, validarNSS, true));

        if (results.includes('invalid')) return 'invalid';
        if (results.includes('missing')) return 'missing';
        return 'valid';
    }

    function validarPasoEmpleado2() {
        const results = [];
        const ne = document.getElementById('txtNivelEstudios');
        const inst = document.getElementById('txtInstitucion');
        const carr = document.getElementById('txtCarrera');
        const est = document.getElementById('txtEstatus');
        const fi = document.getElementById('txtFechaInicioEstudios');
        const ff = document.getElementById('txtFechaFinEstudios');

        results.push(obtenerEstadoInput(ne, validarNombre, true));
        results.push(obtenerEstadoInput(inst, validarCampoTextoGenerico, true));
        results.push(obtenerEstadoInput(carr, validarNombre, true));
        results.push(obtenerEstadoInput(est, validarNombre, true));
        results.push(obtenerEstadoInput(fi, validarFechaLogica, true));
        results.push(obtenerEstadoInput(ff, validarFechaLogica, true));

        if (fi && ff && fi.value && ff.value && ff.value < fi.value) {
            mostrarError(ff, 'La fecha de finalización no puede ser anterior a la de inicio.');
            results.push('invalid');
        }

        if (results.includes('invalid')) return 'invalid';
        if (results.includes('missing')) return 'missing';
        return 'valid';
    }

    function validarPasoEmpleado3() {
        const container = document.getElementById('experiencias-container');
        if (!container) return 'valid';
        const items = container.querySelectorAll('.experiencia-item');
        const results = [];

        items.forEach(item => {
            const emp = item.querySelector('.txtExpEmpresa');
            const puesto = item.querySelector('.txtExpPuesto');
            const area = item.querySelector('.txtExpArea');
            const fi = item.querySelector('.txtExpFechaInicio');
            const ff = item.querySelector('.txtExpFechaFin');
            const sueldo = item.querySelector('.txtExpSueldo');
            const motivo = item.querySelector('.txtExpMotivo');

            results.push(obtenerEstadoInput(emp, validarCampoTextoGenerico, true));
            results.push(obtenerEstadoInput(puesto, validarNombre, true));
            results.push(obtenerEstadoInput(area, validarNombre, true));
            results.push(obtenerEstadoInput(fi, validarFechaLogica, true));
            results.push(obtenerEstadoInput(ff, validarFechaLogica, true));
            results.push(obtenerEstadoInput(sueldo, (i) => {
                const val = i.value.trim();
                const num = Number(val);
                const ok = !isNaN(num) && num > 0;
                if (!ok) mostrarError(i, 'Ingrese un sueldo mensual válido.');
                else limpiarError(i);
                return ok;
            }, true));
            results.push(obtenerEstadoInput(motivo, validarCampoTextoGenerico, true));

            if (fi && ff && fi.value && ff.value && ff.value < fi.value) {
                mostrarError(ff, 'La fecha de fin no puede ser anterior a la de inicio.');
                results.push('invalid');
            }
        });

        if (results.includes('invalid')) return 'invalid';
        if (results.includes('missing')) return 'missing';
        return 'valid';
    }

    function validarPasoEmpleado4() {
        const results = [];
        const pais = document.getElementById('ddlPais');
        const est = document.getElementById('ddlEstado');
        const col = document.getElementById('ddlColonia');
        const cp = document.getElementById('txtCodigoPostal');
        const ext = document.getElementById('txtNumeroExterior');
        const interior = document.getElementById('txtNumeroInterior');

        results.push(obtenerEstadoInput(pais, validarSelect, true));
        results.push(obtenerEstadoInput(est, validarSelect, true));
        results.push(obtenerEstadoInput(col, validarSelect, true));
        results.push(obtenerEstadoInput(cp, validarCodigoPostal, true));
        results.push(obtenerEstadoInput(ext, (i) => {
            const num = Number(i.value);
            const ok = !isNaN(num) && num > 0;
            if (!ok) mostrarError(i, 'Número exterior inválido.');
            else limpiarError(i);
            return ok;
        }, true));
        results.push(obtenerEstadoInput(interior, validarCampoTextoGenerico, false));

        if (results.includes('invalid')) return 'invalid';
        if (results.includes('missing')) return 'missing';
        return 'valid';
    }

    function validarPasoEmpleado5() {
        const results = [];
        const sm = document.getElementById('txtSueldoMensual');
        const al = document.getElementById('ddlAreaLaboral');

        results.push(obtenerEstadoInput(sm, (i) => {
            const num = Number(i.value);
            const ok = !isNaN(num) && num > 0;
            if (!ok) mostrarError(i, 'Ingrese un sueldo mensual válido.');
            else limpiarError(i);
            return ok;
        }, true));
        results.push(obtenerEstadoInput(al, validarSelect, true));

        if (results.includes('invalid')) return 'invalid';
        if (results.includes('missing')) return 'missing';
        return 'valid';
    }

    function validarPasoEmpleado6() {
        const container = document.getElementById('referencias-container');
        if (!container) return 'valid';
        const items = container.querySelectorAll('.referencia-item');
        const results = [];

        items.forEach(item => {
            const nom = item.querySelector('.txtRefNombre');
            const par = item.querySelector('.txtRefParentesco');
            const tel = item.querySelector('.txtRefTelefono');

            results.push(obtenerEstadoInput(nom, validarNombre, true));
            results.push(obtenerEstadoInput(par, validarNombre, true));
            results.push(obtenerEstadoInput(tel, (i) => validarTelefono(i, true), true));
        });

        if (results.includes('invalid')) return 'invalid';
        if (results.includes('missing')) return 'missing';
        return 'valid';
    }

    function validarPasoEmpleado7() {
        const results = [];
        ['identificacion', 'comprobante', 'cv', 'contrato', 'licencia', 'fotoEmpleado'].forEach(key => {
            const ok = validarDropZone(key);
            results.push(ok ? 'valid' : 'missing');
        });

        if (results.includes('invalid')) return 'invalid';
        if (results.includes('missing')) return 'missing';
        return 'valid';
    }

    function validarPasoEmpleado(pasoNum) {
        if (pasoNum === 1) return validarPasoEmpleado1();
        if (pasoNum === 2) return validarPasoEmpleado2();
        if (pasoNum === 3) return validarPasoEmpleado3();
        if (pasoNum === 4) return validarPasoEmpleado4();
        if (pasoNum === 5) return validarPasoEmpleado5();
        if (pasoNum === 6) return validarPasoEmpleado6();
        if (pasoNum === 7) return validarPasoEmpleado7();
        return 'valid';
    }

    function actualizarStepperEmpleado() {
        const steps = document.querySelectorAll('.stepper .step');
        steps.forEach((step, idx) => {
            const pasoNum = idx + 1;
            const state = validarPasoEmpleado(pasoNum);
            
            step.classList.remove('success', 'warning', 'error');
            if (pasoNum <= maxStepVisited) {
                if (state === 'valid') step.classList.add('success');
                else if (state === 'missing') step.classList.add('warning');
                else if (state === 'invalid') step.classList.add('error');
            }
        });
    }

    function markStepFieldsAsTouched(stepNum) {
        const cards = document.querySelectorAll('.empleado-card');
        const card = cards[stepNum - 1];
        if (card) {
            card.querySelectorAll('input, select, textarea').forEach(el => {
                el.dataset.touched = "true";
            });
        }
    }

    function activarPasoEmpleado(stepNum) {
        if (stepNum > activeStep) {
            markStepFieldsAsTouched(activeStep);
        }
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
        actualizarStepperEmpleado();
    }

    // Configurar cursor y clics en el stepper para scroll suave
    const steps = document.querySelectorAll('.stepper .step');
    steps.forEach((step, idx) => {
        step.style.cursor = 'pointer';
        step.addEventListener('click', () => {
            const stepNum = idx + 1;
            if (stepNum <= maxStepVisited + 1) {
                activarPasoEmpleado(stepNum);
                const cards = document.querySelectorAll('.empleado-card');
                if (cards[idx]) {
                    cards[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });

    // Cambiar paso activo basado en foco o clics
    document.addEventListener('focusin', (e) => {
        const card = e.target.closest('.empleado-card');
        if (card) {
            const numEl = card.querySelector('.card-num');
            if (numEl) {
                const cardNum = parseInt(numEl.textContent.trim());
                if (cardNum) {
                    activarPasoEmpleado(cardNum);
                }
            }
        }
    });

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.empleado-card');
        if (card) {
            const numEl = card.querySelector('.card-num');
            if (numEl) {
                const cardNum = parseInt(numEl.textContent.trim());
                if (cardNum && cardNum !== activeStep) {
                    activarPasoEmpleado(cardNum);
                }
            }
        }
    });

    // Validación interactiva
    if (form) {
        form.addEventListener('input', actualizarStepperEmpleado);
        form.addEventListener('change', actualizarStepperEmpleado);
    }

    // Interceptar submit
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Forzar que todos los campos de todos los pasos se marquen como touched al enviar
            form.querySelectorAll('input, select, textarea').forEach(el => {
                el.dataset.touched = "true";
            });
            
            maxStepVisited = 7;
            actualizarStepperEmpleado();
            
            let firstInvalidCard = null;
            let isValid = true;
            
            for (let i = 1; i <= 7; i++) {
                if (validarPasoEmpleado(i) !== 'valid') {
                    isValid = false;
                    activarPasoEmpleado(i);
                    const cards = document.querySelectorAll('.empleado-card');
                    if (cards[i - 1]) {
                        firstInvalidCard = cards[i - 1];
                    }
                    break;
                }
            }
            
            if (!isValid) {
                if (firstInvalidCard) {
                    firstInvalidCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                Swal.fire({
                    icon: 'warning',
                    title: 'Formulario incompleto',
                    text: 'Faltan campos por llenar o contienen errores. Revise los campos marcados en rojo.',
                    confirmButtonColor: 'var(--teal-cavex)'
                });
            } else {
                const formData = new FormData(form);
                try {
                    console.log('Enviando datos al backend...');
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: '¡Empleado y archivos guardados exitosamente!',
                        confirmButtonColor: 'var(--teal-cavex)',
                        confirmButtonText: 'Ver listado de empleados'
                    }).then(() => {
                        window.location.href = '/Empleado/Index';
                    });
                } catch (error) {
                    let errorText = error.message || "";
                    const isTechnicalError = errorText.toLowerCase().includes("database") || 
                                             errorText.toLowerCase().includes("db") || 
                                             errorText.toLowerCase().includes("sql") || 
                                             errorText.toLowerCase().includes("conexion") || 
                                             errorText.toLowerCase().includes("connection");

                    if (!errorText || isTechnicalError) {
                        errorText = 'No se pudo guardar el empleado. ¡Intenta de nuevo!';
                    }

                    Swal.fire({
                        icon: 'error',
                        title: 'Error de registro',
                        text: errorText,
                        confirmButtonColor: 'var(--teal-cavex)'
                    });
                }
            }
        });
    }

    // Inicializar los nombres de los arreglos dinámicos
    actualizarNombresDinamicos();

    // Validación inicial (no pintará nada visualmente porque touched aún no está en true para los campos)
    actualizarStepperEmpleado();

    // ── Stepper flotante: sigue el scroll ──
    initStepperFloat();
});

// Funciones de Drag & Drop y Subida de Archivos
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const zone = e.currentTarget;
    zone.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const zone = e.currentTarget;
    zone.classList.remove('drag-over');
}

function handleDrop(e, key) {
    e.preventDefault();
    e.stopPropagation();
    const zone = e.currentTarget;
    zone.classList.remove('drag-over');
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        procesarArchivo(file, key);
    }
}

function handleFileSelect(e, key) {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        procesarArchivo(file, key);
    }
}

function procesarArchivo(file, key) {
    const input = document.getElementById('file-' + key);
    const zone = document.getElementById('drop-zone-' + key);
    if (!input || !zone) return;
    
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (ext !== '.pdf' || file.type !== 'application/pdf') {
        Swal.fire({
            icon: 'warning',
            title: 'Archivo no permitido',
            text: 'Formato de archivo no permitido. Solo se aceptan archivos PDF reales.',
            confirmButtonColor: 'var(--teal-cavex)'
        });
        return;
    }
    
    // Asignar el archivo al input
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    input.files = dataTransfer.files;
    input.dataset.touched = "true";
    
    // Actualizar UI
    const prompt = zone.querySelector('.drop-zone-prompt');
    const preview = zone.querySelector('.file-preview-container');
    const nameText = document.getElementById('name-' + key);
    const sizeText = document.getElementById('size-' + key);
    
    if (prompt) prompt.style.display = 'none';
    if (preview) preview.style.display = 'flex';
    if (nameText) nameText.textContent = file.name;
    if (sizeText) {
        const sizeKB = (file.size / 1024).toFixed(1);
        sizeText.textContent = sizeKB + ' KB';
    }
    
    zone.classList.remove('has-error');
    zone.classList.add('has-file');
    
    // Disparar evento change en el formulario para actualizar el stepper
    const form = document.getElementById('form-empleado');
    if (form) {
        const event = new Event('change', { bubbles: true });
        form.dispatchEvent(event);
    }
}

function removeFile(key) {
    const input = document.getElementById('file-' + key);
    const zone = document.getElementById('drop-zone-' + key);
    if (!input || !zone) return;
    
    input.value = '';
    input.dataset.touched = "true";
    
    const prompt = zone.querySelector('.drop-zone-prompt');
    const preview = zone.querySelector('.file-preview-container');
    
    if (prompt) prompt.style.display = 'block';
    if (preview) preview.style.display = 'none';
    
    zone.classList.remove('has-file');
    
    // Disparar evento en el formulario para actualizar el stepper
    const form = document.getElementById('form-empleado');
    if (form) {
        const event = new Event('change', { bubbles: true });
        form.dispatchEvent(event);
    }
}

function actualizarNombresDinamicos() {
    // Experiencias
    const expItems = document.querySelectorAll('#experiencias-container .experiencia-item');
    expItems.forEach((item, idx) => {
        const empresa = item.querySelector('.txtExpEmpresa');
        if (empresa) empresa.name = `Experiencias[${idx}].Empresa`;
        
        const puesto = item.querySelector('.txtExpPuesto');
        if (puesto) puesto.name = `Experiencias[${idx}].Puesto`;
        
        const area = item.querySelector('.txtExpArea');
        if (area) area.name = `Experiencias[${idx}].Area`;
        
        const fechaInicio = item.querySelector('.txtExpFechaInicio');
        if (fechaInicio) fechaInicio.name = `Experiencias[${idx}].FechaInicio`;
        
        const fechaFin = item.querySelector('.txtExpFechaFin');
        if (fechaFin) fechaFin.name = `Experiencias[${idx}].FechaFin`;
        
        const sueldo = item.querySelector('.txtExpSueldo');
        if (sueldo) sueldo.name = `Experiencias[${idx}].Sueldo`;
        
        const motivo = item.querySelector('.txtExpMotivo');
        if (motivo) motivo.name = `Experiencias[${idx}].MotivoSalida`;
    });

    // Referencias
    const refItems = document.querySelectorAll('#referencias-container .referencia-item');
    refItems.forEach((item, idx) => {
        const nombre = item.querySelector('.txtRefNombre');
        if (nombre) nombre.name = `Referencias[${idx}].NombreCompleto`;
        
        const parentesco = item.querySelector('.txtRefParentesco');
        if (parentesco) parentesco.name = `Referencias[${idx}].Parentesco`;
        
        const telefono = item.querySelector('.txtRefTelefono');
        if (telefono) telefono.name = `Referencias[${idx}].TelefonoCelular`;
    });
}
