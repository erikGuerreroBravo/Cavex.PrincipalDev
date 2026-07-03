let services = [];
let statusCatalog = [];
let editingId = null;
let currentPage = 1;
let pageSize = 10;
let statusFilter = "";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", async () => {
    wireFormInputs();
    await loadStatusOptions();
    await loadServicesFromServer();
    resetForm();
});

async function loadStatusOptions() {
    const statusField = document.getElementById("intIdStatus");
    if (statusField) {
        statusField.innerHTML = '<option value="">-- Seleccionar Estado --</option>';
    }

    try {
        const response = await fetch("/Servicios/GetStatus", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        const result = await response.json();

        if (!result.success) {
            showError(result.message || "No fue posible cargar los estatus.");
            renderStatusTabs();
            return;
        }

        statusCatalog = (result.data || []).map(status => ({
            id: status.id ?? status.Id,
            nombre: status.strValor || status.StrValor || `Estatus ${status.id ?? status.Id}`,
            descripcion: status.strDescripcion || status.StrDescripcion || ""
        }));

        if (statusField) {
            statusCatalog.forEach(status => {
                const option = document.createElement("option");
                option.value = status.id;
                option.textContent = status.nombre;
                statusField.appendChild(option);
            });
        }

        renderStatusTabs();
    } catch (error) {
        console.error(error);
        showError("Ocurrio un error al cargar los estatus.");
        renderStatusTabs();
    }
}

async function loadServicesFromServer() {
    try {
        const response = await fetch("/Servicios/GetServices", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        const result = await response.json();

        if (!result.success) {
            showError(result.message || "No fue posible cargar los servicios.");
            services = [];
            renderStatusTabs();
            renderServices();
            return;
        }

        services = (result.data || []).map(item => {
            const idCatStatus = item.idCatStatus ?? item.IdCatStatus;

            return {
                id: item.id ?? item.Id,
                nombre: item.strValor || item.StrValor || "",
                descripcion: item.strDescripcion || item.StrDescripcion || "",
                idCatStatus: idCatStatus === null || idCatStatus === undefined ? "" : String(idCatStatus),
                strCatStatus: item.strCatStatus || item.StrCatStatus || ""
            };
        });

        renderStatusTabs();
        renderServices();
    } catch (error) {
        console.error(error);
        showError("Ocurrio un error al cargar los servicios.");
        services = [];
        renderStatusTabs();
        renderServices();
    }
}

function wireFormInputs() {
    const nombreInput = document.getElementById("strNombre");
    const descInput = document.getElementById("strDescripcion");
    const statusField = document.getElementById("intIdStatus");

    if (nombreInput) {
        nombreInput.addEventListener("input", () => {
            const originalVal = nombreInput.value;
            const cleanedVal = typeof sanitizeLettersOnly === "function"
                ? sanitizeLettersOnly(originalVal)
                : originalVal.replace(/[^a-zA-Z0-9#.\-\s]/g, "");

            if (originalVal !== cleanedVal) {
                const start = nombreInput.selectionStart;
                const end = nombreInput.selectionEnd;
                nombreInput.value = cleanedVal;
                try {
                    nombreInput.setSelectionRange(start, end);
                } catch (err) { }
            }

            nombreInput.classList.remove("is-invalid", "is-valid");
        });

        nombreInput.addEventListener("blur", () => {
            nombreInput.value = nombreInput.value.trim();
        });
    }

    if (descInput) {
        descInput.addEventListener("input", () => {
            const originalVal = descInput.value;
            const cleanedVal = typeof sanitizeGeneralText === "function"
                ? sanitizeGeneralText(originalVal)
                : originalVal.replace(/[^a-zA-Z0-9#.,_()\/\-\s]/g, "");

            if (originalVal !== cleanedVal) {
                const start = descInput.selectionStart;
                const end = descInput.selectionEnd;
                descInput.value = cleanedVal;
                try {
                    descInput.setSelectionRange(start, end);
                } catch (err) { }
            }

            descInput.classList.remove("is-invalid", "is-valid");
        });

        descInput.addEventListener("blur", () => {
            descInput.value = descInput.value.trim();
        });
    }

    if (statusField) {
        statusField.addEventListener("change", () => {
            statusField.classList.remove("is-invalid", "is-valid");
        });
    }
}

function renderStatusTabs() {
    const tabsContainer = document.getElementById("statusTabs");
    if (!tabsContainer) return;

    tabsContainer.innerHTML = "";
    tabsContainer.appendChild(createStatusTab("", "Todos", services.length));

    statusCatalog.forEach(status => {
        const count = services.filter(s => s.idCatStatus === String(status.id)).length;
        tabsContainer.appendChild(createStatusTab(String(status.id), status.nombre, count));
    });
}

function createStatusTab(value, text, count) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab-item ${statusFilter === value ? "active" : ""}`;
    button.onclick = () => setStatusFilter(value);
    button.innerHTML = `${escapeHtml(text)} <span class="tab-count count-all">${count}</span>`;
    return button;
}

function renderServices() {
    const tbody = document.getElementById("servicesTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    const filtered = services.filter(service => {
        if (statusFilter && service.idCatStatus !== statusFilter) return false;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return service.nombre.toLowerCase().includes(query)
                || (service.descripcion || "").toLowerCase().includes(query)
                || getStatusName(service).toLowerCase().includes(query);
        }

        return true;
    });

    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalRecords);
    const pagedList = filtered.slice(startIndex, endIndex);

    if (pagedList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-5">
                    <div class="text-muted">
                        <p class="m-0 font-weight-700">No se encontraron servicios</p>
                        <small>Prueba ajustando los filtros o la busqueda</small>
                    </div>
                </td>
            </tr>`;
    } else {
        pagedList.forEach(service => {
            const tr = document.createElement("tr");
            const statusName = getStatusName(service);
            const descText = service.descripcion || "Sin descripcion";
            const truncatedDesc = descText.length > 60 ? `${descText.substring(0, 60)}...` : descText;

            tr.innerHTML = `
                <td>
                    <div class="cotizacion-main-text">${escapeHtml(service.nombre)}</div>
                </td>
                <td>
                    <div class="description-text" title="${escapeHtml(descText)}">${escapeHtml(truncatedDesc)}</div>
                </td>
                <td>
                    <span class="${getStatusBadgeClass(statusName)}">${escapeHtml(statusName)}</span>
                </td>
                <td class="text-end">
                    <div class="dropdown actions-dropdown d-inline-block">
                        <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false">
                            <span>Acciones</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <button class="dropdown-item d-flex align-items-center" type="button" onclick="editService(${service.id})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Editar
                                </button>
                            </li>
                            <li>
                                <button class="dropdown-item d-flex align-items-center text-danger" type="button" onclick="deleteService(${service.id})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-danger"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                                    Dar de baja
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>`;

            tbody.appendChild(tr);
        });
    }

    setText(
        "paginationInfo",
        totalRecords > 0
            ? `Mostrando ${startIndex + 1}-${endIndex} de ${totalRecords} registros`
            : "Mostrando 0-0 de 0 registros"
    );

    const countPill = document.querySelector(".table-module .records-pill");
    if (countPill) countPill.textContent = `${totalRecords} servicios`;

    const extraPill = document.querySelector(".table-module .records-pill-soft");
    if (extraPill) extraPill.textContent = `Pagina ${currentPage} de ${totalPages}`;

    renderPagination(totalPages);

    // Inicializar dropdowns de acciones con estrategia 'fixed' para prevenir recortes
    document.querySelectorAll('#servicesTableBody .btn-action-trigger').forEach(el => {
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

function renderPagination(totalPages) {
    const paginationList = document.getElementById("paginationList");
    if (!paginationList) return;

    paginationList.innerHTML = "";
    if (totalPages <= 1) return;

    paginationList.appendChild(createPageItem("Anterior", currentPage - 1, currentPage === 1));

    for (let i = 1; i <= totalPages; i++) {
        paginationList.appendChild(createPageItem(String(i), i, false, currentPage === i));
    }

    paginationList.appendChild(createPageItem("Siguiente", currentPage + 1, currentPage === totalPages));
}

function createPageItem(text, page, disabled, active) {
    const li = document.createElement("li");
    li.className = `page-item ${disabled ? "disabled" : ""} ${active ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#" onclick="changePage(event, ${page})">${text}</a>`;
    return li;
}

function changePage(event, page) {
    if (event) event.preventDefault();
    currentPage = page;
    renderServices();
}

function setStatusFilter(statusId) {
    statusFilter = statusId || "";
    currentPage = 1;
    renderStatusTabs();
    renderServices();
}

function handleSearch(query) {
    searchQuery = query || "";
    currentPage = 1;
    renderServices();
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const nombreInput = document.getElementById("strNombre");
    const descInput = document.getElementById("strDescripcion");
    const statusField = document.getElementById("intIdStatus");

    if (!nombreInput) return;

    const nombre = nombreInput.value.trim();
    const descripcion = descInput ? descInput.value.trim() : "";
    const statusVal = statusField ? statusField.value : "";

    if (!nombre) {
        nombreInput.classList.add("is-invalid");
        nombreInput.classList.remove("is-valid");
        setText("nombreFeedback", "El nombre del servicio es obligatorio.");
        nombreInput.focus();
        return;
    }

    if (editingId !== null && !statusVal) {
        statusField.classList.add("is-invalid");
        setText("statusFeedback", "Selecciona un estatus.");
        statusField.focus();
        return;
    }

    const nombreLower = nombre.toLowerCase().trim();
    const existeDuplicado = services.some(s => s.nombre.toLowerCase().trim() === nombreLower && s.id !== editingId);

    if (existeDuplicado) {
        nombreInput.classList.add("is-invalid");
        nombreInput.classList.remove("is-valid");
        setText("nombreFeedback", "El nombre del servicio ya existe.");
        nombreInput.focus();
        return;
    }

    const payload = {
        id: editingId || 0,
        strValor: nombre,
        strDescripcion: descripcion,
        idCatStatus: editingId === null ? 1 : Number.parseInt(statusVal, 10)
    };

    const url = editingId === null
        ? "/Servicios/SaveService"
        : "/Servicios/UpdateService";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!result.success) {
            showError(result.message || "No fue posible guardar el servicio.");
            return;
        }

        Swal.fire({
            icon: "success",
            title: editingId === null ? "Registro exitoso" : "Actualizacion exitosa",
            text: editingId === null ? "Servicio agregado exitosamente." : "Servicio actualizado exitosamente.",
            confirmButtonColor: "var(--teal-cavex)"
        });

        resetForm();
        await loadServicesFromServer();
    } catch (error) {
        console.error(error);
        showError("Ocurrio un error al guardar el servicio.");
    }
}

function editService(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;

    clearValidation();
    editingId = id;

    document.getElementById("strNombre").value = service.nombre;

    const descInput = document.getElementById("strDescripcion");
    if (descInput) descInput.value = service.descripcion || "";

    const statusField = document.getElementById("intIdStatus");
    if (statusField) statusField.value = service.idCatStatus || "";

    const statusContainer = document.getElementById("statusContainer");
    if (statusContainer) statusContainer.style.display = "block";

    setText("formTitle", "Editar servicio");
    setText("formSubtitle", "Modifica los detalles del servicio seleccionado.");
    setText("btnSubmit", "Guardar cambios");

    const btnCancel = document.getElementById("btnCancel");
    if (btnCancel) btnCancel.style.display = "inline-block";

    const formCard = document.querySelector(".filter-card");
    if (formCard) formCard.scrollIntoView({ behavior: "smooth" });

    document.getElementById("strNombre").focus();
}

function deleteService(id) {
    Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertir esta accion.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar"
    }).then(async result => {
        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`/Servicios/DeleteService?id=${id}`, {
                method: "POST",
                headers: { "Accept": "application/json" }
            });

            const data = await response.json();

            if (!data.success) {
                showError(data.message || "No fue posible eliminar el servicio.");
                return;
            }

            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "El servicio ha sido eliminado exitosamente.",
                confirmButtonColor: "var(--teal-cavex)"
            });

            if (editingId === id) resetForm();
            await loadServicesFromServer();
        } catch (error) {
            console.error(error);
            showError("Ocurrio un error al eliminar el servicio.");
        }
    });
}

