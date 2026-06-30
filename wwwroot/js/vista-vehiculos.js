// Catálogos simulados con la misma forma de respuesta esperada del backend: id, strValor y strDescripcion.
// TODO backend: reemplazar los arreglos por GET /api/vehiculos/catalogos/marcas,
// /colores, /tipos-vehiculo, /capacidades, /tipos-combustible y /status.
const vehiculoCatalogos = {
    idVehCatMarcaVehiculo: [
        { id: 1, strValor: "Toyota", strDescripcion: "Marca Toyota" },
        { id: 2, strValor: "Nissan", strDescripcion: "Marca Nissan" },
        { id: 3, strValor: "Ford", strDescripcion: "Marca Ford" },
        { id: 4, strValor: "Chevrolet", strDescripcion: "Marca Chevrolet" }
    ],
    idVehCatColor: [
        { id: 1, strValor: "Blanco perlado", strDescripcion: "Color blanco perlado" },
        { id: 2, strValor: "Gris Oxford", strDescripcion: "Color gris Oxford" },
        { id: 3, strValor: "Negro", strDescripcion: "Color negro" },
        { id: 4, strValor: "Azul", strDescripcion: "Color azul" }
    ],
    idVehCatTipoVehiculo: [
        { id: 1, strValor: "Sedán", strDescripcion: "Vehículo tipo sedán" },
        { id: 2, strValor: "SUV", strDescripcion: "Vehículo utilitario deportivo" },
        { id: 3, strValor: "Van", strDescripcion: "Vehículo tipo van" },
        { id: 4, strValor: "Camioneta", strDescripcion: "Vehículo tipo camioneta" }
    ],
    idVehCatCapacidad: [
        { id: 1, strValor: "4 pasajeros", strDescripcion: "Capacidad para 4 pasajeros" },
        { id: 2, strValor: "5 pasajeros", strDescripcion: "Capacidad para 5 pasajeros" },
        { id: 3, strValor: "7 pasajeros", strDescripcion: "Capacidad para 7 pasajeros" },
        { id: 4, strValor: "12 pasajeros", strDescripcion: "Capacidad para 12 pasajeros" }
    ],
    idVehCatTipoCombustible: [
        { id: 1, strValor: "Gasolina", strDescripcion: "Motor a gasolina" },
        { id: 2, strValor: "Diésel", strDescripcion: "Motor diésel" },
        { id: 3, strValor: "Híbrido", strDescripcion: "Propulsión híbrida" },
        { id: 4, strValor: "Eléctrico", strDescripcion: "Propulsión eléctrica" }
    ],
    idVehCatStatus: [
        { id: 1, strValor: "Activo", strDescripcion: "Vehículo disponible para operación" },
        { id: 2, strValor: "Inactivo", strDescripcion: "Vehículo fuera de operación" },
        { id: 3, strValor: "En mantenimiento", strDescripcion: "Vehículo en mantenimiento" },
        { id: 4, strValor: "Vendido", strDescripcion: "Vehículo vendido" }
    ]
};

// Registros simulados usando los nombres reales de dbo.VehDatosGenerales.
const vehiculosDemo = [
    { id: 1, strNumSerie: "JTMWRREV5LJ123456", idVehCatMarcaVehiculo: 1, strMarca: "Toyota", strModelo: "RAV4", intAnio: 2021, strVersion: "XLE", idVehCatColor: 1, strColor: "Blanco perlado", strPlaca: "ABC-123-D", intNumMotor: 123456, idVehCatTipoVehiculo: 2, strTipoVehiculo: "SUV", idVehCatCapacidad: 2, strCapacidad: "5 pasajeros", idVehCatTipoCombustible: 1, strTipoCombustible: "Gasolina", decKilometrajeActual: 45230, idVehCatStatus: 1, strStatus: "Activo", strUrlFoto: "/img/vehiculo-rav4-demo.jpg", dteFechaRegistro: "2021-02-18", strObservaciones: null },
    { id: 2, strNumSerie: "3N1CN7AD0LL123456", idVehCatMarcaVehiculo: 2, strMarca: "Nissan", strModelo: "Versa", intAnio: 2020, strVersion: "Advance", idVehCatColor: 2, strColor: "Gris Oxford", strPlaca: "XYZ-987-A", intNumMotor: null, idVehCatTipoVehiculo: 1, strTipoVehiculo: "Sedán", idVehCatCapacidad: 2, strCapacidad: "5 pasajeros", idVehCatTipoCombustible: 1, strTipoCombustible: "Gasolina", decKilometrajeActual: 38600, idVehCatStatus: 1, strStatus: "Activo", strUrlFoto: null, dteFechaRegistro: "2020-08-12", strObservaciones: null },
    { id: 3, strNumSerie: "1FTEW1EP7MFA00045", idVehCatMarcaVehiculo: 3, strMarca: "Ford", strModelo: "Transit", intAnio: 2025, strVersion: "XL", idVehCatColor: 4, strColor: "Azul", strPlaca: "CAV-519-C", intNumMotor: 778899, idVehCatTipoVehiculo: 4, strTipoVehiculo: "Camioneta", idVehCatCapacidad: 3, strCapacidad: "7 pasajeros", idVehCatTipoCombustible: 1, strTipoCombustible: "Gasolina", decKilometrajeActual: 7900, idVehCatStatus: 1, strStatus: "Activo", strUrlFoto: null, dteFechaRegistro: "2026-06-03", strObservaciones: null }
];

let vehiculosCurrentPage = 1;
const vehiculosPageSize = 10;
let vehiculosSearchQuery = "";
let vehiculosStatusFilter = "todos";
let vehiculoImagenSeleccionadaUrl = "";

document.addEventListener("DOMContentLoaded", () => {
    inicializarRegistroVehiculo();
    inicializarVehiculosIndex();
    inicializarNuevoServicioVehiculo();
    inicializarDocumentosVehiculo();
    inicializarInfraccionesVehiculo();
    inicializarGasolinaVehiculo();
    inicializarLlantasVehiculo();
    inicializarDaniosAccidentesVehiculo();
    inicializarAsignacionesVehiculo();
});

// Inicializa Create y mantiene sus eventos aislados del Index.
function inicializarRegistroVehiculo() {
    const form = document.getElementById("vehiculoForm");
    if (!form) return;

    cargarCatalogosSimulados();
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

        // TODO backend: subir primero la foto, colocar la ruta devuelta en strUrlFoto y enviar el formulario a POST /api/vehiculos.
        Swal.fire({ icon: "success", title: "Vehículo validado correctamente", text: "Esta captura aún no se guarda en base de datos.", confirmButtonColor: "var(--teal-cavex)" });
    });

    actualizarVistaPrevia();
}

// Llena los selects con id como valor y strValor como texto visible.
function cargarCatalogosSimulados() {
    Object.entries(vehiculoCatalogos).forEach(([selectId, registros]) => {
        const select = document.getElementById(selectId);
        if (!select) return;
        select.innerHTML = '<option value="">Seleccionar...</option>';
        registros.forEach(registro => {
            const option = document.createElement("option");
            option.value = String(registro.id);
            option.textContent = registro.strValor;
            option.title = registro.strDescripcion;
            select.appendChild(option);
        });
    });
    inicializarEstatusActivo();
}

// Configura año máximo dinámico y fecha local compatible con SQL date.
function inicializarLimitesDinamicos() {
    const anio = document.getElementById("intAnio");
    if (!anio) return;
    anio.max = String(new Date().getFullYear() + 1);
    anio.placeholder = String(new Date().getFullYear());
}

// Configura valores o eventos requeridos por el módulo Vehículos; solo actúa cuando encuentra sus elementos HTML.
function inicializarFechaRegistro() {
    const fecha = document.getElementById("dteFechaRegistro");
    if (!fecha) return;
    const hoy = new Date();
    fecha.value = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().split("T")[0];
}

// Configura valores o eventos requeridos por el módulo Vehículos; solo actúa cuando encuentra sus elementos HTML.
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

// Gestiona drag & drop. La imagen permanece local hasta implementar la subida real.
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

// Valida simultáneamente MIME, extensión y límite de 5 MB.
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

// Restablece controles y estado visual de las pantallas de Vehículos sin modificar sus datos simulados de consulta.
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

// Expone el mensaje y estado visual de error del componente correspondiente en el módulo Vehículos.
function mostrarErrorImagen(mensaje) {
    document.getElementById("vehiculoUploadArea")?.classList.add("is-invalid");
    const error = document.getElementById("vehiculoFotoArchivoError");
    if (error) { error.textContent = mensaje; error.classList.add("d-block"); }
}

// Retira el estado visual de error del componente correspondiente en el módulo Vehículos.
function limpiarErrorImagen() {
    document.getElementById("vehiculoUploadArea")?.classList.remove("is-invalid");
    const error = document.getElementById("vehiculoFotoArchivoError");
    if (error) { error.textContent = ""; error.classList.remove("d-block"); }
}

// Aplica las reglas NOT NULL; los campos NULL solo se validan cuando tienen valor.
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

// Evalúa un control individual de las pantallas de Vehículos y aplica las clases Bootstrap de validación.
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

// Retira el estado visual de error del componente correspondiente en el módulo Vehículos.
function limpiarErrorCampo(campo) {
    campo.classList.remove("is-invalid", "is-valid");
    campo.removeAttribute("aria-invalid");
    document.getElementById(`${campo.id}Error`)?.classList.remove("d-block");
}

// Refleja valores y textos de catálogo, nunca los ids, en el resumen.
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

// Sustituye la imagen del resumen lateral o restaura el icono neutro cuando no hay archivo.
function actualizarFotoVistaPrevia(url = vehiculoImagenSeleccionadaUrl) {
    const preview = document.getElementById("vehiculoFotoPreview");
    if (!preview) return;
    preview.innerHTML = url
        ? `<img src="${escapeHtml(url)}" alt="Foto del vehículo" />`
        : '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8l-2 4-2.5 1.1C2.7 11.4 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
}

// Restablece controles y estado visual de las pantallas de Vehículos sin modificar sus datos simulados de consulta.
function limpiarFormularioVehiculo(form) {
    form.reset();
    cargarCatalogosSimulados();
    inicializarFechaRegistro();
    limpiarImagenVehiculo();
    limpiarErrorImagen();
    form.querySelectorAll(".is-invalid, .is-valid").forEach(campo => limpiarErrorCampo(campo));
    document.getElementById("strObservaciones")?.dispatchEvent(new Event("input"));
    actualizarVistaPrevia();
}

// Inicializa búsqueda, filtros y paginación del Index simulado.
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
    renderVehiculosTable();
}

