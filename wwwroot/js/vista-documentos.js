document.addEventListener("DOMContentLoaded", () => {
    inicializarVistaDocumentos();
});

let listaVehiculosDocumentos = [];
let catalogosDocumentos = {};
let tabActivo = "factura";

const estadosMexicanos = [
    { id: 1, nombre: "Aguascalientes" }, { id: 2, nombre: "Baja California" }, { id: 3, nombre: "Baja California Sur" },
    { id: 4, nombre: "Campeche" }, { id: 5, nombre: "Chiapas" }, { id: 6, nombre: "Chihuahua" },
    { id: 7, nombre: "Coahuila" }, { id: 8, nombre: "Colima" }, { id: 9, nombre: "Ciudad de México" },
    { id: 10, nombre: "Durango" }, { id: 11, nombre: "Guanajuato" }, { id: 12, nombre: "Guerrero" },
    { id: 13, nombre: "Hidalgo" }, { id: 14, nombre: "Jalisco" }, { id: 15, nombre: "Estado de México" },
    { id: 16, nombre: "Michoacán" }, { id: 17, nombre: "Morelos" }, { id: 18, nombre: "Nayarit" },
    { id: 19, nombre: "Nuevo León" }, { id: 20, nombre: "Oaxaca" }, { id: 21, nombre: "Puebla" },
    { id: 22, nombre: "Querétaro" }, { id: 23, nombre: "Quintana Roo" }, { id: 24, nombre: "San Luis Potosí" },
    { id: 25, nombre: "Sinaloa" }, { id: 26, nombre: "Sonora" }, { id: 27, nombre: "Tabasco" },
    { id: 28, nombre: "Tamaulipas" }, { id: 29, nombre: "Tlaxcala" }, { id: 30, nombre: "Veracruz" },
    { id: 31, nombre: "Yucatán" }, { id: 32, nombre: "Zacatecas" }
];

function inicializarVistaDocumentos() {
    const form = document.getElementById("documentosVehiculoForm");
    if (!form) return;

    cargarCatalogosDocumentos();
    inicializarTabs();
    inicializarZonasUpload();
    inicializarValidacionesReales();

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioDocumentos(form)) {
            Swal.fire({
                icon: "warning",
                title: "Documentación incompleta",
                text: "Revisa los campos obligatorios del documento activo.",
                confirmButtonColor: "var(--teal-cavex)"
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Documento registrado",
            text: "El documento y sus metadatos han sido validados correctamente (Simulado).",
            confirmButtonColor: "var(--teal-cavex)"
        }).then(() => {
            window.location.href = "/Vehiculos/Index";
        });
    });

    actualizarVistaPreviaDocumento();
}

function cargarCatalogosDocumentos() {
    // 1. Cargar vehículos
    fetch("/Vehiculos/GetVehiculos")
        .then(res => res.json())
        .then(result => {
            const select = document.getElementById("documentos-idVehDatosGenerales");
            if (!select) return;
            select.innerHTML = '<option value="">Seleccionar...</option>';
            if (result.success && result.data) {
                listaVehiculosDocumentos = result.data;
                result.data.forEach(v => {
                    const opt = document.createElement("option");
                    opt.value = String(v.id);
                    opt.textContent = `${v.strPlaca} - ${v.strModelo} (${v.intAnio})`;
                    select.appendChild(opt);
                });
            }

            select.addEventListener("change", () => {
                const vehId = select.value;
                const veh = listaVehiculosDocumentos.find(v => String(v.id) === vehId);
                const card = document.getElementById("documentosVehiculoCard");
                if (veh) {
                    document.getElementById("documentosVehiculoPlaca").textContent = veh.strPlaca;
                    document.getElementById("documentosVehiculoMarca").textContent = veh.strMarca || "Toyota";
                    document.getElementById("documentosVehiculoModelo").textContent = veh.strModelo;
                    document.getElementById("documentosVehiculoAnio").textContent = veh.intAnio;
                    if (card) card.hidden = false;
                } else {
                    if (card) card.hidden = true;
                }
                actualizarVistaPreviaDocumento();
            });
        })
        .catch(err => console.error("Error al cargar vehículos:", err));

    // 2. Cargar catálogos
    fetch("/Vehiculos/GetVehiculoCatalogos")
        .then(res => res.json())
        .then(result => {
            if (result.success && result.data) {
                catalogosDocumentos = result.data;

                // Llenar dinámicamente todos los select.documento-catalogo
                document.querySelectorAll("select.documento-catalogo").forEach(select => {
                    const catalogo = select.getAttribute("data-catalogo");
                    select.innerHTML = '<option value="">Seleccionar...</option>';

                    let items = [];
                    switch (catalogo) {
                        case "status":
                            items = result.data.idVehCatStatus || [];
                            break;
                        case "formasPago":
                            items = result.data.idVehFormaPago || [];
                            break;
                        case "aseguradoras":
                            items = result.data.idVehCatAseguradora || [];
                            break;
                        case "coberturas":
                            items = result.data.idVehCatTipoCobertura || [];
                            break;
                        case "tiposPermiso":
                            items = result.data.idVehCatTipoPermiso || [];
                            break;
                        case "arrendatarios":
                            items = result.data.idVehCatArrendatario || [];
                            break;
                        case "hologramas":
                            items = result.data.idVehCatHolograma || [];
                            break;
                        case "entidades":
                            items = estadosMexicanos;
                            break;
                    }

                    items.forEach(item => {
                        const opt = document.createElement("option");
                        opt.value = String(item.id);
                        opt.textContent = item.nombre || item.strValor || item.strDescripcion;
                        select.appendChild(opt);
                    });
                });
            }
        })
        .catch(err => console.error("Error al cargar catálogos de documentos:", err));
}

