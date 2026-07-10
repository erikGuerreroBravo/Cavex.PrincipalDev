"use strict";

document.addEventListener("DOMContentLoaded", () => {
    inicializarVistaInfracciones();
});

let listaVehiculosInfracciones = [];

function inicializarVistaInfracciones() {
    const form = document.getElementById("infraccionVehiculoForm");
    if (!form) return;

    cargarCatalogosInfracciones();
    inicializarEstatusInfraccion();
    inicializarCargaComprobante();
    inicializarContadores();

    // Eventos de validación en tiempo real para todos los inputs
    form.querySelectorAll("input:not([type='file']):not([type='hidden']), select, textarea").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            const teniaError = campo.classList.contains("is-invalid");
            limpiarErrorCampo(campo);
            if (teniaError) validarCampoInfraccion(campo);
            actualizarVistaPreviaInfraccion();
        }));

        campo.addEventListener("blur", () => {
            if (campo.type !== "number" && campo.tagName !== "SELECT" && !campo.readOnly) {
                campo.value = campo.value.trim().replace(/\s{2,}/g, " ");
            }
            if (campo.required || campo.value) {
                validarCampoInfraccion(campo);
            }
            actualizarVistaPreviaInfraccion();
        });
    });

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioInfraccion(form)) {
            Swal.fire({
                icon: "warning",
                title: "Formulario incompleto",
                text: "Revisa los campos obligatorios antes de continuar.",
                confirmButtonColor: "var(--teal-cavex)"
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Infracción registrada",
            text: "Los datos de la infracción han sido validados correctamente (Simulado).",
            confirmButtonColor: "var(--teal-cavex)"
        }).then(() => {
            window.location.href = "/Vehiculos/Index";
        });
    });

    actualizarVistaPreviaInfraccion();
}

