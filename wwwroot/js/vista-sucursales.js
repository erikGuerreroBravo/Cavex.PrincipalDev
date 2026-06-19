// Variables locales para sucursales (Manejo local/en memoria para la interfaz de usuario)
let sucursales = [
    // Puedes inicializarlo vacío o con datos de prueba locales
    { id: 1, nombre: "Sucursal Norte", descripcion: "Av. Industrial #100", idCatStatus: "1", activo: true },
    { id: 2, nombre: "Sucursal Sur", descripcion: "Calzada de la Viga #450", idCatStatus: "2002", activo: false }
];
let editingId = null;

// Variables de paginación y filtros
let currentPage = 1;
let pageSize = 10;
let statusFilter = 'todos';
let searchQuery = '';
  

// Renderizado inicial de la tabla
document.addEventListener('DOMContentLoaded', () => {
    renderSucursales();
    
    // Elementos de la vista
    const nombreInput = document.getElementById('strNombreSucursal');
    const descInput = document.getElementById('strDescripcionSucursal');
    
    // Sanitización en tiempo real
    if (nombreInput) {
        nombreInput.addEventListener('input', () => {
            const originalVal = nombreInput.value;
            const cleanedVal = typeof sanitizeLettersOnly === 'function' 
                ? sanitizeLettersOnly(originalVal) 
                : originalVal.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s0-9#.-]/g, '');
                
            if (originalVal !== cleanedVal) {
                const start = nombreInput.selectionStart;
                const end = nombreInput.selectionEnd;
                nombreInput.value = cleanedVal;
                try {
                    nombreInput.setSelectionRange(start, end);
                } catch (err) {}
            }
            nombreInput.classList.remove('is-invalid', 'is-valid');
        });
        
        nombreInput.addEventListener('blur', () => {
            nombreInput.value = nombreInput.value.trim();
        });
    }
    
    if (descInput) {
        descInput.addEventListener('input', () => {
            const originalVal = descInput.value;
            const cleanedVal = typeof sanitizeGeneralText === 'function' 
                ? sanitizeGeneralText(originalVal) 
                : originalVal.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s0-9#.,_()/-]/g, '');
                
            if (originalVal !== cleanedVal) {
                const start = descInput.selectionStart;
                const end = descInput.selectionEnd;
                descInput.value = cleanedVal;
                try {
                    descInput.setSelectionRange(start, end);
                } catch (err) {}
            }
            descInput.classList.remove('is-invalid', 'is-valid');
        });
        
        descInput.addEventListener('blur', () => {
            descInput.value = descInput.value.trim();
        });
    }
});

// Renderizar la tabla de sucursales
function renderSucursales() {
    const tbody = document.getElementById('sucursalesTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    // Filtrar sucursales
    let filtered = sucursales.filter(s => {
        // Filtro por Estado
        if (statusFilter === 'activos' && !s.activo) return false;
        if (statusFilter === 'baja' && s.activo) return false;

        // Filtro por Búsqueda (Nombre o Descripción)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const nombreMatch = s.nombre.toLowerCase().includes(query);
            const descMatch = (s.descripcion || '').toLowerCase().includes(query);
            return nombreMatch || descMatch;
        }

        return true;
    });

    // Actualizar Conteos en Pestañas
    const countTodos = sucursales.length;
    const countActivos = sucursales.filter(s => s.activo).length;
    const countBaja = sucursales.filter(s => !s.activo).length;

    const elTodos = document.getElementById('countTodos');
    const elActivos = document.getElementById('countActivos');
    const elBaja = document.getElementById('countBaja');

    if (elTodos) elTodos.textContent = countTodos;
    if (elActivos) elActivos.textContent = countActivos;
    if (elBaja) elBaja.textContent = countBaja;

    // Paginación
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;
    
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalRecords);
    const pagedList = filtered.slice(startIndex, endIndex);

    // Renderizar vacío si no hay registros
    if (pagedList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-5">
                    <div class="text-muted">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-2 opacity-50"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <p class="m-0 font-weight-700">No se encontraron sucursales</p>
                        <small>Prueba ajustando los filtros o la búsqueda</small>
                    </div>
                </td>
            </tr>
        `;
    } else {
        pagedList.forEach(s => {
            const tr = document.createElement('tr');
            
            // Badge de Estado
            const statusBadge = s.activo 
                ? '<span class="badge-active">Activo</span>' 
                : '<span class="badge-danger">Baja</span>';

            const descText = s.descripcion || 'Sin descripción';
            const truncatedDesc = s.descripcion && s.descripcion.length > 60 
                ? s.descripcion.substring(0, 60) + '...' 
                : descText;
            const descTitle = s.descripcion ? `title="${escapeHtml(s.descripcion)}"` : '';

            tr.innerHTML = `
                <td>
                    <div class="cotizacion-main-text">${escapeHtml(s.nombre)}</div>
                </td>
                <td>
                    <div class="description-text" ${descTitle}>${escapeHtml(truncatedDesc)}</div>
                </td>
                <td>
                    ${statusBadge}
                </td>
                <td class="text-end">
                    <div class="dropdown actions-dropdown d-inline-block">
                        <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false">
                            <span>Acciones</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <button class="dropdown-item d-flex align-items-center" type="button" onclick="editSucursal(${s.id})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Editar
                                </button>
                            </li>
                            <li>
                                <button class="dropdown-item d-flex align-items-center text-danger" type="button" onclick="deleteSucursal(${s.id})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-danger"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    <span>Eliminar</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Actualizar contadores en barra inferior
    const infoText = totalRecords > 0 
        ? `Mostrando ${startIndex + 1}-${endIndex} de ${totalRecords} registros`
        : `Mostrando 0-0 de 0 registros`;
    const elInfo = document.getElementById('paginationInfo');
    if (elInfo) elInfo.textContent = infoText;

    // Renderizar botones de paginación
    renderPagination(totalPages);

    // Actualizar contadores en la cabecera de la tabla
    const countPill = document.querySelector('.table-module .records-pill');
    if (countPill) {
        countPill.textContent = `${totalRecords} sucursales`;
    }

    const extraPill = document.querySelector('.table-module .records-pill-soft');
    if (extraPill) {
        extraPill.textContent = `Página ${currentPage} de ${totalPages}`;
    }
}