// Construye el HTML dinámico de las pantallas de Vehículos a partir de datos simulados y textos escapados.
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
            <td class="text-end"><button class="btn-action-trigger btn-sm" type="button" onclick="mostrarAlertaVehiculoDemo()">Acciones</button></td>
        </tr>`).join("") : '<tr><td colspan="9" class="text-center py-5 text-muted">No se encontraron vehículos.</td></tr>';

    setText("vehiculosCountTodos", String(vehiculosDemo.length));
    setText("vehiculosCountActivos", String(vehiculosDemo.filter(v => v.strStatus === "Activo").length));
    setText("vehiculosCountMantenimiento", String(vehiculosDemo.filter(v => v.strStatus === "En mantenimiento").length));
    setText("vehiculosPaginationInfo", filtrados.length ? `Mostrando ${inicio + 1}-${inicio + pagina.length} de ${filtrados.length} registros` : "Mostrando 0-0 de 0 registros");
    renderVehiculosPagination(totalPaginas);
}

// Construye el HTML dinámico de las pantallas de Vehículos a partir de datos simulados y textos escapados.
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

// Construye el HTML dinámico de las pantallas de Vehículos a partir de datos simulados y textos escapados.
function renderVehiculoBadge(status) {
    const clase = status === "Activo" ? "badge-active" : status === "En mantenimiento" ? "badge-maintenance" : status === "Vendido" ? "badge-muted" : "badge-danger";
    return `<span class="${clase}">${escapeHtml(status)}</span>`;
}

// Muestra una confirmación informativa para una acción todavía no conectada al backend de las pantallas de Vehículos.
function mostrarAlertaVehiculoDemo() {
    Swal.fire({ icon: "info", title: "Acción simulada", text: "Esta acción se conectará cuando exista el backend del módulo.", confirmButtonColor: "var(--teal-cavex)" });
}

// Devuelve el SVG reutilizable mostrado cuando una unidad no tiene fotografía.
function vehicleIcon() {
    return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8l-2 4-2.5 1.1C2.7 11.4 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
}

// Actualiza texto mediante textContent para evitar inyectar HTML en previews y resúmenes.
function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

// Escapa texto procedente de datos simulados antes de insertarlo en plantillas HTML dinámicas.
function escapeHtml(text) {
    return String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Vehículos simulados con la proyección necesaria de dbo.VehDatosGenerales.
// TODO backend: sustituir este arreglo por GET /api/vehiculos.
const servicioVehiculosSimulados = [
    { id: 1, strPlaca: "ABC-123-D", marca: "Toyota", strModelo: "RAV4", intAnio: 2021, decKilometrajeActual: 45230 },
    { id: 2, strPlaca: "XYZ-987-A", marca: "Nissan", strModelo: "Versa", intAnio: 2020, decKilometrajeActual: 38600 }
];

// Los catálogos mantienen la forma id, strValor y strDescripcion esperada del backend.
// TODO backend: usar GET /api/vehiculos/catalogos/tipos-servicio, /talleres,
// /formas-pago y /responsables-servicio.
const servicioCatalogosSimulados = {
    idVehCatTipoServicio: [
        { id: 1, strValor: "Cambio de aceite y filtro", strDescripcion: "Servicio preventivo de aceite y filtro" },
        { id: 2, strValor: "Revisión de frenos", strDescripcion: "Inspección del sistema de frenos" },
        { id: 3, strValor: "Rotación de llantas", strDescripcion: "Rotación preventiva de neumáticos" },
        { id: 4, strValor: "Alineación y balanceo", strDescripcion: "Ajuste de alineación y balanceo" },
        { id: 5, strValor: "Revisión general", strDescripcion: "Diagnóstico general de la unidad" },
        { id: 6, strValor: "Servicio preventivo", strDescripcion: "Mantenimiento preventivo programado" },
        { id: 7, strValor: "Servicio correctivo", strDescripcion: "Reparación correctiva de la unidad" },
        { id: 8, strValor: "Revisión 24 puntos", strDescripcion: "Inspección integral de 24 puntos" }
    ],
    idVehCatTaller: [
        { id: 1, strValor: "Taller interno Cavex", strDescripcion: "Taller propio de Cavex" },
        { id: 2, strValor: "Agencia autorizada", strDescripcion: "Agencia autorizada por fabricante" },
        { id: 3, strValor: "Taller externo", strDescripcion: "Proveedor externo de mantenimiento" },
        { id: 4, strValor: "Servicio móvil", strDescripcion: "Servicio realizado en sitio" }
    ],
    idVehFormaPago: [
        { id: 1, strValor: "Efectivo", strDescripcion: "Pago en efectivo" },
        { id: 2, strValor: "Transferencia", strDescripcion: "Pago por transferencia bancaria" },
        { id: 3, strValor: "Tarjeta", strDescripcion: "Pago con tarjeta" },
        { id: 4, strValor: "Crédito", strDescripcion: "Pago a crédito" },
        { id: 5, strValor: "Otro", strDescripcion: "Otra forma de pago" }
    ],
    idVehCatResponsableServicio: [
        { id: 1, strValor: "Encargado de mantenimiento", strDescripcion: "Responsable del área de mantenimiento" },
        { id: 2, strValor: "Coordinador operativo", strDescripcion: "Coordinación operativa" },
        { id: 3, strValor: "Supervisor de flota", strDescripcion: "Supervisión de la flota" },
        { id: 4, strValor: "Administración", strDescripcion: "Área administrativa" }
    ]
};

// Historial de muestra con nombres compatibles con VehControlServicio y textos de catálogo resueltos.
const serviciosRecientesSimulados = [
    { id: 1, vehiculo: "Toyota RAV4 · ABC-123-D", dteFechaServicio: "2026-06-20", tipoServicio: "Cambio de aceite y filtro", taller: "Taller interno Cavex", decKilometrajeActual: 45230, mnyCostoManoObra: 650, mnyCostoRefacciones: 1280, mnyCostoTotal: 1930, responsable: "Encargado de mantenimiento" },
    { id: 2, vehiculo: "Nissan Versa · XYZ-987-A", dteFechaServicio: "2026-05-14", tipoServicio: "Revisión de frenos", taller: "Agencia autorizada", decKilometrajeActual: 38600, mnyCostoManoObra: 950, mnyCostoRefacciones: 2400, mnyCostoTotal: 3350, responsable: "Supervisor de flota" },
    { id: 3, vehiculo: "Toyota RAV4 · ABC-123-D", dteFechaServicio: "2026-03-08", tipoServicio: "Alineación y balanceo", taller: "Taller externo", decKilometrajeActual: 41820, mnyCostoManoObra: 500, mnyCostoRefacciones: 0, mnyCostoTotal: 500, responsable: "Coordinador operativo" }
];

// Inicializa solo /Vehiculos/NuevoServicio; las otras pantallas salen de inmediato.
function inicializarNuevoServicioVehiculo() {
    const form = document.getElementById("vehiculoServicioForm");
    if (!form) return;

    cargarCatalogosServicioSimulados();
    inicializarFechaServicio();
    inicializarComprobanteServicio();
    inicializarDescripcionServicio();
    renderizarServiciosRecientes();

    const vehiculoSelect = document.getElementById("idVehDatosGenerales");
    vehiculoSelect?.addEventListener("change", () => {
        const vehiculo = obtenerVehiculoServicioSeleccionado();
        const card = document.getElementById("servicioVehiculoCard");
        if (card) card.hidden = !vehiculo;
        if (vehiculo) {
            setText("servicioVehiculoPlaca", vehiculo.strPlaca);
            setText("servicioVehiculoUnidad", `${vehiculo.marca} ${vehiculo.strModelo}`);
            setText("servicioVehiculoAnio", String(vehiculo.intAnio));
            setText("servicioVehiculoKilometraje", `${vehiculo.decKilometrajeActual.toLocaleString("es-MX")} km`);
            document.getElementById("decKilometrajeActual").value = String(vehiculo.decKilometrajeActual);
        }
        actualizarVistaPreviaServicio();
    });

    ["mnyCostoManoObra", "mnyCostoRefacciones"].forEach(id => {
        document.getElementById(id)?.addEventListener("input", () => {
            calcularCostoTotalServicio();
            actualizarVistaPreviaServicio();
        });
    });

    form.querySelectorAll("input:not([type='file']):not([type='hidden']), select, textarea").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            limpiarErrorCampo(campo);
            actualizarVistaPreviaServicio();
        }));
        campo.addEventListener("blur", () => {
            if (campo.tagName === "TEXTAREA") campo.value = campo.value.trim().replace(/\s{2,}/g, " ");
            if (campo.required || campo.value) validarCampoServicio(campo);
        });
    });

    document.getElementById("btnLimpiarServicio")?.addEventListener("click", () => limpiarFormularioServicio(form));
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioServicio(form)) {
            Swal.fire({ icon: "warning", title: "Formulario incompleto", text: "Revisa los campos marcados antes de guardar.", confirmButtonColor: "var(--teal-cavex)" });
            return;
        }

        // TODO backend: subir comprobante, asignar strUrlComprobantePago y enviar POST /api/vehiculos/servicios.
        Swal.fire({ icon: "success", title: "Servicio validado correctamente", text: "Esta captura aún no se guarda en base de datos.", confirmButtonColor: "var(--teal-cavex)" });
    });

    calcularCostoTotalServicio();
    actualizarVistaPreviaServicio();
}

// Carga vehículos y catálogos usando siempre el id como value del option.
function cargarCatalogosServicioSimulados() {
    const vehiculoSelect = document.getElementById("idVehDatosGenerales");
    if (vehiculoSelect) {
        vehiculoSelect.innerHTML = '<option value="">Seleccionar...</option>';
        servicioVehiculosSimulados.forEach(vehiculo => {
            const option = document.createElement("option");
            option.value = String(vehiculo.id);
            option.textContent = `${vehiculo.strPlaca} · ${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}`;
            vehiculoSelect.appendChild(option);
        });
    }

    Object.entries(servicioCatalogosSimulados).forEach(([id, registros]) => {
        const select = document.getElementById(id);
        if (!select) return;
        select.innerHTML = '<option value="">Seleccionar...</option>';
        registros.forEach(registro => {
            const option = document.createElement("option");
            option.value = String(registro.id);
            option.textContent = registro.strValor;
            option.title = registro.strDescripcion;
            select.appendChild(option);
        });
    });
}

// Establece hoy como valor inicial y mañana como límite máximo permitido.
function inicializarFechaServicio() {
    const fecha = document.getElementById("dteFechaServicio");
    if (!fecha) return;
    const hoy = new Date();
    const local = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000);
    const manana = new Date(local);
    manana.setDate(manana.getDate() + 1);
    fecha.value = local.toISOString().split("T")[0];
    fecha.max = manana.toISOString().split("T")[0];
}

// Mantiene sincronizado el contador de la descripción varchar(500).
function inicializarDescripcionServicio() {
    const descripcion = document.getElementById("strDescripcion");
    const contador = document.getElementById("servicioDescripcionCounter");
    if (!descripcion || !contador) return;
    const actualizar = () => {
        contador.textContent = String(descripcion.value.length);
        contador.parentElement?.classList.toggle("is-near-limit", descripcion.value.length >= 450);
    };
    descripcion.addEventListener("input", actualizar);
    actualizar();
}

// Configura selección y drag & drop; el archivo solo se conserva en memoria del navegador.
function inicializarComprobanteServicio() {
    const area = document.getElementById("servicioComprobanteArea");
    const input = document.getElementById("servicioComprobanteArchivo");
    if (!area || !input) return;

    area.addEventListener("click", event => {
        if (!event.target.closest("button")) input.click();
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
        const archivo = event.dataTransfer.files?.[0];
        if (archivo) procesarComprobanteServicio(archivo);
    });
    input.addEventListener("change", () => {
        const archivo = input.files?.[0];
        if (archivo) procesarComprobanteServicio(archivo);
    });
    document.getElementById("btnQuitarComprobante")?.addEventListener("click", event => {
        event.stopPropagation();
        limpiarComprobanteServicio();
    });
}

// Valida formato y tamaño antes de presentar el nombre del comprobante.
function procesarComprobanteServicio(archivo) {
    const extensiones = [".pdf", ".jpg", ".jpeg", ".png", ".webp"];
    const tipos = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    const extensionValida = extensiones.some(extension => archivo.name.toLowerCase().endsWith(extension));
    limpiarErrorComprobanteServicio();

    if (!extensionValida || !tipos.includes(archivo.type)) {
        limpiarComprobanteServicio();
        mostrarErrorComprobanteServicio("Solo se permiten archivos PDF, JPG, JPEG, PNG o WEBP.");
        return;
    }
    if (archivo.size > 5 * 1024 * 1024) {
        limpiarComprobanteServicio();
        mostrarErrorComprobanteServicio("El comprobante no debe superar 5 MB.");
        return;
    }

    const input = document.getElementById("servicioComprobanteArchivo");
    if (input && window.DataTransfer) {
        const transferencia = new DataTransfer();
        transferencia.items.add(archivo);
        input.files = transferencia.files;
    }
    document.getElementById("servicioComprobantePrompt").hidden = true;
    document.getElementById("servicioComprobanteSeleccionado").hidden = false;
    setText("servicioComprobanteNombre", archivo.name);
    // strUrlComprobantePago permanece vacío: el backend asignará la ruta después de subir el archivo.
}

// Restablece controles y estado visual de /Vehiculos/NuevoServicio sin modificar sus datos simulados de consulta.
function limpiarComprobanteServicio() {
    const input = document.getElementById("servicioComprobanteArchivo");
    const ruta = document.getElementById("strUrlComprobantePago");
    if (input) input.value = "";
    if (ruta) ruta.value = "";
    const prompt = document.getElementById("servicioComprobantePrompt");
    const seleccionado = document.getElementById("servicioComprobanteSeleccionado");
    if (prompt) prompt.hidden = false;
    if (seleccionado) seleccionado.hidden = true;
    limpiarErrorComprobanteServicio();
}

// Expone el mensaje y estado visual de error del componente correspondiente en /Vehiculos/NuevoServicio.
function mostrarErrorComprobanteServicio(mensaje) {
    document.getElementById("servicioComprobanteArea")?.classList.add("is-invalid");
    const error = document.getElementById("servicioComprobanteArchivoError");
    if (error) {
        error.textContent = mensaje;
        error.classList.add("d-block");
    }
}

// Retira el estado visual de error del componente correspondiente en /Vehiculos/NuevoServicio.
function limpiarErrorComprobanteServicio() {
    document.getElementById("servicioComprobanteArea")?.classList.remove("is-invalid");
    const error = document.getElementById("servicioComprobanteArchivoError");
    if (error) {
        error.textContent = "";
        error.classList.remove("d-block");
    }
}

// Replica en frontend la expresión mnyCostoManoObra + mnyCostoRefacciones.
function calcularCostoTotalServicio() {
    const manoObra = numeroServicio("mnyCostoManoObra");
    const refacciones = numeroServicio("mnyCostoRefacciones");
    const total = manoObra + refacciones;
    const campoTotal = document.getElementById("mnyCostoTotal");
    if (campoTotal) campoTotal.value = total.toFixed(2);
    setText("previewServicioTotal", formatearMonedaServicio(total));
    return total;
}

// Ejecuta las reglas NOT NULL y valida los campos NULL únicamente cuando tienen valor.
function validarFormularioServicio(form) {
    const campos = [
        "idVehDatosGenerales", "idVehCatTipoServicio", "dteFechaServicio",
        "decKilometrajeActual", "idVehCatTaller", "strDescripcion",
        "mnyCostoManoObra", "mnyCostoRefacciones", "intProximoServicioPorKm",
        "dteProximoServicioPorFecha", "idVehFormaPago", "idVehCatResponsableServicio"
    ];
    let valido = true;
    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoServicio(campo)) valido = false;
    });
    if (document.getElementById("servicioComprobanteArea")?.classList.contains("is-invalid")) valido = false;

    const primero = form.querySelector(".is-invalid");
    if (primero) {
        primero.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primero.focus === "function") primero.focus({ preventScroll: true });
    }
    return valido;
}

// Evalúa un control individual de /Vehiculos/NuevoServicio y aplica las clases Bootstrap de validación.
function validarCampoServicio(campo) {
    const valor = String(campo.value || "").trim();
    let mensaje = "";
    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción válida." : "Este campo es obligatorio.";
    }

    if (!mensaje) {
        switch (campo.id) {
            case "idVehDatosGenerales":
                if (valor && !servicioVehiculosSimulados.some(v => v.id === Number(valor))) mensaje = "Selecciona un vehículo válido.";
                break;
            case "idVehCatTipoServicio":
            case "idVehCatTaller":
            case "idVehFormaPago":
            case "idVehCatResponsableServicio": {
                const catalogo = servicioCatalogosSimulados[campo.id] || [];
                if (valor && !catalogo.some(item => item.id === Number(valor))) mensaje = "Selecciona una opción válida.";
                break;
            }
            case "dteFechaServicio": {
                const fecha = crearFechaLocalServicio(valor);
                const limite = new Date();
                limite.setHours(0, 0, 0, 0);
                limite.setDate(limite.getDate() + 1);
                if (valor && (!fecha || fecha > limite)) mensaje = "La fecha no puede ser posterior al día de mañana.";
                break;
            }
            case "decKilometrajeActual": {
                const numero = Number(valor);
                if (valor && (!Number.isInteger(numero) || numero < 0 || numero > 999999)) mensaje = "El kilometraje debe ser un entero entre 0 y 999999.";
                break;
            }
            case "strDescripcion":
                if (campo.value.length > 500) mensaje = "La descripción no debe superar 500 caracteres.";
                break;
            case "mnyCostoManoObra":
            case "mnyCostoRefacciones": {
                const numero = Number(valor);
                if (valor && (!Number.isFinite(numero) || numero < 0 || numero > 999999)) mensaje = "El costo debe estar entre $0.00 y $999,999.00.";
                break;
            }
            case "intProximoServicioPorKm": {
                const numero = Number(valor);
                const actual = numeroServicio("decKilometrajeActual");
                if (valor && (!Number.isInteger(numero) || numero < 0 || numero > 2147483647)) mensaje = "El próximo kilometraje debe ser un entero entre 0 y 2147483647.";
                else if (valor && numero <= actual) mensaje = "El próximo servicio debe ser mayor al kilometraje actual.";
                break;
            }
            case "dteProximoServicioPorFecha": {
                const proxima = crearFechaLocalServicio(valor);
                const servicio = crearFechaLocalServicio(document.getElementById("dteFechaServicio")?.value);
                if (valor && (!proxima || !servicio || proxima < servicio)) mensaje = "La próxima fecha debe ser igual o posterior a la fecha del servicio.";
                break;
            }
        }
    }

    if (mensaje) {
        mostrarErrorCampo(campo, mensaje);
        return false;
    }
    limpiarErrorCampo(campo);
    if (campo.required && !campo.readOnly) campo.classList.add("is-valid");
    return true;
}

// Función compartida para presentar errores consistentes en los formularios del módulo.
function mostrarErrorCampo(campo, mensaje) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
    campo.setAttribute("aria-invalid", "true");
    const error = document.getElementById(`${campo.id}Error`);
    if (error) {
        error.textContent = mensaje;
        error.classList.add("d-block");
    }
}

// Actualiza etiquetas y valores sin concatenaciones visuales ambiguas.
function actualizarVistaPreviaServicio() {
    const vehiculo = obtenerVehiculoServicioSeleccionado();
    const textoSelect = id => {
        const opcion = document.getElementById(id)?.selectedOptions?.[0];
        return opcion?.value ? opcion.textContent.trim() : "";
    };
    setText("previewServicioVehiculo", vehiculo ? `${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}` : "Sin seleccionar");
    setText("previewServicioPlaca", vehiculo?.strPlaca || "—");
    setText("previewServicioTipo", textoSelect("idVehCatTipoServicio") || "Sin seleccionar");
    setText("previewServicioFecha", formatearFechaServicio(document.getElementById("dteFechaServicio")?.value) || "—");
    setText("previewServicioKm", `${numeroServicio("decKilometrajeActual").toLocaleString("es-MX")} km`);
    setText("previewServicioTaller", textoSelect("idVehCatTaller") || "Sin seleccionar");
    setText("previewServicioResponsable", textoSelect("idVehCatResponsableServicio") || "Sin seleccionar");
    const proximoKm = document.getElementById("intProximoServicioPorKm")?.value;
    setText("previewServicioProximoKm", proximoKm ? `${Number(proximoKm).toLocaleString("es-MX")} km` : "No definido");
    setText("previewServicioProximaFecha", formatearFechaServicio(document.getElementById("dteProximoServicioPorFecha")?.value) || "No definida");
    setText("previewServicioPago", textoSelect("idVehFormaPago") || "Sin seleccionar");
    setText("previewServicioTotal", formatearMonedaServicio(numeroServicio("mnyCostoTotal")));
}

// Restaura valores, archivo, errores, contador, total y fecha inicial.
function limpiarFormularioServicio(form) {
    form.reset();
    cargarCatalogosServicioSimulados();
    inicializarFechaServicio();
    limpiarComprobanteServicio();
    form.querySelectorAll(".is-invalid, .is-valid").forEach(campo => limpiarErrorCampo(campo));
    const card = document.getElementById("servicioVehiculoCard");
    if (card) card.hidden = true;
    document.getElementById("strDescripcion")?.dispatchEvent(new Event("input"));
    calcularCostoTotalServicio();
    actualizarVistaPreviaServicio();
}

// Renderiza la tabla inferior sin depender de endpoints ni de la base de datos.
function renderizarServiciosRecientes() {
    const body = document.getElementById("serviciosRecientesBody");
    if (!body) return;
    body.innerHTML = serviciosRecientesSimulados.map(servicio => `
        <tr>
            <td class="font-weight-700">${escapeHtml(servicio.vehiculo)}</td>
            <td>${escapeHtml(formatearFechaServicio(servicio.dteFechaServicio))}</td>
            <td>${escapeHtml(servicio.tipoServicio)}</td>
            <td>${escapeHtml(servicio.taller)}</td>
            <td>${servicio.decKilometrajeActual.toLocaleString("es-MX")} km</td>
            <td>${formatearMonedaServicio(servicio.mnyCostoManoObra)}</td>
            <td>${formatearMonedaServicio(servicio.mnyCostoRefacciones)}</td>
            <td class="servicio-table-total">${formatearMonedaServicio(servicio.mnyCostoTotal)}</td>
            <td>${escapeHtml(servicio.responsable)}</td>
            <td class="text-end"><button type="button" class="btn-action-trigger btn-sm" onclick="mostrarAlertaServicioDemo()">Acciones</button></td>
        </tr>`).join("");
}

// Muestra una confirmación informativa para una acción todavía no conectada al backend de /Vehiculos/NuevoServicio.
function mostrarAlertaServicioDemo() {
    Swal.fire({ icon: "info", title: "Acción simulada", text: "El detalle se conectará cuando exista el backend de servicios.", confirmButtonColor: "var(--teal-cavex)" });
}

// Localiza el registro o elemento activo utilizado por /Vehiculos/NuevoServicio sin modificarlo.
function obtenerVehiculoServicioSeleccionado() {
    const id = Number(document.getElementById("idVehDatosGenerales")?.value);
    return servicioVehiculosSimulados.find(vehiculo => vehiculo.id === id) || null;
}

// Convierte el valor del control de /Vehiculos/NuevoServicio a un número seguro para cálculos visuales.
function numeroServicio(id) {
    const numero = Number(document.getElementById(id)?.value || 0);
    return Number.isFinite(numero) ? numero : 0;
}

// Normaliza una fecha local de /Vehiculos/NuevoServicio evitando desplazamientos por zona horaria.
function crearFechaLocalServicio(valor) {
    if (!valor || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) return null;
    const [anio, mes, dia] = valor.split("-").map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia ? fecha : null;
}

// Convierte un valor de /Vehiculos/NuevoServicio a su representación legible para la interfaz.
function formatearFechaServicio(valor) {
    const fecha = crearFechaLocalServicio(valor);
    return fecha ? fecha.toLocaleDateString("es-MX", { year: "numeric", month: "2-digit", day: "2-digit" }) : "";
}

// Convierte un valor de /Vehiculos/NuevoServicio a su representación legible para la interfaz.
function formatearMonedaServicio(valor) {
    return Number(valor || 0).toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });
}

// Proyección simulada de VehDatosGenerales para el expediente documental.
// TODO backend: reemplazar por GET /api/vehiculos.
const documentosVehiculosSimulados = [
    { id: 1, strPlaca: "ABC-123-D", marca: "Toyota", strModelo: "RAV4", intAnio: 2021 },
    { id: 2, strPlaca: "XYZ-987-A", marca: "Nissan", strModelo: "Versa", intAnio: 2020 }
];

// Catálogos compartidos por las tablas detalle, con id como valor y strValor como etiqueta.
const documentosCatalogosSimulados = {
    status: [
        { id: 1, strValor: "Vigente", strDescripcion: "Documento vigente" },
        { id: 2, strValor: "Próximo a vencer", strDescripcion: "Documento próximo a vencer" },
        { id: 3, strValor: "Vencido", strDescripcion: "Documento vencido" },
        { id: 4, strValor: "Cancelado", strDescripcion: "Documento cancelado" }
    ],
    formasPago: [
        { id: 1, strValor: "Efectivo", strDescripcion: "Pago en efectivo" },
        { id: 2, strValor: "Transferencia", strDescripcion: "Transferencia bancaria" },
        { id: 3, strValor: "Tarjeta", strDescripcion: "Pago con tarjeta" },
        { id: 4, strValor: "Crédito", strDescripcion: "Pago a crédito" }
    ],
    aseguradoras: [
        { id: 1, strValor: "AXA", strDescripcion: "Aseguradora AXA" },
        { id: 2, strValor: "GNP", strDescripcion: "Grupo Nacional Provincial" },
        { id: 3, strValor: "Quálitas", strDescripcion: "Quálitas Compañía de Seguros" },
        { id: 4, strValor: "HDI", strDescripcion: "HDI Seguros" }
    ],
    coberturas: [
        { id: 1, strValor: "Amplia", strDescripcion: "Cobertura amplia" },
        { id: 2, strValor: "Limitada", strDescripcion: "Cobertura limitada" },
        { id: 3, strValor: "Responsabilidad civil", strDescripcion: "Responsabilidad civil" }
    ],
    tiposPermiso: [
        { id: 1, strValor: "Transporte privado", strDescripcion: "Permiso de transporte privado" },
        { id: 2, strValor: "Transporte de personal", strDescripcion: "Permiso para transporte de personal" },
        { id: 3, strValor: "Federal", strDescripcion: "Permiso federal" },
        { id: 4, strValor: "Estatal", strDescripcion: "Permiso estatal" }
    ],
    hologramas: [
        { id: 1, strValor: "00", strDescripcion: "Holograma doble cero" },
        { id: 2, strValor: "0", strDescripcion: "Holograma cero" },
        { id: 3, strValor: "1", strDescripcion: "Holograma uno" },
        { id: 4, strValor: "2", strDescripcion: "Holograma dos" }
    ],
    arrendatarios: [
        { id: 1, strValor: "Cavex Operaciones", strDescripcion: "Cavex Operaciones" },
        { id: 2, strValor: "Arrendadora Nacional", strDescripcion: "Arrendadora Nacional" },
        { id: 3, strValor: "Leasing Empresarial", strDescripcion: "Leasing Empresarial" }
    ],
    entidades: [
        { id: 1, strValor: "Ciudad de México", strDescripcion: "CDMX" },
        { id: 2, strValor: "Estado de México", strDescripcion: "México" },
        { id: 3, strValor: "Querétaro", strDescripcion: "Querétaro" },
        { id: 4, strValor: "Morelos", strDescripcion: "Morelos" }
    ]
};

// Estados superiores simulados; después se obtendrán por vehículo.
// TODO backend: GET /api/vehiculos/documentos/{idVehDatosGenerales}.
const documentosResumenSimulado = [
    { key: "factura", nombre: "Factura", estado: "Vigente", vencimiento: null },
    { key: "tarjeta", nombre: "Tarjeta de circulación", estado: "Próximo a vencer", vencimiento: "2026-08-15" },
    { key: "tenencia", nombre: "Tenencia", estado: "Vigente", vencimiento: "2027-03-31" },
    { key: "verificacion", nombre: "Verificación", estado: "Próximo a vencer", vencimiento: "2026-07-30" },
    { key: "seguro", nombre: "Seguro", estado: "Vencido", vencimiento: "2026-05-20" },
    { key: "permiso", nombre: "Permiso de transporte", estado: "Sin capturar", vencimiento: null },
    { key: "revista", nombre: "Revista vehicular", estado: "Vigente", vencimiento: "2026-12-10" },
    { key: "contrato", nombre: "Contrato de arrendamiento", estado: "Sin capturar", vencimiento: null },
    { key: "placas", nombre: "Placas", estado: "Vigente", vencimiento: "2027-01-31" }
];

const documentosRecientesSimulados = [
    { vehiculo: "Toyota RAV4 · ABC-123-D", documento: "Tarjeta de circulación", folio: "TC-458921", fecha: "2026-06-10", vencimiento: "2026-08-15", estado: "Próximo a vencer", archivo: "tarjeta-rav4.pdf" },
    { vehiculo: "Toyota RAV4 · ABC-123-D", documento: "Tenencia", folio: "TEN-2026-8841", fecha: "2026-03-18", vencimiento: "2027-03-31", estado: "Vigente", archivo: "tenencia-2026.pdf" },
    { vehiculo: "Nissan Versa · XYZ-987-A", documento: "Seguro", folio: "POL-998721", fecha: "2025-05-20", vencimiento: "2026-05-20", estado: "Vencido", archivo: "poliza-versa.pdf" },
    { vehiculo: "Nissan Versa · XYZ-987-A", documento: "Verificación", folio: "VER-260184", fecha: "2026-01-30", vencimiento: "2026-07-30", estado: "Próximo a vencer", archivo: "Sin archivo" },
    { vehiculo: "Toyota RAV4 · ABC-123-D", documento: "Placas", folio: "ABC-123-D", fecha: "2026-01-31", vencimiento: "2027-01-31", estado: "Vigente", archivo: "placas-rav4.pdf" }
];

let documentoActivo = "factura";

// Inicializa exclusivamente /Vehiculos/Documentos y deja intactas las demás pantallas.
function inicializarDocumentosVehiculo() {
    const form = document.getElementById("documentosVehiculoForm");
    if (!form) return;

    cargarCatalogosDocumentosSimulados();
    inicializarTabsDocumentos();
    inicializarCargasDocumentos();
    actualizarResumenDocumentos();
    renderizarDocumentosRecientes();

    const vehiculo = document.getElementById("documentos-idVehDatosGenerales");
    vehiculo?.addEventListener("change", () => {
        actualizarMiniCardDocumentos();
        limpiarErrorCampo(vehiculo);
        actualizarResumenDocumentos();
        actualizarVistaPreviaDocumento();
    });

    form.querySelectorAll(".documento-panel input:not([type='file']):not([type='hidden']), .documento-panel select").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            limpiarErrorCampo(campo);
            actualizarVistaPreviaDocumento();
        }));
        campo.addEventListener("blur", () => {
            if (campo.required || campo.value) validarCampoDocumento(campo);
        });
    });

    document.getElementById("btnLimpiarDocumento")?.addEventListener("click", limpiarDocumentoActivo);
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarDocumentoActivo()) {
            Swal.fire({ icon: "warning", title: "Formulario incompleto", text: "Revisa los campos marcados antes de guardar.", confirmButtonColor: "var(--teal-cavex)" });
            return;
        }

        // TODO backend: enviar el tab activo a su POST específico después de subir sus archivos.
        Swal.fire({ icon: "success", title: "Documento validado correctamente", text: "Esta captura aún no se guarda en base de datos.", confirmButtonColor: "var(--teal-cavex)" });
    });

    actualizarVistaPreviaDocumento();
}

// Llena el selector global, los catálogos y los límites dinámicos de año.
function cargarCatalogosDocumentosSimulados() {
    const vehiculoSelect = document.getElementById("documentos-idVehDatosGenerales");
    if (vehiculoSelect) {
        vehiculoSelect.innerHTML = '<option value="">Seleccionar...</option>';
        documentosVehiculosSimulados.forEach(vehiculo => {
            const option = document.createElement("option");
            option.value = String(vehiculo.id);
            option.textContent = `${vehiculo.strPlaca} · ${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}`;
            vehiculoSelect.appendChild(option);
        });
    }

    document.querySelectorAll(".documento-catalogo").forEach(select => {
        const catalogo = documentosCatalogosSimulados[select.dataset.catalogo] || [];
        select.innerHTML = '<option value="">Seleccionar...</option>';
        catalogo.forEach(registro => {
            const option = document.createElement("option");
            option.value = String(registro.id);
            option.textContent = registro.strValor;
            option.title = registro.strDescripcion;
            select.appendChild(option);
        });
    });

    const anioMaximo = new Date().getFullYear() + 1;
    document.querySelectorAll(".documento-anio").forEach(campo => {
        campo.max = String(anioMaximo);
        campo.placeholder = String(new Date().getFullYear());
    });
}

// Cambia panel, estado accesible y vista previa sin validar tabs ocultos.
function inicializarTabsDocumentos() {
    document.querySelectorAll("[data-documento-tab]").forEach(button => {
        button.addEventListener("click", () => activarTabDocumento(button.dataset.documentoTab));
    });
    // Solo el panel activo conserva controles habilitados y serializables.
    activarTabDocumento(documentoActivo);
}

// Activa un tab documental, oculta los demás paneles y actualiza resumen y preview sin validar contenido oculto.
function activarTabDocumento(key) {
    documentoActivo = key;
    document.querySelectorAll("[data-documento-tab]").forEach(button => {
        const activo = button.dataset.documentoTab === key;
        button.classList.toggle("active", activo);
        button.setAttribute("aria-selected", String(activo));
    });
    document.querySelectorAll("[data-documento-panel]").forEach(panel => {
        const activo = panel.dataset.documentoPanel === key;
        panel.hidden = !activo;
        panel.classList.toggle("active", activo);
        panel.querySelectorAll("input, select, textarea").forEach(campo => {
            campo.disabled = !activo;
        });
    });
    actualizarVistaPreviaDocumento();
}

// Conecta todos los componentes reutilizables de PDF/imagen.
function inicializarCargasDocumentos() {
    document.querySelectorAll("[data-documento-upload]").forEach(area => {
        const input = area.querySelector(".documento-file-input");
        if (!input) return;
        area.addEventListener("click", event => {
            if (!event.target.closest("button")) input.click();
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
            const archivo = event.dataTransfer.files?.[0];
            if (archivo) procesarArchivoDocumento(area, archivo);
        });
        input.addEventListener("change", () => {
            const archivo = input.files?.[0];
            if (archivo) procesarArchivoDocumento(area, archivo);
        });
        area.querySelector(".documento-remove-file")?.addEventListener("click", event => {
            event.stopPropagation();
            limpiarCargaDocumento(area);
            actualizarVistaPreviaDocumento();
        });
    });
}

// Valida extensión, MIME y 5 MB; no genera una URL persistente.
function procesarArchivoDocumento(area, archivo) {
    const extensiones = [".pdf", ".jpg", ".jpeg", ".png", ".webp"];
    const tipos = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    const extensionValida = extensiones.some(extension => archivo.name.toLowerCase().endsWith(extension));
    limpiarErrorCargaDocumento(area);

    if (!extensionValida || !tipos.includes(archivo.type)) {
        limpiarCargaDocumento(area);
        mostrarErrorCargaDocumento(area, "Solo se permiten archivos PDF o imágenes.");
        return;
    }
    if (archivo.size > 5 * 1024 * 1024) {
        limpiarCargaDocumento(area);
        mostrarErrorCargaDocumento(area, "El archivo no debe superar 5 MB.");
        return;
    }

    const input = area.querySelector(".documento-file-input");
    if (input && window.DataTransfer) {
        const transferencia = new DataTransfer();
        transferencia.items.add(archivo);
        input.files = transferencia.files;
    }
    area.dataset.fileName = archivo.name;
    area.dataset.fileType = archivo.type === "application/pdf" ? "PDF" : "Imagen";
    area.querySelector(".documento-upload-prompt").hidden = true;
    area.querySelector(".documento-upload-file").hidden = false;
    area.querySelector(".documento-file-name").textContent = archivo.name;
    area.querySelector(".documento-file-type").textContent = area.dataset.fileType;

    // El backend futuro subirá el archivo y asignará la ruta al hidden strUrl... asociado.
    actualizarVistaPreviaDocumento();
}

// Restablece controles y estado visual de /Vehiculos/Documentos sin modificar sus datos simulados de consulta.
function limpiarCargaDocumento(area) {
    const input = area.querySelector(".documento-file-input");
    const hidden = document.getElementById(area.dataset.urlId);
    if (input) input.value = "";
    if (hidden) hidden.value = "";
    delete area.dataset.fileName;
    delete area.dataset.fileType;
    const prompt = area.querySelector(".documento-upload-prompt");
    const file = area.querySelector(".documento-upload-file");
    if (prompt) prompt.hidden = false;
    if (file) file.hidden = true;
    limpiarErrorCargaDocumento(area);
}

// Expone el mensaje y estado visual de error del componente correspondiente en /Vehiculos/Documentos.
function mostrarErrorCargaDocumento(area, mensaje) {
    area.classList.add("is-invalid");
    const error = area.nextElementSibling;
    if (error?.classList.contains("documento-upload-error")) {
        error.textContent = mensaje;
        error.classList.add("d-block");
    }
}

// Retira el estado visual de error del componente correspondiente en /Vehiculos/Documentos.
function limpiarErrorCargaDocumento(area) {
    area.classList.remove("is-invalid");
    const error = area.nextElementSibling;
    if (error?.classList.contains("documento-upload-error")) {
        error.textContent = "";
        error.classList.remove("d-block");
    }
}

// Valida vehículo, campos y cargas únicamente dentro del panel visible.
function validarDocumentoActivo() {
    const vehiculo = document.getElementById("documentos-idVehDatosGenerales");
    const panel = obtenerPanelDocumentoActivo();
    let valido = validarCampoDocumento(vehiculo);
    if (!panel) return false;

    panel.querySelectorAll("input:not([type='file']):not([type='hidden']), select").forEach(campo => {
        if (!validarCampoDocumento(campo)) valido = false;
    });
    panel.querySelectorAll("[data-documento-upload]").forEach(area => {
        if (area.classList.contains("is-invalid")) valido = false;
        if (area.dataset.requiredUpload === "true" && !area.dataset.fileName) {
            mostrarErrorCargaDocumento(area, "Selecciona el archivo del documento.");
            valido = false;
        }
    });
    if (!validarFechasDocumento(panel)) valido = false;

    const primerError = document.querySelector("#documentosVehiculoForm .is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

// Evalúa un control individual de /Vehiculos/Documentos y aplica las clases Bootstrap de validación.
function validarCampoDocumento(campo) {
    if (!campo) return false;
    const valor = String(campo.value || "").trim();
    let mensaje = "";
    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción válida." : "Este campo es obligatorio.";
    }

    if (!mensaje && campo.id === "documentos-idVehDatosGenerales" && valor && !documentosVehiculosSimulados.some(item => item.id === Number(valor))) {
        mensaje = "Selecciona un vehículo.";
    }
    if (!mensaje && campo.classList.contains("documento-catalogo") && valor) {
        const catalogo = documentosCatalogosSimulados[campo.dataset.catalogo] || [];
        if (!catalogo.some(item => item.id === Number(valor))) mensaje = "Selecciona una opción válida.";
    }
    if (!mensaje && campo.type === "number" && valor) {
        const numero = Number(valor);
        if (!Number.isFinite(numero)) {
            mensaje = "Captura un número válido.";
        } else if (campo.name.startsWith("mny") && (numero < 0 || numero > 999999)) {
            mensaje = "El monto debe estar entre $0.00 y $999,999.00.";
        } else if (numero < 0) {
            mensaje = "Captura un número mayor o igual a cero.";
        }
        if (!mensaje && campo.name === "intAnio" && (!Number.isInteger(numero) || numero < 1990 || numero > new Date().getFullYear() + 1)) {
            mensaje = `El año debe estar entre 1990 y ${new Date().getFullYear() + 1}.`;
        }
    }
    if (!mensaje && campo.maxLength > 0 && valor.length > campo.maxLength) {
        mensaje = `El texto no debe superar ${campo.maxLength} caracteres.`;
    }

    if (mensaje) {
        mostrarErrorCampo(campo, mensaje);
        return false;
    }
    limpiarErrorCampo(campo);
    if (campo.required) campo.classList.add("is-valid");
    return true;
}

// Compara el par inicio/fin del tab usando fechas locales, sin desplazamientos UTC.
function validarFechasDocumento(panel = obtenerPanelDocumentoActivo()) {
    if (!panel) return false;
    const inicio = panel.querySelector("[data-fecha-inicio]");
    const fin = panel.querySelector("[data-fecha-fin]");
    if (!inicio || !fin || !inicio.value || !fin.value) return true;
    const fechaInicio = crearFechaLocalServicio(inicio.value);
    const fechaFin = crearFechaLocalServicio(fin.value);
    if (!fechaInicio || !fechaFin || fechaFin < fechaInicio) {
        const inicioLabel = inicio.name === "dteFechaPago" ? "pago" : inicio.name === "dteFechaInicio" ? "inicio" : inicio.name === "dteFechaAsignacion" ? "asignación" : inicio.name === "dteFechaRevista" ? "revista" : "expedición";
        mostrarErrorCampo(fin, `La fecha de vencimiento no puede ser anterior a la fecha de ${inicioLabel}.`);
        return false;
    }
    return true;
}

// Dibuja las nueve cards y permite abrir el tab correspondiente.
function actualizarResumenDocumentos() {
    const grid = document.getElementById("documentosResumenGrid");
    if (!grid) return;
    const hayVehiculo = Boolean(document.getElementById("documentos-idVehDatosGenerales")?.value);
    grid.innerHTML = documentosResumenSimulado.map(documento => {
        const estado = hayVehiculo ? documento.estado : "Sin capturar";
        const vencimiento = hayVehiculo && documento.vencimiento ? formatearFechaServicio(documento.vencimiento) : "Sin fecha";
        return `<button type="button" class="documento-resumen-card" data-resumen-tab="${documento.key}">
            <span class="documento-resumen-name">${escapeHtml(documento.nombre)}</span>
            <strong class="documento-status ${claseEstadoDocumento(estado)}">${escapeHtml(estado)}</strong>
            <small>${escapeHtml(vencimiento)}</small>
        </button>`;
    }).join("");
    grid.querySelectorAll("[data-resumen-tab]").forEach(button => button.addEventListener("click", () => {
        activarTabDocumento(button.dataset.resumenTab);
        document.querySelector(".documentos-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
}

// Resume campos equivalentes de tablas distintas sin exponer sus ids de catálogo.
function actualizarVistaPreviaDocumento() {
    const panel = obtenerPanelDocumentoActivo();
    if (!panel) return;
    const vehiculo = obtenerVehiculoDocumentosSeleccionado();
    const label = panel.dataset.documentoLabel || "Documento";
    const buscarValor = nombres => {
        for (const nombre of nombres) {
            const campo = panel.querySelector(`[name="${nombre}"]`);
            if (campo?.value) return campo.value;
        }
        return "";
    };
    const folio = buscarValor(["strNumeroTarjeta", "strFolioPago", "strFolioVerificacion", "strNumeroPoliza", "strNumeroPermiso", "strFolioRevista", "strNumeroContrato", "strNumPlaca"]);
    const fecha = buscarValor(["dteFechaExpedicion", "dteFechaPago", "dteFechaVerificacion", "dteFechaInicio", "dteFechaRevista", "dteFechaAsignacion"]);
    const vencimiento = buscarValor(["dteFechaVencimiento", "dteFechaFin", "dteProximaRevista"]);
    const monto = buscarValor(["mnyMontoPagado"]);
    const statusSelect = panel.querySelector('[name="idVehCatStatus"]');
    const status = statusSelect?.selectedOptions?.[0]?.value ? statusSelect.selectedOptions[0].textContent.trim() : inferirEstadoDocumento(panel);
    const archivo = Array.from(panel.querySelectorAll("[data-documento-upload]")).find(area => area.dataset.fileName)?.dataset.fileName || "Sin archivo";

    setText("previewDocumentoTipo", label);
    setText("previewDocumentoActivo", label);
    setText("previewDocumentoVehiculo", vehiculo ? `${vehiculo.marca} ${vehiculo.strModelo} · ${vehiculo.strPlaca}` : "Sin seleccionar");
    setText("previewDocumentoFolio", folio || (documentoActivo === "factura" ? "No aplica" : "No capturado"));
    setText("previewDocumentoFecha", formatearFechaServicio(fecha) || "No capturada");
    setText("previewDocumentoVencimiento", formatearFechaServicio(vencimiento) || "No aplica");
    setText("previewDocumentoMonto", formatearMonedaServicio(Number(monto || 0)));
    setText("previewDocumentoStatus", status);
    setText("previewDocumentoArchivo", archivo);
    const badge = document.getElementById("previewDocumentoStatus");
    if (badge) badge.className = `documento-status ${claseEstadoDocumento(status)}`;
}

// Limpia controles, estados y archivos solo dentro del panel activo.
function limpiarDocumentoActivo() {
    const panel = obtenerPanelDocumentoActivo();
    if (!panel) return;
    panel.querySelectorAll("input:not([type='file']), select").forEach(campo => {
        campo.value = "";
        limpiarErrorCampo(campo);
    });
    panel.querySelectorAll("[data-documento-upload]").forEach(limpiarCargaDocumento);
    actualizarVistaPreviaDocumento();
}

// Tabla simulada con badges y acciones todavía informativas.
function renderizarDocumentosRecientes() {
    const body = document.getElementById("documentosRecientesBody");
    if (!body) return;
    body.innerHTML = documentosRecientesSimulados.map(documento => `
        <tr>
            <td class="font-weight-700">${escapeHtml(documento.vehiculo)}</td>
            <td>${escapeHtml(documento.documento)}</td>
            <td>${escapeHtml(documento.folio)}</td>
            <td>${escapeHtml(formatearFechaServicio(documento.fecha))}</td>
            <td>${escapeHtml(formatearFechaServicio(documento.vencimiento))}</td>
            <td><span class="documento-status ${claseEstadoDocumento(documento.estado)}">${escapeHtml(documento.estado)}</span></td>
            <td>${documento.archivo === "Sin archivo" ? '<span class="text-muted">Sin archivo</span>' : `<span class="documento-file-link">${escapeHtml(documento.archivo)}</span>`}</td>
            <td class="text-end"><button type="button" class="btn-action-trigger btn-sm" onclick="mostrarAlertaDocumentoDemo()">Acciones</button></td>
        </tr>`).join("");
}

// Muestra una confirmación informativa para una acción todavía no conectada al backend de /Vehiculos/Documentos.
function mostrarAlertaDocumentoDemo() {
    Swal.fire({ icon: "info", title: "Acción simulada", text: "El archivo y detalle se conectarán cuando exista el backend documental.", confirmButtonColor: "var(--teal-cavex)" });
}

// Sincroniza datos calculados o elementos dependientes dentro de /Vehiculos/Documentos.
function actualizarMiniCardDocumentos() {
    const vehiculo = obtenerVehiculoDocumentosSeleccionado();
    const card = document.getElementById("documentosVehiculoCard");
    if (card) card.hidden = !vehiculo;
    if (!vehiculo) return;
    setText("documentosVehiculoPlaca", vehiculo.strPlaca);
    setText("documentosVehiculoMarca", vehiculo.marca);
    setText("documentosVehiculoModelo", vehiculo.strModelo);
    setText("documentosVehiculoAnio", String(vehiculo.intAnio));
}

// Localiza el registro o elemento activo utilizado por /Vehiculos/Documentos sin modificarlo.
function obtenerVehiculoDocumentosSeleccionado() {
    const id = Number(document.getElementById("documentos-idVehDatosGenerales")?.value);
    return documentosVehiculosSimulados.find(vehiculo => vehiculo.id === id) || null;
}

// Localiza el registro o elemento activo utilizado por /Vehiculos/Documentos sin modificarlo.
function obtenerPanelDocumentoActivo() {
    return document.querySelector(`[data-documento-panel="${documentoActivo}"]`);
}

// Infiere el estado visual del documento activo según la presencia de datos o archivos locales.
function inferirEstadoDocumento(panel) {
    const tieneDatos = Array.from(panel.querySelectorAll("input:not([type='file']):not([type='hidden']), select")).some(campo => Boolean(campo.value))
        || Boolean(panel.querySelector("[data-documento-upload][data-file-name]"));
    return tieneDatos ? "Vigente" : "Sin capturar";
}

// Traduce un estatus de /Vehiculos/Documentos a la clase visual correspondiente sin alterar el valor original.
function claseEstadoDocumento(estado) {
    if (estado === "Vigente") return "documento-status-valid";
    if (estado === "Próximo a vencer") return "documento-status-warning";
    if (estado === "Vencido") return "documento-status-danger";
    return "documento-status-empty";
}

/*
 * Endpoints futuros por tab:
 * POST /api/vehiculos/documentos/factura
 * POST /api/vehiculos/documentos/tarjeta-circulacion
 * POST /api/vehiculos/documentos/tenencia
 * POST /api/vehiculos/documentos/verificacion
 * POST /api/vehiculos/documentos/seguro
 * POST /api/vehiculos/documentos/permiso-transporte
 * POST /api/vehiculos/documentos/revista-vehicular
 * POST /api/vehiculos/documentos/contrato-arrendamiento
 * POST /api/vehiculos/documentos/placas
 */

// Proyecciones simuladas de las dos FK principales de dbo.VehInfracciones.
// TODO backend: reemplazar por GET /api/vehiculos y GET /api/empleados.
const infraccionesVehiculosSimulados = [
    { id: 1, strPlaca: "ABC-123-D", marca: "Toyota", strModelo: "RAV4", intAnio: 2021 },
    { id: 2, strPlaca: "XYZ-987-A", marca: "Nissan", strModelo: "Versa", intAnio: 2020 }
];

const infraccionesEmpleadosSimulados = [
    { id: 1, nombreCompleto: "Juan Pérez López", area: "Operaciones" },
    { id: 2, nombreCompleto: "Carlos Hernández Ruiz", area: "Mantenimiento" }
];

// Catálogos simulados con la estructura id, strValor y strDescripcion.
// TODO backend: GET /api/vehiculos/catalogos/status y GET /api/vehiculos/catalogos/formas-pago.
const infraccionesCatalogosSimulados = {
    status: [
        { id: 1, strValor: "Pendiente", strDescripcion: "Infracción pendiente de pago" },
        { id: 2, strValor: "Pagada", strDescripcion: "Infracción pagada" },
        { id: 3, strValor: "Cancelada", strDescripcion: "Infracción cancelada" },
        { id: 4, strValor: "En revisión", strDescripcion: "Infracción en proceso de revisión" }
    ],
    formasPago: [
        { id: 1, strValor: "Efectivo", strDescripcion: "Pago en efectivo" },
        { id: 2, strValor: "Transferencia", strDescripcion: "Transferencia bancaria" },
        { id: 3, strValor: "Tarjeta", strDescripcion: "Pago con tarjeta" },
        { id: 4, strValor: "Crédito", strDescripcion: "Pago a crédito" },
        { id: 5, strValor: "Otro", strDescripcion: "Otra forma de pago" }
    ]
};

// Registros de muestra con nombres compatibles con VehInfracciones y textos de FK resueltos.
// TODO backend: GET /api/vehiculos/infracciones/{idVehDatosGenerales}.
const infraccionesRecientesSimuladas = [
    { id: 1, vehiculo: "Toyota RAV4", strPlaca: "ABC-123-D", empleado: "Juan Pérez López", dteFechaInfraccion: "2026-06-18", strMotivo: "Exceso de velocidad", mnyMontoPagado: null, status: "Pendiente", dteFechaPago: null, comprobante: null },
    { id: 2, vehiculo: "Nissan Versa", strPlaca: "XYZ-987-A", empleado: "Carlos Hernández Ruiz", dteFechaInfraccion: "2026-05-22", strMotivo: "Estacionamiento en zona restringida", mnyMontoPagado: 1245, status: "Pagada", dteFechaPago: "2026-05-27", comprobante: "multa-versa.pdf" },
    { id: 3, vehiculo: "Toyota RAV4", strPlaca: "ABC-123-D", empleado: "Juan Pérez López", dteFechaInfraccion: "2026-04-10", strMotivo: "Falta administrativa en revisión", mnyMontoPagado: null, status: "En revisión", dteFechaPago: null, comprobante: null },
    { id: 4, vehiculo: "Nissan Versa", strPlaca: "XYZ-987-A", empleado: "Carlos Hernández Ruiz", dteFechaInfraccion: "2026-02-03", strMotivo: "Boleta emitida por error", mnyMontoPagado: null, status: "Cancelada", dteFechaPago: null, comprobante: null }
];

let infraccionComprobanteSeleccionado = null;

// Inicializa únicamente /Vehiculos/Infracciones y conserva aisladas las demás pantallas.
function inicializarInfraccionesVehiculo() {
    const form = document.getElementById("infraccionVehiculoForm");
    if (!form) return;

    cargarCatalogosInfraccionesSimulados();
    inicializarFechaInfraccion();
    inicializarComprobanteInfraccion();
    inicializarContadoresInfraccion();
    renderizarInfraccionesRecientes();

    const status = document.getElementById("infraccion-idVehCatStatus");
    status?.addEventListener("change", actualizarCamposPagoInfraccion);

    form.querySelectorAll("input:not([type='file']):not([type='hidden']), select, textarea").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            limpiarErrorCampo(campo);
            actualizarVistaPreviaInfraccion();
        }));
        campo.addEventListener("blur", () => {
            if (campo.tagName === "TEXTAREA") campo.value = campo.value.trim().replace(/\s{2,}/g, " ");
            if (campo.required || campo.value) validarCampoInfraccion(campo);
        });
    });

    document.getElementById("btnLimpiarInfraccion")?.addEventListener("click", () => limpiarFormularioInfraccion(form));
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioInfraccion(form)) {
            Swal.fire({ icon: "warning", title: "Formulario incompleto", text: "Revisa los campos marcados antes de guardar.", confirmButtonColor: "var(--teal-cavex)" });
            return;
        }

        // TODO backend: subir comprobante, asignar strUrlComprobantePago y enviar POST /api/vehiculos/infracciones.
        Swal.fire({ icon: "success", title: "Infracción validada correctamente", text: "Esta captura aún no se guarda en base de datos.", confirmButtonColor: "var(--teal-cavex)" });
    });

    actualizarCamposPagoInfraccion();
    actualizarVistaPreviaInfraccion();
}

// Llena selects usando ids reales como value y restaura Pendiente por defecto.
function cargarCatalogosInfraccionesSimulados() {
    const vehiculos = document.getElementById("infraccion-idVehDatosGenerales");
    if (vehiculos) {
        vehiculos.innerHTML = '<option value="">Seleccionar...</option>';
        infraccionesVehiculosSimulados.forEach(vehiculo => {
            const option = document.createElement("option");
            option.value = String(vehiculo.id);
            option.textContent = `${vehiculo.strPlaca} · ${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}`;
            vehiculos.appendChild(option);
        });
    }

    const empleados = document.getElementById("infraccion-idEmpEmpleado");
    if (empleados) {
        empleados.innerHTML = '<option value="">Seleccionar...</option>';
        infraccionesEmpleadosSimulados.forEach(empleado => {
            const option = document.createElement("option");
            option.value = String(empleado.id);
            option.textContent = `${empleado.nombreCompleto} · ${empleado.area}`;
            empleados.appendChild(option);
        });
    }

    llenarSelectInfraccion("infraccion-idVehCatStatus", infraccionesCatalogosSimulados.status);
    llenarSelectInfraccion("infraccion-idVehFormaPago", infraccionesCatalogosSimulados.formasPago);
    const status = document.getElementById("infraccion-idVehCatStatus");
    if (status) status.value = "1";
}

// Puebla selects de /Vehiculos/Infracciones con datos simulados; un catálogo del backend sustituirá esta fuente.
function llenarSelectInfraccion(id, registros) {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value="">Seleccionar...</option>';
    registros.forEach(registro => {
        const option = document.createElement("option");
        option.value = String(registro.id);
        option.textContent = registro.strValor;
        option.title = registro.strDescripcion;
        select.appendChild(option);
    });
}

// Usa fecha local y permite como máximo el día siguiente.
function inicializarFechaInfraccion() {
    const campo = document.getElementById("infraccion-dteFechaInfraccion");
    if (!campo) return;
    const hoy = new Date();
    const local = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000);
    const manana = new Date(local);
    manana.setDate(manana.getDate() + 1);
    campo.value = local.toISOString().split("T")[0];
    campo.max = manana.toISOString().split("T")[0];
}

// Mantiene separados los límites varchar(500) de motivo y observaciones.
function inicializarContadoresInfraccion() {
    [
        { campo: "infraccion-strMotivo", contador: "infraccionMotivoCounter" },
        { campo: "infraccion-strObservaciones", contador: "infraccionObservacionesCounter" }
    ].forEach(config => {
        const campo = document.getElementById(config.campo);
        const contador = document.getElementById(config.contador);
        if (!campo || !contador) return;
        const actualizar = () => {
            contador.textContent = String(campo.value.length);
            contador.parentElement?.classList.toggle("is-near-limit", campo.value.length >= 450);
        };
        campo.addEventListener("input", actualizar);
        actualizar();
    });
}

// Configura drag & drop; el archivo permanece local hasta implementar la carga real.
function inicializarComprobanteInfraccion() {
    const area = document.getElementById("infraccionComprobanteArea");
    const input = document.getElementById("infraccionComprobanteArchivo");
    if (!area || !input) return;

    area.addEventListener("click", event => {
        if (!event.target.closest("button")) input.click();
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
        const archivo = event.dataTransfer.files?.[0];
        if (archivo) procesarComprobanteInfraccion(archivo);
    });
    input.addEventListener("change", () => {
        const archivo = input.files?.[0];
        if (archivo) procesarComprobanteInfraccion(archivo);
    });
    document.getElementById("btnQuitarComprobanteInfraccion")?.addEventListener("click", event => {
        event.stopPropagation();
        limpiarComprobanteInfraccion();
        actualizarVistaPreviaInfraccion();
    });
}

// Valida extensión, MIME y límite de 5 MB antes de mostrar el archivo.
function procesarComprobanteInfraccion(archivo) {
    const extensiones = [".pdf", ".jpg", ".jpeg", ".png", ".webp"];
    const tipos = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    const extensionValida = extensiones.some(extension => archivo.name.toLowerCase().endsWith(extension));
    limpiarErrorComprobanteInfraccion();

    if (!extensionValida || !tipos.includes(archivo.type)) {
        limpiarComprobanteInfraccion();
        mostrarErrorComprobanteInfraccion("Solo se permiten archivos PDF o imágenes.");
        return;
    }
    if (archivo.size > 5 * 1024 * 1024) {
        limpiarComprobanteInfraccion();
        mostrarErrorComprobanteInfraccion("El archivo no debe superar 5 MB.");
        return;
    }

    const input = document.getElementById("infraccionComprobanteArchivo");
    if (input && window.DataTransfer) {
        const transferencia = new DataTransfer();
        transferencia.items.add(archivo);
        input.files = transferencia.files;
    }
    infraccionComprobanteSeleccionado = { nombre: archivo.name, tipo: archivo.type === "application/pdf" ? "PDF" : "Imagen" };
    document.getElementById("infraccionComprobantePrompt").hidden = true;
    document.getElementById("infraccionComprobanteSeleccionado").hidden = false;
    setText("infraccionComprobanteNombre", archivo.name);
    setText("infraccionComprobanteTipo", infraccionComprobanteSeleccionado.tipo);

    // El backend futuro generará la ruta persistente para strUrlComprobantePago.
    actualizarVistaPreviaInfraccion();
}

// Restablece controles y estado visual de /Vehiculos/Infracciones sin modificar sus datos simulados de consulta.
function limpiarComprobanteInfraccion() {
    infraccionComprobanteSeleccionado = null;
    const input = document.getElementById("infraccionComprobanteArchivo");
    const ruta = document.getElementById("infraccion-strUrlComprobantePago");
    if (input) input.value = "";
    if (ruta) ruta.value = "";
    const prompt = document.getElementById("infraccionComprobantePrompt");
    const seleccionado = document.getElementById("infraccionComprobanteSeleccionado");
    if (prompt) prompt.hidden = false;
    if (seleccionado) seleccionado.hidden = true;
    limpiarErrorComprobanteInfraccion();
}

// Expone el mensaje y estado visual de error del componente correspondiente en /Vehiculos/Infracciones.
function mostrarErrorComprobanteInfraccion(mensaje) {
    document.getElementById("infraccionComprobanteArea")?.classList.add("is-invalid");
    const error = document.getElementById("infraccionComprobanteArchivoError");
    if (error) {
        error.textContent = mensaje;
        error.classList.add("d-block");
    }
}

// Retira el estado visual de error del componente correspondiente en /Vehiculos/Infracciones.
function limpiarErrorComprobanteInfraccion() {
    document.getElementById("infraccionComprobanteArea")?.classList.remove("is-invalid");
    const error = document.getElementById("infraccionComprobanteArchivoError");
    if (error) {
        error.textContent = "";
        error.classList.remove("d-block");
    }
}

// Cambia required y el tratamiento visual del bloque según el estatus Pagada.
function actualizarCamposPagoInfraccion() {
    const pagada = document.getElementById("infraccion-idVehCatStatus")?.value === "2";
    ["infraccion-mnyMontoPagado", "infraccion-dteFechaPago", "infraccion-idVehFormaPago"].forEach(id => {
        const campo = document.getElementById(id);
        if (!campo) return;
        campo.required = pagada;
        campo.disabled = !pagada;
        if (!pagada) {
            campo.value = "";
            limpiarErrorCampo(campo);
        }
    });

    document.getElementById("infraccionPagoCard")?.classList.toggle("is-required", pagada);
    setText("infraccionPagoRequirement", pagada ? "Obligatorio" : "Opcional");
    document.querySelectorAll(".infraccion-payment-optional").forEach(label => {
        label.textContent = pagada ? "Obligatorio" : "Opcional";
    });
    actualizarVistaPreviaInfraccion();
}

// Aplica reglas NOT NULL, reglas NULL y obligatoriedad condicional de pago.
function validarFormularioInfraccion(form) {
    const ids = [
        "infraccion-idVehDatosGenerales", "infraccion-idEmpEmpleado",
        "infraccion-dteFechaInfraccion", "infraccion-strMotivo",
        "infraccion-idVehCatStatus", "infraccion-mnyMontoPagado",
        "infraccion-dteFechaPago", "infraccion-idVehFormaPago",
        "infraccion-strObservaciones"
    ];
    let valido = true;
    ids.forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoInfraccion(campo)) valido = false;
    });
    if (document.getElementById("infraccionComprobanteArea")?.classList.contains("is-invalid")) valido = false;

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

// Evalúa un control individual de /Vehiculos/Infracciones y aplica las clases Bootstrap de validación.
function validarCampoInfraccion(campo) {
    const valor = String(campo.value || "").trim();
    let mensaje = "";
    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción válida." : "Este campo es obligatorio.";
    }

    if (!mensaje) {
        switch (campo.id) {
            case "infraccion-idVehDatosGenerales":
                if (valor && !infraccionesVehiculosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un vehículo.";
                break;
            case "infraccion-idEmpEmpleado":
                if (valor && !infraccionesEmpleadosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un empleado.";
                break;
            case "infraccion-idVehCatStatus":
                if (valor && !infraccionesCatalogosSimulados.status.some(item => item.id === Number(valor))) mensaje = "Selecciona un estatus válido.";
                break;
            case "infraccion-idVehFormaPago":
                if (valor && !infraccionesCatalogosSimulados.formasPago.some(item => item.id === Number(valor))) mensaje = "Selecciona una forma de pago válida.";
                break;
            case "infraccion-dteFechaInfraccion": {
                const fecha = crearFechaLocalServicio(valor);
                const limite = new Date();
                limite.setHours(0, 0, 0, 0);
                limite.setDate(limite.getDate() + 1);
                if (valor && (!fecha || fecha > limite)) mensaje = "La fecha de infracción no puede ser posterior al día de mañana.";
                break;
            }
            case "infraccion-strMotivo":
                if (campo.value.length > 500) mensaje = "El motivo no debe superar 500 caracteres.";
                break;
            case "infraccion-mnyMontoPagado": {
                const numero = Number(valor);
                if (valor && (!Number.isFinite(numero) || numero < 0 || numero > 999999)) mensaje = "El monto debe estar entre $0.00 y $999,999.00.";
                break;
            }
            case "infraccion-dteFechaPago": {
                const pago = crearFechaLocalServicio(valor);
                const infraccion = crearFechaLocalServicio(document.getElementById("infraccion-dteFechaInfraccion")?.value);
                if (valor && (!pago || !infraccion || pago < infraccion)) mensaje = "La fecha de pago no puede ser anterior a la fecha de infracción.";
                break;
            }
            case "infraccion-strObservaciones":
                if (campo.value.length > 500) mensaje = "Las observaciones no deben superar 500 caracteres.";
                break;
        }
    }

    if (mensaje) {
        mostrarErrorCampo(campo, mensaje);
        return false;
    }
    limpiarErrorCampo(campo);
    if (campo.required) campo.classList.add("is-valid");
    return true;
}

// Refleja en vivo textos de vehículo, empleado y catálogos.
function actualizarVistaPreviaInfraccion() {
    const vehiculoId = Number(document.getElementById("infraccion-idVehDatosGenerales")?.value);
    const empleadoId = Number(document.getElementById("infraccion-idEmpEmpleado")?.value);
    const vehiculo = infraccionesVehiculosSimulados.find(item => item.id === vehiculoId);
    const empleado = infraccionesEmpleadosSimulados.find(item => item.id === empleadoId);
    const textoSelect = id => {
        const option = document.getElementById(id)?.selectedOptions?.[0];
        return option?.value ? option.textContent.trim() : "";
    };
    const status = textoSelect("infraccion-idVehCatStatus") || "Pendiente";
    const pagada = status === "Pagada";
    const monto = Number(document.getElementById("infraccion-mnyMontoPagado")?.value || 0);

    setText("previewInfraccionVehiculo", vehiculo ? `${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}` : "Sin seleccionar");
    setText("previewInfraccionPlaca", vehiculo?.strPlaca || "—");
    setText("previewInfraccionEmpleado", empleado?.nombreCompleto || "Sin seleccionar");
    setText("previewInfraccionFecha", formatearFechaServicio(document.getElementById("infraccion-dteFechaInfraccion")?.value) || "—");
    setText("previewInfraccionMotivo", document.getElementById("infraccion-strMotivo")?.value.trim() || "Sin capturar");
    setText("previewInfraccionStatus", status);
    setText("previewInfraccionMonto", pagada && Number.isFinite(monto) ? formatearMonedaServicio(monto) : "No aplica");
    setText("previewInfraccionFechaPago", pagada ? (formatearFechaServicio(document.getElementById("infraccion-dteFechaPago")?.value) || "No registrada") : "No aplica");
    setText("previewInfraccionFormaPago", pagada ? (textoSelect("infraccion-idVehFormaPago") || "Sin seleccionar") : "No aplica");
    setText("previewInfraccionComprobante", infraccionComprobanteSeleccionado?.nombre || "Sin archivo");

    const badge = document.getElementById("previewInfraccionStatus");
    if (badge) badge.className = `infraccion-status ${claseStatusInfraccion(status)}`;
}

// Restaura valores, Pendiente, fecha, archivo, errores, preview y contadores.
function limpiarFormularioInfraccion(form) {
    form.reset();
    cargarCatalogosInfraccionesSimulados();
    inicializarFechaInfraccion();
    limpiarComprobanteInfraccion();
    form.querySelectorAll(".is-invalid, .is-valid").forEach(campo => limpiarErrorCampo(campo));
    document.getElementById("infraccion-strMotivo")?.dispatchEvent(new Event("input"));
    document.getElementById("infraccion-strObservaciones")?.dispatchEvent(new Event("input"));
    actualizarCamposPagoInfraccion();
    actualizarVistaPreviaInfraccion();
}

// Renderiza consulta y menú de acciones totalmente simulados.
function renderizarInfraccionesRecientes() {
    const body = document.getElementById("infraccionesRecientesBody");
    if (!body) return;
    body.innerHTML = infraccionesRecientesSimuladas.map(infraccion => `
        <tr>
            <td class="font-weight-700">${escapeHtml(infraccion.vehiculo)}</td>
            <td>${escapeHtml(infraccion.strPlaca)}</td>
            <td>${escapeHtml(infraccion.empleado)}</td>
            <td>${escapeHtml(formatearFechaServicio(infraccion.dteFechaInfraccion))}</td>
            <td><span class="infraccion-table-motivo" title="${escapeHtml(infraccion.strMotivo)}">${escapeHtml(infraccion.strMotivo)}</span></td>
            <td>${infraccion.mnyMontoPagado === null ? "—" : formatearMonedaServicio(infraccion.mnyMontoPagado)}</td>
            <td><span class="infraccion-status ${claseStatusInfraccion(infraccion.status)}">${escapeHtml(infraccion.status)}</span></td>
            <td>${infraccion.dteFechaPago ? escapeHtml(formatearFechaServicio(infraccion.dteFechaPago)) : "—"}</td>
            <td>${infraccion.comprobante ? `<span class="documento-file-link">${escapeHtml(infraccion.comprobante)}</span>` : '<span class="text-muted">Sin archivo</span>'}</td>
            <td class="text-end">
                <div class="dropdown actions-dropdown d-inline-block">
                    <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false">Acciones</button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><button class="dropdown-item veh-table-action-primary" type="button" onclick="mostrarAccionInfraccionDemo('Ver')">Ver</button></li>
                        <li><button class="dropdown-item veh-table-action-secondary" type="button" onclick="mostrarAccionInfraccionDemo('Editar')">Editar</button></li>
                        <li><button class="dropdown-item veh-table-action-success" type="button" onclick="mostrarAccionInfraccionDemo('Marcar como pagada')">Marcar como pagada</button></li>
                        <li><button class="dropdown-item veh-table-action-danger" type="button" onclick="mostrarAccionInfraccionDemo('Cancelar')">Cancelar</button></li>
                    </ul>
                </div>
            </td>
        </tr>`).join("");
}

// Muestra una confirmación informativa para una acción todavía no conectada al backend de /Vehiculos/Infracciones.
function mostrarAccionInfraccionDemo(accion) {
    Swal.fire({ icon: "info", title: accion, text: "Esta acción se conectará cuando exista el backend de infracciones.", confirmButtonColor: "var(--teal-cavex)" });
}

// Traduce un estatus de /Vehiculos/Infracciones a la clase visual correspondiente sin alterar el valor original.
function claseStatusInfraccion(status) {
    if (status === "Pagada") return "infraccion-status-paid";
    if (status === "Cancelada") return "infraccion-status-cancelled";
    if (status === "En revisión") return "infraccion-status-review";
    return "infraccion-status-pending";
}

// Vehículos y empleados simulados con la proyección requerida por VehControlGasolina.
// TODO backend: reemplazar por GET /api/vehiculos y GET /api/empleados.
const gasolinaVehiculosSimulados = [
    { id: 1, strPlaca: "ABC-123-D", marca: "Toyota", strModelo: "RAV4", intAnio: 2021, decKilometrajeActual: 45230 },
    { id: 2, strPlaca: "XYZ-987-A", marca: "Nissan", strModelo: "Versa", intAnio: 2020, decKilometrajeActual: 38600 }
];

const gasolinaEmpleadosSimulados = [
    { id: 1, nombreCompleto: "Juan Pérez López", area: "Operaciones" },
    { id: 2, nombreCompleto: "Carlos Hernández Ruiz", area: "Mantenimiento" }
];

// Catálogos con estructura id, strValor y strDescripcion.
// TODO backend: GET /api/vehiculos/catalogos/gasolineras y GET /api/vehiculos/catalogos/formas-pago.
const gasolinaCatalogosSimulados = {
    gasolineras: [
        { id: 1, strValor: "Pemex", strDescripcion: "Estación Pemex" },
        { id: 2, strValor: "BP", strDescripcion: "Estación BP" },
        { id: 3, strValor: "Shell", strDescripcion: "Estación Shell" },
        { id: 4, strValor: "Mobil", strDescripcion: "Estación Mobil" },
        { id: 5, strValor: "G500", strDescripcion: "Estación G500" },
        { id: 6, strValor: "Otra", strDescripcion: "Otra gasolinera" }
    ],
    formasPago: [
        { id: 1, strValor: "Efectivo", strDescripcion: "Pago en efectivo" },
        { id: 2, strValor: "Transferencia", strDescripcion: "Transferencia bancaria" },
        { id: 3, strValor: "Tarjeta", strDescripcion: "Pago con tarjeta" },
        { id: 4, strValor: "Crédito", strDescripcion: "Pago a crédito" },
        { id: 5, strValor: "Otro", strDescripcion: "Otra forma de pago" }
    ]
};

// Historial de muestra; litrosEstimados es una proyección visual, no una columna SQL.
// TODO backend: GET /api/vehiculos/gasolina/{idVehDatosGenerales}.
const gasolinaRecientesSimuladas = [
    { id: 1, vehiculo: "Toyota RAV4", strPlaca: "ABC-123-D", dteFechaCarga: "2026-06-24", decKilometrajeActual: 45230, gasolinera: "Pemex", mnyMontoPagado: 1250, mnyPrecioLitro: 24.49, formaPago: "Tarjeta", empleado: "Juan Pérez López", comprobante: "carga-rav4.pdf" },
    { id: 2, vehiculo: "Nissan Versa", strPlaca: "XYZ-987-A", dteFechaCarga: "2026-06-18", decKilometrajeActual: 38600, gasolinera: "BP", mnyMontoPagado: 980, mnyPrecioLitro: 23.85, formaPago: "Transferencia", empleado: "Carlos Hernández Ruiz", comprobante: null },
    { id: 3, vehiculo: "Toyota RAV4", strPlaca: "ABC-123-D", dteFechaCarga: "2026-06-08", decKilometrajeActual: 44710, gasolinera: "Shell", mnyMontoPagado: 1320, mnyPrecioLitro: 24.75, formaPago: "Crédito", empleado: "Juan Pérez López", comprobante: "ticket-shell.webp" },
    { id: 4, vehiculo: "Nissan Versa", strPlaca: "XYZ-987-A", dteFechaCarga: "2026-05-29", decKilometrajeActual: 37940, gasolinera: "Mobil", mnyMontoPagado: 875, mnyPrecioLitro: 23.65, formaPago: "Efectivo", empleado: "Carlos Hernández Ruiz", comprobante: null }
];

let gasolinaComprobanteSeleccionado = null;

// Inicializa solo /Vehiculos/Gasolina para no interferir con otras pantallas.
function inicializarGasolinaVehiculo() {
    const form = document.getElementById("gasolinaVehiculoForm");
    if (!form) return;

    cargarCatalogosGasolinaSimulados();
    inicializarFechaCargaGasolina();
    inicializarComprobanteGasolina();
    renderizarGasolinaReciente();

    document.getElementById("gasolina-idVehDatosGenerales")?.addEventListener("change", actualizarVehiculoGasolina);
    ["gasolina-mnyMontoPagado", "gasolina-mnyPrecioLitro"].forEach(id => {
        document.getElementById(id)?.addEventListener("input", () => {
            calcularLitrosEstimadosGasolina();
            actualizarVistaPreviaGasolina();
        });
    });

    form.querySelectorAll("input:not([type='file']):not([type='hidden']), select").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            limpiarErrorCampo(campo);
            actualizarVistaPreviaGasolina();
        }));
        campo.addEventListener("blur", () => {
            if (campo.required || campo.value) validarCampoGasolina(campo);
        });
    });

    document.getElementById("btnLimpiarGasolina")?.addEventListener("click", () => limpiarFormularioGasolina(form));
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioGasolina(form)) {
            Swal.fire({ icon: "warning", title: "Formulario incompleto", text: "Revisa los campos marcados antes de guardar.", confirmButtonColor: "var(--teal-cavex)" });
            return;
        }

        // TODO backend: subir comprobante, asignar strUrlComprobantePago y enviar POST /api/vehiculos/gasolina.
        Swal.fire({ icon: "success", title: "Carga de gasolina validada correctamente", text: "Esta captura aún no se guarda en base de datos.", confirmButtonColor: "var(--teal-cavex)" });
    });

    calcularLitrosEstimadosGasolina();
    actualizarVistaPreviaGasolina();
}

// Llena los cuatro selects usando el id como value.
function cargarCatalogosGasolinaSimulados() {
    const vehiculos = document.getElementById("gasolina-idVehDatosGenerales");
    if (vehiculos) {
        vehiculos.innerHTML = '<option value="">Seleccionar...</option>';
        gasolinaVehiculosSimulados.forEach(vehiculo => {
            const option = document.createElement("option");
            option.value = String(vehiculo.id);
            option.textContent = `${vehiculo.strPlaca} · ${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}`;
            vehiculos.appendChild(option);
        });
    }

    const empleados = document.getElementById("gasolina-idEmpEmpleado");
    if (empleados) {
        empleados.innerHTML = '<option value="">Seleccionar...</option>';
        gasolinaEmpleadosSimulados.forEach(empleado => {
            const option = document.createElement("option");
            option.value = String(empleado.id);
            option.textContent = `${empleado.nombreCompleto} · ${empleado.area}`;
            empleados.appendChild(option);
        });
    }
    llenarSelectGasolina("gasolina-idVehCatGasolineras", gasolinaCatalogosSimulados.gasolineras);
    llenarSelectGasolina("gasolina-idVehFormaPago", gasolinaCatalogosSimulados.formasPago);
}

// Puebla selects de /Vehiculos/Gasolina con datos simulados; un catálogo del backend sustituirá esta fuente.
function llenarSelectGasolina(id, registros) {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value="">Seleccionar...</option>';
    registros.forEach(registro => {
        const option = document.createElement("option");
        option.value = String(registro.id);
        option.textContent = registro.strValor;
        option.title = registro.strDescripcion;
        select.appendChild(option);
    });
}

// La fecha inicia hoy y admite como máximo el día siguiente.
function inicializarFechaCargaGasolina() {
    const campo = document.getElementById("gasolina-dteFechaCarga");
    if (!campo) return;
    const hoy = new Date();
    const local = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000);
    const manana = new Date(local);
    manana.setDate(manana.getDate() + 1);
    campo.value = local.toISOString().split("T")[0];
    campo.max = manana.toISOString().split("T")[0];
}

// Presenta la unidad seleccionada y propone su kilometraje actual como mínimo.
function actualizarVehiculoGasolina() {
    const vehiculo = obtenerVehiculoGasolinaSeleccionado();
    const card = document.getElementById("gasolinaVehiculoCard");
    if (card) card.hidden = !vehiculo;
    if (vehiculo) {
        setText("gasolinaVehiculoPlaca", vehiculo.strPlaca);
        setText("gasolinaVehiculoUnidad", `${vehiculo.marca} ${vehiculo.strModelo}`);
        setText("gasolinaVehiculoAnio", String(vehiculo.intAnio));
        setText("gasolinaVehiculoKilometraje", `${vehiculo.decKilometrajeActual.toLocaleString("es-MX")} km`);
        const kilometraje = document.getElementById("gasolina-decKilometrajeActual");
        if (kilometraje) kilometraje.value = String(vehiculo.decKilometrajeActual);
    }
    actualizarVistaPreviaGasolina();
}

// Componente local de comprobante; no asigna una ruta ficticia.
function inicializarComprobanteGasolina() {
    const area = document.getElementById("gasolinaComprobanteArea");
    const input = document.getElementById("gasolinaComprobanteArchivo");
    if (!area || !input) return;
    area.addEventListener("click", event => {
        if (!event.target.closest("button")) input.click();
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
        const archivo = event.dataTransfer.files?.[0];
        if (archivo) procesarComprobanteGasolina(archivo);
    });
    input.addEventListener("change", () => {
        const archivo = input.files?.[0];
        if (archivo) procesarComprobanteGasolina(archivo);
    });
    document.getElementById("btnQuitarComprobanteGasolina")?.addEventListener("click", event => {
        event.stopPropagation();
        limpiarComprobanteGasolina();
        actualizarVistaPreviaGasolina();
    });
}

// Valida y conserva temporalmente el archivo elegido en /Vehiculos/Gasolina sin transmitirlo al servidor.
function procesarComprobanteGasolina(archivo) {
    const extensiones = [".pdf", ".jpg", ".jpeg", ".png", ".webp"];
    const tipos = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    const extensionValida = extensiones.some(extension => archivo.name.toLowerCase().endsWith(extension));
    limpiarErrorComprobanteGasolina();
    if (!extensionValida || !tipos.includes(archivo.type)) {
        limpiarComprobanteGasolina();
        mostrarErrorComprobanteGasolina("Solo se permiten archivos PDF o imágenes.");
        return;
    }
    if (archivo.size > 5 * 1024 * 1024) {
        limpiarComprobanteGasolina();
        mostrarErrorComprobanteGasolina("El archivo no debe superar 5 MB.");
        return;
    }

    const input = document.getElementById("gasolinaComprobanteArchivo");
    if (input && window.DataTransfer) {
        const transferencia = new DataTransfer();
        transferencia.items.add(archivo);
        input.files = transferencia.files;
    }
    gasolinaComprobanteSeleccionado = { nombre: archivo.name, tipo: archivo.type === "application/pdf" ? "PDF" : "Imagen" };
    document.getElementById("gasolinaComprobantePrompt").hidden = true;
    document.getElementById("gasolinaComprobanteSeleccionado").hidden = false;
    setText("gasolinaComprobanteNombre", archivo.name);
    setText("gasolinaComprobanteTipo", gasolinaComprobanteSeleccionado.tipo);

    // El backend futuro generará la ruta persistente para strUrlComprobantePago.
    actualizarVistaPreviaGasolina();
}

// Restablece controles y estado visual de /Vehiculos/Gasolina sin modificar sus datos simulados de consulta.
function limpiarComprobanteGasolina() {
    gasolinaComprobanteSeleccionado = null;
    const input = document.getElementById("gasolinaComprobanteArchivo");
    const ruta = document.getElementById("gasolina-strUrlComprobantePago");
    if (input) input.value = "";
    if (ruta) ruta.value = "";
    const prompt = document.getElementById("gasolinaComprobantePrompt");
    const seleccionado = document.getElementById("gasolinaComprobanteSeleccionado");
    if (prompt) prompt.hidden = false;
    if (seleccionado) seleccionado.hidden = true;
    limpiarErrorComprobanteGasolina();
}

// Expone el mensaje y estado visual de error del componente correspondiente en /Vehiculos/Gasolina.
function mostrarErrorComprobanteGasolina(mensaje) {
    document.getElementById("gasolinaComprobanteArea")?.classList.add("is-invalid");
    const error = document.getElementById("gasolinaComprobanteArchivoError");
    if (error) {
        error.textContent = mensaje;
        error.classList.add("d-block");
    }
}

// Retira el estado visual de error del componente correspondiente en /Vehiculos/Gasolina.
function limpiarErrorComprobanteGasolina() {
    document.getElementById("gasolinaComprobanteArea")?.classList.remove("is-invalid");
    const error = document.getElementById("gasolinaComprobanteArchivoError");
    if (error) {
        error.textContent = "";
        error.classList.remove("d-block");
    }
}

// Cálculo visual exclusivo del frontend; litros no pertenece a VehControlGasolina.
function calcularLitrosEstimadosGasolina() {
    const monto = Number(document.getElementById("gasolina-mnyMontoPagado")?.value || 0);
    const precio = Number(document.getElementById("gasolina-mnyPrecioLitro")?.value || 0);
    const litros = Number.isFinite(monto) && Number.isFinite(precio) && monto > 0 && precio > 0 ? monto / precio : 0;
    const texto = `${litros.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L`;
    setText("gasolinaLitrosEstimados", texto);
    setText("previewGasolinaLitros", texto);
    return litros;
}

// Ejecuta todas las reglas NOT NULL y conserva el comprobante como NULL permitido.
function validarFormularioGasolina(form) {
    const ids = [
        "gasolina-idVehDatosGenerales", "gasolina-dteFechaCarga",
        "gasolina-mnyMontoPagado", "gasolina-mnyPrecioLitro",
        "gasolina-decKilometrajeActual", "gasolina-idVehFormaPago",
        "gasolina-idVehCatGasolineras", "gasolina-idEmpEmpleado"
    ];
    let valido = true;
    ids.forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoGasolina(campo)) valido = false;
    });
    if (document.getElementById("gasolinaComprobanteArea")?.classList.contains("is-invalid")) valido = false;

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

// Evalúa un control individual de /Vehiculos/Gasolina y aplica las clases Bootstrap de validación.
function validarCampoGasolina(campo) {
    const valor = String(campo.value || "").trim();
    let mensaje = "";
    if (campo.required && !valor) mensaje = campo.tagName === "SELECT" ? "Selecciona una opción válida." : "Este campo es obligatorio.";

    if (!mensaje) {
        switch (campo.id) {
            case "gasolina-idVehDatosGenerales":
                if (valor && !gasolinaVehiculosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un vehículo.";
                break;
            case "gasolina-idEmpEmpleado":
                if (valor && !gasolinaEmpleadosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un empleado.";
                break;
            case "gasolina-idVehCatGasolineras":
                if (valor && !gasolinaCatalogosSimulados.gasolineras.some(item => item.id === Number(valor))) mensaje = "Selecciona una gasolinera válida.";
                break;
            case "gasolina-idVehFormaPago":
                if (valor && !gasolinaCatalogosSimulados.formasPago.some(item => item.id === Number(valor))) mensaje = "Selecciona una forma de pago válida.";
                break;
            case "gasolina-dteFechaCarga": {
                const fecha = crearFechaLocalServicio(valor);
                const limite = new Date();
                limite.setHours(0, 0, 0, 0);
                limite.setDate(limite.getDate() + 1);
                if (valor && (!fecha || fecha > limite)) mensaje = "La fecha de carga no puede ser posterior al día de mañana.";
                break;
            }
            case "gasolina-mnyMontoPagado": {
                const numero = Number(valor);
                if (valor && (!Number.isFinite(numero) || numero <= 0 || numero > 999999)) mensaje = "El monto debe ser mayor que $0.00 y máximo $999,999.00.";
                break;
            }
            case "gasolina-mnyPrecioLitro": {
                const numero = Number(valor);
                if (valor && (!Number.isFinite(numero) || numero <= 0 || numero > 99.99)) mensaje = "El precio por litro debe estar entre $0.01 y $99.99.";
                break;
            }
            case "gasolina-decKilometrajeActual": {
                const numero = Number(valor);
                const vehiculo = obtenerVehiculoGasolinaSeleccionado();
                if (valor && (!Number.isInteger(numero) || numero < 0 || numero > 999999)) mensaje = "El kilometraje debe ser un entero entre 0 y 999999.";
                else if (vehiculo && numero < vehiculo.decKilometrajeActual) mensaje = `El kilometraje no puede ser menor a ${vehiculo.decKilometrajeActual.toLocaleString("es-MX")} km.`;
                break;
            }
        }
    }

    if (mensaje) {
        mostrarErrorCampo(campo, mensaje);
        return false;
    }
    limpiarErrorCampo(campo);
    if (campo.required) campo.classList.add("is-valid");
    return true;
}

// Sincroniza la card lateral usando textos visibles de los catálogos.
function actualizarVistaPreviaGasolina() {
    const vehiculo = obtenerVehiculoGasolinaSeleccionado();
    const empleadoId = Number(document.getElementById("gasolina-idEmpEmpleado")?.value);
    const empleado = gasolinaEmpleadosSimulados.find(item => item.id === empleadoId);
    const textoSelect = id => {
        const option = document.getElementById(id)?.selectedOptions?.[0];
        return option?.value ? option.textContent.trim() : "";
    };
    const monto = Number(document.getElementById("gasolina-mnyMontoPagado")?.value || 0);
    const precio = Number(document.getElementById("gasolina-mnyPrecioLitro")?.value || 0);
    const kilometraje = Number(document.getElementById("gasolina-decKilometrajeActual")?.value || 0);

    setText("previewGasolinaVehiculo", vehiculo ? `${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}` : "Sin seleccionar");
    setText("previewGasolinaPlaca", vehiculo?.strPlaca || "—");
    setText("previewGasolinaFecha", formatearFechaServicio(document.getElementById("gasolina-dteFechaCarga")?.value) || "—");
    setText("previewGasolinaKilometraje", `${(Number.isFinite(kilometraje) ? kilometraje : 0).toLocaleString("es-MX")} km`);
    setText("previewGasolinaGasolinera", textoSelect("gasolina-idVehCatGasolineras") || "Sin seleccionar");
    setText("previewGasolinaMonto", formatearMonedaServicio(Number.isFinite(monto) ? monto : 0));
    setText("previewGasolinaPrecio", formatearMonedaServicio(Number.isFinite(precio) ? precio : 0));
    setText("previewGasolinaFormaPago", textoSelect("gasolina-idVehFormaPago") || "Sin seleccionar");
    setText("previewGasolinaEmpleado", empleado?.nombreCompleto || "Sin seleccionar");
    setText("previewGasolinaComprobante", gasolinaComprobanteSeleccionado?.nombre || "Sin archivo");
    calcularLitrosEstimadosGasolina();
}

// Limpia únicamente la captura, restaura hoy y reinicia el cálculo visual.
function limpiarFormularioGasolina(form) {
    form.reset();
    cargarCatalogosGasolinaSimulados();
    inicializarFechaCargaGasolina();
    limpiarComprobanteGasolina();
    form.querySelectorAll(".is-invalid, .is-valid").forEach(campo => limpiarErrorCampo(campo));
    const card = document.getElementById("gasolinaVehiculoCard");
    if (card) card.hidden = true;
    calcularLitrosEstimadosGasolina();
    actualizarVistaPreviaGasolina();
}

// Tabla simulada; el cociente se calcula al renderizar y no se guarda.
function renderizarGasolinaReciente() {
    const body = document.getElementById("gasolinaRecientesBody");
    if (!body) return;
    body.innerHTML = gasolinaRecientesSimuladas.map(carga => {
        const litros = carga.mnyMontoPagado / carga.mnyPrecioLitro;
        return `<tr>
            <td class="font-weight-700">${escapeHtml(carga.vehiculo)}</td>
            <td>${escapeHtml(carga.strPlaca)}</td>
            <td>${escapeHtml(formatearFechaServicio(carga.dteFechaCarga))}</td>
            <td>${carga.decKilometrajeActual.toLocaleString("es-MX")} km</td>
            <td>${escapeHtml(carga.gasolinera)}</td>
            <td>${formatearMonedaServicio(carga.mnyMontoPagado)}</td>
            <td>${formatearMonedaServicio(carga.mnyPrecioLitro)}</td>
            <td><span class="gasolina-litros-table">${litros.toFixed(2)} L</span></td>
            <td>${escapeHtml(carga.formaPago)}</td>
            <td>${escapeHtml(carga.empleado)}</td>
            <td>${carga.comprobante ? `<span class="documento-file-link">${escapeHtml(carga.comprobante)}</span>` : '<span class="text-muted">Sin archivo</span>'}</td>
            <td class="text-end">
                <div class="dropdown actions-dropdown d-inline-block">
                    <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false">Acciones</button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><button class="dropdown-item veh-table-action-primary" type="button" onclick="mostrarAccionGasolinaDemo('Ver')">Ver</button></li>
                        <li><button class="dropdown-item veh-table-action-secondary" type="button" onclick="mostrarAccionGasolinaDemo('Editar')">Editar</button></li>
                        <li><button class="dropdown-item veh-table-action-danger" type="button" onclick="mostrarAccionGasolinaDemo('Eliminar')">Eliminar</button></li>
                    </ul>
                </div>
            </td>
        </tr>`;
    }).join("");
}

// Muestra una confirmación informativa para una acción todavía no conectada al backend de /Vehiculos/Gasolina.
function mostrarAccionGasolinaDemo(accion) {
    Swal.fire({ icon: "info", title: accion, text: "Esta acción se conectará cuando exista el backend de gasolina.", confirmButtonColor: "var(--teal-cavex)" });
}

// Localiza el registro o elemento activo utilizado por /Vehiculos/Gasolina sin modificarlo.
function obtenerVehiculoGasolinaSeleccionado() {
    const id = Number(document.getElementById("gasolina-idVehDatosGenerales")?.value);
    return gasolinaVehiculosSimulados.find(vehiculo => vehiculo.id === id) || null;
}

// Proyección simulada de VehDatosGenerales requerida por el control de llantas.
// TODO backend: reemplazar este arreglo por GET /api/vehiculos.
const llantaVehiculosSimulados = [
    { id: 1, strPlaca: "ABC-123-D", marca: "Toyota", strModelo: "RAV4", intAnio: 2021, decKilometrajeActual: 45230 },
    { id: 2, strPlaca: "XYZ-987-A", marca: "Nissan", strModelo: "Versa", intAnio: 2020, decKilometrajeActual: 38600 }
];

// Catálogos simulados con ids equivalentes a las llaves foráneas de VehControlLlanta.
// TODO backend: sustituirlos por GET /api/vehiculos/catalogos/marcas-llanta,
// GET /api/vehiculos/catalogos/posiciones-llanta y GET /api/vehiculos/catalogos/status.
const llantaCatalogosSimulados = {
    marcas: ["Michelin", "Bridgestone", "Goodyear", "Pirelli", "Continental", "Firestone", "Otra"]
        .map((strValor, indice) => ({ id: indice + 1, strValor })),
    posiciones: ["Delantera izquierda", "Delantera derecha", "Trasera izquierda", "Trasera derecha", "Refacción", "Eje adicional"]
        .map((strValor, indice) => ({ id: indice + 1, strValor })),
    status: ["Activa", "En revisión", "Requiere cambio", "Reemplazada", "Baja"]
        .map((strValor, indice) => ({ id: indice + 1, strValor }))
};

// Registros de consulta para validar la tabla antes de implementar
// GET /api/vehiculos/llantas/{idVehDatosGenerales}.
const llantasRegistradasSimuladas = [
    { vehiculo: "Toyota RAV4 2021", placa: "ABC-123-D", marca: "Michelin", modelo: "Primacy 4", medida: "225/65 R17", posicion: "Delantera izquierda", kilometraje: 45230, costo: 3850, siguienteRotacion: "2026-09-15", status: "Activa", evidencia: "factura-michelin.pdf" },
    { vehiculo: "Toyota RAV4 2021", placa: "ABC-123-D", marca: "Michelin", modelo: "Primacy 4", medida: "225/65 R17", posicion: "Delantera derecha", kilometraje: 45230, costo: 3850, siguienteRotacion: "2026-09-15", status: "En revisión", evidencia: "llanta-frontal.jpg" },
    { vehiculo: "Nissan Versa 2020", placa: "XYZ-987-A", marca: "Continental", modelo: "UltraContact", medida: "195/60 R15", posicion: "Trasera izquierda", kilometraje: 38600, costo: 2490, siguienteRotacion: "2026-08-28", status: "Requiere cambio", evidencia: null },
    { vehiculo: "Nissan Versa 2020", placa: "XYZ-987-A", marca: "Firestone", modelo: "F-Series", medida: "195/60 R15", posicion: "Refacción", kilometraje: 37000, costo: 2150, siguienteRotacion: null, status: "Reemplazada", evidencia: "reemplazo.webp" }
];

let llantaEvidenciaSeleccionada = null;

// Inicializa exclusivamente /Vehiculos/Llantas y evita alterar las demás pantallas.
function inicializarLlantasVehiculo() {
    const form = document.getElementById("llantaVehiculoForm");
    if (!form) return;

    cargarCatalogosLlantasSimulados();
    inicializarFechasLlanta();
    inicializarEvidenciaLlanta();
    renderizarLlantasRegistradas();

    form.querySelectorAll("input:not([type='file']):not([type='hidden']), select").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            const teniaError = campo.classList.contains("is-invalid");
            limpiarErrorCampo(campo);
            if (teniaError) validarCampoLlanta(campo);
            if (campo.type === "date") validarFechasLlanta(false);
            actualizarVehiculoSeleccionadoLlanta(campo.id === "llanta-idVehDatosGenerales");
            actualizarVistaPreviaLlanta();
        }));

        campo.addEventListener("blur", () => {
            if (campo.type === "text") campo.value = campo.value.trim().replace(/\s{2,}/g, " ");
            if (campo.required || campo.value) validarCampoLlanta(campo);
            if (campo.type === "date") validarFechasLlanta(false);
            actualizarVistaPreviaLlanta();
        });
    });

    document.getElementById("btnLimpiarLlanta")?.addEventListener("click", () => limpiarFormularioLlanta(form));
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioLlanta(form)) {
            Swal.fire({
                icon: "warning",
                title: "Formulario incompleto",
                text: "Revisa los campos marcados antes de guardar.",
                confirmButtonColor: "var(--teal-cavex)"
            });
            return;
        }

        // TODO backend: enviar los campos y la ruta de evidencia a POST /api/vehiculos/llantas.
        Swal.fire({
            icon: "success",
            title: "Llanta validada correctamente",
            text: "Esta captura aún no se guarda en base de datos.",
            confirmButtonColor: "var(--teal-cavex)"
        });
    });

    actualizarVehiculoSeleccionadoLlanta(false);
    actualizarVistaPreviaLlanta();
}

// Carga opciones válidas y conserva Activa como estatus inicial.
function cargarCatalogosLlantasSimulados() {
    llenarSelectLlanta("llanta-idVehDatosGenerales", llantaVehiculosSimulados, vehiculo =>
        `${vehiculo.strPlaca} · ${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}`);
    llenarSelectLlanta("llanta-idVehCatMarcaLlanta", llantaCatalogosSimulados.marcas, item => item.strValor);
    llenarSelectLlanta("llanta-idVehCatPosicionLlanta", llantaCatalogosSimulados.posiciones, item => item.strValor);
    llenarSelectLlanta("llanta-idVehCatStatus", llantaCatalogosSimulados.status, item => item.strValor);

    const status = document.getElementById("llanta-idVehCatStatus");
    if (status) status.value = "1";
}

// Puebla selects de /Vehiculos/Llantas con datos simulados; un catálogo del backend sustituirá esta fuente.
function llenarSelectLlanta(id, registros, obtenerTexto) {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value="">Seleccionar...</option>';
    registros.forEach(registro => {
        const option = document.createElement("option");
        option.value = String(registro.id);
        option.textContent = obtenerTexto(registro);
        select.appendChild(option);
    });
}

// Fecha de compra inicia hoy y permite como máximo el día de mañana.
function inicializarFechasLlanta() {
    const compra = document.getElementById("llanta-dteFechaCompra");
    if (!compra) return;
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);
    compra.value = fechaIsoLocalLlanta(hoy);
    compra.max = fechaIsoLocalLlanta(manana);
}

// Gestiona drag & drop y selección local; no realiza ninguna carga al servidor.
function inicializarEvidenciaLlanta() {
    const area = document.getElementById("llantaEvidenciaArea");
    const input = document.getElementById("llantaEvidenciaArchivo");
    const quitar = document.getElementById("btnQuitarEvidenciaLlanta");
    if (!area || !input) return;

    area.addEventListener("click", event => {
        if (event.target.closest("#btnQuitarEvidenciaLlanta") || event.target === input) return;
        input.click();
    });
    area.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            input.click();
        }
    });
    ["dragenter", "dragover"].forEach(evento => area.addEventListener(evento, event => {
        event.preventDefault();
        area.classList.add("is-dragging");
    }));
    ["dragleave", "drop"].forEach(evento => area.addEventListener(evento, event => {
        event.preventDefault();
        area.classList.remove("is-dragging");
    }));
    area.addEventListener("drop", event => {
        const archivo = event.dataTransfer?.files?.[0];
        if (archivo) seleccionarEvidenciaLlanta(archivo);
    });
    input.addEventListener("change", () => {
        const archivo = input.files?.[0];
        if (archivo) seleccionarEvidenciaLlanta(archivo);
    });
    quitar?.addEventListener("click", event => {
        event.stopPropagation();
        limpiarEvidenciaLlanta();
        actualizarVistaPreviaLlanta();
    });
}

// Valida y conserva temporalmente el archivo elegido en /Vehiculos/Llantas sin transmitirlo al servidor.
function seleccionarEvidenciaLlanta(archivo) {
    if (!validarArchivoEvidenciaLlanta(archivo)) return;

    llantaEvidenciaSeleccionada = { nombre: archivo.name, tipo: obtenerTipoEvidenciaLlanta(archivo.name) };
    limpiarErrorEvidenciaLlanta();
    document.getElementById("llantaEvidenciaPrompt").hidden = true;
    document.getElementById("llantaEvidenciaSeleccionada").hidden = false;
    setText("llantaEvidenciaNombre", llantaEvidenciaSeleccionada.nombre);
    setText("llantaEvidenciaTipo", llantaEvidenciaSeleccionada.tipo);

    // El backend futuro subirá el archivo y asignará la URL resultante a strUrlEvidencia.
    const ruta = document.getElementById("llanta-strUrlEvidencia");
    if (ruta) ruta.value = "";
    actualizarVistaPreviaLlanta();
}

// Comprueba las reglas funcionales de /Vehiculos/Llantas antes de permitir la captura simulada.
function validarArchivoEvidenciaLlanta(archivo) {
    const extension = archivo.name.split(".").pop()?.toLowerCase() || "";
    const extensiones = ["pdf", "jpg", "jpeg", "png", "webp"];
    const tipos = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!extensiones.includes(extension) || (archivo.type && !tipos.includes(archivo.type))) {
        mostrarErrorEvidenciaLlanta("Selecciona un archivo PDF, JPG, JPEG, PNG o WEBP.");
        return false;
    }
    if (archivo.size > 5 * 1024 * 1024) {
        mostrarErrorEvidenciaLlanta("El archivo no debe superar 5 MB.");
        return false;
    }
    return true;
}

// Expone el mensaje y estado visual de error del componente correspondiente en /Vehiculos/Llantas.
function mostrarErrorEvidenciaLlanta(mensaje) {
    document.getElementById("llantaEvidenciaArea")?.classList.add("is-invalid");
    const error = document.getElementById("llantaEvidenciaArchivoError");
    if (error) {
        error.textContent = mensaje;
        error.classList.add("d-block");
    }
}

// Retira el estado visual de error del componente correspondiente en /Vehiculos/Llantas.
function limpiarErrorEvidenciaLlanta() {
    document.getElementById("llantaEvidenciaArea")?.classList.remove("is-invalid");
    const error = document.getElementById("llantaEvidenciaArchivoError");
    if (error) {
        error.textContent = "";
        error.classList.remove("d-block");
    }
}

// Restablece controles y estado visual de /Vehiculos/Llantas sin modificar sus datos simulados de consulta.
function limpiarEvidenciaLlanta() {
    llantaEvidenciaSeleccionada = null;
    const input = document.getElementById("llantaEvidenciaArchivo");
    const ruta = document.getElementById("llanta-strUrlEvidencia");
    if (input) input.value = "";
    if (ruta) ruta.value = "";
    const prompt = document.getElementById("llantaEvidenciaPrompt");
    const seleccion = document.getElementById("llantaEvidenciaSeleccionada");
    if (prompt) prompt.hidden = false;
    if (seleccion) seleccion.hidden = true;
    limpiarErrorEvidenciaLlanta();
}

// Valida todos los campos NOT NULL y las relaciones cronológicas opcionales.
function validarFormularioLlanta(form) {
    const idsObligatorios = [
        "llanta-idVehDatosGenerales",
        "llanta-idVehCatMarcaLlanta",
        "llanta-strModelo",
        "llanta-strMedida",
        "llanta-dteFechaCompra",
        "llanta-mnyCosto",
        "llanta-idVehCatPosicionLlanta",
        "llanta-decKilometrajeActual",
        "llanta-idVehCatStatus"
    ];
    let valido = true;
    idsObligatorios.forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoLlanta(campo)) valido = false;
    });
    if (!validarFechasLlanta(true)) valido = false;
    if (document.getElementById("llantaEvidenciaArea")?.classList.contains("is-invalid")) valido = false;

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

// Evalúa un control individual de /Vehiculos/Llantas y aplica las clases Bootstrap de validación.
function validarCampoLlanta(campo) {
    const valor = String(campo.value || "").trim();
    let mensaje = "";
    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción válida." : "Este campo es obligatorio.";
    }

    if (!mensaje) {
        switch (campo.id) {
            case "llanta-idVehDatosGenerales":
                if (valor && !llantaVehiculosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un vehículo válido.";
                break;
            case "llanta-idVehCatMarcaLlanta":
                if (valor && !llantaCatalogosSimulados.marcas.some(item => item.id === Number(valor))) mensaje = "Selecciona una marca válida.";
                break;
            case "llanta-idVehCatPosicionLlanta":
                if (valor && !llantaCatalogosSimulados.posiciones.some(item => item.id === Number(valor))) mensaje = "Selecciona una posición válida.";
                break;
            case "llanta-idVehCatStatus":
                if (valor && !llantaCatalogosSimulados.status.some(item => item.id === Number(valor))) mensaje = "Selecciona un estatus válido.";
                break;
            case "llanta-strModelo":
                if (valor.length > 50) mensaje = "El modelo admite máximo 50 caracteres.";
                break;
            case "llanta-strMedida":
                if (valor.length > 50) mensaje = "La medida admite máximo 50 caracteres.";
                else if (valor && !/^\d{3}\/\d{2}\s?R\d{2}$/i.test(valor)) mensaje = "Usa un formato como 205/55 R16.";
                break;
            case "llanta-dteFechaCompra": {
                const fecha = crearFechaLocalServicio(valor);
                const limite = new Date();
                limite.setHours(0, 0, 0, 0);
                limite.setDate(limite.getDate() + 1);
                if (valor && (!fecha || fecha > limite)) mensaje = "La compra no puede ser posterior al día de mañana.";
                break;
            }
            case "llanta-mnyCosto": {
                const numero = Number(valor);
                if (valor && (!Number.isFinite(numero) || numero <= 0 || numero > 999999)) mensaje = "El costo debe ser mayor que $0.00 y máximo $999,999.00.";
                break;
            }
            case "llanta-decKilometrajeActual": {
                const numero = Number(valor);
                const vehiculo = obtenerVehiculoLlantaSeleccionado();
                if (valor && (!Number.isInteger(numero) || numero < 0 || numero > 999999)) mensaje = "El kilometraje debe ser un entero entre 0 y 999999.";
                else if (vehiculo && numero < vehiculo.decKilometrajeActual) mensaje = `El kilometraje no puede ser menor a ${vehiculo.decKilometrajeActual.toLocaleString("es-MX")} km.`;
                break;
            }
        }
    }

    if (mensaje) {
        mostrarErrorCampo(campo, mensaje);
        return false;
    }
    limpiarErrorCampo(campo);
    if (campo.required) campo.classList.add("is-valid");
    return true;
}

// Comprueba fechas NULL solo cuando tienen valor y aplica la fecha base correcta.
function validarFechasLlanta(marcarValidas = true) {
    const compra = document.getElementById("llanta-dteFechaCompra");
    const finVida = document.getElementById("llanta-dteFechaFinVidaEstimada");
    const rotacion = document.getElementById("llanta-dteFechaRotacion");
    const siguiente = document.getElementById("llanta-dteFechaSiguienteRotacion");
    const fechaCompra = crearFechaLocalServicio(compra?.value);
    const fechaFinVida = crearFechaLocalServicio(finVida?.value);
    const fechaRotacion = crearFechaLocalServicio(rotacion?.value);
    const fechaSiguiente = crearFechaLocalServicio(siguiente?.value);
    let valido = true;

    const validarOpcional = (campo, fecha, fechaBase, mensaje) => {
        if (!campo?.value) {
            limpiarErrorCampo(campo);
            return;
        }
        if (!fecha || !fechaBase || fecha < fechaBase) {
            mostrarErrorCampo(campo, mensaje);
            valido = false;
            return;
        }
        limpiarErrorCampo(campo);
        if (marcarValidas) campo.classList.add("is-valid");
    };

    validarOpcional(finVida, fechaFinVida, fechaCompra, "La vida estimada debe ser igual o posterior a la compra.");
    validarOpcional(rotacion, fechaRotacion, fechaCompra, "La rotación debe ser igual o posterior a la compra.");
    validarOpcional(
        siguiente,
        fechaSiguiente,
        fechaRotacion || fechaCompra,
        fechaRotacion
            ? "La siguiente rotación debe ser igual o posterior a la última rotación."
            : "La siguiente rotación debe ser igual o posterior a la compra."
    );
    return valido;
}

// Sincroniza datos calculados o elementos dependientes dentro de /Vehiculos/Llantas.
function actualizarVehiculoSeleccionadoLlanta(establecerKilometraje) {
    const vehiculo = obtenerVehiculoLlantaSeleccionado();
    const card = document.getElementById("llantaVehiculoCard");
    if (card) card.hidden = !vehiculo;
    if (!vehiculo) return;

    setText("llantaVehiculoPlaca", vehiculo.strPlaca);
    setText("llantaVehiculoMarca", vehiculo.marca);
    setText("llantaVehiculoModelo", vehiculo.strModelo);
    setText("llantaVehiculoAnio", String(vehiculo.intAnio));
    setText("llantaVehiculoKilometraje", `${vehiculo.decKilometrajeActual.toLocaleString("es-MX")} km`);
    if (establecerKilometraje) {
        const kilometraje = document.getElementById("llanta-decKilometrajeActual");
        if (kilometraje) kilometraje.value = String(vehiculo.decKilometrajeActual);
    }
}

// Sincroniza los nombres visibles, no los ids, con el resumen lateral.
function actualizarVistaPreviaLlanta() {
    const vehiculo = obtenerVehiculoLlantaSeleccionado();
    const textoSelect = id => {
        const option = document.getElementById(id)?.selectedOptions?.[0];
        return option?.value ? option.textContent.trim() : "";
    };
    const valor = id => document.getElementById(id)?.value?.trim() || "";
    const kilometraje = Number(valor("llanta-decKilometrajeActual") || 0);
    const status = textoSelect("llanta-idVehCatStatus") || "Activa";

    setText("previewLlantaVehiculo", vehiculo ? `${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}` : "Sin seleccionar");
    setText("previewLlantaPlaca", vehiculo?.strPlaca || "—");
    setText("previewLlantaMarca", textoSelect("llanta-idVehCatMarcaLlanta") || "Sin seleccionar");
    setText("previewLlantaModelo", valor("llanta-strModelo") || "Sin modelo");
    setText("previewLlantaMedida", valor("llanta-strMedida") || "Sin medida");
    setText("previewLlantaPosicion", textoSelect("llanta-idVehCatPosicionLlanta") || "Sin seleccionar");
    setText("previewLlantaFechaCompra", formatearFechaServicio(valor("llanta-dteFechaCompra")) || "—");
    setText("previewLlantaCosto", formatearMonedaServicio(valor("llanta-mnyCosto")));
    setText("previewLlantaKilometraje", `${(Number.isFinite(kilometraje) ? kilometraje : 0).toLocaleString("es-MX")} km`);
    setText("previewLlantaVida", formatearFechaServicio(valor("llanta-dteFechaFinVidaEstimada")) || "—");
    setText("previewLlantaRotacion", formatearFechaServicio(valor("llanta-dteFechaRotacion")) || "—");
    setText("previewLlantaSiguienteRotacion", formatearFechaServicio(valor("llanta-dteFechaSiguienteRotacion")) || "—");
    setText("previewLlantaEvidencia", llantaEvidenciaSeleccionada?.nombre || "Sin archivo");
    actualizarBadgeLlanta(document.getElementById("previewLlantaEstatus"), status);
}

// Restablece valores, errores, archivo y vista previa sin alterar la tabla simulada.
function limpiarFormularioLlanta(form) {
    form.reset();
    cargarCatalogosLlantasSimulados();
    inicializarFechasLlanta();
    limpiarEvidenciaLlanta();
    form.querySelectorAll(".is-invalid, .is-valid").forEach(campo => limpiarErrorCampo(campo));
    const card = document.getElementById("llantaVehiculoCard");
    if (card) card.hidden = true;
    actualizarVistaPreviaLlanta();
}

// Construye el HTML dinámico de /Vehiculos/Llantas a partir de datos simulados y textos escapados.
function renderizarLlantasRegistradas() {
    const body = document.getElementById("llantasRegistradasBody");
    if (!body) return;
    body.innerHTML = llantasRegistradasSimuladas.map(llanta => `<tr>
        <td class="font-weight-700">${escapeHtml(llanta.vehiculo)}</td>
        <td>${escapeHtml(llanta.placa)}</td>
        <td>${escapeHtml(llanta.marca)}</td>
        <td>${escapeHtml(llanta.modelo)}</td>
        <td>${escapeHtml(llanta.medida)}</td>
        <td>${escapeHtml(llanta.posicion)}</td>
        <td>${llanta.kilometraje.toLocaleString("es-MX")} km</td>
        <td>${formatearMonedaServicio(llanta.costo)}</td>
        <td>${llanta.siguienteRotacion ? escapeHtml(formatearFechaServicio(llanta.siguienteRotacion)) : '<span class="text-muted">Sin programar</span>'}</td>
        <td>${crearBadgeLlantaHtml(llanta.status)}</td>
        <td>${llanta.evidencia ? `<span class="documento-file-link">${escapeHtml(llanta.evidencia)}</span>` : '<span class="text-muted">Sin archivo</span>'}</td>
        <td class="text-end">
            <div class="dropdown actions-dropdown d-inline-block">
                <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false">Acciones</button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><button class="dropdown-item veh-table-action-primary" type="button" onclick="mostrarAccionLlantaDemo('Ver')">Ver</button></li>
                    <li><button class="dropdown-item veh-table-action-secondary" type="button" onclick="mostrarAccionLlantaDemo('Editar')">Editar</button></li>
                    <li><button class="dropdown-item veh-table-action-warning" type="button" onclick="mostrarAccionLlantaDemo('Registrar rotación')">Registrar rotación</button></li>
                    <li><button class="dropdown-item veh-table-action-danger" type="button" onclick="mostrarAccionLlantaDemo('Dar de baja')">Dar de baja</button></li>
                </ul>
            </div>
        </td>
    </tr>`).join("");
}

// Muestra una confirmación informativa para una acción todavía no conectada al backend de /Vehiculos/Llantas.
function mostrarAccionLlantaDemo(accion) {
    Swal.fire({ icon: "info", title: accion, text: "Esta acción se conectará cuando exista el backend de llantas.", confirmButtonColor: "var(--teal-cavex)" });
}

// Actualiza texto y clase del badge de llantas sin modificar el estatus almacenado en el select.
function actualizarBadgeLlanta(elemento, status) {
    if (!elemento) return;
    elemento.textContent = status;
    elemento.className = `llanta-status ${claseStatusLlanta(status)}`;
}

// Construye el badge HTML escapando el estatus usado en la tabla simulada de llantas.
function crearBadgeLlantaHtml(status) {
    return `<span class="llanta-status ${claseStatusLlanta(status)}">${escapeHtml(status)}</span>`;
}

// Traduce un estatus de /Vehiculos/Llantas a la clase visual correspondiente sin alterar el valor original.
function claseStatusLlanta(status) {
    const clases = {
        "Activa": "llanta-status-active",
        "En revisión": "llanta-status-review",
        "Requiere cambio": "llanta-status-change",
        "Reemplazada": "llanta-status-replaced",
        "Baja": "llanta-status-down"
    };
    return clases[status] || "llanta-status-replaced";
}

// Obtiene una etiqueta legible a partir de la extensión del archivo de evidencia.
function obtenerTipoEvidenciaLlanta(nombre) {
    const extension = nombre.split(".").pop()?.toUpperCase();
    return extension ? `Archivo ${extension}` : "Archivo";
}

// Localiza el registro o elemento activo utilizado por /Vehiculos/Llantas sin modificarlo.
function obtenerVehiculoLlantaSeleccionado() {
    const id = Number(document.getElementById("llanta-idVehDatosGenerales")?.value);
    return llantaVehiculosSimulados.find(vehiculo => vehiculo.id === id) || null;
}

// Normaliza una fecha local de /Vehiculos/Llantas evitando desplazamientos por zona horaria.
function fechaIsoLocalLlanta(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}

// Proyección simulada de VehDatosGenerales para daños y accidentes.
// TODO backend: reemplazar este arreglo por GET /api/vehiculos.
const danioVehiculosSimulados = [
    { id: 1, strPlaca: "ABC-123-D", marca: "Toyota", strModelo: "RAV4", intAnio: 2021, decKilometrajeActual: 45230 },
    { id: 2, strPlaca: "XYZ-987-A", marca: "Nissan", strModelo: "Versa", intAnio: 2020, decKilometrajeActual: 38600 }
];

// Empleados responsables con la proyección necesaria de EmpEmpleado.
// TODO backend: reemplazar este arreglo por GET /api/empleados.
const danioEmpleadosSimulados = [
    { id: 1, nombreCompleto: "Juan Pérez López", area: "Operaciones" },
    { id: 2, nombreCompleto: "Carlos Hernández Ruiz", area: "Mantenimiento" },
    { id: 3, nombreCompleto: "María González Torres", area: "Administración" }
];

// Pólizas disponibles y estatus simulados para las llaves foráneas de VehDaniosAccidentes.
// TODO backend: consultar GET /api/vehiculos/seguros/{idVehDatosGenerales}
// y GET /api/vehiculos/catalogos/status.
const danioSegurosSimulados = [
    { id: 1, aseguradora: "Qualitas", numeroPoliza: "POL-123456789", cobertura: "Amplia" },
    { id: 2, aseguradora: "GNP", numeroPoliza: "GNP-987654321", cobertura: "Limitada" }
];

const danioStatusSimulados = ["Reportado", "En revisión", "En reparación", "Resuelto", "Cancelado"]
    .map((strValor, indice) => ({ id: indice + 1, strValor }));

// Consulta simulada hasta implementar GET /api/vehiculos/danios-accidentes/{idVehDatosGenerales}.
const daniosRecientesSimulados = [
    { vehiculo: "Toyota RAV4 2021", placa: "ABC-123-D", empleado: "Juan Pérez López", fecha: "2026-06-21", descripcion: "Golpe menor en defensa trasera durante maniobra.", ubicacion: "Patio de operaciones", monto: 4800, seguro: "No", status: "Reportado", evidencia: "defensa-trasera.jpg" },
    { vehiculo: "Nissan Versa 2020", placa: "XYZ-987-A", empleado: "Carlos Hernández Ruiz", fecha: "2026-06-10", descripcion: "Daño en puerta delantera derecha.", ubicacion: "Av. Universidad", monto: 12750, seguro: "Qualitas · POL-123456789", status: "En reparación", evidencia: "reporte-ajustador.pdf" },
    { vehiculo: "Toyota RAV4 2021", placa: "ABC-123-D", empleado: "María González Torres", fecha: "2026-05-28", descripcion: "Fisura en parabrisas por impacto de grava.", ubicacion: "Carretera federal 57", monto: 6900, seguro: "GNP · GNP-987654321", status: "En revisión", evidencia: "parabrisas.webp" },
    { vehiculo: "Nissan Versa 2020", placa: "XYZ-987-A", empleado: "Juan Pérez López", fecha: "2026-04-17", descripcion: "Rayón superficial en salpicadera izquierda.", ubicacion: null, monto: null, seguro: "No", status: "Resuelto", evidencia: null }
];

let danioEvidenciaSeleccionada = null;

// Inicializa exclusivamente /Vehiculos/DaniosAccidentes.
function inicializarDaniosAccidentesVehiculo() {
    const form = document.getElementById("danioAccidenteForm");
    if (!form) return;

    cargarCatalogosDaniosAccidentesSimulados();
    inicializarFechaDanioAccidente();
    inicializarEvidenciaDanioAccidente();
    inicializarContadoresDanioAccidente();
    renderizarDaniosRecientes();

    form.querySelectorAll("input:not([type='file']):not([type='hidden']):not([type='checkbox']), select, textarea").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            const teniaError = campo.classList.contains("is-invalid");
            limpiarErrorCampo(campo);
            if (teniaError) validarCampoDanioAccidente(campo);
            if (campo.id === "danio-idVehDatosGenerales") actualizarVehiculoDanioAccidente();
            actualizarContadoresDanioAccidente();
            actualizarVistaPreviaDanioAccidente();
        }));

        campo.addEventListener("blur", () => {
            if (campo.type === "text" || campo.tagName === "TEXTAREA") {
                campo.value = campo.value.trim().replace(/\s{2,}/g, " ");
            }
            if (campo.required || campo.value) validarCampoDanioAccidente(campo);
            actualizarContadoresDanioAccidente();
            actualizarVistaPreviaDanioAccidente();
        });
    });

    document.getElementById("danioSeguroSwitch")?.addEventListener("change", () => {
        actualizarSeguroDanioAccidente();
        actualizarVistaPreviaDanioAccidente();
    });
    document.getElementById("btnLimpiarDanioAccidente")?.addEventListener("click", () => limpiarFormularioDanioAccidente(form));

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioDanioAccidente(form)) {
            Swal.fire({
                icon: "warning",
                title: "Formulario incompleto",
                text: "Revisa los campos marcados antes de guardar.",
                confirmButtonColor: "var(--teal-cavex)"
            });
            return;
        }

        // TODO backend: subir evidencia, asignar strUrlEvidencia y enviar
        // los campos a POST /api/vehiculos/danios-accidentes.
        Swal.fire({
            icon: "success",
            title: "Evento validado correctamente",
            text: "Esta captura aún no se guarda en base de datos.",
            confirmButtonColor: "var(--teal-cavex)"
        });
    });

    actualizarSeguroDanioAccidente();
    actualizarVehiculoDanioAccidente();
    actualizarVistaPreviaDanioAccidente();
}

// Llena catálogos manteniendo Reportado como estatus inicial.
function cargarCatalogosDaniosAccidentesSimulados() {
    llenarSelectDanio("danio-idVehDatosGenerales", danioVehiculosSimulados, vehiculo =>
        `${vehiculo.strPlaca} · ${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}`);
    llenarSelectDanio("danio-idEmpEmpleado", danioEmpleadosSimulados, empleado =>
        `${empleado.nombreCompleto} · ${empleado.area}`);
    llenarSelectDanio("danio-idVehCatStatus", danioStatusSimulados, status => status.strValor);
    llenarSelectDanio("danio-idVehSeguro", danioSegurosSimulados, seguro =>
        `${seguro.aseguradora} · ${seguro.numeroPoliza} · ${seguro.cobertura}`, "No aplica");

    const status = document.getElementById("danio-idVehCatStatus");
    if (status) status.value = "1";
}

// Puebla selects de /Vehiculos/DaniosAccidentes con datos simulados; un catálogo del backend sustituirá esta fuente.
function llenarSelectDanio(id, registros, obtenerTexto, placeholder = "Seleccionar...") {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>`;
    registros.forEach(registro => {
        const option = document.createElement("option");
        option.value = String(registro.id);
        option.textContent = obtenerTexto(registro);
        select.appendChild(option);
    });
}