function inicializarTabs() {
    const tabs = document.querySelectorAll(".documento-tab");
    const panels = document.querySelectorAll(".documento-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            panels.forEach(p => {
                p.classList.remove("active");
                p.hidden = true;
            });

            tab.classList.add("active");
            tabActivo = tab.getAttribute("data-documento-tab");

            const activePanel = document.querySelector(`.documento-panel[data-documento-panel="${tabActivo}"]`);
            if (activePanel) {
                activePanel.classList.add("active");
                activePanel.hidden = false;
            }

            actualizarVistaPreviaDocumento();
        });
    });
}

function inicializarZonasUpload() {
    document.querySelectorAll(".documento-upload").forEach(area => {
        const input = area.querySelector(".documento-file-input");
        const hidden = area.querySelector("input[type='hidden']");
        const prompt = area.querySelector(".documento-upload-prompt");
        const fileDiv = area.querySelector(".documento-upload-file");
        const fileName = area.querySelector(".documento-file-name");
        const btnRemove = area.querySelector(".documento-remove-file");

        if (!input || !hidden || !prompt || !fileDiv) return;

        area.addEventListener("click", event => {
            if (!event.target.closest(".documento-upload-file button")) input.click();
        });
        area.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                input.click();
            }
        });

        area.addEventListener("dragover", event => {
            event.preventDefault();
            area.classList.add("is-drag-over");
        });
        area.addEventListener("dragleave", () => area.classList.remove("is-drag-over"));
        area.addEventListener("drop", event => {
            event.preventDefault();
            area.classList.remove("is-drag-over");
            const file = event.dataTransfer.files?.[0];
            if (file) procesarArchivo(file, area);
        });

        input.addEventListener("change", () => {
            const file = input.files?.[0];
            if (file) procesarArchivo(file, area);
        });

        if (btnRemove) {
            btnRemove.addEventListener("click", event => {
                event.stopPropagation();
                input.value = "";
                hidden.value = "";
                prompt.hidden = false;
                fileDiv.hidden = true;
                if (fileName) fileName.textContent = "";
                limpiarErrorUpload(area);
                actualizarVistaPreviaDocumento();
            });
        }
    });
}

function procesarArchivo(file, area) {
    const limBytes = 5 * 1024 * 1024;
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    const prompt = area.querySelector(".documento-upload-prompt");
    const fileDiv = area.querySelector(".documento-upload-file");
    const fileName = area.querySelector(".documento-file-name");
    const hidden = area.querySelector("input[type='hidden']");

    limpiarErrorUpload(area);

    if (!tiposPermitidos.includes(file.type)) {
        mostrarErrorUpload(area, "Formato no válido. Debe ser PDF, JPG, PNG o WEBP.");
        return;
    }
    if (file.size > limBytes) {
        mostrarErrorUpload(area, "El archivo supera el límite de 5 MB.");
        return;
    }

    if (prompt) prompt.hidden = true;
    if (fileDiv) fileDiv.hidden = false;
    if (fileName) fileName.textContent = file.name;
    if (hidden) hidden.value = `/uploads/${tabActivo}_demo.pdf`;

    actualizarVistaPreviaDocumento();
}

