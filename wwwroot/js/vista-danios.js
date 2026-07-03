document.addEventListener("DOMContentLoaded", () => {
    inicializarVistaDanios();
});

function inicializarVistaDanios() {
    const form = document.getElementById("danioAccidenteForm");
    if (!form) return;

    cargarCatalogosDanios();
    inicializarSwitchSeguro();
    inicializarCargaEvidencia();
    inicializarContadorObservaciones();

    // Eventos de validación en tiempo real para todos los inputs
    form.querySelectorAll("input:not([type='file']):not([type='hidden']), select, textarea").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            const teniaError = campo.classList.contains("is-invalid");
            limpiarErrorCampo(campo);
            if (teniaError) validarCampoDanio(campo);
        }));

        campo.addEventListener("blur", () => {
            if (campo.type !== "number" && campo.tagName !== "SELECT" && !campo.readOnly) {
                campo.value = campo.value.trim().replace(/\s{2,}/g, " ");
            }
            if (campo.required || campo.value) {
                validarCampoDanio(campo);
            }
        });
    });

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioDanio(form)) {
            Swal.fire({
                icon: "warning",
                title: "Formulario incompleto",
                text: "Revisa los campos obligatorios antes de continuar.",
                confirmButtonColor: "var(--teal-cavex)"
            });
            return;
        }

        // Simular éxito como se acordó para esta fase
        Swal.fire({
            icon: "success",
            title: "Evento validado",
            text: "Los datos del daño/accidente han sido validados correctamente (Simulado).",
            confirmButtonColor: "var(--teal-cavex)"
        }).then(() => {
            window.location.href = "/Vehiculos/Index";
        });
    });
}

function cargarCatalogosDanios() {
    // 1. Cargar vehículos
    fetch("/Vehiculos/GetVehiculos")
        .then(res => res.json())
        .then(result => {
            const select = document.getElementById("danio-idVehDatosGenerales");
            if (!select) return;
            select.innerHTML = '<option value="">Seleccionar...</option>';
            if (result.success && result.data) {
                result.data.forEach(v => {
                    const opt = document.createElement("option");
                    opt.value = String(v.id);
                    opt.textContent = `${v.strPlaca} - ${v.strModelo} (${v.intAnio})`;
                    select.appendChild(opt);
                });
            }
        })
        .catch(err => console.error("Error al cargar vehículos:", err));

    // 2. Cargar empleados
    fetch("/Empleado/GetEmpleados")
        .then(res => res.json())
        .then(result => {
            const select = document.getElementById("danio-idEmpleadoReporta");
            if (!select) return;
            select.innerHTML = '<option value="">Seleccionar...</option>';
            if (result.success && result.data) {
                result.data.forEach(e => {
                    const opt = document.createElement("option");
                    opt.value = String(e.id);
                    const nombreCompleto = e.strNombre + ' ' + e.strApellidoPaterno + (e.strApellidoMaterno ? ' ' + e.strApellidoMaterno : '');
                    opt.textContent = nombreCompleto;
                    select.appendChild(opt);
                });
            }
        })
        .catch(err => console.error("Error al cargar empleados:", err));

    // 3. Cargar aseguradoras
    fetch("/Vehiculos/GetVehiculoCatalogos")
        .then(res => res.json())
        .then(result => {
            const select = document.getElementById("danio-idVehSeguro");
            if (!select) return;
            select.innerHTML = '<option value="">No aplica</option>';
            if (result.success && result.data && result.data.idVehCatAseguradora) {
                result.data.idVehCatAseguradora.forEach(aseg => {
                    const opt = document.createElement("option");
                    opt.value = String(aseg.id);
                    opt.textContent = aseg.strValor || aseg.strDescripcion;
                    select.appendChild(opt);
                });
            }
        })
        .catch(err => console.error("Error al cargar aseguradoras:", err));
}

function inicializarSwitchSeguro() {
    const sw = document.getElementById("danioSeguroSwitch");
    const label = document.getElementById("danioSeguroSwitchLabel");
    const hidden = document.getElementById("danio-bitCubiertoPorSeguro");
    const select = document.getElementById("danio-idVehSeguro");

    if (!sw || !select) return;

    sw.addEventListener("change", () => {
        const cubierto = sw.checked;
        if (label) label.textContent = cubierto ? "Sí" : "No";
        if (hidden) hidden.value = cubierto ? "true" : "false";

        if (cubierto) {
            select.disabled = false;
            select.required = true;
            select.innerHTML = '<option value="">Seleccionar...</option>';
            // Recargar catálogo de aseguradoras
            fetch("/Vehiculos/GetVehiculoCatalogos")
                .then(res => res.json())
                .then(result => {
                    if (result.success && result.data && result.data.idVehCatAseguradora) {
                        result.data.idVehCatAseguradora.forEach(aseg => {
                            const opt = document.createElement("option");
                            opt.value = String(aseg.id);
                            opt.textContent = aseg.strValor || aseg.strDescripcion;
                            select.appendChild(opt);
                        });
                    }
                });
        } else {
            select.disabled = true;
            select.required = false;
            select.value = "";
            select.innerHTML = '<option value="">No aplica</option>';
            limpiarErrorCampo(select);
        }
    });
}