// Configura valores o eventos requeridos por /Vehiculos/DaniosAccidentes; solo actúa cuando encuentra sus elementos HTML.
function inicializarFechaDanioAccidente() {
    const fecha = document.getElementById("danio-dteFechaEvento");
    if (!fecha) return;
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);
    fecha.value = fechaIsoLocalLlanta(hoy);
    fecha.max = fechaIsoLocalLlanta(manana);
}

// Configura valores o eventos requeridos por /Vehiculos/DaniosAccidentes; solo actúa cuando encuentra sus elementos HTML.
function inicializarContadoresDanioAccidente() {
    actualizarContadoresDanioAccidente();
}

// Sincroniza datos calculados o elementos dependientes dentro de /Vehiculos/DaniosAccidentes.
function actualizarContadoresDanioAccidente() {
    const descripcion = document.getElementById("danio-strDescripcion")?.value.length || 0;
    const observaciones = document.getElementById("danio-strObservaciones")?.value.length || 0;
    setText("danioDescripcionContador", `${descripcion}/500`);
    setText("danioObservacionesContador", `${observaciones}/500`);
}

// Habilita la póliza solo al confirmar cobertura y mantiene un booleano explícito.
function actualizarSeguroDanioAccidente() {
    const switchSeguro = document.getElementById("danioSeguroSwitch");
    const valorSeguro = document.getElementById("danio-bitCubiertoPorSeguro");
    const poliza = document.getElementById("danio-idVehSeguro");
    const cubierto = Boolean(switchSeguro?.checked);

    if (valorSeguro) valorSeguro.value = cubierto ? "true" : "false";
    setText("danioSeguroSwitchLabel", cubierto ? "Sí" : "No");
    if (!poliza) return;

    poliza.disabled = !cubierto;
    poliza.required = cubierto;
    if (!cubierto) {
        poliza.value = "";
        limpiarErrorCampo(poliza);
    }
}