function resetForm() {
    editingId = null;
    clearValidation();

    const form = document.getElementById("formServicio");
    if (form) form.reset();

    setText("formTitle", "Registrar servicio");
    setText("formSubtitle", "Ingresa el nombre y la descripcion para registrar el servicio.");
    setText("btnSubmit", "Guardar servicio");

    const btnCancel = document.getElementById("btnCancel");
    if (btnCancel) btnCancel.style.display = "none";

    const statusContainer = document.getElementById("statusContainer");
    if (statusContainer) statusContainer.style.display = "none";
}

function clearValidation() {
    document.getElementById("strNombre")?.classList.remove("is-invalid", "is-valid");
    document.getElementById("strDescripcion")?.classList.remove("is-invalid", "is-valid");
    document.getElementById("intIdStatus")?.classList.remove("is-invalid", "is-valid");
}

function getStatusName(service) {
    if (service.strCatStatus) return service.strCatStatus;

    const status = statusCatalog.find(item => String(item.id) === service.idCatStatus);
    return status ? status.nombre : "Sin estatus";
}

function getStatusBadgeClass(statusName) {
    const normalized = (statusName || "").toLowerCase();
    return normalized.includes("baja") || normalized.includes("inactivo") || normalized.includes("cancel")
        ? "badge-danger"
        : "badge-active";
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function showError(message) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        confirmButtonColor: "var(--teal-cavex)"
    });
}

function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
