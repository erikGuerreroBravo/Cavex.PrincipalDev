let areas = [];
let editingId = null;

// Variables de paginación y filtros
let currentPage = 1;
let pageSize = 10;
let searchQuery = '';

// Renderizado inicial de la tabla cargando datos del servidor
document.addEventListener('DOMContentLoaded', () => {
    loadAreasFromServer();
    
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

function loadAreasFromServer() {
    const url = `/EmpCatAreaLaboral/GetAreas?pagina=${currentPage}&search=${encodeURIComponent(searchQuery)}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(result => {
            console.log("Respuesta de GetAreas:", result);
            if (result.success) {
                if (result.data && Array.isArray(result.data)) {
                    areas = result.data.map(item => ({
                        id: item.id,
                        nombre: item.strValor,
                        descripcion: item.strDescripcion
                    }));
                } else {
                    areas = [];
                }
                const totalCount = result.totalCount ?? 0;
                renderAreas(totalCount);
            } else {
                console.error("Error al cargar areas desde base de datos:", result.message);
                Swal.fire({
                    icon: 'error',
                    title: '¡Ups!',
                    text: 'No se pudieron obtener los datos de las áreas laborales. ¡Intenta de nuevo!',
                    confirmButtonColor: 'var(--teal-cavex)'
                });
                areas = [];
                renderAreas(0);
            }
        })
        .catch(err => {
            console.error("Error en petición:", err);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudieron obtener los datos. ¡Intenta de nuevo!',
                confirmButtonColor: 'var(--teal-cavex)'
            });
            areas = [];
            renderAreas(0);
        });
}

// Función para renderizar las áreas
function renderAreas(totalCount) {
    const tbody = document.getElementById('areasTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const totalPages = Math.ceil(totalCount / pageSize) || 1;
    
    // Ajustar página actual si queda fuera del rango
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }

    // Mostrar vacío si no hay registros en tabla de area laboral
    if (areas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center py-5">
                    <div class="text-muted">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-2 opacity-50"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                        <p class="m-0 font-weight-700">No se encontraron áreas laborales</p>
                        <small>Prueba ajustando los filtros o la búsqueda</small>
                    </div>
                </td>
            </tr>
        `;
    } else {
        areas.forEach(a => {
            const tr = document.createElement('tr');
            
            const descText = a.descripcion || 'Sin descripción';
            const truncatedDesc = a.descripcion && a.descripcion.length > 50 
                ? a.descripcion.substring(0, 50) + '...' 
                : descText;
            const descTitle = a.descripcion ? `title="${escapeHtml(a.descripcion)}"` : '';
            // Inyeccion de la tabla con campos de nombre, descripcion y acciones de editar y eliminar
            tr.innerHTML = `
                <td>
                    <div class="cotizacion-main-text">${escapeHtml(a.nombre)}</div>
                </td>
                <td>
                    <div class="description-text" ${descTitle}>${escapeHtml(truncatedDesc)}</div>
                </td>
                <td class="text-end">
                    <div class="dropdown actions-dropdown d-inline-block">
                        <button class="btn-action-trigger btn-sm" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false">
                            <span>Acciones</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <button class="dropdown-item d-flex align-items-center" type="button" onclick="editArea(${a.id})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Editar
                                </button>
                            </li>
                            <li>
                                <button class="dropdown-item d-flex align-items-center text-danger" type="button" onclick="deleteArea(${a.id})">
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
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + areas.length, totalCount);
    const infoText = totalCount > 0 
        ? `Mostrando ${startIndex + 1}-${endIndex} de ${totalCount} registros`
        : `Mostrando 0-0 de 0 registros`;
    const infoEl = document.getElementById('paginationInfo');
    if (infoEl) infoEl.textContent = infoText;

    // Renderizar botones de paginación
    renderPagination(totalPages);

    // Actualizar contadores en la cabecera de la tabla
    const countPill = document.querySelector('.table-module .records-pill');
    if (countPill) {
        countPill.textContent = `${totalCount} áreas`;
    }

    const extraPill = document.querySelector('.table-module .records-pill-soft');
    if (extraPill) {
        extraPill.textContent = `Página ${currentPage} de ${totalPages}`;
    }

    // Inicializar dropdowns de acciones con estrategia 'fixed' para prevenir recortes
    document.querySelectorAll('#areasTableBody .btn-action-trigger').forEach(el => {
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

// Función para renderizar los números de página
function renderPagination(totalPages) {
    const paginationList = document.getElementById('paginationList');
    if (!paginationList) return;
    paginationList.innerHTML = '';

    if (totalPages <= 1) return; // No mostrar paginación si solo hay una página

    paginationList.appendChild(createPageItem("Anterior", currentPage - 1, currentPage === 1));

    if (totalPages <= 10) {
        for (let i = 1; i <= totalPages; i++) {
            paginationList.appendChild(createPageItem(String(i), i, false, currentPage === i));
        }
    } else {
        // dynamic sliding window for pages 11 to N
        let startPage = 1;
        let endPage = 10;

        if (currentPage > 10) {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - 9;
            }
        }

        if (startPage > 1) {
            paginationList.appendChild(createPageItem("1", 1, false, currentPage === 1));
            if (startPage > 2) {
                const li = document.createElement("li");
                li.className = "page-item disabled";
                li.innerHTML = '<span class="page-link">...</span>';
                paginationList.appendChild(li);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationList.appendChild(createPageItem(String(i), i, false, currentPage === i));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const li = document.createElement("li");
                li.className = "page-item disabled";
                li.innerHTML = '<span class="page-link">...</span>';
                paginationList.appendChild(li);
            }
            paginationList.appendChild(createPageItem(String(totalPages), totalPages, false, currentPage === totalPages));
        }
    }

    paginationList.appendChild(createPageItem("Siguiente", currentPage + 1, currentPage === totalPages));
}

function createPageItem(text, page, disabled, active) {
    const li = document.createElement("li");
    li.className = `page-item ${disabled ? "disabled" : ""} ${active ? "active" : ""}`;
    
    let innerContent = text;
    let ariaLabel = "";
    if (text === "Anterior") {
        innerContent = `<span aria-hidden="true">&laquo;</span>`;
        ariaLabel = `aria-label="Anterior"`;
    } else if (text === "Siguiente") {
        innerContent = `<span aria-hidden="true">&raquo;</span>`;
        ariaLabel = `aria-label="Siguiente"`;
    }
    
    li.innerHTML = `<a class="page-link" href="#" onclick="changePage(event, ${page})" ${ariaLabel}>${innerContent}</a>`;
    return li;
}

// Cambiar página
function changePage(event, page) {
    if (event) event.preventDefault();
    if (page < 1) return;
    currentPage = page;
    loadAreasFromServer();
}

// Manejar búsqueda de texto
function handleSearch(query) {
    searchQuery = query;
    currentPage = 1; // Reiniciar a primera página al buscar
    loadAreasFromServer();
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
            feedback.textContent = 'El nombre del área es obligatorio.';
        }
        nombreInput.focus();
        return;
    }

    // Validar expresión regular: nada de números, emojis o símbolos raros
    const regexLettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!regexLettersOnly.test(nombre)) {
        nombreInput.classList.add('is-invalid');
        nombreInput.classList.remove('is-valid');
        const feedback = document.getElementById('nombreFeedback');
        if (feedback) {
            feedback.textContent = 'El nombre solo debe contener letras y espacios (sin números, símbolos ni emojis).';
        }
        nombreInput.focus();
        return;
    }

    // Validar si ya existe otra área con el mismo nombre (ignora mayúsculas/minúsculas)
    const nombreLower = nombre.toLowerCase().trim();
    const existeDuplicado = areas.some(a => a.nombre.toLowerCase().trim() === nombreLower && a.id !== editingId);
    
    if (existeDuplicado) {
        nombreInput.classList.add('is-invalid');
        nombreInput.classList.remove('is-valid');
        const feedback = document.getElementById('nombreFeedback');
        if (feedback) {
            feedback.textContent = 'El nombre del área laboral ya existe.';
        }
        nombreInput.focus();
        return;
    }

    // Si todo es válido, aplicar clases de éxito
    nombreInput.classList.add('is-valid');
    if (descripcion) {
        descInput.classList.add('is-valid');
    }

    const url = editingId === null ? '/EmpCatAreaLaboral/SaveArea' : '/EmpCatAreaLaboral/UpdateArea';

    const payload = {
        id: editingId || 0,
        strValor: nombre,
        strDescripcion: descripcion
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: editingId === null ? '¡Registro exitoso!' : '¡Actualización exitosa!',
                text: editingId === null ? 'Área laboral agregada exitosamente.' : 'Área laboral actualizada exitosamente.',
                confirmButtonColor: 'var(--teal-cavex)'
            });
            resetForm();
            loadAreasFromServer();
        } else {
            nombreInput.classList.add('is-invalid');
            nombreInput.classList.remove('is-valid');
            const feedback = document.getElementById('nombreFeedback');
            if (feedback) {
                feedback.textContent = result.message || 'Error al guardar el área laboral.';
            }

            let errorText = result.message || "";
            const isTechnicalError = errorText.toLowerCase().includes("database") || 
                                     errorText.toLowerCase().includes("db") || 
                                     errorText.toLowerCase().includes("sql") || 
                                     errorText.toLowerCase().includes("conexion") || 
                                     errorText.toLowerCase().includes("connection");

            if (!errorText || isTechnicalError) {
                errorText = editingId === null 
                    ? 'El área laboral no se pudo agregar exitosamente.' 
                    : 'El área laboral no se pudo actualizar exitosamente.';
            }

            Swal.fire({
                icon: 'error',
                title: 'No se pudo guardar',
                text: errorText,
                confirmButtonColor: 'var(--teal-cavex)'
            });
        }
    })
    .catch(err => {
        console.error("Error al guardar el área:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: editingId === null 
                ? 'El área laboral no se pudo agregar exitosamente. ¡Intenta de nuevo!' 
                : 'El área laboral no se pudo actualizar exitosamente. ¡Intenta de nuevo!',
            confirmButtonColor: 'var(--teal-cavex)'
        });
    });
}

// Cargar datos en el formulario para edición
function editArea(id) {
    const area = areas.find(a => a.id === id);
    if (!area) return;

    clearValidation();
    editingId = id;
    document.getElementById('strNombre').value = area.nombre;
    document.getElementById('strDescripcion').value = area.descripcion || '';

    // Cambiar estados del formulario
    document.getElementById('formTitle').textContent = 'Editar área laboral';
    document.getElementById('formSubtitle').textContent = 'Modifica los detalles del área laboral seleccionada.';
    document.getElementById('btnSubmit').textContent = 'Guardar cambios';
    document.getElementById('btnCancel').style.display = 'inline-block';

    // Desplazar suavemente al formulario y enfocar el campo principal
    document.querySelector('.filter-card').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('strNombre').focus();
}

// Eliminar área
function deleteArea(id) {
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
            fetch('/EmpCatAreaLaboral/DeleteArea?id=' + id, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Eliminado!',
                        text: 'El área laboral ha sido eliminada exitosamente.',
                        confirmButtonColor: 'var(--teal-cavex)'
                    });
                    if (editingId === id) {
                        resetForm();
                    }
                    loadAreasFromServer();
                } else {
                    let errorText = result.message || 'Inténtalo de nuevo más tarde.';
                    const isReferenceError = errorText.toLowerCase().includes("reference") || 
                                             errorText.toLowerCase().includes("relacion") || 
                                             errorText.toLowerCase().includes("fk") || 
                                             errorText.toLowerCase().includes("foreign key") || 
                                             errorText.toLowerCase().includes("empleado");

                    if (isReferenceError) {
                        errorText = 'No se puede eliminar el área laboral porque está asociada a uno o más empleados activos.';
                    }

                    Swal.fire({
                        icon: 'error',
                        title: 'No se pudo eliminar',
                        text: errorText,
                        confirmButtonColor: 'var(--teal-cavex)'
                    });
                }
            })
            .catch(err => {
                console.error("Error al eliminar el área:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'No se pudo procesar la solicitud. ¡Intenta de nuevo!',
                    confirmButtonColor: 'var(--teal-cavex)'
                });
            });
        }
    });
}

// Restablecer el formulario
function resetForm() {
    editingId = null;
    clearValidation();
    document.getElementById('formArea').reset();

    // Restaurar textos originales
    document.getElementById('formTitle').textContent = 'Registrar área laboral';
    document.getElementById('formSubtitle').textContent = 'Ingresa el nombre y la descripción para registrar el área laboral.';
    document.getElementById('btnSubmit').textContent = 'Guardar área laboral';
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
