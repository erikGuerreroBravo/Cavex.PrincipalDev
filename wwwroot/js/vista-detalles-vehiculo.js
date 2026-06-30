$(document).ready(function() {
    // 1. Simulación de carga asíncrona de datos desde la API
    setTimeout(function() {
        // Ocultar la estructura skeleton
        $('#skeleton-wrapper').fadeOut(200, function() {
            // Mostrar la estructura con los datos reales
            $('#data-wrapper').fadeIn(250, function() {
                // Una vez que el contenedor es visible en el DOM, inicializar la gráfica para evitar bugs de redimensionamiento
                initMileageChart();
                initInteractiveRevision();
            });
        });
    }, 1500); // 1.5 segundos de retraso

    // 2. Manejador de cambio de pestañas (Tabs - Comportamiento reactivo asíncrono)
    $('.tab-btn').click(function() {
        if ($(this).hasClass('active')) return;

        // Quitar clase activa de todas las pestañas
        $('.tab-btn').removeClass('active');
        // Agregar clase activa a la pestaña actual
        $(this).addClass('active');

        // Obtener la pestaña a mostrar
        const targetTab = $(this).attr('data-tab');

        // Ocultar todos los contenidos de pestañas
        $('.tab-content').hide();
        // Mostrar el contenido de la pestaña seleccionada
        $(`#tab-${targetTab}`).fadeIn(200);
    });
});

// --- 3. GRÁFICA COMPARATIVA DE KILOMETRAJE (Chart.js) ---
// Esta función configura y dibuja una gráfica de líneas para contrastar el kilometraje acumulado
// real del odómetro del vehículo contra el consumo planificado/estimado según el contrato firmado.
function initMileageChart() {
    const ctx = document.getElementById('mileageChart');
    if (!ctx) return;

    // Registrar plugin de etiquetas si existe (evita errores si el CDN no cargara)
    const plugins = [];
    if (typeof ChartDataLabels !== 'undefined') {
        Chart.register(ChartDataLabels);
    }

    // Eje X: Puntos clave de control (Desde la firma del contrato base hasta cada viaje subsecuente)
    const labels = ['Contrato Base', 'Viaje 1', 'Viaje 2', 'Viaje 3', 'Viaje 4', 'Viaje 5', 'Viaje 6'];
    
    // Eje Y (Serie 1): Odometer real acumulado. Inicia en 200,000 km.
    // En el primer viaje sumó 60 km reales, llegando a un acumulado de 200,060 km.
    const dataReal = [200000, 200060, 200115, 200195, 200250, 200325, 200410];
    
    // Eje Y (Serie 2): Odometer estimado/contratado. Inicia en 200,000 km.
    // El primer viaje estimaba recorrer solo 45 km, acumulando un teórico de 200,045 km.
    const dataEstimado = [200000, 200045, 200090, 200155, 200200, 200260, 200330];

    ctx.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Kilometraje Real',
                    data: dataReal,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    borderWidth: 2.5,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: false,
                    tension: 0.15
                },
                {
                    label: 'Kilometraje Contratado (Est.)',
                    data: dataEstimado,
                    borderColor: '#64748b',
                    borderDash: [5, 5],
                    borderWidth: 1.5,
                    pointBackgroundColor: '#64748b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 1.5,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: false,
                    tension: 0.15
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        font: {
                            size: 11,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#061B3A',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()} km`;
                        }
                    }
                },
                datalabels: {
                    display: false
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' km';
                        },
                        color: '#64748b',
                        font: {
                            size: 11,
                            weight: '500'
                        }
                    },
                    grid: {
                        color: '#e2e8f0',
                        borderDash: [5, 5],
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 11,
                            weight: '500'
                        }
                    }
                }
            }
        }
    });
}