function mostrarErrorUpload(area, mensaje) {
    area.classList.add("is-invalid");
    const errDiv = area.nextElementSibling;
    if (errDiv && errDiv.classList.contains("documento-upload-error")) {
        errDiv.textContent = mensaje;
        errDiv.classList.add("d-block");
    }
}

function limpiarErrorUpload(area) {
    area.classList.remove("is-invalid");
    const errDiv = area.nextElementSibling;
    if (errDiv && errDiv.classList.contains("documento-upload-error")) {
        errDiv.textContent = "";
        errDiv.classList.remove("d-block");
    }
}

function inicializarValidacionesReales() {
    document.querySelectorAll(".documento-panel input, .documento-panel select, .documento-panel textarea").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            const teniaError = campo.classList.contains("is-invalid");
            limpiarErrorCampo(campo);
            if (teniaError) validarCampoDoc(campo);
            actualizarVistaPreviaDocumento();
        }));

        campo.addEventListener("blur", () => {
            if (campo.required || campo.value) {
                validarCampoDoc(campo);
            }
            actualizarVistaPreviaDocumento();
        });
    });
}

function actualizarVistaPreviaDocumento() {
    const activePanel = document.querySelector(`.documento-panel[data-documento-panel="${tabActivo}"]`);
    if (!activePanel) return;

    const label = activePanel.getAttribute("data-documento-label") || "Documento";
    const val = selector => activePanel.querySelector(selector)?.value?.trim() || "";
    const txt = selector => {
        const sel = activePanel.querySelector(selector);
        const opt = sel?.selectedOptions?.[0];
        return opt?.value ? opt.textContent.trim() : "";
    };

    const setText = (id, str) => {
        const el = document.getElementById(id);
        if (el) el.textContent = str || "—";
    };

    const globalVeh = document.getElementById("documentos-idVehDatosGenerales");
    const vehText = globalVeh && globalVeh.value ? globalVeh.selectedOptions[0].textContent : "Sin seleccionar";

    setText("previewDocumentoVehiculo", vehText);
    setText("previewDocumentoActivo", label);

    // Obtener folio, fecha, vencimiento y monto dependiendo del panel activo
    let folio = "—";
    let fecha = "—";
    let vencimiento = "No aplica";
    let monto = "$0.00";
    let statusText = "Sin estatus";
    let hasFile = false;

    // Buscar archivos subidos
    const uploadZones = activePanel.querySelectorAll(".documento-upload");
    const filesUploaded = [];
    uploadZones.forEach(zone => {
        const hiddenVal = zone.querySelector("input[type='hidden']")?.value;
        const nameVal = zone.querySelector(".documento-file-name")?.textContent;
        if (hiddenVal && nameVal) {
            filesUploaded.push(nameVal);
            hasFile = true;
        }
    });

    switch (tabActivo) {
        case "factura":
            statusText = hasFile ? "Válido" : "Pendiente";
            break;
        case "tarjeta":
            folio = val("#tarjeta-strNumeroTarjeta");
            fecha = val("#tarjeta-dteFechaExpedicion");
            vencimiento = val("#tarjeta-dteFechaVencimiento");
            monto = parseFloat(val("#tarjeta-mnyMontoPagado")) || 0;
            statusText = txt("#tarjeta-idVehCatStatus") || "Sin estatus";
            break;
        case "tenencia":
            folio = val("#tenencia-strFolioPago");
            fecha = val("#tenencia-dteFechaPago");
            vencimiento = val("#tenencia-dteFechaVencimiento");
            monto = parseFloat(val("#tenencia-mnyMontoPagado")) || 0;
            statusText = txt("#tenencia-idVehCatStatus") || "Sin estatus";
            break;
        case "verificacion":
            folio = val("#verificacion-strFolioVerificacion");
            fecha = val("#verificacion-dteFechaVerificacion");
            vencimiento = val("#verificacion-dteFechaVencimiento");
            statusText = txt("#verificacion-idVehCatStatus") || "Sin estatus";
            break;
        case "seguro":
            folio = val("#seguro-strNumeroPoliza");
            fecha = val("#seguro-dteFechaInicio");
            vencimiento = val("#seguro-dteFechaVencimiento");
            monto = parseFloat(val("#seguro-mnyMontoPagado")) || 0;
            statusText = txt("#seguro-idVehCatStatus") || "Sin estatus";
            break;
        case "permiso":
            folio = val("#permiso-strNumeroPermiso");
            fecha = val("#permiso-dteFechaExpedicion");
            vencimiento = val("#permiso-dteFechaVencimiento");
            monto = parseFloat(val("#permiso-mnyMontoPagado")) || 0;
            statusText = txt("#permiso-idVehCatStatus") || "Sin estatus";
            break;
        case "revista":
            folio = val("#revista-strFolioRevista");
            fecha = val("#revista-dteFechaRevista");
            vencimiento = val("#revista-dteProximaRevista");
            monto = parseFloat(val("#revista-mnyMontoPagado")) || 0;
            statusText = txt("#revista-idVehCatStatus") || "Sin estatus";
            break;
        case "contrato":
            folio = val("#contrato-strNumeroContrato");
            fecha = val("#contrato-dteFechaInicio");
            vencimiento = val("#contrato-dteFechaFin");
            monto = parseFloat(val("#contrato-mnyMontoPagado")) || 0;
            statusText = txt("#contrato-idVehCatStatus") || "Sin estatus";
            break;
        case "placas":
            folio = val("#placas-strNumPlaca");
            fecha = val("#placas-dteFechaAsignacion");
            vencimiento = val("#placas-dteFechaVencimiento");
            monto = parseFloat(val("#placas-mnyMontoPagado")) || 0;
            statusText = txt("#placas-idVehCatStatus") || "Sin estatus";
            break;
    }

    setText("previewDocumentoFolio", folio);
    setText("previewDocumentoFecha", fecha);
    setText("previewDocumentoVencimiento", vencimiento);
    setText("previewDocumentoMonto", typeof monto === "number" ? `$${monto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}` : monto);

    const elStatus = document.getElementById("previewDocumentoStatus");
    if (elStatus) {
        elStatus.textContent = statusText;
        elStatus.className = "documento-status " + (
            statusText === "Activo" || statusText === "Válido" ? "documento-status-active" : 
            statusText === "Inactivo" ? "documento-status-inactive" : "documento-status-empty"
        );
    }

    setText("previewDocumentoArchivo", filesUploaded.length > 0 ? filesUploaded.join(", ") : "Sin archivo");
}

