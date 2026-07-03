let vehiculoCatalogos = {
    idVehCatMarcaVehiculo: [],
    idVehCatColor: [],
    idVehCatTipoVehiculo: [],
    idVehCatCapacidad: [],
    idVehCatTipoCombustible: [],
    idVehCatStatus: [],
    idVehCatTransmision: []
};

let vehiculosDemo = [];
let vehiculosCurrentPage = 1;
const vehiculosPageSize = 10;
let vehiculosSearchQuery = "";
let vehiculosStatusFilter = "todos";
let vehiculoImagenSeleccionadaUrl = "";

document.addEventListener("DOMContentLoaded", () => {
    inicializarRegistroVehiculo();
    inicializarVehiculosIndex();
});

// Inicializa Registro y mantiene sus eventos aislados del Index.
function inicializarRegistroVehiculo() {
    const form = document.getElementById("vehiculoForm");
    if (!form) return;

    cargarCatalogos();
    inicializarFechaRegistro();
    inicializarLimitesDinamicos();
    inicializarCargaImagen();
    configurarSanitizadores();
    inicializarContadorObservaciones();

    form.querySelectorAll("input:not([type='file']):not([type='hidden']), select, textarea").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            const teniaError = campo.classList.contains("is-invalid");
            limpiarErrorCampo(campo);
            if (teniaError) validarCampoVehiculo(campo);
            actualizarVistaPrevia();
        }));

        campo.addEventListener("blur", () => {
            if (campo.type !== "number" && campo.tagName !== "SELECT" && !campo.readOnly) {
                campo.value = campo.value.trim().replace(/\s{2,}/g, " ");
            }
            if (campo.required || campo.value) validarCampoVehiculo(campo);
            actualizarVistaPrevia();
        });
    });

    document.getElementById("btnLimpiarVehiculo")?.addEventListener("click", () => limpiarFormularioVehiculo(form));
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioVehiculo(form)) {
            Swal.fire({ icon: "warning", title: "Formulario incompleto", text: "Revisa los campos marcados antes de guardar.", confirmButtonColor: "var(--teal-cavex)" });
            return;
        }

        const payload = {
            strNumSerie: document.getElementById("strNumSerie").value,
            idVehCatMarcaVehiculo: parseInt(document.getElementById("idVehCatMarcaVehiculo").value),
            strModelo: document.getElementById("strModelo").value,
            intAnio: parseInt(document.getElementById("intAnio").value),
            strVersion: document.getElementById("strVersion").value || null,
            idVehCatColor: parseInt(document.getElementById("idVehCatColor").value),
            strPlaca: document.getElementById("strPlaca").value,
            intNumMotor: parseInt(document.getElementById("intNumMotor").value) || null,
            idVehCatTipoVehiculo: parseInt(document.getElementById("idVehCatTipoVehiculo").value),
            idVehCatCapacidad: parseInt(document.getElementById("idVehCatCapacidad").value),
            idVehCatTipoCombustible: parseInt(document.getElementById("idVehCatTipoCombustible").value),
            decKilometrajeActual: parseInt(document.getElementById("decKilometrajeActual").value),
            idVehCatStatus: parseInt(document.getElementById("idVehCatStatus").value),
            strUrlFoto: "/img/vehiculo-rav4-demo.jpg",
            dteFechaRegistro: document.getElementById("dteFechaRegistro").value + 'T00:00:00Z',
            strObservaciones: document.getElementById("strObservaciones").value || null,
            idVehCatTransmision: 1
        };

        Swal.fire({
            title: 'Guardando vehículo...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        fetch('/Vehiculos/SaveVehiculo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(result => {
            Swal.close();
            if (result.success) {
                Swal.fire({
                    icon: "success",
                    title: "Vehículo guardado",
                    text: "El vehículo se ha registrado exitosamente en la base de datos.",
                    confirmButtonColor: "var(--teal-cavex)",
                    confirmButtonText: "Ver listado de vehículos"
                }).then(() => {
                    window.location.href = '/Vehiculos/Index';
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al guardar",
                    text: result.message || "No se pudo guardar el vehículo.",
                    confirmButtonColor: "var(--teal-cavex)"
                });
            }
        })
        .catch(err => {
            Swal.close();
            console.error("Error al registrar vehículo:", err);
            Swal.fire({
                icon: "error",
                title: "Error de red",
                text: "No se pudo conectar con el servidor.",
                confirmButtonColor: "var(--teal-cavex)"
            });
        });
    });

    actualizarVistaPrevia();
}

