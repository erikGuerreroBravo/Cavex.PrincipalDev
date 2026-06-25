document.addEventListener('DOMContentLoaded', () => {
    // Id de todos los elementos de la vista de cotizaciones
    const registrarDireccionSi = document.getElementById('strRegistrarDireccionSolicitanteSi');
    const registrarDireccionNo = document.getElementById('strRegistrarDireccionSolicitanteNo');
    const direccionBloque = document.getElementById('divDireccionSolicitante');
    const pasajerosInput = document.getElementById('intCantidadPasajeros');
    const atencionSelect = document.getElementById('strTipoAtencionEspecial');
    const unidadSugerida = document.getElementById('strUnidadSugerida');
    const unidadAsignada = document.getElementById('strUnidadAsignada');
    const sucursalSelect = document.getElementById('intSucursalId');
    const direccionSucursal = document.getElementById('strDireccionSucursal');
    const distanciaInput = document.getElementById('intDistanciaKm');
    const tiempoInput = document.getElementById('intTiempoViajeMin');
    const servicioSelect = document.getElementById('intServicioId');
    const pagoChoferInput = document.getElementById('intPagoChoferDia');

    // Funcion es la encarga de cargar la sucursal que este seleccionada
    function obtenerSucursalSeleccionada() {
        if (!sucursalSelect) return null;
        const option = sucursalSelect.selectedOptions[0];
        if (!option || !option.value) return null;
        return {
            direccion: option.dataset.direccion || '',
            nombre: option.textContent.trim()
        };
    }

    // 
    function actualizarDireccionSolicitante() {
        if (!direccionBloque) return;
        const esSi = registrarDireccionSi && registrarDireccionSi.checked;
        direccionBloque.style.display = esSi ? 'block' : 'none';
    }

    function sugerirUnidad() {
        if (!pasajerosInput || !atencionSelect || !unidadSugerida) return;
        const pasajeros = Number(pasajerosInput.value || 0);
        const atencion = (atencionSelect.value || '').toLowerCase();
        let sugerencia = 'Requiere revisión manual';

        if (atencion.includes('movilidad reducida') || atencion.includes('silla de ruedas')) sugerencia = 'Unidad accesible';
        else if (pasajeros >= 1 && pasajeros <= 3) sugerencia = 'Sedán ejecutivo';
        else if (pasajeros >= 4 && pasajeros <= 5) sugerencia = 'SUV familiar';
        else if (pasajeros >= 6 && pasajeros <= 12) sugerencia = 'Van ejecutiva';

        unidadSugerida.value = sugerencia;
        if (unidadAsignada && !unidadAsignada.value) unidadAsignada.value = sugerencia;
        actualizarResumen();
    }

    function actualizarSucursal() {
        const sucursal = obtenerSucursalSeleccionada();
        if (direccionSucursal) direccionSucursal.value = sucursal ? sucursal.direccion : '';
        actualizarResumen();
    }

    function actualizarResumen() {
        const servicioText = (servicioSelect && servicioSelect.selectedOptions[0]?.textContent.trim()) || 'Sin seleccionar';
        const sucursalText = (sucursalSelect && sucursalSelect.selectedOptions[0]?.textContent.trim()) || 'Sin seleccionar';
        const distVal = (distanciaInput && distanciaInput.value) || 0;
        const timeVal = (tiempoInput && tiempoInput.value) || 0;
        const uniVal = (unidadSugerida && unidadSugerida.value) || 'Sin sugerencia';
        const chofVal = (pagoChoferInput && Number(pagoChoferInput.value || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })) || '$0.00';

        const setVal = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        setVal('strSummaryServicio', servicioText);
        setVal('strSummarySucursal', sucursalText);
        setVal('intSummaryDistancia', `${distVal} km`);
        setVal('intSummaryTiempo', `${timeVal} min`);
        setVal('strSummaryUnidad', uniVal);
        setVal('intSummaryChofer', chofVal);

        setVal('strSideServicio', servicioText);
        setVal('strSideSucursal', sucursalText);
        setVal('intSideDistancia', `${distVal} km`);
        setVal('intSideTiempo', `${timeVal} min`);
        setVal('strSideUnidad', uniVal);
        setVal('intSideChofer', chofVal);
    }

    const requiereAtencionSelect = document.getElementById('strRequiereAtencionEspecial');
    const atencionBloque = document.getElementById('divAtencionEspecial');

    function actualizarAtencionEspecial() {
        if (!atencionBloque || !requiereAtencionSelect) return;
        const requiere = requiereAtencionSelect.value === 'true';
        atencionBloque.style.display = requiere ? 'block' : 'none';
        
        if (!requiere) {
            const tipoAtencion = document.getElementById('strTipoAtencionEspecial');
            if (tipoAtencion) {
                tipoAtencion.value = '';
                tipoAtencion.classList.remove('is-valid', 'is-warning', 'is-invalid');
            }
            const obsAtencion = document.getElementById('strObservacionesAtencion');
            if (obsAtencion) {
                obsAtencion.value = '';
                obsAtencion.classList.remove('is-valid', 'is-warning', 'is-invalid');
            }
        }
    }

    if (registrarDireccionSi) registrarDireccionSi.addEventListener('change', actualizarDireccionSolicitante);
    if (registrarDireccionNo) registrarDireccionNo.addEventListener('change', actualizarDireccionSolicitante);
    if (pasajerosInput) pasajerosInput.addEventListener('input', sugerirUnidad);
    if (atencionSelect) atencionSelect.addEventListener('change', sugerirUnidad);
    if (sucursalSelect) sucursalSelect.addEventListener('change', actualizarSucursal);
    if (servicioSelect) servicioSelect.addEventListener('change', actualizarResumen);
    if (distanciaInput) distanciaInput.addEventListener('input', actualizarResumen);
    if (tiempoInput) tiempoInput.addEventListener('input', actualizarResumen);
    if (unidadAsignada) unidadAsignada.addEventListener('change', actualizarResumen);
    if (pagoChoferInput) pagoChoferInput.addEventListener('input', actualizarResumen);
    if (requiereAtencionSelect) requiereAtencionSelect.addEventListener('change', actualizarAtencionEspecial);

    actualizarDireccionSolicitante();
    actualizarAtencionEspecial();
    sugerirUnidad();
    actualizarSucursal();
    actualizarResumen();
});