// Gestiona drag & drop local; no transmite archivos al servidor.
function inicializarEvidenciaDanioAccidente() {
    const area = document.getElementById("danioEvidenciaArea");
    const input = document.getElementById("danioEvidenciaArchivo");
    const quitar = document.getElementById("btnQuitarEvidenciaDanio");
    if (!area || !input) return;

    area.addEventListener("click", event => {
        if (event.target.closest("#btnQuitarEvidenciaDanio") || event.target === input) return;
        input.click();
    });
    area.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            input.click();
        }
    });
    ["dragenter", "dragover"].forEach(evento => area.addEventListener(evento, event => {
        event.preventDefault();
        area.classList.add("is-dragging");
    }));
    ["dragleave", "drop"].forEach(evento => area.addEventListener(evento, event => {
        event.preventDefault();
        area.classList.remove("is-dragging");
    }));
    area.addEventListener("drop", event => {
        const archivo = event.dataTransfer?.files?.[0];
        if (archivo) seleccionarEvidenciaDanioAccidente(archivo);
    });
    input.addEventListener("change", () => {
        const archivo = input.files?.[0];
        if (archivo) seleccionarEvidenciaDanioAccidente(archivo);
    });
    quitar?.addEventListener("click", event => {
        event.stopPropagation();
        limpiarEvidenciaDanioAccidente();
        actualizarVistaPreviaDanioAccidente();
    });
}