function cargarCatalogos() {
    return fetch('/Vehiculos/GetVehiculoCatalogos')
        .then(res => res.json())
        .then(result => {
            if (result.success && result.data) {
                Object.assign(vehiculoCatalogos, result.data);
                
                Object.entries(vehiculoCatalogos).forEach(([selectId, registros]) => {
                    const select = document.getElementById(selectId);
                    if (!select) return;
                    select.innerHTML = '<option value="">Seleccionar...</option>';
                    registros.forEach(registro => {
                        const option = document.createElement("option");
                        option.value = String(registro.id);
                        option.textContent = registro.strValor || registro.strDescripcion || ("Opción " + registro.id);
                        option.title = registro.strDescripcion;
                        select.appendChild(option);
                    });
                });
                inicializarEstatusActivo();
            }
        });
}

function inicializarLimitesDinamicos() {
    const anio = document.getElementById("intAnio");
    if (!anio) return;
    anio.max = String(new Date().getFullYear() + 1);
    anio.placeholder = String(new Date().getFullYear());
}

// Configura fecha local compatible con SQL date.
function inicializarFechaRegistro() {
    const fecha = document.getElementById("dteFechaRegistro");
    if (!fecha) return;
    const hoy = new Date();
    fecha.value = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().split("T")[0];
}

function inicializarEstatusActivo() {
    const estatus = document.getElementById("idVehCatStatus");
    if (estatus) estatus.value = "1";
}

// Mantiene serie y placa en el formato admitido por las columnas varchar.
function configurarSanitizadores() {
    const serie = document.getElementById("strNumSerie");
    const placa = document.getElementById("strPlaca");
    serie?.addEventListener("input", () => { serie.value = serie.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); });
    placa?.addEventListener("input", () => { placa.value = placa.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""); });
}

// Actualiza el contador sin permitir superar el varchar(500).
function inicializarContadorObservaciones() {
    const campo = document.getElementById("strObservaciones");
    const contador = document.getElementById("observacionesCounter");
    if (!campo || !contador) return;
    const actualizar = () => {
        contador.textContent = String(campo.value.length);
        contador.parentElement?.classList.toggle("is-near-limit", campo.value.length >= 450);
    };
    campo.addEventListener("input", actualizar);
    actualizar();
}

function inicializarCargaImagen() {
    const area = document.getElementById("vehiculoUploadArea");
    const input = document.getElementById("vehiculoFotoArchivo");
    if (!area || !input) return;

    area.addEventListener("click", event => {
        if (!event.target.closest(".vehiculo-file-actions button")) input.click();
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
        if (archivo) procesarImagenVehiculo(archivo);
    });
    input.addEventListener("change", () => {
        const archivo = input.files?.[0];
        if (archivo) procesarImagenVehiculo(archivo);
    });
    document.getElementById("btnCambiarImagen")?.addEventListener("click", event => { event.stopPropagation(); input.click(); });
    document.getElementById("btnQuitarImagen")?.addEventListener("click", event => {
        event.stopPropagation();
        limpiarImagenVehiculo();
        limpiarErrorImagen();
    });
}

function procesarImagenVehiculo(archivo) {
    const tipos = ["image/jpeg", "image/png", "image/webp"];
    const extensiones = [".jpg", ".jpeg", ".png", ".webp"];
    limpiarErrorImagen();

    if (!tipos.includes(archivo.type) || !extensiones.some(extension => archivo.name.toLowerCase().endsWith(extension))) {
        limpiarImagenVehiculo();
        mostrarErrorImagen("Solo se permiten imágenes JPG, JPEG, PNG o WEBP.");
        return;
    }
    if (archivo.size > 5 * 1024 * 1024) {
        limpiarImagenVehiculo();
        mostrarErrorImagen("La imagen no debe superar 5 MB.");
        return;
    }

    const input = document.getElementById("vehiculoFotoArchivo");
    if (input && window.DataTransfer) {
        const transferencia = new DataTransfer();
        transferencia.items.add(archivo);
        input.files = transferencia.files;
    }
    if (vehiculoImagenSeleccionadaUrl) URL.revokeObjectURL(vehiculoImagenSeleccionadaUrl);
    vehiculoImagenSeleccionadaUrl = URL.createObjectURL(archivo);
    document.getElementById("vehiculoUploadPrompt").hidden = true;
    document.getElementById("vehiculoFilePreview").hidden = false;
    document.getElementById("vehiculoUploadImage").src = vehiculoImagenSeleccionadaUrl;
    setText("vehiculoFileName", archivo.name);
    actualizarFotoVistaPrevia(vehiculoImagenSeleccionadaUrl);
}