function inicializarCargaEvidencia() {
    const area = document.getElementById("danioEvidenciaArea");
    const input = document.getElementById("danioEvidenciaArchivo");
    if (!area || !input) return;

    area.addEventListener("click", event => {
        if (!event.target.closest(".danio-file-actions button")) input.click();
    });
    area.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            input.click();
        }
    });
    area.addEventListener("dragover", event => { event.preventDefault(); area.classList.add("is-drag-over"); });
    area.addEventListener("dragleave", () => area.classList.remove("is-drag-over"));
    area.addEventListener("drop", event => {
        event.preventDefault();
        area.classList.remove("is-drag-over");
        const archivo = event.dataTransfer.files?.[0];
        if (archivo) procesarArchivoEvidencia(archivo);
    });
    input.addEventListener("change", () => {
        const archivo = input.files?.[0];
        if (archivo) procesarArchivoEvidencia(archivo);
    });
}

function procesarArchivoEvidencia(archivo) {
    const limBytes = 5 * 1024 * 1024;
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

    limpiarErrorEvidencia();

    if (!tiposPermitidos.includes(archivo.type)) {
        mostrarErrorEvidencia("El archivo debe ser PDF, JPG, PNG o WEBP.");
        return;
    }
    if (archivo.size > limBytes) {
        mostrarErrorEvidencia("El archivo supera el límite de 5 MB.");
        return;
    }

    document.getElementById("danioEvidenciaPrompt").hidden = true;
    document.getElementById("danioFilePreview").hidden = false;
    document.getElementById("danioFileName").textContent = archivo.name;
    document.getElementById("danio-strUrlEvidencia").value = "/uploads/evidencia_demo.pdf";
}

function limpiarEvidencia() {
    const input = document.getElementById("danioEvidenciaArchivo");
    if (input) input.value = "";
    const hidden = document.getElementById("danio-strUrlEvidencia");
    if (hidden) hidden.value = "";
    document.getElementById("danioEvidenciaPrompt").hidden = false;
    document.getElementById("danioFilePreview").hidden = true;
    limpiarErrorEvidencia();
}

function mostrarErrorEvidencia(mensaje) {
    document.getElementById("danioEvidenciaArea")?.classList.add("is-invalid");
    const error = document.getElementById("danioEvidenciaArchivoError");
    if (error) { error.textContent = mensaje; error.classList.add("d-block"); }
}

function limpiarErrorEvidencia() {
    document.getElementById("danioEvidenciaArea")?.classList.remove("is-invalid");
    const error = document.getElementById("danioEvidenciaArchivoError");
    if (error) { error.textContent = ""; error.classList.remove("d-block"); }
}

function inicializarContadorObservaciones() {
    const campo = document.getElementById("danio-strObservaciones");
    const contador = document.getElementById("danioObservacionesContador");
    if (!campo || !contador) return;

    const actualizar = () => {
        contador.textContent = `${campo.value.length}/500`;
    };
    campo.addEventListener("input", actualizar);
    actualizar();
}

function validarFormularioDanio(form) {
    const obligatorios = ["danio-idVehDatosGenerales", "danio-idEmpleadoReporta", "danio-dteFechaEvento", "danio-strDescripcion"];
    if (document.getElementById("danioSeguroSwitch")?.checked) {
        obligatorios.push("danio-idVehSeguro");
    }
    let valido = true;
    obligatorios.forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoDanio(campo)) valido = false;
    });

    // Validar monto
    const monto = document.getElementById("danio-mnyMontoReparacion");
    if (monto && monto.value) {
        if (!validarCampoDanio(monto)) valido = false;
    }

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

function validarCampoDanio(campo) {
    const original = String(campo.value || "");
    const valor = original.trim();
    let mensaje = "";

    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción." : "Este campo es obligatorio.";
    }

    if (!mensaje) {
        switch (campo.id) {
            case "danio-strDescripcion":
                if (valor.length > 500) mensaje = "La descripción no debe superar 500 caracteres.";
                break;
            case "danio-strUbicacion":
                if (valor.length > 300) mensaje = "La ubicación no debe superar 300 caracteres.";
                break;
            case "danio-mnyMontoReparacion": {
                const num = Number(valor);
                if (isNaN(num) || num < 0 || num > 999999) {
                    mensaje = "Monto de reparación no válido.";
                }
                break;
            }
            case "danio-strObservaciones":
                if (original.length > 500) mensaje = "Las observaciones no deben superar 500 caracteres.";
                break;
        }
    }

    if (mensaje) {
        campo.classList.remove("is-valid");
        campo.classList.add("is-invalid");
        campo.setAttribute("aria-invalid", "true");
        const error = document.getElementById(`${campo.id}Error`);
        if (error) error.textContent = mensaje;
        return false;
    }

    limpiarErrorCampo(campo);
    if (campo.required && !campo.readOnly) campo.classList.add("is-valid");
    return true;
}

function limpiarErrorCampo(campo) {
    campo.classList.remove("is-invalid", "is-valid");
    campo.removeAttribute("aria-invalid");
    const error = document.getElementById(`${campo.id}Error`);
    if (error) {
        error.textContent = "";
        error.classList.remove("d-block");
    }
}