// Valida y conserva temporalmente el archivo elegido en /Vehiculos/DaniosAccidentes sin transmitirlo al servidor.
function seleccionarEvidenciaDanioAccidente(archivo) {
    if (!validarArchivoEvidenciaDanioAccidente(archivo)) return;

    danioEvidenciaSeleccionada = { nombre: archivo.name, tipo: obtenerTipoEvidenciaLlanta(archivo.name) };
    limpiarErrorEvidenciaDanioAccidente();
    document.getElementById("danioEvidenciaPrompt").hidden = true;
    document.getElementById("danioEvidenciaSeleccionada").hidden = false;
    setText("danioEvidenciaNombre", danioEvidenciaSeleccionada.nombre);
    setText("danioEvidenciaTipo", danioEvidenciaSeleccionada.tipo);

    // El backend futuro generará la ruta persistible para strUrlEvidencia.
    const ruta = document.getElementById("danio-strUrlEvidencia");
    if (ruta) ruta.value = "";
    actualizarVistaPreviaDanioAccidente();
}

// Comprueba las reglas funcionales de /Vehiculos/DaniosAccidentes antes de permitir la captura simulada.
function validarArchivoEvidenciaDanioAccidente(archivo) {
    const extension = archivo.name.split(".").pop()?.toLowerCase() || "";
    const extensiones = ["pdf", "jpg", "jpeg", "png", "webp"];
    const tipos = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!extensiones.includes(extension) || (archivo.type && !tipos.includes(archivo.type))) {
        mostrarErrorEvidenciaDanioAccidente("Selecciona un archivo PDF, JPG, JPEG, PNG o WEBP.");
        return false;
    }
    if (archivo.size > 5 * 1024 * 1024) {
        mostrarErrorEvidenciaDanioAccidente("El archivo no debe superar 5 MB.");
        return false;
    }
    return true;
}