// Renderizar la paginación
function renderPagination(totalPages) {
    const paginationList = document.getElementById('paginationList');
    if (!paginationList) return;
    paginationList.innerHTML = '';

    if (totalPages <= 1) return;

    // Botón de Anterior
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `
        <a class="page-link" href="#" onclick="changePage(event, ${currentPage - 1})" aria-label="Anterior">
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    paginationList.appendChild(prevLi);

    // Números de páginas
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${currentPage === i ? 'active' : ''}`;
        li.innerHTML = `
            <a class="page-link" href="#" onclick="changePage(event, ${i})">${i}</a>
        `;
        paginationList.appendChild(li);
    }

    // Botón de Siguiente
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `
        <a class="page-link" href="#" onclick="changePage(event, ${currentPage + 1})" aria-label="Siguiente">
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    paginationList.appendChild(nextLi);
}

// Cambiar página
function changePage(event, page) {
    if (event) event.preventDefault();
    currentPage = page;
    renderSucursales();
}

// Filtro de estado
function setStatusFilter(status) {
    statusFilter = status;
    
    document.querySelectorAll('.custom-tabs-container .tab-item').forEach(btn => {
        btn.classList.remove('active');
    });

    const elTodos = document.getElementById('tabTodos');
    const elActivos = document.getElementById('tabActivos');
    const elBaja = document.getElementById('tabBaja');

    if (status === 'todos' && elTodos) elTodos.classList.add('active');
    if (status === 'activos' && elActivos) elActivos.classList.add('active');
    if (status === 'baja' && elBaja) elBaja.classList.add('active');

    currentPage = 1;
    renderSucursales();
}

// Búsqueda en tiempo real
function handleSearch(query) {
    searchQuery = query;
    currentPage = 1;
    renderSucursales();
}

// Limpiar errores
function clearValidation() {
    const nombreInput = document.getElementById('strNombreSucursal');
    if (nombreInput) {
        nombreInput.classList.remove('is-invalid', 'is-valid');
    }
    const descInput = document.getElementById('strDescripcionSucursal');
    if (descInput) {
        descInput.classList.remove('is-invalid', 'is-valid');
    }
}

// Formulario submit (Guardar / Editar localmente en memoria)
function handleFormSubmit(e) {
    e.preventDefault();

    const nombreInput = document.getElementById('strNombreSucursal');
    const descInput = document.getElementById('strDescripcionSucursal');

    if (!nombreInput) return;

    const nombre = nombreInput.value.trim();
    const descripcion = descInput ? descInput.value.trim() : "";

    if (!nombre) {
        nombreInput.classList.add('is-invalid');
        nombreInput.classList.remove('is-valid');
        const feedback = document.getElementById('nombreFeedback');
        if (feedback) {
            feedback.textContent = 'El nombre de la sucursal es obligatorio.';
        }
        nombreInput.focus();
        return;
    }

    // Validar nombre duplicado en memoria
    const nombreLower = nombre.toLowerCase().trim();
    const existeDuplicado = sucursales.some(s => s.nombre.toLowerCase().trim() === nombreLower && s.id !== editingId);
    
    if (existeDuplicado) {
        nombreInput.classList.add('is-invalid');
        nombreInput.classList.remove('is-valid');
        const feedback = document.getElementById('nombreFeedback');
        if (feedback) {
            feedback.textContent = 'El nombre de la sucursal ya existe.';
        }
        nombreInput.focus();
        return;
    }

    nombreInput.classList.add('is-valid');
    if (descInput && descripcion) {
        descInput.classList.add('is-valid');
    }

    const statusField = document.getElementById('intIdStatusSucursal');
    const statusVal = statusField ? statusField.value : VALOR_STATUS_ACTIVO;
    const isActivo = (statusVal === VALOR_STATUS_ACTIVO || statusVal === "");

    if (editingId === null) {
        // Guardado local (Generamos un ID ficticio para pruebas locales)
        const newId = sucursales.length > 0 ? Math.max(...sucursales.map(s => s.id)) + 1 : 1;
        sucursales.push({
            id: newId,
            nombre: nombre,
            descripcion: descripcion,
            idCatStatus: statusVal,
            activo: isActivo
        });
        Swal.fire({
            icon: 'success',
            title: '¡Sucursal registrada!',
            text: 'La sucursal ha sido agregada exitosamente (en memoria local).',
            confirmButtonColor: 'var(--teal-cavex)'
        });
    } else {
        // Actualización local
        const index = sucursales.findIndex(s => s.id === editingId);
        if (index !== -1) {
            sucursales[index].nombre = nombre;
            sucursales[index].descripcion = descripcion;
            sucursales[index].idCatStatus = statusVal;
            sucursales[index].activo = isActivo;
        }
        Swal.fire({
            icon: 'success',
            title: '¡Sucursal actualizada!',
            text: 'La sucursal ha sido modificada exitosamente (en memoria local).',
            confirmButtonColor: 'var(--teal-cavex)'
        });
    }

    resetForm();
    renderSucursales();
}

// Cargar en formulario para editar
function editSucursal(id) {
    const sucursal = sucursales.find(s => s.id === id);
    if (!sucursal) return;

    clearValidation();
    editingId = id;
    
    document.getElementById('strNombreSucursal').value = sucursal.nombre;
    if (document.getElementById('strDescripcionSucursal')) {
        document.getElementById('strDescripcionSucursal').value = sucursal.descripcion || '';
    }

    const statusField = document.getElementById('intIdStatusSucursal');
    if (statusField) {
        statusField.value = sucursal.idCatStatus;
    }

    // Cambiar estados del formulario a Edición
    document.getElementById('formTitle').textContent = 'Editar sucursal';
    document.getElementById('formSubtitle').textContent = 'Modifica los detalles de la sucursal seleccionada.';
    document.getElementById('btnSubmit').textContent = 'Guardar cambios';
    document.getElementById('btnCancel').style.display = 'inline-block';

    // Desplazar suavemente al formulario
    const formCard = document.querySelector('.filter-card');
    if (formCard) formCard.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('strNombreSucursal').focus();
}

// Eliminar sucursal localmente
function deleteSucursal(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            sucursales = sucursales.filter(s => s.id !== id);
            Swal.fire({
                icon: 'success',
                title: '¡Eliminado!',
                text: 'La sucursal ha sido eliminada exitosamente (en memoria local).',
                confirmButtonColor: 'var(--teal-cavex)'
            });
            if (editingId === id) {
                resetForm();
            }
            renderSucursales();
        }
    });
}

// Limpiar el formulario
function resetForm() {
    editingId = null;
    clearValidation();
    
    const form = document.getElementById('formSucursal');
    if (form) form.reset();

    const statusField = document.getElementById('intIdStatusSucursal');
    if (statusField) {
        statusField.value = "";
    }

    // Restaurar títulos y botones originales
    document.getElementById('formTitle').textContent = 'Registrar sucursal';
    document.getElementById('formSubtitle').textContent = 'Ingresa el nombre y la descripción para registrar la sucursal.';
    document.getElementById('btnSubmit').textContent = 'Guardar sucursal';
    
    const btnCancel = document.getElementById('btnCancel');
    if (btnCancel) btnCancel.style.display = 'none';
}

// Escapar caracteres HTML por seguridad
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
