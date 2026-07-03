$(document).ready(function() {

    // --- BASE DE DATOS SIMULADA PARA DETALLES DE VEHÍCULOS ---
    const vehiculosDetalles = {
        1: {
            id: 1,
            nombre: "Toyota RAV4 2021",
            placa: "ABC-123-D",
            estatus: "Activo",
            foto: "/img/toyota_rav4.png",
            vin: "JTMWFREV5JJ123456",
            tipo: "SUV",
            combustible: "Gasolina",
            capacidad: "5 pasajeros",
            anio: 2021,
            color: "Blanco Perlado",
            motor: "2.5L 4 Cilindros",
            transmision: "Automática",
            kilometraje: "45,230 km",
            fechacompra: "10/03/2021",
            garantia: "Vigente hasta 10/03/2026",
            resumen: {
                proximoFecha: "15/06/2024",
                proximoKm: "en 2,350 km",
                ultimoTipo: "Servicio Mayor",
                ultimoFecha: "10/03/2024",
                ultimoKm: "hace 1,200 km",
                saludPct: 92,
                saludLabel: "Excelente",
                saludDesc: "Todo en óptimas condiciones",
                seguroProvider: "Qualitas",
                seguroPoliza: "1234567890",
                seguroCobertura: "Amplia",
                seguroVigencia: "15/07/23 - 15/07/24",
                seguroRestante: "Vigente (45 días restantes)",
                infraccionesCount: 2,
                infraccionesMonto: "$1,450.00",
                alertas: [
                    { tipo: "warning", msg: "Cambio de aceite", meta: "en 2,350 km" },
                    { tipo: "warning", msg: "Verificación", meta: "30/06/24" },
                    { tipo: "danger", msg: "Seguro vence", meta: "15/07/24" }
                ]
            },
            mantenimientoStats: {
                totalCost: "$5,900.00 MXN",
                totalCount: "3 Servicios",
                totalKm: "45,230 km"
            },
            mantenimientos: [
                {
                    fecha: "10/03/2024",
                    folio: "SRV-2024-0042",
                    concepto: "Servicio Mayor (45,000 km)",
                    detalles: "• Cambio de aceite sintético de motor (5W30)<br>• Reemplazo de filtros de aceite y aire de motor<br>• Cambio de bujías de platino y revisión general de niveles<br>• Lavado y ajuste de sistema de frenos",
                    km: "45,230 km",
                    taller: "Taller Centro Cavex",
                    tecnico: "Ing. Carlos Mendoza",
                    costo: "$3,450.00",
                    estado: "Completado"
                },
                {
                    fecha: "12/11/2023",
                    folio: "SRV-2023-0988",
                    concepto: "Cambio de Balatas Delanteras",
                    detalles: "• Reemplazo de pastillas de freno delanteras (cerámicas)<br>• Rectificado de discos delanteros por computadora<br>• Purga de aire e inspección de tuberías hidráulicas de freno",
                    km: "38,900 km",
                    taller: "Frenos Express",
                    tecnico: "Téc. Roberto Gómez",
                    costo: "$1,850.00",
                    estado: "Completado"
                },
                {
                    fecha: "15/06/2023",
                    folio: "SRV-2023-0412",
                    concepto: "Rotación y Balanceo",
                    detalles: "• Rotación de las 4 llantas Michelin en cruz<br>• Balanceo dinámico y calibración de contrapesos de plomo<br>• Alineación del eje delantero (convergencia/divergencia)",
                    km: "32,100 km",
                    taller: "Llantas del Norte",
                    tecnico: "Téc. Mario Estrada",
                    costo: "$600.00",
                    estado: "Completado"
                }
            ],
            revision: {
                aprobados: 24,
                total: 24,
                status: "Excelente",
                pct: 100,
                categorias: [
                    {
                        name: "Motor y Transmisión",
                        icon: "wrench",
                        items: [
                            { name: "Nivel y estado de aceite", approved: true },
                            { name: "Líquido refrigerante", approved: true },
                            { name: "Bandas y mangueras", approved: true },
                            { name: "Batería y sistema eléctrico", approved: true },
                            { name: "Filtro de aire", approved: true }
                        ]
                    },
                    {
                        name: "Sistema de Frenos",
                        icon: "check",
                        items: [
                            { name: "Pastillas de freno delanteras", approved: true },
                            { name: "Pastillas de freno traseras", approved: true },
                            { name: "Nivel de líquido de frenos", approved: true },
                            { name: "Discos y tambores de freno", approved: true },
                            { name: "Freno de mano", approved: true }
                        ]
                    },
                    {
                        name: "Dirección y Suspensión",
                        icon: "car",
                        items: [
                            { name: "Amortiguadores", approved: true },
                            { name: "Terminales de dirección", approved: true },
                            { name: "Horquillas y bujes", approved: true },
                            { name: "Ejes y juntas", approved: true }
                        ]
                    },
                    {
                        name: "Llantas y Rines",
                        icon: "wheel",
                        items: [
                            { name: "Presión de aire", approved: true },
                            { name: "Desgaste de la llanta", approved: true },
                            { name: "Estado de los rines", approved: true },
                            { name: "Llanta de refacción", approved: true }
                        ]
                    },
                    {
                        name: "Luces y Eléctrico",
                        icon: "warning",
                        items: [
                            { name: "Faros principales y direccionales", approved: true },
                            { name: "Luces traseras y de reversa", approved: true },
                            { name: "Luces del tablero", approved: true },
                            { name: "Alternador", approved: true }
                        ]
                    },
                    {
                        name: "Seguridad y Cristales",
                        icon: "shield",
                        items: [
                            { name: "Cinturones de seguridad", approved: true },
                            { name: "Cristales y parabrisas", approved: true },
                            { name: "Limpiaparabrisas", approved: true },
                            { name: "Espejos retrovisores", approved: true }
                        ]
                    }
                ]
            },
            llantas: [
                { pos: "DI", name: "Delantera Izquierda", modelo: "Michelin 225/65 R17", presion: "32 PSI (Correcta)", vida: "85% (Excelente)", statusClass: "success" },
                { pos: "DD", name: "Delantera Derecha", modelo: "Michelin 225/65 R17", presion: "32 PSI (Correcta)", vida: "85% (Excelente)", statusClass: "success" },
                { pos: "TI", name: "Trasera Izquierda", modelo: "Michelin 225/65 R17", presion: "31 PSI (Correcta)", vida: "75% (Bueno)", statusClass: "success" },
                { pos: "TD", name: "Trasera Derecha", modelo: "Michelin 225/65 R17", presion: "31 PSI (Correcta)", vida: "75% (Bueno)", statusClass: "success" },
                { pos: "REF", name: "Repuesto (Refacción)", modelo: "Goodyear T165/80 D17", presion: "60 PSI (Correcta)", vida: "100% (Nueva)", statusClass: "inactive" }
            ],
            seguro: {
                proveedor: "Qualitas Compañía de Seguros",
                statusBadge: "VIGENTE",
                statusDays: "Quedan 45 días",
                detalles: [
                    { label: "Número de Póliza", val: "POL-1234567890" },
                    { label: "Cobertura", val: "Amplia Plus" },
                    { label: "Vigencia", val: "15/07/2023 - 15/07/2024" },
                    { label: "Inciso/Endoso", val: "00000" }
                ],
                coberturasHelp: [
                    { label: "Teléfono Reportes", val: '<a href="tel:8008008000" class="link-azul-cavex">800 800 8000</a> o <strong class="text-azul-bold">*911</strong>' },
                    { label: "Deducible Daños Materiales", val: "5%" },
                    { label: "Deducible Robo Total", val: "10%" },
                    { label: "Responsabilidad Civil", val: "Hasta $3,000,000.00" }
                ],
                siniestros: [
                    { fecha: "14/10/2022", folio: "REP-2022-9981", tipo: "Choque menor (Alcance trasero)", ajustador: "Ing. Ricardo Domínguez", deducible: "$1,500.00 (Aplicó deducible)", estado: "CERRADO" },
                    { fecha: "03/05/2021", folio: "REP-2021-0421", tipo: "Rotura de parabrisas (Piedra en carretera)", ajustador: "Trámite Directo Express", deducible: "$0.00 (Exento por cobertura cristales)", estado: "CERRADO" }
                ]
            },
            infraccionesTotal: "Pendiente: $1,450.00",
            infracciones: [
                { fecha: "20/05/2024", folio: "INF-2024-8837", motivo: "<strong>Exceso de Velocidad</strong><br><span class=\"desc-text-small\">Detectado a 95 km/h en zona de 80 km/h (Fotocívica/Radar).</span>", lugar: "Av. Insurgentes Sur Km 15", monto: "$950.00", estatus: "Pendiente", isPending: true },
                { fecha: "12/04/2024", folio: "INF-2024-3312", motivo: "<strong>Estacionarse en Lugar Prohibido</strong><br><span class=\"desc-text-small\">Zonas de parquímetros sin comprobante vigente.</span>", lugar: "Colonia Roma Norte, Calle Colima", monto: "$500.00", estatus: "Pendiente", isPending: true },
                { fecha: "15/11/2023", folio: "INF-2023-0912", motivo: "<strong>Vuelta en U Prohibida</strong><br><span class=\"desc-text-small\">Giro prohibido en intersección señalizada.</span>", lugar: "Av. Paseo de la Reforma y Niza", monto: "$850.00", estatus: "Pagado", isPending: false, info: "Pago del 16/11/2023" }
            ],
            documentos: [
                { name: "Tarjeta de Circulación", type: "PDF", info: "Expira el: 12/03/2026", status: "Vigente" },
                { name: "Factura de Origen", type: "PDF", info: "Subido el: 10/03/2021", status: "Vigente" },
                { name: "Póliza de Seguro 2023-2024", type: "PDF", info: "Vence el: 15/07/2024", status: "Vigente" },
                { name: "Verificación Holograma 0", type: "PDF", info: "Primer Semestre 2024", status: "Vigente" },
                { name: "Constancia de Situación Fiscal", type: "PDF", info: "Faltante", status: "Faltante" },
                { name: "Dictamen de Emisiones", type: "PDF", info: "Por Actualizar", status: "Por Actualizar" }
            ],
            historial: [
                { title: "Infracción Registrada (Exceso de Velocidad)", fecha: "20/05/2024", desc: "Folio: INF-2024-8837. Capturada por radar en Av. Insurgentes Sur Km 15. Estatus: Pendiente de pago.", dotClass: "timeline-dot-warning" },
                { title: "Servicio Mayor Realizado (45,000 km)", fecha: "10/03/2024", desc: "Servicio completo en Taller Centro Cavex. Cambio de fluidos, filtros, bujías y reporte de inspección de 24 puntos limpio (100% aprobado).", dotClass: "timeline-dot-success" },
                { title: "Renovación de Póliza de Seguro", fecha: "15/07/2023", desc: "Contratación de póliza anual Qualitas Cobertura Amplia Plus (No. Póliza POL-1234567890).", dotClass: "" },
                { title: "Cambio de Neumáticos y Rotación", fecha: "15/06/2023", desc: "Instalación de 4 llantas Michelin Primacy 4 nuevas en eje delantero y trasero a los 32,100 km.", dotClass: "timeline-dot-success" },
                { title: "Siniestro Reportado (Choque por alcance)", fecha: "14/10/2022", desc: "Incidente menor reportado a Qualitas (Folio de siniestro ajustador: REP-2022-9981). Reparado en taller certificado con cambio de fascia trasera.", dotClass: "timeline-dot-warning" },
                { title: "Alta del Vehículo en la Plataforma", fecha: "10/03/2021", desc: "Registro inicial del vehículo Toyota RAV4 2021 con placas ABC-123-D bajo el propietario Juan Pérez López.", dotClass: "" }
            ],
            chartData: {
                real: [200000, 200060, 200115, 200195, 200250, 200325, 200410],
                estimado: [200000, 200045, 200090, 200155, 200200, 200260, 200330]
            }
        },
        2: {
            id: 2,
            nombre: "Nissan Versa 2020",
            placa: "XYZ-987-A",
            estatus: "Activo",
            foto: null,
            vin: "3N1CN7AD0LL123456",
            tipo: "Sedán",
            combustible: "Gasolina",
            capacidad: "5 pasajeros",
            anio: 2020,
            color: "Gris Oxford",
            motor: "1.6L 4 Cilindros",
            transmision: "Manual",
            kilometraje: "38,600 km",
            fechacompra: "12/08/2020",
            garantia: "Vencida",
            resumen: {
                proximoFecha: "12/10/2024",
                proximoKm: "en 5,400 km",
                ultimoTipo: "Alineación y Balanceo",
                ultimoFecha: "15/04/2024",
                ultimoKm: "hace 2,000 km",
                saludPct: 85,
                saludLabel: "Bueno",
                saludDesc: "Detalles menores por atender",
                seguroProvider: "GNP",
                seguroPoliza: "GNP-987654321",
                seguroCobertura: "Limitada",
                seguroVigencia: "20/08/23 - 20/08/24",
                seguroRestante: "Vigente",
                infraccionesCount: 0,
                infraccionesMonto: "$0.00",
                alertas: []
            },
            mantenimientoStats: {
                totalCost: "$2,100.00 MXN",
                totalCount: "1 Servicios",
                totalKm: "38,600 km"
            },
            mantenimientos: [
                {
                    fecha: "15/04/2024",
                    folio: "SRV-2024-0015",
                    concepto: "Alineación y Balanceo",
                    detalles: "• Alineación y balanceo de ruedas delanteras",
                    km: "36,600 km",
                    taller: "Taller Rápido",
                    tecnico: "Juan N.",
                    costo: "$500.00",
                    estado: "Completado"
                }
            ],
            revision: {
                aprobados: 20,
                total: 24,
                status: "Bueno",
                pct: 83,
                categorias: []
            },
            llantas: [],
            seguro: {
                proveedor: "GNP Seguros",
                statusBadge: "VIGENTE",
                statusDays: "Vence pronto",
                detalles: [
                    { label: "Número de Póliza", val: "GNP-987654321" },
                    { label: "Cobertura", val: "Limitada" }
                ],
                coberturasHelp: [],
                siniestros: []
            },
            infraccionesTotal: "Pendiente: $0.00",
            infracciones: [],
            documentos: [],
            historial: [],
            chartData: {
                real: [15000, 20000, 25000, 30000, 35000, 38600],
                estimado: [15000, 19000, 24000, 29000, 34000, 39000]
            }
        },
        3: {
            id: 3,
            nombre: "Ford Transit 2025",
            placa: "CAV-519-C",
            estatus: "Activo",
            foto: null,
            vin: "1FTEW1EP7MFA00045",
            tipo: "Camioneta",
            combustible: "Gasolina",
            capacidad: "7 pasajeros",
            anio: 2025,
            color: "Azul",
            motor: "3.5L V6",
            transmision: "Manual",
            kilometraje: "7,900 km",
            fechacompra: "06/03/2026",
            garantia: "Vigente",
            resumen: {
                proximoFecha: "06/09/2026",
                proximoKm: "en 2,100 km",
                ultimoTipo: "Ninguno",
                ultimoFecha: "—",
                ultimoKm: "—",
                saludPct: 100,
                saludLabel: "Excelente",
                saludDesc: "Unidad nueva",
                seguroProvider: "Axa",
                seguroPoliza: "AXA-Transit-2025",
                seguroCobertura: "Amplia",
                seguroVigencia: "06/03/26 - 06/03/27",
                seguroRestante: "Vigente",
                infraccionesCount: 0,
                infraccionesMonto: "$0.00",
                alertas: []
            },
            mantenimientoStats: {
                totalCost: "$0.00 MXN",
                totalCount: "0 Servicios",
                totalKm: "7,900 km"
            },
            mantenimientos: [],
            revision: {
                aprobados: 24,
                total: 24,
                status: "Excelente",
                pct: 100,
                categorias: []
            },
            llantas: [],
            seguro: {
                proveedor: "Axa Seguros",
                statusBadge: "VIGENTE",
                statusDays: "Nueva",
                detalles: [],
                coberturasHelp: [],
                siniestros: []
            },
            infraccionesTotal: "Pendiente: $0.00",
            infracciones: [],
            documentos: [],
            historial: [],
            chartData: {
                real: [0, 2000, 4000, 6000, 7900],
                estimado: [0, 2000, 4000, 6000, 8000]
            }
        }
    };

    const vehiculoId = window.vehiculoId || 1;
    let vehiculo = vehiculosDetalles[vehiculoId] || vehiculosDetalles[1];

    // --- 1. FUNCIONES DE RENDERIZADO GENERAL Y LLENADO DE DATOS ---
    function poblarCabeceraYDatosGenerales() {
        let fotoUrl = vehiculo.foto;
        if (!fotoUrl) {
            fotoUrl = "/svg/vista-detalles-vehiculos/car.svg";
        }
        $('#det-foto').attr('src', fotoUrl);
        $('#det-nombre').text(vehiculo.nombre);
        $('#det-placa').text(vehiculo.placa);
        $('#det-estatus').text(vehiculo.estatus);
        
        if (vehiculo.estatus === "Activo") {
            $('#det-estatus').attr('class', 'badge-status-active');
        } else {
            $('#det-estatus').attr('class', 'badge-status-inactive');
        }

        $('#det-vin').text(vehiculo.vin);
        $('#det-tipo').text(vehiculo.tipo || '—');
        $('#det-combustible').text(vehiculo.combustible || '—');
        $('#det-capacidad').text(vehiculo.capacidad || '—');
        $('#det-anio').text(vehiculo.anio);
        $('#det-color').text(vehiculo.color);
        $('#det-motor').text(vehiculo.motor);
        $('#det-transmision').text(vehiculo.transmision);
        $('#det-kilometraje').text(vehiculo.kilometraje);
        $('#det-fechacompra').text(vehiculo.fechacompra);
        $('#det-garantia').text(vehiculo.garantia);
    }

    function renderPlaceholderVacio(seccionNombre) {
        return `
            <div class="empty-section-banner text-center py-5" style="width: 100%; border: 2px dashed #cbd5e1; border-radius: 14px; background: #f8fafc; margin: 15px 0;">
                <img src="/svg/vista-detalles-vehiculos/folder.svg" width="48" height="48" style="opacity: 0.3; margin-bottom: 12px;" />
                <h5 class="text-muted font-weight-bold">Sin registros aún</h5>
                <p class="small text-muted mb-0">No se encontraron registros de ${seccionNombre} para este vehículo.</p>
            </div>
        `;
    }

    function renderFilaTablaVacia(colspan, seccionNombre) {
        return `
            <tr>
                <td colspan="${colspan}" class="text-center py-5 text-muted">
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
                        <img src="/svg/vista-detalles-vehiculos/folder.svg" width="40" height="40" style="opacity: 0.3;" />
                        <div>
                            <span class="font-weight-bold d-block" style="color: var(--gris-oscuro);">Sin registros aún</span>
                            <span class="small text-muted">No se encontraron registros de ${seccionNombre} para este vehículo.</span>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }

    function renderAlertasResumen() {
        const container = $('#resumen-alertas-lista');
        container.empty();
        if (!vehiculo.resumen.alertas || vehiculo.resumen.alertas.length === 0) {
            container.html('<div class="alert-item text-muted text-center py-2"><span class="small font-weight-bold">Sin registros aún</span></div>');
            return;
        }

        vehiculo.resumen.alertas.forEach(a => {
            const dotClass = a.tipo === "danger" ? "alert-dot-danger" : "alert-dot-warning";
            const html = `
                <div class="alert-item">
                    <div class="alert-left">
                        <span class="alert-dot ${dotClass}" title="${a.tipo === "danger" ? "Urgente" : "Próximo"}"></span>
                        <span class="alert-msg">${a.msg}</span>
                    </div>
                    <span class="alert-meta">${a.meta}</span>
                </div>
            `;
            container.append(html);
        });
    }

    function renderMantenimientoResumen() {
        const container = $('#resumen-mantenimiento-lista');
        container.empty();
        
        container.append(`
            <div class="maint-item-header">
                <span>Servicio</span>
                <span>Fecha</span>
                <span>Kilometraje</span>
                <span style="text-align: right;">Estado</span>
            </div>
        `);

        if (!vehiculo.mantenimientos || vehiculo.mantenimientos.length === 0) {
            container.append('<div class="p-3 text-center text-muted small font-weight-bold">Sin registros aún</div>');
            return;
        }

        const itemsToShow = vehiculo.mantenimientos.slice(0, 4);
        itemsToShow.forEach(m => {
            let iconSrc = "/svg/vista-detalles-vehiculos/wrench.svg";
            let colorClass = "maint-icon-yellow";
            if (m.concepto.toLowerCase().includes("aceite")) {
                iconSrc = "/svg/vista-detalles-vehiculos/dollar.svg";
                colorClass = "maint-icon-orange";
            } else if (m.concepto.toLowerCase().includes("rotación") || m.concepto.toLowerCase().includes("llanta")) {
                iconSrc = "/svg/vista-detalles-vehiculos/speedometer.svg";
                colorClass = "maint-icon-blue";
            }

            const html = `
                <div class="maint-item">
                    <div class="maint-left">
                        <span class="maint-icon ${colorClass}">
                            <img src="${iconSrc}" width="11" height="11" alt="Icono" />
                        </span>
                        <span class="maint-name">${m.concepto}</span>
                    </div>
                    <span class="maint-date">${m.fecha}</span>
                    <span class="maint-km">${m.km}</span>
                    <div class="maint-status">
                        <span class="badge-status-completed">${m.estado}</span>
                    </div>
                </div>
            `;
            container.append(html);
        });
    }

    function renderRevisionResumen() {
        $('#resumen-salud-pct').text(`${vehiculo.resumen.saludPct}%`);
        $('#resumen-salud-label').text(vehiculo.resumen.saludLabel);
        $('#resumen-salud-footer').text(vehiculo.resumen.saludDesc);

        let color = "var(--exito)";
        if (vehiculo.resumen.saludPct < 50) color = "var(--error)";
        else if (vehiculo.resumen.saludPct < 90) color = "#f59e0b";
        $('.progress-ring-gauge-68').css('background', `conic-gradient(${color} ${vehiculo.resumen.saludPct}%, #e2e8f0 0)`);

        $('#resumen-revision-num').text(`${vehiculo.revision.aprobados}/${vehiculo.revision.total}`);
        $('#resumen-revision-status').text(vehiculo.revision.status);
        $('.progress-ring-gauge-110').css('background', `conic-gradient(${color} ${vehiculo.revision.pct}%, #e2e8f0 0)`);

        const checklist = $('#resumen-revision-checklist');
        checklist.empty();

        if (!vehiculo.revision.categorias || vehiculo.revision.categorias.length === 0) {
            checklist.append('<div class="p-3 text-center text-muted small font-weight-bold">Sin registros aún</div>');
            return;
        }

        let count = 0;
        vehiculo.revision.categorias.forEach(cat => {
            cat.items.forEach(item => {
                if (count < 5 && item.approved) {
                    const html = `
                        <div class="check-item">
                            <span class="check-icon">
                                <img src="/svg/vista-detalles-vehiculos/check.svg" width="12" height="12" alt="Aprobado" />
                            </span>
                            <span>${item.name}</span>
                        </div>
                    `;
                    checklist.append(html);
                    count++;
                }
            });
        });
        if (vehiculo.revision.aprobados > 5) {
            checklist.append(`<div class="check-more">... y ${vehiculo.revision.aprobados - 5} puntos más</div>`);
        }
    }

    function renderSeguroResumen() {
        $('#resumen-seguro-provider').text(vehiculo.resumen.seguroProvider);
        $('#resumen-seguro-poliza').html(`Póliza: <span>${vehiculo.resumen.seguroPoliza}</span>`);
        $('#resumen-seguro-cobertura').html(`Cobertura: <span>${vehiculo.resumen.seguroCobertura}</span>`);
        $('#resumen-seguro-vigencia').html(`Vigencia: <span>${vehiculo.resumen.seguroVigencia}</span>`);
        
        const restanteEl = $('#resumen-seguro-restante');
        restanteEl.text(vehiculo.resumen.seguroRestante);
        
        if (vehiculo.resumen.seguroRestante.includes("Vigente")) {
            restanteEl.attr('class', 'badge-seguro-vigente');
        } else {
            restanteEl.attr('class', 'badge-seguro-vencido');
        }
    }

    function renderInfraccionesResumen() {
        $('#resumen-infracciones-count').text(vehiculo.resumen.infraccionesCount);
        $('#resumen-infracciones-monto').html(`Total adeudado: <span>${vehiculo.resumen.infraccionesMonto}</span>`);
    }

    function renderDocumentosResumen() {
        const container = $('#resumen-documentos-lista');
        container.empty();

        if (!vehiculo.documentos || vehiculo.documentos.length === 0) {
            container.append('<div class="p-3 text-center text-muted small font-weight-bold">Sin registros aún</div>');
            return;
        }

        const docsToShow = vehiculo.documentos.slice(0, 3);
        docsToShow.forEach(d => {
            const dateStr = d.info.includes("Expira") || d.info.includes("Subido") || d.info.includes("Vence") ? d.info.split(": ")[1] : "—";
            const html = `
                <div class="doc-item">
                    <div class="doc-left">
                        <span class="doc-icon">
                            <img src="/svg/vista-detalles-vehiculos/file-pdf.svg" width="16" height="16" alt="PDF" />
                        </span>
                        <span>${d.name}</span>
                    </div>
                    <div class="doc-meta">
                        <span class="doc-type">${d.type}</span>
                        <span class="doc-date">${dateStr}</span>
                        <a href="#" class="doc-download-btn" title="Descargar">
                            <img src="/svg/vista-detalles-vehiculos/download.svg" width="14" height="14" alt="Descargar" />
                        </a>
                    </div>
                </div>
            `;
            container.append(html);
        });
    }

    function renderResumenTab() {
        // Próximo Servicio
        const proximoBody = $('#resumen-proximo-body');
        proximoBody.empty();
        if (!vehiculo.resumen.proximoFecha || vehiculo.resumen.proximoFecha.trim() === "") {
            proximoBody.html('<div class="text-center text-muted py-3"><span class="small font-weight-bold">Sin registros aún</span></div>');
        } else {
            proximoBody.html(`
                <span class="metric-card-label">Servicio Programado</span>
                <span class="metric-card-value">${vehiculo.resumen.proximoFecha}</span>
                <span class="metric-card-subtext">${vehiculo.resumen.proximoKm}</span>
            `);
        }

        // Último Servicio
        const ultimoBody = $('#resumen-ultimo-body');
        ultimoBody.empty();
        if (!vehiculo.resumen.ultimoFecha || vehiculo.resumen.ultimoFecha.trim() === "") {
            ultimoBody.html('<div class="text-center text-muted py-3"><span class="small font-weight-bold">Sin registros aún</span></div>');
        } else {
            ultimoBody.html(`
                <span class="metric-card-label">${vehiculo.resumen.ultimoTipo}</span>
                <span class="metric-card-value">${vehiculo.resumen.ultimoFecha}</span>
                <span class="metric-card-subtext">${vehiculo.resumen.ultimoKm}</span>
            `);
        }

        // Kilometraje (sin promedio)
        $('#resumen-km-actual').text(vehiculo.kilometraje || "0 km");

        renderAlertasResumen();
        renderMantenimientoResumen();
        renderRevisionResumen();
        renderSeguroResumen();
        renderInfraccionesResumen();
        renderDocumentosResumen();
    }

    function renderMantenimientoTab() {
        $('#maint-total-cost').text(vehiculo.mantenimientoStats.totalCost);
        $('#maint-total-count').text(vehiculo.mantenimientoStats.totalCount);
        $('#maint-total-km').text(vehiculo.mantenimientoStats.totalKm);

        const tableBody = $('#mantenimiento-tabla-body');
        tableBody.empty();

        if (!vehiculo.mantenimientos || vehiculo.mantenimientos.length === 0) {
            tableBody.html(renderFilaTablaVacia(10, "Mantenimientos"));
            return;
        }

        vehiculo.mantenimientos.forEach(m => {
            const html = `
                <tr>
                    <td>${m.fecha}</td>
                    <td class="cell-folio">${m.folio}</td>
                    <td><strong>${m.concepto}</strong></td>
                    <td><span class="table-details-list">${m.detalles}</span></td>
                    <td class="cell-mileage">${m.km}</td>
                    <td>${m.taller}</td>
                    <td>${m.tecnico}</td>
                    <td class="cell-amount">${m.costo}</td>
                    <td><span class="badge-cavex completed">${m.estado}</span></td>
                    <td class="cell-actions">
                        <a href="#" class="doc-download-btn" title="Descargar Factura PDF">
                            <img src="/svg/vista-detalles-vehiculos/folder.svg" width="14" height="14" alt="Ver" />
                        </a>
                    </td>
                </tr>
            `;
            tableBody.append(html);
        });
    }

    function renderRevisionTab() {
        const total = vehiculo.revision.total;
        const aprobados = vehiculo.revision.aprobados;
        const statusText = vehiculo.revision.status;
        const pct = vehiculo.revision.pct;
        
        let badgeBg = 'rgba(16, 185, 129, 0.1)';
        let badgeColor = 'var(--exito)';
        if (pct < 50) {
            badgeBg = 'rgba(239, 68, 68, 0.1)';
            badgeColor = 'var(--error)';
        } else if (pct < 90) {
            badgeBg = 'rgba(245, 158, 11, 0.1)';
            badgeColor = '#f59e0b';
        }

        $('#revision-status-badge')
            .text(`Estatus: ${aprobados}/${total} Aprobados (${statusText})`)
            .css({ 'background-color': badgeBg, 'color': badgeColor });

        const grid = $('#revision-cats-grid');
        grid.empty();

        if (!vehiculo.revision.categorias || vehiculo.revision.categorias.length === 0) {
            grid.html(renderPlaceholderVacio("Revisión de 24 Puntos"));
            return;
        }

        vehiculo.revision.categorias.forEach(cat => {
            let catItemsHtml = "";
            cat.items.forEach((item, idx) => {
                const isNoBorder = (idx === cat.items.length - 1) ? "no-border" : "";
                const statusClass = item.approved ? "status-approved" : "status-failed";
                const statusSymbol = item.approved ? "✓ Aprobado" : "✗ Falla";
                
                catItemsHtml += `
                    <div class="check-item-row ${isNoBorder}">
                        <span>• ${item.name}</span>
                        <span class="${statusClass}">${statusSymbol}</span>
                    </div>
                `;
            });

            let iconPath = `/svg/vista-detalles-vehiculos/${cat.icon}.svg`;
            const catHtml = `
                <div class="checklist-cat-card">
                    <h4 class="checklist-cat-title">
                        <img src="${iconPath}" width="16" height="16" alt="Icono" />
                        ${cat.name}
                    </h4>
                    <div class="check-items-list">
                        ${catItemsHtml}
                    </div>
                </div>
            `;
            grid.append(catHtml);
        });

        // Click interactivo
        $('.check-item-row').css('cursor', 'pointer').click(function() {
            let statusSpan = $(this).find('.status-approved, .status-failed');
            if (statusSpan.length === 0) return;

            if (statusSpan.hasClass('status-approved')) {
                statusSpan.removeClass('status-approved').addClass('status-failed');
                statusSpan.text('✗ Falla');
            } else {
                statusSpan.removeClass('status-failed').addClass('status-approved');
                statusSpan.text('✓ Aprobado');
            }

            let totalItems = $('.check-item-row').length;
            let approvedItems = 0;
            $('.check-item-row').each(function() {
                let text = $(this).find('.status-approved, .status-failed').text().trim();
                if (text.indexOf('✓') !== -1) {
                    approvedItems++;
                }
            });
            let newPct = totalItems > 0 ? Math.round((approvedItems / totalItems) * 100) : 0;
            
            $('.progress-ring-text-68').text(`${newPct}%`);
            $('#resumen-revision-num').text(`${approvedItems}/${totalItems}`);
            
            let healthLabel = 'Excelente';
            let newColor = 'var(--exito)';
            if (newPct < 50) {
                healthLabel = 'Atención';
                newColor = 'var(--error)';
            } else if (newPct < 90) {
                healthLabel = 'Bueno';
                newColor = '#f59e0b';
            }
            $('#resumen-salud-label').text(healthLabel);
            $('#resumen-revision-status').text(healthLabel);
            
            $('.progress-ring-gauge-68').css('background', `conic-gradient(${newColor} ${newPct}%, #e2e8f0 0)`);
            $('.progress-ring-gauge-110').css('background', `conic-gradient(${newColor} ${newPct}%, #e2e8f0 0)`);
            
            let newBadgeBg = 'rgba(16, 185, 129, 0.1)';
            if (newPct < 50) newBadgeBg = 'rgba(239, 68, 68, 0.1)';
            else if (newPct < 90) newBadgeBg = 'rgba(245, 158, 11, 0.1)';

            $('#revision-status-badge')
                .text(`Estatus: ${approvedItems}/${totalItems} Aprobados (${healthLabel})`)
                .css({ 'background-color': newBadgeBg, 'color': newColor });
        });
    }

    function renderLlantasTab() {
        const grid = $('#llantas-grid');
        grid.empty();

        if (!vehiculo.llantas || vehiculo.llantas.length === 0) {
            grid.html(renderPlaceholderVacio("Neumáticos"));
            return;
        }

        vehiculo.llantas.forEach(ll => {
            const indicatorClass = ll.statusClass || "success";
            const cardRefClass = ll.pos === "REF" ? "refaccion-card" : "";
            const html = `
                <div class="llanta-card ${cardRefClass}">
                    <div class="llanta-indicator ${indicatorClass}">${ll.pos}</div>
                    <div class="llanta-info">
                        <span class="llanta-title">${ll.name}</span>
                        <span><strong>Modelo:</strong> ${ll.modelo}</span>
                        <span><strong>Presión:</strong> ${ll.presion}</span>
                        <span><strong>Vida Útil:</strong> ${ll.vida}</span>
                    </div>
                </div>
            `;
            grid.append(html);
        });
    }

    function renderSeguroTab() {
        $('#seguro-proveedor').text(vehiculo.seguro.proveedor);
        
        const detailsList = $('#seguro-detalles-lista');
        detailsList.empty();
        
        if (vehiculo.seguro.detalles.length === 0) {
            detailsList.append('<div class="p-3 text-muted text-center small font-weight-bold">Sin registros aún</div>');
        } else {
            vehiculo.seguro.detalles.forEach(d => {
                detailsList.append(`<div><span>${d.label}:</span> <strong>${d.val}</strong></div>`);
            });
        }

        const badgeEl = $('#seguro-status-badge');
        const daysEl = $('#seguro-status-days');
        
        badgeEl.text(vehiculo.seguro.statusBadge);
        daysEl.text(vehiculo.seguro.statusDays);

        if (vehiculo.seguro.statusBadge === "VIGENTE") {
            badgeEl.attr('class', 'policy-status-badge');
            badgeEl.css({'background-color': 'rgba(16, 185, 129, 0.1)', 'color': 'var(--exito)'});
        } else {
            badgeEl.attr('class', 'policy-status-badge venc');
            badgeEl.css({'background-color': 'rgba(239, 68, 68, 0.1)', 'color': 'var(--error)'});
        }

        const helpList = $('#seguro-help-detalles');
        helpList.empty();
        
        if (vehiculo.seguro.coberturasHelp.length === 0) {
            helpList.append('<div class="text-muted small font-weight-bold">Sin registros aún</div>');
        } else {
            vehiculo.seguro.coberturasHelp.forEach(c => {
                helpList.append(`<div><strong>${c.label}:</strong> ${c.val}</div>`);
            });
        }

        const tableBody = $('#siniestros-tabla-body');
        tableBody.empty();

        if (!vehiculo.seguro.siniestros || vehiculo.seguro.siniestros.length === 0) {
            tableBody.html(renderFilaTablaVacia(6, "Siniestros"));
            return;
        }

        vehiculo.seguro.siniestros.forEach(s => {
            const html = `
                <tr>
                    <td>${s.fecha}</td>
                    <td>${s.folio}</td>
                    <td>${s.tipo}</td>
                    <td>${s.ajustador}</td>
                    <td>${s.deducible}</td>
                    <td><span style="background-color: #f1f5f9; color: var(--gris); font-size: 11.5px; font-weight: 700; padding: 4px 8px; border-radius: 4px;">${s.estado}</span></td>
                </tr>
            `;
            tableBody.append(html);
        });
    }

    function renderInfraccionesTab() {
        $('#infracciones-total-badge').text(vehiculo.infraccionesTotal);

        const tableBody = $('#infracciones-tabla-body');
        tableBody.empty();

        if (!vehiculo.infracciones || vehiculo.infracciones.length === 0) {
            tableBody.html(renderFilaTablaVacia(7, "Infracciones"));
            return;
        }

        vehiculo.infracciones.forEach(inf => {
            const statusClass = inf.isPending ? "badge-cavex pending" : "badge-cavex completed";
            const actionHtml = inf.isPending 
                ? `<a href="#" class="btn-action-primary small">Pagar Multa</a>` 
                : `<span class="cell-info-italic">${inf.info || "Completado"}</span>`;

            const html = `
                <tr>
                    <td>${inf.fecha}</td>
                    <td class="cell-folio">${inf.folio}</td>
                    <td>${inf.motivo}</td>
                    <td>${inf.lugar}</td>
                    <td class="cell-amount error">${inf.monto}</td>
                    <td><span class="${statusClass}">${inf.estatus}</span></td>
                    <td class="cell-actions text-right">${actionHtml}</td>
                </tr>
            `;
            tableBody.append(html);
        });
    }

    function renderDocumentosTab() {
        const grid = $('#documentos-grid');
        grid.empty();

        if (!vehiculo.documentos || vehiculo.documentos.length === 0) {
            grid.html(renderPlaceholderVacio("Documentos"));
            return;
        }

        vehiculo.documentos.forEach(d => {
            let actionHtml = "";
            let leftIconOpacity = "1";
            let statusPillHtml = "";

            if (d.status === "Faltante") {
                leftIconOpacity = "0.5";
                statusPillHtml = `<div><span class="badge-status-missing">Faltante</span></div>`;
                actionHtml = `<a href="#" class="btn-doc-action">Subir</a>`;
            } else if (d.status === "Por Actualizar") {
                leftIconOpacity = "0.7";
                statusPillHtml = `<div><span class="badge-status-pending">Por Actualizar</span></div>`;
                actionHtml = `<a href="#" class="btn-doc-action warning">Actualizar</a>`;
            } else {
                actionHtml = `
                    <span class="doc-type">${d.type}</span>
                    <a href="#" class="doc-download-btn" title="Descargar">
                        <img src="/svg/vista-detalles-vehiculos/download.svg" width="14" height="14" alt="Descargar" />
                    </a>
                `;
            }

            const html = `
                <div class="doc-item">
                    <div class="doc-left">
                        <span class="doc-icon">
                            <img src="/svg/vista-detalles-vehiculos/file-pdf.svg" width="18" height="18" alt="PDF" style="opacity: ${leftIconOpacity};" />
                        </span>
                        <div>
                            <span class="doc-name">${d.name}</span>
                            ${statusPillHtml || `<span class="doc-info">${d.info}</span>`}
                        </div>
                    </div>
                    <div class="doc-meta">
                        ${actionHtml}
                    </div>
                </div>
            `;
            grid.append(html);
        });
    }

    function renderHistorialTab() {
        const container = $('#historial-timeline-list');
        container.empty();

        if (!vehiculo.historial || vehiculo.historial.length === 0) {
            container.html(renderPlaceholderVacio("Historial de Actividades"));
            return;
        }

        vehiculo.historial.forEach(h => {
            const dotClass = h.dotClass || "";
            const html = `
                <div class="timeline-item">
                    <span class="timeline-dot ${dotClass}"></span>
                    <div class="timeline-header">
                        <span class="timeline-title">${h.title}</span>
                        <span class="timeline-date">${h.fecha}</span>
                    </div>
                    <div class="timeline-desc">
                        ${h.desc}
                    </div>
                </div>
            `;
            container.append(html);
        });
    }

    // Cargar catálogos vehiculares dinámicos y luego los detalles
    const vehiculoCatalogos = {
        idVehCatMarcaVehiculo: [],
        idVehCatColor: [],
        idVehCatTipoVehiculo: [],
        idVehCatCapacidad: [],
        idVehCatTipoCombustible: [],
        idVehCatStatus: [],
        idVehCatTransmision: []
    };

    fetch('/Vehiculos/GetVehiculoCatalogos')
        .then(res => res.json())
        .then(catalogResult => {
            if (catalogResult.success && catalogResult.data) {
                Object.assign(vehiculoCatalogos, catalogResult.data);
            }

            return fetch(`/Vehiculos/GetVehiculo?id=${vehiculoId}`);
        })
        .then(res => res.json())
        .then(res => {
            if (res.success && res.data) {
                const v = res.data;

                // Si el vehículo no existía previamente en la BD simulada, inicializarlo vacío
                if (!vehiculosDetalles[v.id]) {
                    vehiculosDetalles[v.id] = {
                        id: v.id,
                        nombre: "",
                        placa: "",
                        estatus: "",
                        foto: null,
                        vin: "",
                        tipo: "",
                        combustible: "",
                        capacidad: "",
                        anio: "",
                        color: "",
                        motor: "",
                        transmision: "",
                        kilometraje: "",
                        fechacompra: "",
                        garantia: "",
                        resumen: {
                            proximoFecha: "",
                            proximoKm: "",
                            ultimoTipo: "",
                            ultimoFecha: "",
                            ultimoKm: "",
                            saludPct: 0,
                            saludLabel: "Sin datos",
                            saludDesc: "Sin registros aún",
                            seguroProvider: "Sin registros aún",
                            seguroPoliza: "Sin registros aún",
                            seguroCobertura: "Sin registros aún",
                            seguroVigencia: "Sin registros aún",
                            seguroRestante: "Sin registros aún",
                            infraccionesCount: 0,
                            infraccionesMonto: "$0.00",
                            alertas: []
                        },
                        mantenimientoStats: {
                            totalCost: "$0.00 MXN",
                            totalCount: "0 Servicios",
                            totalKm: "0 km"
                        },
                        mantenimientos: [],
                        revision: {
                            aprobados: 0,
                            total: 24,
                            status: "Sin datos",
                            pct: 0,
                            categorias: []
                        },
                        llantas: [],
                        seguro: {
                            proveedor: "Sin registros aún",
                            statusBadge: "SIN REGISTRO",
                            statusDays: "",
                            detalles: [],
                            coberturasHelp: [],
                            siniestros: []
                        },
                        infraccionesTotal: "Pendiente: $0.00",
                        infracciones: [],
                        documentos: [],
                        historial: [],
                        chartData: {
                            real: [],
                            estimado: []
                        }
                    };
                }

                vehiculo = vehiculosDetalles[v.id];

                const strMarca = vehiculoCatalogos.idVehCatMarcaVehiculo.find(item => item.id === v.idVehCatMarcaVehiculo)?.strValor || "Desconocida";
                const strColor = vehiculoCatalogos.idVehCatColor.find(item => item.id === v.idVehCatColor)?.strValor || "Desconocido";
                const strTipoVehiculo = vehiculoCatalogos.idVehCatTipoVehiculo.find(item => item.id === v.idVehCatTipoVehiculo)?.strValor || "Desconocido";
                const strCapacidad = vehiculoCatalogos.idVehCatCapacidad.find(item => item.id === v.idVehCatCapacidad)?.strValor || "—";
                const strTipoCombustible = vehiculoCatalogos.idVehCatTipoCombustible.find(item => item.id === v.idVehCatTipoCombustible)?.strValor || "—";
                const strTransmision = vehiculoCatalogos.idVehCatTransmision.find(item => item.id === v.idVehCatTransmision)?.strValor || (v.idVehCatTransmision === 2 ? "Manual" : "Automática");
                const strStatus = vehiculoCatalogos.idVehCatStatus.find(item => item.id === v.idVehCatStatus)?.strValor || "Activo";

                let strFechaCompra = "Desconocida";
                if (v.dtFechaCompra) {
                    const date = new Date(v.dtFechaCompra);
                    strFechaCompra = date.toLocaleDateString("es-MX");
                }

                // Sobrescribir datos simulados principales
                vehiculo.nombre = `${strMarca} ${v.strModelo || ""} ${v.intAnio || ""}`.trim();
                vehiculo.placa = v.strPlaca || "Sin placa";
                vehiculo.estatus = strStatus;
                vehiculo.foto = v.strUrlFoto || null;
                vehiculo.vin = v.strNumSerie || "—";
                vehiculo.tipo = strTipoVehiculo;
                vehiculo.combustible = strTipoCombustible;
                vehiculo.capacidad = strCapacidad;
                vehiculo.anio = v.intAnio || "—";
                vehiculo.color = strColor;
                vehiculo.motor = v.strMotor || "—";
                vehiculo.transmision = strTransmision;
                vehiculo.kilometraje = Number(v.decKilometrajeActual || 0).toLocaleString("es-MX") + " km";
                vehiculo.fechacompra = strFechaCompra;
                vehiculo.garantia = v.strObservaciones || "—";
            }

            poblarCabeceraYDatosGenerales();
            renderResumenTab();
            renderMantenimientoTab();
            renderRevisionTab();
            renderLlantasTab();
            renderSeguroTab();
            renderInfraccionesTab();
            renderDocumentosTab();
            renderHistorialTab();

            $('#skeleton-wrapper').fadeOut(150, function() {
                $('#data-wrapper').fadeIn(200, function() {
                    initMileageChart();

                    const tieneVacios = 
                        vehiculo.mantenimientos.length === 0 || 
                        vehiculo.seguro.siniestros.length === 0 || 
                        vehiculo.infracciones.length === 0 || 
                        vehiculo.documentos.length === 0 ||
                        vehiculo.historial.length === 0;

                    if (tieneVacios) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Atención: Datos Pendientes',
                            text: `El vehículo con placa ${vehiculo.placa} cuenta con expedientes y registros vacíos. Por favor complete la información requerida.`,
                            confirmButtonText: 'Entendido',
                            confirmButtonColor: '#061B3A',
                            timer: 5000,
                            timerProgressBar: true
                        });
                    }
                });
            });
        })
        .catch(err => {
            console.error("Error al obtener vehículo:", err);
            poblarCabeceraYDatosGenerales();
            renderResumenTab();
            renderMantenimientoTab();
            renderRevisionTab();
            renderLlantasTab();
            renderSeguroTab();
            renderInfraccionesTab();
            renderDocumentosTab();
            renderHistorialTab();

            $('#skeleton-wrapper').fadeOut(150, function() {
                $('#data-wrapper').fadeIn(200, function() {
                    initMileageChart();
                });
            });
        });

    // --- 5. MANEJADOR DE CAMBIO DE PESTAÑAS (TABS REACTIVOS) ---
    $('.tab-btn').click(function() {
        if ($(this).hasClass('active')) return;

        $('.tab-btn').removeClass('active');
        $(this).addClass('active');

        const targetTab = $(this).attr('data-tab');
        $('.tab-content').hide();
        $(`#tab-${targetTab}`).fadeIn(150);

        // --- 6. DETECCIÓN DE PESTAÑA VACÍA PARA DISPARAR SWEETALERT2 LOCALIZADO ---
        let estaVacio = false;
        let nombreSeccion = "";

        if (targetTab === "mantenimiento" && vehiculo.mantenimientos.length === 0) {
            estaVacio = true;
            nombreSeccion = "Historial de Mantenimientos";
        } else if (targetTab === "revision" && vehiculo.revision.categorias.length === 0) {
            estaVacio = true;
            nombreSeccion = "Puntos de Revisión";
        } else if (targetTab === "llantas" && vehiculo.llantas.length === 0) {
            estaVacio = true;
            nombreSeccion = "Control de Neumáticos";
        } else if (targetTab === "seguro" && vehiculo.seguro.siniestros.length === 0) {
            estaVacio = true;
            nombreSeccion = "Seguro / Siniestros";
        } else if (targetTab === "infracciones" && vehiculo.infracciones.length === 0) {
            estaVacio = true;
            nombreSeccion = "Infracciones Pendientes";
        } else if (targetTab === "documentos" && vehiculo.documentos.length === 0) {
            estaVacio = true;
            nombreSeccion = "Expediente de Documentos";
        } else if (targetTab === "historial" && vehiculo.historial.length === 0) {
            estaVacio = true;
            nombreSeccion = "Historial de Eventos";
        }

        if (estaVacio) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                title: `Sección vacía: ${nombreSeccion}`,
                text: 'No hay registros cargados para este vehículo.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        }
    });

    // --- 7. GRÁFICA COMPARATIVA DE KILOMETRAJE (Chart.js) ---
    function initMileageChart() {
        const ctx = document.getElementById('mileageChart');
        const placeholder = document.getElementById('mileageChartPlaceholder');
        if (!ctx) return;

        // Si no hay datos de kilometraje, ocultar canvas y mostrar placeholder
        if (!vehiculo.chartData || !vehiculo.chartData.real || vehiculo.chartData.real.length === 0) {
            ctx.style.display = 'none';
            if (placeholder) placeholder.style.display = 'flex';
            return;
        }

        ctx.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';

        if (typeof ChartDataLabels !== 'undefined') {
            Chart.register(ChartDataLabels);
        }

        const labels = ['Firma', 'Viaje 1', 'Viaje 2', 'Viaje 3', 'Viaje 4', 'Viaje 5', 'Viaje 6'];
        
        ctx.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Kilometraje Real',
                        data: vehiculo.chartData.real,
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
                        data: vehiculo.chartData.estimado,
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
});