// Expone el mensaje y estado visual de error del componente correspondiente en /Vehiculos/DaniosAccidentes.
function mostrarErrorEvidenciaDanioAccidente(mensaje) {
    document.getElementById("danioEvidenciaArea")?.classList.add("is-invalid");
    const error = document.getElementById("danioEvidenciaArchivoError");
    if (error) {
        error.textContent = mensaje;
        error.classList.add("d-block");
    }
}

// Retira el estado visual de error del componente correspondiente en /Vehiculos/DaniosAccidentes.
function limpiarErrorEvidenciaDanioAccidente() {
    document.getElementById("danioEvidenciaArea")?.classList.remove("is-invalid");
    const error = document.getElementById("danioEvidenciaArchivoError");
    if (error) {
        error.textContent = "";
        error.classList.remove("d-block");
    }
}

// Restablece controles y estado visual de /Vehiculos/DaniosAccidentes sin modificar sus datos simulados de consulta.
function limpiarEvidenciaDanioAccidente() {
    danioEvidenciaSeleccionada = null;
    const input = document.getElementById("danioEvidenciaArchivo");
    const ruta = document.getElementById("danio-strUrlEvidencia");
    if (input) input.value = "";
    if (ruta) ruta.value = "";
    const prompt = document.getElementById("danioEvidenciaPrompt");
    const seleccion = document.getElementById("danioEvidenciaSeleccionada");
    if (prompt) prompt.hidden = false;
    if (seleccion) seleccion.hidden = true;
    limpiarErrorEvidenciaDanioAccidente();
}

