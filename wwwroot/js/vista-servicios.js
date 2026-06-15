// Datos de Servicios realistas para pruebas
let services = [
    { id: 1, nombre: "Traslado Sencillo", descripcion: "Servicio estándar de traslado de personal o pacientes sin requerimientos especiales.", activo: true },
    { id: 2, nombre: "Traslado con Asistencia", descripcion: "Servicio de traslado que incluye asistencia de camilleros o personal especializado.", activo: true },
    { id: 3, nombre: "Traslado en Ambulancia Básica", descripcion: "Traslado médico no urgente con personal técnico en urgencias médicas a bordo.", activo: true },
    { id: 4, nombre: "Traslado en Ambulancia de Terapia Intensiva", descripcion: "Servicio crítico para pacientes estables o inestables con equipo de soporte vital avanzado y médico a bordo.", activo: true },
    { id: 5, nombre: "Traslado de Custodia y Seguridad", descripcion: "Traslado de ejecutivos o personal sensible con escolta entrenada y vehículo blindado opcional.", activo: true },
];
    
let nextId = 16;
let editingId = null;

// Variables de paginación y filtros
let currentPage = 1;
let pageSize = 5;
let statusFilter = 'todos';
let searchQuery = '';

// Renderizado inicial de la tabla
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    
    // Aplicacion en tiempo real utilizando las funciones globales de site.js
    const nombreInput = document.getElementById('strNombre');
    const descInput = document.getElementById('strDescripcion');
    
    if (nombreInput) {
        nombreInput.addEventListener('input', () => {
            const originalVal = nombreInput.value;
            const cleanedVal = sanitizeLettersOnly(originalVal);
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
            const cleanedVal = sanitizeGeneralText(originalVal);
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

// Función para renderizar los servicios
function renderServices() {
    const tbody = document.getElementById('servicesTableBody');
    tbody.innerHTML = '';

    // Filtrar servicios
    let filtered = services.filter(s => {
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
    const countTodos = services.length;
    const countActivos = services.filter(s => s.activo).length;
    const countBaja = services.filter(s => !s.activo).length;

    document.getElementById('countTodos').textContent = countTodos;
    document.getElementById('countActivos').textContent = countActivos;
    document.getElementById('countBaja').textContent = countBaja;

    // Paginación
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;
    
    // Ajustar página actual si queda fuera del rango
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
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-2 opacity-50"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                        <p class="m-0 font-weight-700">No se encontraron servicios</p>
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
            
            const actionStatusText = s.activo ? 'Dar de baja' : 'Activar';
            const actionStatusIcon = s.activo 
                ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-danger"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>'
                : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-success"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>';

            const descText = s.descripcion || 'Sin descripción';
            const truncatedDesc = s.descripcion && s.descripcion.length > 50 
                ? s.descripcion.substring(0, 50) + '...' 
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
                        <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Acciones</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <button class="dropdown-item d-flex align-items-center" type="button" onclick="editService(${s.id})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Editar
                                </button>
                            </li>
                            <li>
                                <button class="dropdown-item d-flex align-items-center ${s.activo ? 'text-danger' : 'text-success'}" type="button" onclick="toggleServiceStatus(${s.id})">
                                    ${actionStatusIcon}
                                    <span>${actionStatusText}</span>
                                </button>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <button class="dropdown-item d-flex align-items-center text-danger" type="button" onclick="deleteService(${s.id})">
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

    // Actualizar contadores e información en barra inferior
    const infoText = totalRecords > 0 
        ? `Mostrando ${startIndex + 1}-${endIndex} de ${totalRecords} registros`
        : `Mostrando 0-0 de 0 registros`;
    document.getElementById('paginationInfo').textContent = infoText;

    // Renderizar botones de paginación
    renderPagination(totalPages);

    // Actualizar contadores en la cabecera de la tabla
    const countPill = document.querySelector('.table-module .records-pill');
    if (countPill) {
        countPill.textContent = `${totalRecords} servicios`;
    }

    const extraPill = document.querySelector('.table-module .records-pill-soft');
    if (extraPill) {
        extraPill.textContent = `Página ${currentPage} de ${totalPages}`;
    }
}

// Función para renderizar los números de página
function renderPagination(totalPages) {
    const paginationList = document.getElementById('paginationList');
    paginationList.innerHTML = '';

    if (totalPages <= 1) return; // No mostrar paginación si solo hay una página

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
    renderServices();
}

// Establecer filtro de estado
function setStatusFilter(status) {
    statusFilter = status;
    
    // Actualizar clases activas en los botones de pestañas
    document.querySelectorAll('.custom-tabs-container .tab-item').forEach(btn => {
        btn.classList.remove('active');
    });

    if (status === 'todos') document.getElementById('tabTodos').classList.add('active');
    if (status === 'activos') document.getElementById('tabActivos').classList.add('active');
    if (status === 'baja') document.getElementById('tabBaja').classList.add('active');

    currentPage = 1; // Reiniciar a primera página al filtrar
    renderServices();
}

// Manejar búsqueda de texto
function handleSearch(query) {
    searchQuery = query;
    currentPage = 1; // Reiniciar a primera página al buscar
    renderServices();
}

// Limpiar errores de validación
function clearValidation() {
    const nombreInput = document.getElementById('strNombre');
    if (nombreInput) {
        nombreInput.classList.remove('is-invalid', 'is-valid');
    }
    const descInput = document.getElementById('strDescripcion');
    if (descInput) {
        descInput.classList.remove('is-invalid', 'is-valid');
    }
}

// Manejar el submit del formulario (Guardar o Actualizar)
function handleFormSubmit(e) {
    e.preventDefault();
    const nombreInput = document.getElementById('strNombre');
    const descInput = document.getElementById('strDescripcion');

    const nombre = nombreInput.value.trim();
    const descripcion = descInput.value.trim();

    if (!nombre) {
        nombreInput.classList.add('is-invalid');
        nombreInput.classList.remove('is-valid');
        const feedback = document.getElementById('nombreFeedback');
        if (feedback) {
            feedback.textContent = 'El nombre del servicio es obligatorio.';
        }
        nombreInput.focus();
        return;
    }

    // Validar si ya existe otro servicio con el mismo nombre (ignora mayúsculas/minúsculas)
    const nombreLower = nombre.toLowerCase();
    const existeDuplicado = services.some(s => s.nombre.toLowerCase() === nombreLower && s.id !== editingId);
    
    if (existeDuplicado) {
        nombreInput.classList.add('is-invalid');
        nombreInput.classList.remove('is-valid');
        const feedback = document.getElementById('nombreFeedback');
        if (feedback) {
            feedback.textContent = 'El nombre del servicio ya existe.';
        }
        nombreInput.focus();
        return;
    }

    // Si todo es válido, aplicar clases de éxito
    nombreInput.classList.add('is-valid');
    if (descripcion) {
        descInput.classList.add('is-valid');
    }

    if (editingId !== null) {
        // Modo Edición
        const index = services.findIndex(s => s.id === editingId);
        if (index !== -1) {
            services[index].nombre = nombre;
            services[index].descripcion = descripcion;
        }
    } else {
        // Modo Creación
        services.unshift({
            id: nextId++,
            nombre: nombre,
            descripcion: descripcion,
            activo: true
        });
        currentPage = 1;
    }

    resetForm();
    renderServices();
}

// Cargar datos en el formulario para edición
function editService(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;

    clearValidation();
    editingId = id;
    document.getElementById('strNombre').value = service.nombre;
    document.getElementById('strDescripcion').value = service.descripcion || '';

    // Cambiar estados del formulario
    document.getElementById('formTitle').textContent = 'Editar servicio';
    document.getElementById('formSubtitle').textContent = 'Modifica los detalles del servicio seleccionado.';
    document.getElementById('btnSubmit').textContent = 'Guardar cambios';
    document.getElementById('btnCancel').style.display = 'inline-block';

    // Desplazar suavemente al formulario y enfocar el campo principal
    document.querySelector('.filter-card').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('strNombre').focus();
}

// Alternar estado activo/baja del servicio
function toggleServiceStatus(id) {
    const index = services.findIndex(s => s.id === id);
    if (index !== -1) {
        services[index].activo = !services[index].activo;
        renderServices();
    }
}

// Eliminar servicio
function deleteService(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
        const index = services.findIndex(s => s.id === id);
        if (index !== -1) {
            services.splice(index, 1);
            
            // Si el servicio eliminado era el que se estaba editando, resetear el formulario
            if (editingId === id) {
                resetForm();
            }
            
            renderServices();
        }
    }
}

// Restablecer el formulario
function resetForm() {
    editingId = null;
    clearValidation();
    document.getElementById('formServicio').reset();

    // Restaurar textos originales
    document.getElementById('formTitle').textContent = 'Registrar servicio';
    document.getElementById('formSubtitle').textContent = 'Ingresa el nombre y la descripción para registrar el servicio.';
    document.getElementById('btnSubmit').textContent = 'Guardar servicio';
    document.getElementById('btnCancel').style.display = 'none';
}

// Escape de caracteres HTML para seguridad
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