function validarFormularioDocumentos(form) {
    let valido = true;

    // 1. Validar vehículo global
    const vehSel = document.getElementById("documentos-idVehDatosGenerales");
    if (vehSel && !validarCampoDoc(vehSel)) valido = false;

    // 2. Validar campos del tab activo
    const activePanel = document.querySelector(`.documento-panel[data-documento-panel="${tabActivo}"]`);
    if (activePanel) {
        // Inputs
        activePanel.querySelectorAll("input:not([type='file']), select").forEach(campo => {
            if (!validarCampoDoc(campo)) valido = false;
        });

        // Fechas cruzadas
        const inicio = activePanel.querySelector("[data-fecha-inicio]");
        const fin = activePanel.querySelector("[data-fecha-fin]");
        if (inicio && fin && inicio.value && fin.value) {
            if (fin.value < inicio.value) {
                mensajeCampoDoc(fin, "Debe ser igual o posterior a la fecha inicial/expedición.");
                valido = false;
            }
        }

        // Uploads requeridos (ej. Factura)
        activePanel.querySelectorAll(".documento-upload[data-required-upload='true']").forEach(upload => {
            const hidden = upload.querySelector("input[type='hidden']");
            if (hidden && !hidden.value) {
                mostrarErrorUpload(upload, "Cargar este archivo es obligatorio.");
                valido = false;
            }
        });
    }

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

function mensajeCampoDoc(campo, msg) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
    campo.setAttribute("aria-invalid", "true");
    const error = document.getElementById(`${campo.id}Error`);
    if (error) {
        error.textContent = msg;
        error.classList.add("d-block");
    }
}

function validarCampoDoc(campo) {
    const original = String(campo.value || "");
    const valor = original.trim();
    let mensaje = "";

    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción." : "Este campo es obligatorio.";
    }

    if (!mensaje) {
        if (campo.type === "number") {
            const num = Number(valor);
            if (campo.classList.contains("documento-anio")) {
                const anioMax = new Date().getFullYear() + 1;
                if (num < 1990 || num > anioMax) {
                    mensaje = `El año debe estar entre 1990 y ${anioMax}.`;
                }
            } else {
                if (isNaN(num) || num < 0 || num > 999999) {
                    mensaje = "Monto no válido.";
                }
            }
        } else if (campo.maxLength > 0 && valor.length > campo.maxLength) {
            mensaje = `No debe superar ${campo.maxLength} caracteres.`;
        }
    }

    if (mensaje) {
        mensajeCampoDoc(campo, mensaje);
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