function limpiarImagenVehiculo() {
    if (vehiculoImagenSeleccionadaUrl) URL.revokeObjectURL(vehiculoImagenSeleccionadaUrl);
    vehiculoImagenSeleccionadaUrl = "";
    const input = document.getElementById("vehiculoFotoArchivo");
    if (input) input.value = "";
    const url = document.getElementById("strUrlFoto");
    if (url) url.value = "";
    const prompt = document.getElementById("vehiculoUploadPrompt");
    const preview = document.getElementById("vehiculoFilePreview");
    if (prompt) prompt.hidden = false;
    if (preview) preview.hidden = true;
    document.getElementById("vehiculoUploadImage")?.removeAttribute("src");
    actualizarFotoVistaPrevia("");
}

function mostrarErrorImagen(mensaje) {
    document.getElementById("vehiculoUploadArea")?.classList.add("is-invalid");
    const error = document.getElementById("vehiculoFotoArchivoError");
    if (error) { error.textContent = mensaje; error.classList.add("d-block"); }
}

function limpiarErrorImagen() {
    document.getElementById("vehiculoUploadArea")?.classList.remove("is-invalid");
    const error = document.getElementById("vehiculoFotoArchivoError");
    if (error) { error.textContent = ""; error.classList.remove("d-block"); }
}

function validarFormularioVehiculo(form) {
    const obligatorios = ["strNumSerie", "idVehCatMarcaVehiculo", "strModelo", "intAnio", "idVehCatColor", "strPlaca", "idVehCatTipoVehiculo", "idVehCatCapacidad", "idVehCatTipoCombustible", "decKilometrajeActual", "idVehCatStatus", "dteFechaRegistro"];
    const opcionales = ["strVersion", "intNumMotor", "strObservaciones"];
    let valido = true;
    [...obligatorios, ...opcionales].forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoVehiculo(campo)) valido = false;
    });
    if (document.getElementById("vehiculoUploadArea")?.classList.contains("is-invalid")) valido = false;

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

