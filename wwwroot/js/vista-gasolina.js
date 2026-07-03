document.addEventListener("DOMContentLoaded", () => {
    inicializarVistaGasolina();
});

function inicializarVistaGasolina() {
    const form = document.getElementById("gasolinaForm");
    if (!form) return;

    cargarCatalogosGasolina();
    inicializarCalculoLitros();
    inicializarCargaComprobante();

    // Eventos de validación en tiempo real para todos los inputs
    form.querySelectorAll("input:not([type='file']):not([type='hidden']), select").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            const teniaError = campo.classList.contains("is-invalid");
            limpiarErrorCampo(campo);
            if (teniaError) validarCampoGasolina(campo);
        }));

        campo.addEventListener("blur", () => {
            if (campo.type !== "number" && campo.tagName !== "SELECT" && !campo.readOnly) {
                campo.value = campo.value.trim().replace(/\s{2,}/g, " ");
            }
            if (campo.required || campo.value) {
                validarCampoGasolina(campo);
            }
        });
    });

    document.getElementById("btnLimpiarGasolina")?.addEventListener("click", () => {
        form.reset();
        limpiarComprobante();
        form.querySelectorAll(".is-valid, .is-invalid").forEach(el => el.classList.remove("is-valid", "is-invalid"));
        const lit = document.getElementById("gasolina-decLitrosCargados");
        if (lit) lit.value = "0.00";
    });

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioGasolina(form)) {
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
            title: "Carga registrada",
            text: "Los datos de la carga de combustible han sido validados correctamente (Simulado).",
            confirmButtonColor: "var(--teal-cavex)"
        }).then(() => {
            window.location.href = "/Vehiculos/Index";
        });
    });
}

function cargarCatalogosGasolina() {
    // 1. Cargar vehículos
    fetch("/Vehiculos/GetVehiculos")
        .then(res => res.json())
        .then(result => {
            const select = document.getElementById("gasolina-idVehDatosGenerales");
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
            const select = document.getElementById("gasolina-idEmpleadoCarga");
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

    // 3. Cargar catálogos de gasolineras y formas de pago
    fetch("/Vehiculos/GetVehiculoCatalogos")
        .then(res => res.json())
        .then(result => {
            if (result.success && result.data) {
                // Gasolineras
                const selectGas = document.getElementById("gasolina-idVehCatGasolineras");
                if (selectGas && result.data.idVehCatGasolineras) {
                    selectGas.innerHTML = '<option value="">Seleccionar...</option>';
                    result.data.idVehCatGasolineras.forEach(item => {
                        const opt = document.createElement("option");
                        opt.value = String(item.id);
                        opt.textContent = item.strValor || item.strDescripcion;
                        selectGas.appendChild(opt);
                    });
                }

                // Formas de pago
                const selectPago = document.getElementById("gasolina-idVehCatFormaPago");
                if (selectPago && result.data.idVehCatFormaPago) {
                    selectPago.innerHTML = '<option value="">Seleccionar...</option>';
                    result.data.idVehCatFormaPago.forEach(item => {
                        const opt = document.createElement("option");
                        opt.value = String(item.id);
                        opt.textContent = item.strValor || item.strDescripcion;
                        selectPago.appendChild(opt);
                    });
                }
            }
        })
        .catch(err => console.error("Error al cargar catálogos de gasolina:", err));
}

function inicializarCalculoLitros() {
    const monto = document.getElementById("gasolina-mnyMontoPagado");
    const precio = document.getElementById("gasolina-decPrecioLitro");
    const litros = document.getElementById("gasolina-decLitrosCargados");

    if (!monto || !precio || !litros) return;

    const calcular = () => {
        const valMonto = parseFloat(monto.value) || 0;
        const valPrecio = parseFloat(precio.value) || 0;
        if (valMonto > 0 && valPrecio > 0) {
            litros.value = (valMonto / valPrecio).toFixed(2);
        } else {
            litros.value = "0.00";
        }
    };

    monto.addEventListener("input", calcular);
    precio.addEventListener("input", calcular);
}

function inicializarCargaComprobante() {
    const area = document.getElementById("gasolinaComprobanteArea");
    const input = document.getElementById("gasolinaComprobanteArchivo");
    if (!area || !input) return;

    area.addEventListener("click", event => {
        if (!event.target.closest(".gasolina-file-actions button")) input.click();
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

    document.getElementById("gasolinaComprobantePrompt").hidden = true;
    document.getElementById("gasolinaFilePreview").hidden = false;
    document.getElementById("gasolinaFileName").textContent = archivo.name;
    document.getElementById("gasolina-strUrlComprobantePago").value = "/uploads/gasolina_demo.pdf";
}

function limpiarComprobante() {
    const input = document.getElementById("gasolinaComprobanteArchivo");
    if (input) input.value = "";
    const hidden = document.getElementById("gasolina-strUrlComprobantePago");
    if (hidden) hidden.value = "";
    document.getElementById("gasolinaComprobantePrompt").hidden = false;
    document.getElementById("gasolinaFilePreview").hidden = true;
    limpiarErrorComprobante();
}

function mostrarErrorComprobante(mensaje) {
    document.getElementById("gasolinaComprobanteArea")?.classList.add("is-invalid");
    const error = document.getElementById("gasolinaComprobanteArchivoError");
    if (error) { error.textContent = mensaje; error.classList.add("d-block"); }
}

function limpiarErrorComprobante() {
    document.getElementById("gasolinaComprobanteArea")?.classList.remove("is-invalid");
    const error = document.getElementById("gasolinaComprobanteArchivoError");
    if (error) { error.textContent = ""; error.classList.remove("d-block"); }
}

function validarFormularioGasolina(form) {
    const obligatorios = [
        "gasolina-idVehDatosGenerales", "gasolina-dteFechaCarga", "gasolina-decKilometrajeCarga",
        "gasolina-idVehCatGasolineras", "gasolina-mnyMontoPagado", "gasolina-decPrecioLitro",
        "gasolina-idVehCatFormaPago", "gasolina-idEmpleadoCarga"
    ];
    let valido = true;
    obligatorios.forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoGasolina(campo)) valido = false;
    });

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

function validarCampoGasolina(campo) {
    const original = String(campo.value || "");
    const valor = original.trim();
    let mensaje = "";

    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción." : "Este campo es obligatorio.";
    }

    if (!mensaje) {
        switch (campo.id) {
            case "gasolina-decKilometrajeCarga": {
                const num = Number(valor);
                if (isNaN(num) || num < 0 || num > 999999) {
                    mensaje = "Kilometraje no válido.";
                }
                break;
            }
            case "gasolina-mnyMontoPagado": {
                const num = Number(valor);
                if (isNaN(num) || num <= 0 || num > 999999) {
                    mensaje = "Monto pagado no válido (debe ser mayor a 0).";
                }
                break;
            }
            case "gasolina-decPrecioLitro": {
                const num = Number(valor);
                if (isNaN(num) || num <= 0 || num > 999) {
                    mensaje = "Precio por litro no válido (debe ser mayor a 0).";
                }
                break;
            }
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