// Valida columnas NOT NULL y conserva las reglas condicionales de campos NULL.
function validarFormularioDanioAccidente(form) {
    const idsObligatorios = [
        "danio-idVehDatosGenerales",
        "danio-idEmpEmpleado",
        "danio-dteFechaEvento",
        "danio-strDescripcion",
        "danio-idVehCatStatus"
    ];
    let valido = true;
    idsObligatorios.forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoDanioAccidente(campo)) valido = false;
    });

    ["danio-strUbicacion", "danio-mnyMontoReparacion", "danio-strObservaciones"].forEach(id => {
        const campo = document.getElementById(id);
        if (campo?.value && !validarCampoDanioAccidente(campo)) valido = false;
    });

    const booleano = document.getElementById("danio-bitCubiertoPorSeguro")?.value;
    if (!["true", "false"].includes(booleano)) valido = false;
    const poliza = document.getElementById("danio-idVehSeguro");
    if (document.getElementById("danioSeguroSwitch")?.checked && poliza && !validarCampoDanioAccidente(poliza)) valido = false;
    if (document.getElementById("danioEvidenciaArea")?.classList.contains("is-invalid")) valido = false;

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

// Evalúa un control individual de /Vehiculos/DaniosAccidentes y aplica las clases Bootstrap de validación.
function validarCampoDanioAccidente(campo) {
    const valor = String(campo.value || "").trim();
    let mensaje = "";
    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción válida." : "Este campo es obligatorio.";
    }

    if (!mensaje) {
        switch (campo.id) {
            case "danio-idVehDatosGenerales":
                if (valor && !danioVehiculosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un vehículo válido.";
                break;
            case "danio-idEmpEmpleado":
                if (valor && !danioEmpleadosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un empleado válido.";
                break;
            case "danio-idVehCatStatus":
                if (valor && !danioStatusSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un estatus válido.";
                break;
            case "danio-idVehSeguro":
                if (document.getElementById("danioSeguroSwitch")?.checked &&
                    !danioSegurosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona una póliza válida.";
                break;
            case "danio-dteFechaEvento": {
                const fecha = crearFechaLocalServicio(valor);
                const limite = new Date();
                limite.setHours(0, 0, 0, 0);
                limite.setDate(limite.getDate() + 1);
                if (valor && (!fecha || fecha > limite)) mensaje = "El evento no puede ser posterior al día de mañana.";
                break;
            }
            case "danio-strDescripcion":
                if (valor.length > 500) mensaje = "La descripción admite máximo 500 caracteres.";
                break;
            case "danio-strUbicacion":
                if (valor.length > 300) mensaje = "La ubicación admite máximo 300 caracteres.";
                break;
            case "danio-mnyMontoReparacion": {
                const numero = Number(valor);
                if (valor && (!Number.isFinite(numero) || numero < 0 || numero > 999999)) mensaje = "El monto debe estar entre $0.00 y $999,999.00.";
                break;
            }
            case "danio-strObservaciones":
                if (valor.length > 500) mensaje = "Las observaciones admiten máximo 500 caracteres.";
                break;
        }
    }

    if (mensaje) {
        mostrarErrorCampo(campo, mensaje);
        return false;
    }
    limpiarErrorCampo(campo);
    if (campo.required) campo.classList.add("is-valid");
    return true;
}

// Sincroniza datos calculados o elementos dependientes dentro de /Vehiculos/DaniosAccidentes.
function actualizarVehiculoDanioAccidente() {
    const vehiculo = obtenerVehiculoDanioSeleccionado();
    const card = document.getElementById("danioVehiculoCard");
    if (card) card.hidden = !vehiculo;
    if (!vehiculo) return;

    setText("danioVehiculoPlaca", vehiculo.strPlaca);
    setText("danioVehiculoMarca", vehiculo.marca);
    setText("danioVehiculoModelo", vehiculo.strModelo);
    setText("danioVehiculoAnio", String(vehiculo.intAnio));
    setText("danioVehiculoKilometraje", `${vehiculo.decKilometrajeActual.toLocaleString("es-MX")} km`);
}

// Refleja textos visibles y valores simulados en el resumen lateral.
function actualizarVistaPreviaDanioAccidente() {
    const vehiculo = obtenerVehiculoDanioSeleccionado();
    const empleado = danioEmpleadosSimulados.find(item => item.id === Number(document.getElementById("danio-idEmpEmpleado")?.value));
    const poliza = danioSegurosSimulados.find(item => item.id === Number(document.getElementById("danio-idVehSeguro")?.value));
    const textoSelect = id => {
        const option = document.getElementById(id)?.selectedOptions?.[0];
        return option?.value ? option.textContent.trim() : "";
    };
    const valor = id => document.getElementById(id)?.value?.trim() || "";
    const cubierto = Boolean(document.getElementById("danioSeguroSwitch")?.checked);
    const status = textoSelect("danio-idVehCatStatus") || "Reportado";

    setText("previewDanioVehiculo", vehiculo ? `${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}` : "Sin seleccionar");
    setText("previewDanioPlaca", vehiculo?.strPlaca || "—");
    setText("previewDanioEmpleado", empleado?.nombreCompleto || "Sin seleccionar");
    setText("previewDanioFecha", formatearFechaServicio(valor("danio-dteFechaEvento")) || "—");
    setText("previewDanioDescripcion", valor("danio-strDescripcion") || "Sin descripción");
    setText("previewDanioUbicacion", valor("danio-strUbicacion") || "No especificada");
    setText("previewDanioMonto", formatearMonedaServicio(valor("danio-mnyMontoReparacion")));
    setText("previewDanioSeguro", cubierto ? "Sí" : "No");
    setText("previewDanioPoliza", cubierto && poliza ? `${poliza.aseguradora} · ${poliza.numeroPoliza}` : "No aplica");
    setText("previewDanioEvidencia", danioEvidenciaSeleccionada?.nombre || "Sin archivo");
    setText("previewDanioObservaciones", valor("danio-strObservaciones") || "Sin observaciones");
    actualizarBadgeDanioAccidente(document.getElementById("previewDanioEstatus"), status);
}

// Restablece defaults, errores, póliza, evidencia, contadores y resumen.
function limpiarFormularioDanioAccidente(form) {
    form.reset();
    cargarCatalogosDaniosAccidentesSimulados();
    inicializarFechaDanioAccidente();
    limpiarEvidenciaDanioAccidente();
    form.querySelectorAll(".is-invalid, .is-valid").forEach(campo => limpiarErrorCampo(campo));
    const card = document.getElementById("danioVehiculoCard");
    if (card) card.hidden = true;
    actualizarSeguroDanioAccidente();
    actualizarContadoresDanioAccidente();
    actualizarVistaPreviaDanioAccidente();
}

// Construye el HTML dinámico de /Vehiculos/DaniosAccidentes a partir de datos simulados y textos escapados.
function renderizarDaniosRecientes() {
    const body = document.getElementById("daniosRecientesBody");
    if (!body) return;
    body.innerHTML = daniosRecientesSimulados.map(evento => `<tr>
        <td class="font-weight-700">${escapeHtml(evento.vehiculo)}</td>
        <td>${escapeHtml(evento.placa)}</td>
        <td>${escapeHtml(evento.empleado)}</td>
        <td>${escapeHtml(formatearFechaServicio(evento.fecha))}</td>
        <td><span class="danio-table-description" title="${escapeHtml(evento.descripcion)}">${escapeHtml(evento.descripcion)}</span></td>
        <td>${evento.ubicacion ? escapeHtml(evento.ubicacion) : '<span class="text-muted">No especificada</span>'}</td>
        <td>${evento.monto === null ? '<span class="text-muted">Sin estimar</span>' : formatearMonedaServicio(evento.monto)}</td>
        <td>${escapeHtml(evento.seguro)}</td>
        <td>${crearBadgeDanioHtml(evento.status)}</td>
        <td>${evento.evidencia ? `<span class="documento-file-link">${escapeHtml(evento.evidencia)}</span>` : '<span class="text-muted">Sin archivo</span>'}</td>
        <td class="text-end">
            <div class="dropdown actions-dropdown d-inline-block">
                <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false">Acciones</button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><button class="dropdown-item veh-table-action-primary" type="button" onclick="mostrarAccionDanioDemo('Ver')">Ver</button></li>
                    <li><button class="dropdown-item veh-table-action-secondary" type="button" onclick="mostrarAccionDanioDemo('Editar')">Editar</button></li>
                    <li><button class="dropdown-item veh-table-action-success" type="button" onclick="mostrarAccionDanioDemo('Marcar resuelto')">Marcar resuelto</button></li>
                    <li><button class="dropdown-item veh-table-action-danger" type="button" onclick="mostrarAccionDanioDemo('Cancelar')">Cancelar</button></li>
                </ul>
            </div>
        </td>
    </tr>`).join("");
}

// Muestra una confirmación informativa para una acción todavía no conectada al backend de /Vehiculos/DaniosAccidentes.
function mostrarAccionDanioDemo(accion) {
    Swal.fire({ icon: "info", title: accion, text: "Esta acción se conectará cuando exista el backend de daños y accidentes.", confirmButtonColor: "var(--teal-cavex)" });
}

// Actualiza texto y clase del badge del evento sin modificar su valor funcional.
function actualizarBadgeDanioAccidente(elemento, status) {
    if (!elemento) return;
    elemento.textContent = status;
    elemento.className = `danio-status ${claseStatusDanio(status)}`;
}

// Construye el badge HTML escapando el estatus usado en la tabla simulada de daños.
function crearBadgeDanioHtml(status) {
    return `<span class="danio-status ${claseStatusDanio(status)}">${escapeHtml(status)}</span>`;
}

// Traduce un estatus de /Vehiculos/DaniosAccidentes a la clase visual correspondiente sin alterar el valor original.
function claseStatusDanio(status) {
    const clases = {
        "Reportado": "danio-status-reported",
        "En revisión": "danio-status-review",
        "En reparación": "danio-status-repair",
        "Resuelto": "danio-status-resolved",
        "Cancelado": "danio-status-cancelled"
    };
    return clases[status] || "danio-status-cancelled";
}

// Localiza el registro o elemento activo utilizado por /Vehiculos/DaniosAccidentes sin modificarlo.
function obtenerVehiculoDanioSeleccionado() {
    const id = Number(document.getElementById("danio-idVehDatosGenerales")?.value);
    return danioVehiculosSimulados.find(vehiculo => vehiculo.id === id) || null;
}

// Vehículos simulados con la proyección requerida de VehDatosGenerales.
// TODO backend: reemplazar este arreglo por GET /api/vehiculos.
const asignacionVehiculosSimulados = [
    { id: 1, strPlaca: "ABC-123-D", marca: "Toyota", strModelo: "RAV4", intAnio: 2021, decKilometrajeActual: 45230 },
    { id: 2, strPlaca: "XYZ-987-A", marca: "Nissan", strModelo: "Versa", intAnio: 2020, decKilometrajeActual: 38600 }
];

// Empleados simulados con contexto operativo; solo idEmpEmpleado se guarda en la asignación.
// TODO backend: reemplazar este arreglo por GET /api/empleados.
const asignacionEmpleadosSimulados = [
    { id: 1, nombreCompleto: "Juan Pérez López", area: "Operaciones", puesto: "Chofer" },
    { id: 2, nombreCompleto: "Carlos Hernández Ruiz", area: "Mantenimiento", puesto: "Supervisor" },
    { id: 3, nombreCompleto: "María González Torres", area: "Administración", puesto: "Administradora" }
];

// Registros para la tabla hasta implementar GET /api/vehiculos/asignaciones/{idVehDatosGenerales}.
const asignacionesRecientesSimuladas = [
    { vehiculo: "Toyota RAV4 2021", placa: "ABC-123-D", empleado: "Juan Pérez López", area: "Operaciones", fecha: "2026-06-29", inicial: 45230, final: null, total: null },
    { vehiculo: "Nissan Versa 2020", placa: "XYZ-987-A", empleado: "Carlos Hernández Ruiz", area: "Mantenimiento", fecha: "2026-06-24", inicial: 38120, final: 38600, total: 480 },
    { vehiculo: "Toyota RAV4 2021", placa: "ABC-123-D", empleado: "María González Torres", area: "Administración", fecha: "2026-06-18", inicial: 44890, final: 44820, total: -70 },
    { vehiculo: "Nissan Versa 2020", placa: "XYZ-987-A", empleado: "Juan Pérez López", area: "Operaciones", fecha: "2026-06-12", inicial: 37400, final: 38120, total: 720 }
];

// Inicializa exclusivamente /Vehiculos/Asignaciones.
function inicializarAsignacionesVehiculo() {
    const form = document.getElementById("asignacionVehiculoForm");
    if (!form) return;

    cargarCatalogosAsignacionesSimulados();
    inicializarFechaAsignacion();
    renderizarAsignacionesRecientes();

    form.querySelectorAll("input:not([readonly]), select").forEach(campo => {
        ["input", "change"].forEach(evento => campo.addEventListener(evento, () => {
            const teniaError = campo.classList.contains("is-invalid");
            limpiarErrorCampo(campo);

            if (campo.id === "asignacion-idVehDatosGenerales") actualizarVehiculoAsignacion(true);
            if (campo.id === "asignacion-idEmpEmpleado") actualizarEmpleadoAsignacion();
            if (campo.id === "asignacion-decKilometrajeInicial" || campo.id === "asignacion-decKilometrajeFinal") {
                calcularKilometrajeTotalAsignacion();
            }
            if (teniaError) validarCampoAsignacion(campo);
            actualizarVistaPreviaAsignacion();
        }));

        campo.addEventListener("blur", () => {
            if (campo.required || campo.value) validarCampoAsignacion(campo);
            calcularKilometrajeTotalAsignacion();
            actualizarVistaPreviaAsignacion();
        });
    });

    document.getElementById("btnLimpiarAsignacion")?.addEventListener("click", () => limpiarFormularioAsignacion(form));
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioAsignacion(form)) {
            Swal.fire({
                icon: "warning",
                title: "Formulario incompleto",
                text: "Revisa los campos marcados antes de guardar.",
                confirmButtonColor: "var(--teal-cavex)"
            });
            return;
        }

        // TODO backend: enviar los campos a POST /api/vehiculos/asignaciones.
        Swal.fire({
            icon: "success",
            title: "Asignación validada correctamente",
            text: "Esta captura aún no se guarda en base de datos.",
            confirmButtonColor: "var(--teal-cavex)"
        });
    });

    actualizarVehiculoAsignacion(false);
    actualizarEmpleadoAsignacion();
    calcularKilometrajeTotalAsignacion();
    actualizarVistaPreviaAsignacion();
}