function cargarCatalogosInfracciones() {
    // 1. Cargar vehículos
    fetch("/Vehiculos/GetVehiculos")
        .then(res => res.json())
        .then(result => {
            const select = document.getElementById("infraccion-idVehDatosGenerales");
            if (!select) return;
            select.innerHTML = '<option value="">Seleccionar...</option>';
            if (result.success && result.data) {
                listaVehiculosInfracciones = result.data;
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
            const select = document.getElementById("infraccion-idEmpEmpleado");
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

    // 3. Cargar catálogos (Forma de pago, Estatus)
    fetch("/Vehiculos/GetVehiculoCatalogos")
        .then(res => res.json())
        .then(result => {
            if (result.success && result.data) {
                // Formas de pago
                const selectPago = document.getElementById("infraccion-idVehFormaPago");
                if (selectPago && result.data.idVehFormaPago) {
                    selectPago.innerHTML = '<option value="">Seleccionar...</option>';
                    result.data.idVehFormaPago.forEach(item => {
                        const opt = document.createElement("option");
                        opt.value = String(item.id);
                        opt.textContent = item.strValor || item.strDescripcion;
                        selectPago.appendChild(opt);
                    });
                }

                // Estatus de la infracción
                const selectStatus = document.getElementById("infraccion-idVehCatStatus");
                if (selectStatus && result.data.idVehCatStatus) {
                    selectStatus.innerHTML = '<option value="">Seleccionar...</option>';
                    result.data.idVehCatStatus.forEach(item => {
                        const opt = document.createElement("option");
                        opt.value = String(item.id);
                        // En el contexto de infracciones: 1 = Pendiente (Activo en DB), 2 = Pagada (Inactivo en DB)
                        opt.textContent = item.id === 1 ? "Pendiente" : item.id === 2 ? "Pagada" : (item.strValor || item.strDescripcion);
                        selectStatus.appendChild(opt);
                    });
                    // Por defecto: Pendiente (1)
                    selectStatus.value = "1";
                    toggleCamposPago(false);
                    actualizarVistaPreviaInfraccion();
                }
            }
        })
        .catch(err => console.error("Error al cargar catálogos de infracción:", err));
}

function inicializarEstatusInfraccion() {
    const selectStatus = document.getElementById("infraccion-idVehCatStatus");
    if (!selectStatus) return;

    selectStatus.addEventListener("change", () => {
        const esPagada = (selectStatus.value === "2"); // 2 = Pagada
        toggleCamposPago(esPagada);
        actualizarVistaPreviaInfraccion();
    });
}

function toggleCamposPago(requerido) {
    const monto = document.getElementById("infraccion-mnyMontoPagado");
    const fecha = document.getElementById("infraccion-dteFechaPago");
    const forma = document.getElementById("infraccion-idVehFormaPago");
    const uploadArea = document.getElementById("infraccionComprobanteArea");
    const fileInput = document.getElementById("infraccionComprobanteArchivo");

    const campos = [monto, fecha, forma];

    campos.forEach(c => {
        if (!c) return;
        c.disabled = !requerido;
        c.required = requerido;
        if (!requerido) {
            c.value = "";
            limpiarErrorCampo(c);
        }
    });

    if (!requerido) {
        limpiarComprobante();
        if (fileInput) fileInput.disabled = true;
        if (uploadArea) {
            uploadArea.style.opacity = "0.6";
            uploadArea.style.pointerEvents = "none";
        }
    } else {
        if (fileInput) fileInput.disabled = false;
        if (uploadArea) {
            uploadArea.style.opacity = "1";
            uploadArea.style.pointerEvents = "auto";
        }
    }
}

function inicializarCargaComprobante() {
    const area = document.getElementById("infraccionComprobanteArea");
    const input = document.getElementById("infraccionComprobanteArchivo");
    if (!area || !input) return;

    area.addEventListener("click", event => {
        if (input.disabled) return;
        if (!event.target.closest(".infraccion-file-actions button")) input.click();
    });
    document.getElementById("btnQuitarComprobanteInfraccion")?.addEventListener("click", event => {
        event.stopPropagation();
        limpiarComprobante();
    });
    area.addEventListener("keydown", event => {
        if (input.disabled) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            input.click();
        }
    });
    area.addEventListener("dragover", event => {
        if (input.disabled) return;
        event.preventDefault();
        area.classList.add("is-drag-over");
    });
    area.addEventListener("dragleave", () => area.classList.remove("is-drag-over"));
    area.addEventListener("drop", event => {
        if (input.disabled) return;
        event.preventDefault();
        area.classList.remove("is-drag-over");
        const archivo = event.dataTransfer.files?.[0];
        if (archivo) procesarArchivoComprobante(archivo);
    });
    input.addEventListener("change", () => {
        const archivo = input.files?.[0];
        if (archivo) procesarArchivoComprobante(archivo);
    });
}

function procesarArchivoComprobante(archivo) {
    const limBytes = 5 * 1024 * 1024;
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

    limpiarErrorComprobante();

    if (!tiposPermitidos.includes(archivo.type)) {
        mostrarErrorComprobante("El archivo debe ser PDF, JPG, PNG o WEBP.");
        return;
    }
    if (archivo.size > limBytes) {
        mostrarErrorComprobante("El archivo supera el límite de 5 MB.");
        return;
    }

    document.getElementById("infraccionComprobantePrompt").hidden = true;
    document.getElementById("infraccionFilePreview").hidden = false;
    document.getElementById("infraccionFileName").textContent = archivo.name;
    document.getElementById("infraccion-strUrlComprobantePago").value = "/uploads/infraccion_demo.pdf";
    actualizarVistaPreviaInfraccion();
}

function limpiarComprobante() {
    const input = document.getElementById("infraccionComprobanteArchivo");
    if (input) input.value = "";
    const hidden = document.getElementById("infraccion-strUrlComprobantePago");
    if (hidden) hidden.value = "";
    const prompt = document.getElementById("infraccionComprobantePrompt");
    const preview = document.getElementById("infraccionFilePreview");
    if (prompt) prompt.hidden = false;
    if (preview) preview.hidden = true;
    limpiarErrorComprobante();
    actualizarVistaPreviaInfraccion();
}

function mostrarErrorComprobante(mensaje) {
    document.getElementById("infraccionComprobanteArea")?.classList.add("is-invalid");
    const error = document.getElementById("infraccionComprobanteArchivoError");
    if (error) { error.textContent = mensaje; error.classList.add("d-block"); }
}

function limpiarErrorComprobante() {
    document.getElementById("infraccionComprobanteArea")?.classList.remove("is-invalid");
    const error = document.getElementById("infraccionComprobanteArchivoError");
    if (error) { error.textContent = ""; error.classList.remove("d-block"); }
}

function inicializarContadores() {
    const motivo = document.getElementById("infraccion-strMotivo");
    const counterMotivo = document.getElementById("infraccionMotivoCounter");
    if (motivo && counterMotivo) {
        motivo.addEventListener("input", () => {
            counterMotivo.textContent = String(motivo.value.length);
        });
    }

    const obs = document.getElementById("infraccion-strObservaciones");
    const counterObs = document.getElementById("infraccionObservacionesCounter");
    if (obs && counterObs) {
        obs.addEventListener("input", () => {
            counterObs.textContent = String(obs.value.length);
        });
    }
}

function actualizarVistaPreviaInfraccion() {
    const val = id => document.getElementById(id)?.value?.trim() || "";
    const txt = id => {
        const sel = document.getElementById(id);
        const opt = sel?.selectedOptions?.[0];
        return opt?.value ? opt.textContent.trim() : "";
    };

    const statusVal = val("infraccion-idVehCatStatus");
    const statusText = statusVal === "2" ? "Pagada" : "Pendiente";

    const elStatus = document.getElementById("previewInfraccionStatus");
    if (elStatus) {
        elStatus.textContent = statusText;
        elStatus.className = "infraccion-status " + (statusVal === "2" ? "infraccion-status-paid" : "infraccion-status-pending");
    }

    // Buscar placa
    const vehId = val("infraccion-idVehDatosGenerales");
    const veh = listaVehiculosInfracciones.find(v => String(v.id) === vehId);
    const placaText = veh ? veh.strPlaca : "—";

    const setText = (id, str) => {
        const el = document.getElementById(id);
        if (el) el.textContent = str || "—";
    };

    setText("previewInfraccionVehiculo", txt("infraccion-idVehDatosGenerales") || "Sin seleccionar");
    setText("previewInfraccionPlaca", placaText);
    setText("previewInfraccionEmpleado", txt("infraccion-idEmpEmpleado") || "Sin seleccionar");
    setText("previewInfraccionFecha", val("infraccion-dteFechaInfraccion") || "—");
    setText("previewInfraccionMotivo", val("infraccion-strMotivo") || "Sin capturar");

    const montoVal = parseFloat(val("infraccion-mnyMontoPagado")) || 0;
    setText("previewInfraccionMonto", montoVal > 0 ? `$${montoVal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}` : "$0.00");
    setText("previewInfraccionFechaPago", val("infraccion-dteFechaPago") || "No registrada");
    setText("previewInfraccionFormaPago", txt("infraccion-idVehFormaPago") || "Sin seleccionar");

    const compFilename = document.getElementById("infraccionFileName")?.textContent;
    setText("previewInfraccionComprobante", val("infraccion-strUrlComprobantePago") ? (compFilename || "Archivo cargado") : "Sin archivo");
}

function validarFormularioInfraccion(form) {
    const obligatorios = ["infraccion-idVehDatosGenerales", "infraccion-idEmpEmpleado", "infraccion-dteFechaInfraccion", "infraccion-idVehCatStatus", "infraccion-strMotivo"];
    
    const statusVal = document.getElementById("infraccion-idVehCatStatus")?.value;
    if (statusVal === "2") {
        obligatorios.push("infraccion-mnyMontoPagado", "infraccion-dteFechaPago", "infraccion-idVehFormaPago");
    }

    let valido = true;
    obligatorios.forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoInfraccion(campo)) valido = false;
    });

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

function validarCampoInfraccion(campo) {
    const original = String(campo.value || "");
    const valor = original.trim();
    let mensaje = "";

    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción." : "Este campo es obligatorio.";
    }

    if (!mensaje) {
        switch (campo.id) {
            case "infraccion-strMotivo":
                if (valor.length > 500) mensaje = "El motivo no debe superar 500 caracteres.";
                break;
            case "infraccion-mnyMontoPagado": {
                const num = Number(valor);
                if (isNaN(num) || num < 0 || num > 999999) {
                    mensaje = "Monto pagado no válido.";
                }
                break;
            }
            case "infraccion-strObservaciones":
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