// --- 4. LÓGICA INTERACTIVA PARA EL CÁLCULO DINÁMICO DE ESTADO Y REVISIÓN ---
// Esta función añade manejadores de eventos (click) a las filas del checklist de revisión (.check-item-row).
// Permite simular interactivamente el cambio de estatus de un punto de inspección y ver su repercusión
// inmediata en los anillos de progreso del Estado General, la cantidad de Aprobados y la insignia global.
function initInteractiveRevision() {
    // Configurar cursor pointer para indicar que el elemento es clickeable
    $('.check-item-row').css('cursor', 'pointer').click(function() {
        let statusSpan = $(this).find('.status-approved, .status-failed');
        if (statusSpan.length === 0) return;

        if (statusSpan.hasClass('status-approved')) {
            // Cambiar a Falla
            statusSpan.removeClass('status-approved').addClass('status-failed');
            statusSpan.text('✗ Falla');
        } else {
            // Regresar a Aprobado
            statusSpan.removeClass('status-failed').addClass('status-approved');
            statusSpan.text('✓ Aprobado');
        }

        recalculateGeneralState();
    });

    // Ejecutar el cálculo inicial
    recalculateGeneralState();
}

// Función que recorre todos los elementos del checklist, evalúa cuántos están en estado aprobado (✓)
// y actualiza de forma reactiva la interfaz del Estado General, el Anillo de Revisión y la insignia superior.
function recalculateGeneralState() {
    let total = $('.check-item-row').length; // Cantidad total de puntos inspeccionados (e.g. 26 puntos)
    let approved = 0;

    // Recorrer las filas del checklist buscando los elementos de estado aprobados o fallados
    $('.check-item-row').each(function() {
        let statusText = $(this).find('.status-approved, .status-failed').text().trim();
        // Si el texto incluye el carácter '✓' (Aprobado/Excelente/Regular), se incrementa el contador
        if (statusText.indexOf('✓') !== -1) {
            approved++;
        }
    });

    // Calcular el porcentaje de salud general del vehículo en base a los puntos aprobados
    let pct = total > 0 ? Math.round((approved / total) * 100) : 0;

    // 1. Actualizar UI del Anillo de Estado General (68px en pestaña Resumen)
    $('.progress-ring-text-68').text(`${pct}%`);

    let label = $('.gauge-status-label');
    let footer = $('.gauge-footer-text');

    if (pct >= 90) {
        label.text('Excelente').css('color', 'var(--exito)');
        footer.text('Todo en óptimas condiciones');
        $('.progress-ring-gauge-68').css('background', `conic-gradient(var(--exito) ${pct}%, #e2e8f0 0)`);
    } else if (pct >= 70) {
        label.text('Bueno').css('color', '#f59e0b');
        footer.text('Detalles menores por atender');
        $('.progress-ring-gauge-68').css('background', `conic-gradient(#f59e0b ${pct}%, #e2e8f0 0)`);
    } else {
        label.text('Atención').css('color', 'var(--error)');
        footer.text('Requiere mantenimiento correctivo');
        $('.progress-ring-gauge-68').css('background', `conic-gradient(var(--error) ${pct}%, #e2e8f0 0)`);
    }

    // 2. Actualizar UI del Anillo de Revisión de 24 Puntos (110px en pestaña Revisión)
    $('.rev-num').text(`${approved}/${total}`);

    let revStatus = $('.rev-status');
    let statusText = 'Excelente';
    let badgeBg = 'rgba(16, 185, 129, 0.1)';
    let badgeColor = 'var(--exito)';

    if (pct === 100) {
        revStatus.text('Excelente').css('color', 'var(--exito)');
        $('.progress-ring-gauge-110').css('background', `conic-gradient(var(--exito) 100%, #e2e8f0 0)`);
    } else if (pct >= 85) {
        statusText = 'Bueno';
        badgeBg = 'rgba(245, 158, 11, 0.1)';
        badgeColor = '#f59e0b';
        revStatus.text('Bueno').css('color', '#f59e0b');
        $('.progress-ring-gauge-110').css('background', `conic-gradient(#f59e0b ${pct}%, #e2e8f0 0)`);
    } else {
        statusText = 'Atención';
        badgeBg = 'rgba(239, 68, 68, 0.1)';
        badgeColor = 'var(--error)';
        revStatus.text('Atención').css('color', 'var(--error)');
        $('.progress-ring-gauge-110').css('background', `conic-gradient(var(--error) ${pct}%, #e2e8f0 0)`);
    }

    // 3. Actualizar la etiqueta del estatus global del reporte en la esquina superior derecha
    $('.revision-status-badge')
        .text(`Estatus: ${approved}/${total} Aprobados (${statusText})`)
        .css({ 'background-color': badgeBg, 'color': badgeColor });
}