function validarCampoVehiculo(campo) {
    const original = String(campo.value || "");
    const valor = original.trim();
    const anioMaximo = new Date().getFullYear() + 1;
    let mensaje = "";

    if (campo.required && !valor) mensaje = campo.tagName === "SELECT" ? "Selecciona una opción." : "Este campo es obligatorio.";
    if (!mensaje) {
        switch (campo.id) {
            case "strNumSerie":
                if (original !== valor) mensaje = "La serie no debe iniciar ni terminar con espacios.";
                else if (valor.length > 20) mensaje = "La serie no debe superar 20 caracteres.";
                else if (valor && !/^[A-Z0-9]+$/.test(valor)) mensaje = "La serie solo permite letras y números.";
                break;
            case "strModelo":
            case "strVersion":
                if (valor.length > 250) mensaje = "El valor no debe superar 250 caracteres.";
                break;
            case "intAnio": {
                const numero = Number(valor);
                if (valor && (!Number.isInteger(numero) || numero < 1990 || numero > anioMaximo)) mensaje = `El año debe ser un entero entre 1990 y ${anioMaximo}.`;
                break;
            }
            case "strPlaca":
                if (original !== valor) mensaje = "La placa no debe iniciar ni terminar con espacios.";
                else if (valor.length > 20) mensaje = "La placa no debe superar 20 caracteres.";
                else if (valor && !/^[A-Z0-9-]+$/.test(valor)) mensaje = "La placa solo permite letras, números y guiones.";
                break;
            case "intNumMotor": {
                const numero = Number(valor);
                if (valor && (!Number.isInteger(numero) || numero < 0 || numero > 2147483647)) mensaje = "El número de motor debe ser un entero entre 0 y 2147483647.";
                break;
            }
            case "decKilometrajeActual": {
                const numero = Number(valor);
                if (valor && (!Number.isInteger(numero) || numero < 0 || numero > 999999)) mensaje = "El kilometraje debe ser un entero entre 0 y 999999.";
                break;
            }
            case "strObservaciones":
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
    document.getElementById(`${campo.id}Error`)?.classList.remove("d-block");
}

function actualizarVistaPrevia() {
    const valor = id => document.getElementById(id)?.value?.trim() || "";
    const texto = id => {
        const option = document.getElementById(id)?.selectedOptions?.[0];
        return option?.value ? option.textContent.trim() : "";
    };
    setText("previewUnidad", [texto("idVehCatMarcaVehiculo"), valor("strModelo"), valor("intAnio")].filter(Boolean).join(" ") || "Sin datos");
    setText("previewVersion", valor("strVersion") || "No especificada");
    setText("previewSerie", valor("strNumSerie") || "Sin serie");
    setText("previewPlaca", valor("strPlaca") || "Sin placa");
    setText("previewColor", texto("idVehCatColor") || "Sin seleccionar");
    setText("previewTipoVehiculo", texto("idVehCatTipoVehiculo") || "Sin seleccionar");
    setText("previewCapacidad", texto("idVehCatCapacidad") || "Sin seleccionar");
    setText("previewCombustible", texto("idVehCatTipoCombustible") || "Sin seleccionar");
    const kilometraje = Number(valor("decKilometrajeActual") || 0);
    setText("previewKilometraje", `${kilometraje.toLocaleString("es-MX")} km`);
    const status = texto("idVehCatStatus") || "Activo";
    setText("previewEstatus", status);
    const badge = document.getElementById("previewEstatus");
    if (badge) badge.className = status === "Activo" ? "badge-active" : status === "En mantenimiento" ? "badge-maintenance" : status === "Vendido" ? "badge-muted" : "badge-inactive";
}

function actualizarFotoVistaPrevia(url = vehiculoImagenSeleccionadaUrl) {
    const preview = document.getElementById("vehiculoFotoPreview");
    if (!preview) return;
    preview.innerHTML = url
        ? `<img src="${escapeHtml(url)}" alt="Foto del vehículo" />`
        : '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8l-2 4-2.5 1.1C2.7 11.4 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
}

function limpiarFormularioVehiculo(form) {
    form.reset();
    cargarCatalogos();
    inicializarFechaRegistro();
    limpiarImagenVehiculo();
    limpiarErrorImagen();
    form.querySelectorAll(".is-invalid, .is-valid").forEach(campo => limpiarErrorCampo(campo));
    document.getElementById("strObservaciones")?.dispatchEvent(new Event("input"));
    actualizarVistaPrevia();
}

function inicializarVehiculosIndex() {
    if (!document.getElementById("vehiculosTableBody")) return;
    
    document.getElementById("vehiculosTableSearch")?.addEventListener("input", event => {
        vehiculosSearchQuery = event.target.value.trim().toLowerCase();
        vehiculosCurrentPage = 1;
        renderVehiculosTable();
    });
    
    document.querySelectorAll("[data-vehiculo-filter]").forEach(button => button.addEventListener("click", () => {
        vehiculosStatusFilter = button.dataset.vehiculoFilter || "todos";
        vehiculosCurrentPage = 1;
        document.querySelectorAll("[data-vehiculo-filter]").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        renderVehiculosTable();
    }));

    Swal.fire({
        title: 'Cargando vehículos...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    cargarCatalogos().then(() => {
        fetch('/Vehiculos/GetVehiculos')
            .then(res => res.json())
            .then(result => {
                Swal.close();
                if (result.success && result.data) {
                    vehiculosDemo = result.data.map(v => {
                        const strMarca = vehiculoCatalogos.idVehCatMarcaVehiculo.find(item => item.id === v.idVehCatMarcaVehiculo)?.strValor || "Desconocida";
                        const strColor = vehiculoCatalogos.idVehCatColor.find(item => item.id === v.idVehCatColor)?.strValor || "Desconocido";
                        const strTipoVehiculo = vehiculoCatalogos.idVehCatTipoVehiculo.find(item => item.id === v.idVehCatTipoVehiculo)?.strValor || "Desconocido";
                        const strCapacidad = vehiculoCatalogos.idVehCatCapacidad.find(item => item.id === v.idVehCatCapacidad)?.strValor || "";
                        const strTipoCombustible = vehiculoCatalogos.idVehCatTipoCombustible.find(item => item.id === v.idVehCatTipoCombustible)?.strValor || "";
                        const strStatus = vehiculoCatalogos.idVehCatStatus.find(item => item.id === v.idVehCatStatus)?.strValor || "Activo";

                        return {
                            id: v.id,
                            strNumSerie: v.strNumSerie,
                            idVehCatMarcaVehiculo: v.idVehCatMarcaVehiculo,
                            strMarca: strMarca,
                            strModelo: v.strModelo,
                            intAnio: v.intAnio,
                            strVersion: v.strVersion,
                            idVehCatColor: v.idVehCatColor,
                            strColor: strColor,
                            strPlaca: v.strPlaca,
                            intNumMotor: v.intNumMotor,
                            idVehCatTipoVehiculo: v.idVehCatTipoVehiculo,
                            strTipoVehiculo: strTipoVehiculo,
                            idVehCatCapacidad: v.idVehCatCapacidad,
                            strCapacidad: strCapacidad,
                            idVehCatTipoCombustible: v.idVehCatTipoCombustible,
                            strTipoCombustible: strTipoCombustible,
                            decKilometrajeActual: v.decKilometrajeActual,
                            idVehCatStatus: v.idVehCatStatus,
                            strStatus: strStatus,
                            strUrlFoto: v.strUrlFoto,
                            dteFechaRegistro: v.dteFechaRegistro,
                            strObservaciones: v.strObservaciones
                        };
                    });
                } else {
                    vehiculosDemo = [];
                }
                renderVehiculosTable();
            })
            .catch(err => {
                Swal.close();
                console.error("Error al cargar vehículos:", err);
                vehiculosDemo = [];
                renderVehiculosTable();
            });
    }).catch(err => {
        Swal.close();
        console.error("Error al cargar catálogos:", err);
        renderVehiculosTable();
    });
}

function renderVehiculosTable() {
    const body = document.getElementById("vehiculosTableBody");
    if (!body) return;
    const filtrados = vehiculosDemo.filter(v => {
        if (vehiculosStatusFilter === "activos" && v.strStatus !== "Activo") return false;
        if (vehiculosStatusFilter === "mantenimiento" && v.strStatus !== "En mantenimiento") return false;
        const texto = [v.strPlaca, v.strMarca, v.strModelo, v.strColor, v.strStatus].join(" ").toLowerCase();
        return !vehiculosSearchQuery || texto.includes(vehiculosSearchQuery);
    });
    const totalPaginas = Math.ceil(filtrados.length / vehiculosPageSize) || 1;
    vehiculosCurrentPage = Math.min(vehiculosCurrentPage, totalPaginas);
    const inicio = (vehiculosCurrentPage - 1) * vehiculosPageSize;
    const pagina = filtrados.slice(inicio, inicio + vehiculosPageSize);

    body.innerHTML = pagina.length ? pagina.map(v => `
        <tr>
            <td><span class="vehicle-avatar">${v.strUrlFoto ? `<img src="${escapeHtml(v.strUrlFoto)}" alt="">` : vehicleIcon()}</span></td>
            <td><div class="description-text font-weight-700">${escapeHtml(v.strPlaca)}</div><div class="vehicle-muted-line">${escapeHtml(v.strNumSerie)}</div></td>
            <td>${escapeHtml(v.strMarca)}</td>
            <td><div class="description-text">${escapeHtml(v.strModelo)}</div><div class="vehicle-muted-line">${escapeHtml(v.strVersion || "Sin versión")}</div></td>
            <td>${v.intAnio}</td>
            <td>${escapeHtml(v.strColor)}</td>
            <td>${Number(v.decKilometrajeActual).toLocaleString("es-MX")} km</td>
            <td>${renderVehiculoBadge(v.strStatus)}</td>
            <td class="text-end">
                    <div class="dropdown actions-dropdown d-inline-block">
                        <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false">
                            <span>Acciones</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <button class="dropdown-item d-flex align-items-center" type="button" onclick="editarVehiculoDemo(${v.id})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Editar
                                </button>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex align-items-center" href="/Vehiculos/Detalle/${v.id}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-info"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                    Ver detalles
                                </a>
                            </li>
                            <li>
                                <button class="dropdown-item d-flex align-items-center text-danger" type="button" onclick="eliminarVehiculo(${v.id})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-danger"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                    Eliminar
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
        </tr>`).join("") : '<tr><td colspan="9" class="text-center py-5 text-muted">No se encontraron vehículos.</td></tr>';

    setText("vehiculosCountTodos", String(vehiculosDemo.length));
    setText("vehiculosCountActivos", String(vehiculosDemo.filter(v => v.strStatus === "Activo").length));
    setText("vehiculosCountMantenimiento", String(vehiculosDemo.filter(v => v.strStatus === "En mantenimiento").length));
    setText("vehiculosPaginationInfo", filtrados.length ? `Mostrando ${inicio + 1}-${inicio + pagina.length} de ${filtrados.length} registros` : "Mostrando 0-0 de 0 registros");
    renderVehiculosPagination(totalPaginas);

    document.querySelectorAll('#vehiculosTableBody .btn-action-trigger').forEach(el => {
        new bootstrap.Dropdown(el, {
            popperConfig: (defaultConfig) => {
                return {
                    ...defaultConfig,
                    strategy: 'fixed'
                };
            }
        });
    });
}

function renderVehiculosPagination(totalPaginas) {
    const lista = document.getElementById("vehiculosPaginationList");
    if (!lista) return;
    lista.innerHTML = "";
    if (totalPaginas <= 1) return;
    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
        const item = document.createElement("li");
        item.className = `page-item ${pagina === vehiculosCurrentPage ? "active" : ""}`;
        item.innerHTML = `<a class="page-link" href="#">${pagina}</a>`;
        item.addEventListener("click", event => { event.preventDefault(); vehiculosCurrentPage = pagina; renderVehiculosTable(); });
        lista.appendChild(item);
    }
}

function renderVehiculoBadge(status) {
    const clase = status === "Activo" ? "badge-active" : status === "En mantenimiento" ? "badge-maintenance" : status === "Vendido" ? "badge-muted" : "badge-danger";
    return `<span class="${clase}">${escapeHtml(status)}</span>`;
}

function editarVehiculoDemo(id) {
    const vehiculo = vehiculosDemo.find(v => v.id === id);
    Swal.fire({ icon: "info", title: "Editar vehículo", text: vehiculo ? `La edición de "${vehiculo.strMarca} ${vehiculo.strModelo} (${vehiculo.strPlaca})" se habilitará cuando exista el backend.` : "Esta acción se conectará cuando exista el backend del módulo.", confirmButtonColor: "var(--teal-cavex)" });
}

function eliminarVehiculo(id) {
    const vehiculo = vehiculosDemo.find(v => v.id === id);
    if (!vehiculo) return;

    Swal.fire({
        title: "¿Estás seguro de que deseas eliminar este vehículo?",
        text: `El vehículo con placa ${vehiculo.strPlaca} será eliminado del sistema de forma permanente.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Eliminando vehículo...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            fetch('/Vehiculos/DeleteVehiculo?id=' + id, {
                method: 'POST'
            })
            .then(res => res.json())
            .then(result => {
                Swal.close();
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'El vehículo ha sido eliminado exitosamente.',
                        confirmButtonColor: 'var(--teal-cavex)'
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message || 'No se pudo eliminar el vehículo.',
                        confirmButtonColor: 'var(--teal-cavex)'
                    });
                }
            })
            .catch(err => {
                Swal.close();
                console.error("Error al eliminar vehículo:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de red',
                    text: 'No se pudo conectar con el servidor.',
                    confirmButtonColor: 'var(--teal-cavex)'
                });
            });
        }
    });
}

function vehicleIcon() {
    return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8l-2 4-2.5 1.1C2.7 11.4 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function escapeHtml(text) {
    return String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