// Llena los selects con ids reales como value y etiquetas operativas como texto visible.
function cargarCatalogosAsignacionesSimulados() {
    llenarSelectAsignacion("asignacion-idVehDatosGenerales", asignacionVehiculosSimulados, vehiculo =>
        `${vehiculo.strPlaca} · ${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}`);
    llenarSelectAsignacion("asignacion-idEmpEmpleado", asignacionEmpleadosSimulados, empleado =>
        `${empleado.nombreCompleto} · ${empleado.area} · ${empleado.puesto}`);
}

// Puebla selects de /Vehiculos/Asignaciones con datos simulados; un catálogo del backend sustituirá esta fuente.
function llenarSelectAsignacion(id, registros, obtenerTexto) {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value="">Seleccionar...</option>';
    registros.forEach(registro => {
        const option = document.createElement("option");
        option.value = String(registro.id);
        option.textContent = obtenerTexto(registro);
        select.appendChild(option);
    });
}

// La fecha inicia hoy y solo admite hasta el día de mañana.
function inicializarFechaAsignacion() {
    const fecha = document.getElementById("asignacion-dteFechaAsigncion");
    if (!fecha) return;
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);
    fecha.value = fechaIsoLocalLlanta(hoy);
    fecha.max = fechaIsoLocalLlanta(manana);
}

// Muestra la unidad elegida y sugiere su odómetro como kilometraje inicial.
function actualizarVehiculoAsignacion(sugerirKilometraje = false) {
    const vehiculo = obtenerVehiculoAsignacionSeleccionado();
    const card = document.getElementById("asignacionVehiculoCard");
    if (card) card.hidden = !vehiculo;
    if (!vehiculo) return;

    setText("asignacionVehiculoPlaca", vehiculo.strPlaca);
    setText("asignacionVehiculoMarca", vehiculo.marca);
    setText("asignacionVehiculoModelo", vehiculo.strModelo);
    setText("asignacionVehiculoAnio", String(vehiculo.intAnio));
    setText("asignacionVehiculoKilometraje", `${vehiculo.decKilometrajeActual.toLocaleString("es-MX")} km`);

    if (sugerirKilometraje) {
        const inicial = document.getElementById("asignacion-decKilometrajeInicial");
        const final = document.getElementById("asignacion-decKilometrajeFinal");
        if (inicial) inicial.value = String(vehiculo.decKilometrajeActual);
        if (final) final.value = "";
        calcularKilometrajeTotalAsignacion();
    }
}

// Presenta nombre, área y puesto sin convertirlos en campos de VehAsignacionVehiculos.
function actualizarEmpleadoAsignacion() {
    const empleado = obtenerEmpleadoAsignacionSeleccionado();
    const card = document.getElementById("asignacionEmpleadoCard");
    if (card) card.hidden = !empleado;
    if (!empleado) return;

    setText("asignacionEmpleadoNombre", empleado.nombreCompleto);
    setText("asignacionEmpleadoArea", empleado.area);
    setText("asignacionEmpleadoPuesto", empleado.puesto);
}

// Calcula decKilometrajeTotal sin permitir resultados negativos.
function calcularKilometrajeTotalAsignacion() {
    const inicialTexto = document.getElementById("asignacion-decKilometrajeInicial")?.value ?? "";
    const finalTexto = document.getElementById("asignacion-decKilometrajeFinal")?.value ?? "";
    const total = document.getElementById("asignacion-decKilometrajeTotal");
    if (!total) return null;

    if (!finalTexto) {
        total.value = "";
        return null;
    }

    const inicial = Number(inicialTexto);
    const final = Number(finalTexto);
    if (!Number.isFinite(inicial) || !Number.isFinite(final) || final < inicial) {
        total.value = "";
        return null;
    }

    const recorrido = final - inicial;
    total.value = String(recorrido);
    return recorrido;
}

// Ejecuta reglas NOT NULL y valida los kilometrajes NULL cuando se capturan.
function validarFormularioAsignacion(form) {
    const obligatorios = [
        "asignacion-idVehDatosGenerales",
        "asignacion-idEmpEmpleado",
        "asignacion-dteFechaAsigncion",
        "asignacion-decKilometrajeInicial"
    ];
    let valido = true;
    obligatorios.forEach(id => {
        const campo = document.getElementById(id);
        if (campo && !validarCampoAsignacion(campo)) valido = false;
    });

    const final = document.getElementById("asignacion-decKilometrajeFinal");
    if (final?.value && !validarCampoAsignacion(final)) valido = false;
    calcularKilometrajeTotalAsignacion();

    const total = document.getElementById("asignacion-decKilometrajeTotal");
    if (total?.value && Number(total.value) < 0) valido = false;

    const primerError = form.querySelector(".is-invalid");
    if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof primerError.focus === "function") primerError.focus({ preventScroll: true });
    }
    return valido;
}

// Evalúa un control individual de /Vehiculos/Asignaciones y aplica las clases Bootstrap de validación.
function validarCampoAsignacion(campo) {
    const valor = String(campo.value || "").trim();
    let mensaje = "";
    if (campo.required && !valor) {
        mensaje = campo.tagName === "SELECT" ? "Selecciona una opción válida." : "Este campo es obligatorio.";
    }

    if (!mensaje) {
        switch (campo.id) {
            case "asignacion-idVehDatosGenerales":
                if (valor && !asignacionVehiculosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un vehículo válido.";
                break;
            case "asignacion-idEmpEmpleado":
                if (valor && !asignacionEmpleadosSimulados.some(item => item.id === Number(valor))) mensaje = "Selecciona un empleado válido.";
                break;
            case "asignacion-dteFechaAsigncion": {
                const fecha = crearFechaLocalServicio(valor);
                const limite = new Date();
                limite.setHours(0, 0, 0, 0);
                limite.setDate(limite.getDate() + 1);
                if (valor && (!fecha || fecha > limite)) mensaje = "La asignación no puede ser posterior al día de mañana.";
                break;
            }
            case "asignacion-decKilometrajeInicial": {
                const numero = Number(valor);
                const vehiculo = obtenerVehiculoAsignacionSeleccionado();
                if (valor && (!Number.isInteger(numero) || numero < 0 || numero > 999999)) mensaje = "El kilometraje inicial debe ser un entero entre 0 y 999999.";
                else if (vehiculo && numero < vehiculo.decKilometrajeActual) mensaje = `No puede ser menor a ${vehiculo.decKilometrajeActual.toLocaleString("es-MX")} km.`;
                break;
            }
            case "asignacion-decKilometrajeFinal": {
                const numero = Number(valor);
                const inicial = Number(document.getElementById("asignacion-decKilometrajeInicial")?.value);
                if (valor && (!Number.isInteger(numero) || numero < 0 || numero > 999999)) mensaje = "El kilometraje final debe ser un entero entre 0 y 999999.";
                else if (valor && Number.isFinite(inicial) && numero < inicial) mensaje = "El kilometraje final debe ser igual o mayor al inicial.";
                break;
            }
        }
    }

    if (mensaje) {
        mostrarErrorCampo(campo, mensaje);
        return false;
    }
    limpiarErrorCampo(campo);
    if (campo.required) campo.classList.add("is-valid");
    return true;
}

// Refleja la asignación en vivo usando textos visibles, no ids.
function actualizarVistaPreviaAsignacion() {
    const vehiculo = obtenerVehiculoAsignacionSeleccionado();
    const empleado = obtenerEmpleadoAsignacionSeleccionado();
    const inicial = numeroAsignacion("asignacion-decKilometrajeInicial");
    const finalTexto = document.getElementById("asignacion-decKilometrajeFinal")?.value || "";
    const final = Number(finalTexto);
    const totalTexto = document.getElementById("asignacion-decKilometrajeTotal")?.value || "";
    const total = Number(totalTexto);

    setText("previewAsignacionVehiculo", vehiculo ? `${vehiculo.marca} ${vehiculo.strModelo} ${vehiculo.intAnio}` : "Sin seleccionar");
    setText("previewAsignacionPlaca", vehiculo?.strPlaca || "—");
    setText("previewAsignacionEmpleado", empleado?.nombreCompleto || "Sin seleccionar");
    setText("previewAsignacionArea", empleado?.area || "—");
    setText("previewAsignacionFecha", formatearFechaServicio(document.getElementById("asignacion-dteFechaAsigncion")?.value) || "—");
    setText("previewAsignacionKmInicial", `${inicial.toLocaleString("es-MX")} km`);
    setText("previewAsignacionKmFinal", finalTexto ? `${final.toLocaleString("es-MX")} km` : "Sin capturar");
    setText("previewAsignacionKmTotal", totalTexto ? `${total.toLocaleString("es-MX")} km` : "0 km");
}

// Limpia los campos y restablece fecha, cards, cálculo, errores y resumen.
function limpiarFormularioAsignacion(form) {
    form.reset();
    cargarCatalogosAsignacionesSimulados();
    inicializarFechaAsignacion();
    form.querySelectorAll(".is-invalid, .is-valid").forEach(campo => limpiarErrorCampo(campo));
    const cardVehiculo = document.getElementById("asignacionVehiculoCard");
    const cardEmpleado = document.getElementById("asignacionEmpleadoCard");
    if (cardVehiculo) cardVehiculo.hidden = true;
    if (cardEmpleado) cardEmpleado.hidden = true;
    calcularKilometrajeTotalAsignacion();
    actualizarVistaPreviaAsignacion();
}

// Construye el HTML dinámico de /Vehiculos/Asignaciones a partir de datos simulados y textos escapados.
function renderizarAsignacionesRecientes() {
    const body = document.getElementById("asignacionesRecientesBody");
    if (!body) return;
    body.innerHTML = asignacionesRecientesSimuladas.map(asignacion => {
        const estado = obtenerEstadoVisualAsignacion(asignacion);
        return `<tr>
            <td class="font-weight-700">${escapeHtml(asignacion.vehiculo)}</td>
            <td>${escapeHtml(asignacion.placa)}</td>
            <td>${escapeHtml(asignacion.empleado)}</td>
            <td>${escapeHtml(asignacion.area)}</td>
            <td>${escapeHtml(formatearFechaServicio(asignacion.fecha))}</td>
            <td>${asignacion.inicial.toLocaleString("es-MX")} km</td>
            <td>${asignacion.final === null ? '<span class="text-muted">Sin cerrar</span>' : `${asignacion.final.toLocaleString("es-MX")} km`}</td>
            <td>${asignacion.total === null ? '<span class="text-muted">—</span>' : `${asignacion.total.toLocaleString("es-MX")} km`}</td>
            <td><span class="asignacion-status ${claseEstadoVisualAsignacion(estado)}">${estado}</span></td>
            <td class="text-end">
                <div class="dropdown actions-dropdown d-inline-block">
                    <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false">Acciones</button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><button class="dropdown-item veh-table-action-primary" type="button" onclick="mostrarAccionAsignacionDemo('Ver')">Ver</button></li>
                        <li><button class="dropdown-item veh-table-action-secondary" type="button" onclick="mostrarAccionAsignacionDemo('Editar')">Editar</button></li>
                        <li><button class="dropdown-item veh-table-action-success" type="button" onclick="mostrarAccionAsignacionDemo('Cerrar asignación')">Cerrar asignación</button></li>
                        <li><button class="dropdown-item veh-table-action-danger" type="button" onclick="mostrarAccionAsignacionDemo('Cancelar')">Cancelar</button></li>
                    </ul>
                </div>
            </td>
        </tr>`;
    }).join("");
}

// Deriva un estado exclusivamente visual comparando kilometrajes inicial y final.
function obtenerEstadoVisualAsignacion(asignacion) {
    if (asignacion.final === null) return "Activa";
    if (asignacion.final < asignacion.inicial) return "Revisar";
    return "Cerrada";
}

// Traduce un estatus de /Vehiculos/Asignaciones a la clase visual correspondiente sin alterar el valor original.
function claseEstadoVisualAsignacion(estado) {
    const clases = { "Activa": "asignacion-status-active", "Cerrada": "asignacion-status-closed", "Revisar": "asignacion-status-review" };
    return clases[estado] || "asignacion-status-review";
}

// Muestra una confirmación informativa para una acción todavía no conectada al backend de /Vehiculos/Asignaciones.
function mostrarAccionAsignacionDemo(accion) {
    Swal.fire({ icon: "info", title: accion, text: "Esta acción se conectará cuando exista el backend de asignaciones.", confirmButtonColor: "var(--teal-cavex)" });
}

// Localiza el registro o elemento activo utilizado por /Vehiculos/Asignaciones sin modificarlo.
function obtenerVehiculoAsignacionSeleccionado() {
    const id = Number(document.getElementById("asignacion-idVehDatosGenerales")?.value);
    return asignacionVehiculosSimulados.find(vehiculo => vehiculo.id === id) || null;
}

// Localiza el registro o elemento activo utilizado por /Vehiculos/Asignaciones sin modificarlo.
function obtenerEmpleadoAsignacionSeleccionado() {
    const id = Number(document.getElementById("asignacion-idEmpEmpleado")?.value);
    return asignacionEmpleadosSimulados.find(empleado => empleado.id === id) || null;
}

// Convierte el valor del control de /Vehiculos/Asignaciones a un número seguro para cálculos visuales.
function numeroAsignacion(id) {
    const numero = Number(document.getElementById(id)?.value || 0);
    return Number.isFinite(numero) ? numero : 0;
}
