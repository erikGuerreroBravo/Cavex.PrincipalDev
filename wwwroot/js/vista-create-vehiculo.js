let vehiculoCatalogos = {
    idVehCatMarcaVehiculo: [],
    idVehCatColor: [],
    idVehCatTipoVehiculo: [],
    idVehCatCapacidad: [],
    idVehCatTipoCombustible: [],
};
let managerSaveDto = {};
document.addEventListener("DOMContentLoaded", async () => {
    await loadingMarcas();
    await loadingColorVehiculos();
    await loadingTipoVehiculos();
    await loadingCapacidad();
    await loadingTipoCombustible();
    inicializarRegistroVehiculo();
});

///diseño del formulario y envio de los datos completos
function inicializarRegistroVehiculo()
{
    const form = document.getElementById("vehiculoForm");
    if (!form) return;
    inicializarFechaRegistro();
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

   /* Swal.fire({
        title: 'Guardando vehículo...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });*/

   
    //terminamos el llenado del formulario
    document.getElementById("btnLimpiarVehiculo")?.addEventListener("click", () => limpiarFormularioVehiculo(form));
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormularioVehiculo(form)) {
            Swal.fire({ icon: "warning", title: "Formulario incompleto", text: "Revisa los campos marcados antes de guardar.", confirmButtonColor: "var(--teal-cavex)" });
            return;
        }

        //datos principales de la entidad manager a
        let managerSaveDto = {

            StrNumeroSerie: document.getElementById("strNumSerie").value,
            //idVehCatMarcaVehiculo: parseInt(document.getElementById("idVehCatMarcaVehiculo").value),
            StrModelo: document.getElementById("strModelo").value,
            IntAnio: parseInt(document.getElementById("intAnio").value),
            StrVersion: document.getElementById("strVersion").value || null,
            StrPlaca: document.getElementById("strPlaca").value,
            StrNumMotor:(document.getElementById("intNumMotor").value),
            DecKilometrajeActual: Number(document.getElementById("decKilometrajeActual").value),
            VehCatMarcaVehiculo: {
                Id: parseInt(document.getElementById("idVehCatMarcaVehiculo").value),
            },
            VehCatColorDto: {
                Id: parseInt(document.getElementById("idVehCatColor").value),
            },
            VehCatTipoVehiculo: {
                Id: parseInt(document.getElementById("idVehCatTipoVehiculo").value),
            },
            VehCatCapacidad: {
                Id: parseInt(document.getElementById("idVehCatCapacidad").value),
            },
            VehCatTipoCombustibleDto : {
                Id: parseInt(document.getElementById("idVehCatTipoCombustible").value),
            }
        }
       
        console.log(JSON.stringify(managerSaveDto, null, 2));
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
            body: JSON.stringify(managerSaveDto )
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
  

}

//lamada a el metodo de carga de marca de vehiculos
async function loadGasolinerasFromServer() {
    try {
        const response = await fetch("/api/v1/VehCatMarcaVehiculo", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        const result = await response.json();

        if (!result.success) {
            showError(result.message || "No fue posible cargar las gasolineras.");
            return;
        }

        gasolineras = (result.data || []).map(item => {
            const idCatStatus = item.idCatStatus ?? item.IdCatStatus;

            return {
                id: item.id,
                nombre: item.strValor || item.StrValor || "",
                descripcion: item.strDescripcion || item.StrDescripcion || "",
                idCatStatus: idCatStatus === null || idCatStatus === undefined ? "" : String(idCatStatus),
                strCatStatus: item.strCatStatus || item.StrCatStatus || ""
            };
        });

        renderStatusTabs();
        renderGasolineras();
    } catch (error) {
        console.error(error);
        showError("Ocurrio un error al cargar las gasolineras.");
    }
}

async function cargarCatalogos1() {
    return await fetch('/Vehiculos/Marcas')
        .then(res => res.json())
        .then(result => {
            if (result.success && result.data) {
                Object.assign(vehiculoCatalogos, result.data);
                Object.entries(vehiculoCatalogos).forEach(([selectId, registros]) => {
                    console.log("Select:", selectId);

                    console.log("Registros:", registros);

                    console.log("Cantidad:", registros.length);

                    const select = document.getElementById(selectId);
                    console.log("Select encontrado:", select);
                    if (!select) return;
                    select.innerHTML = '<option value="">Seleccionar...</option>';
                    registros.forEach(registro => {
                        const option = document.createElement("option");
                        option.value = String(registro.id);
                        option.textContent = registro.strValor || registro.strDescripcion || ("Opción " + registro.id);
                        option.title = registro.strDescripcion;
                        select.appendChild(option);
                    });
                    console.log("Opciones:", select.options.length);
                });
                
            }
        });
}

async function loadingMarcas() {

    const response = await fetch('/Vehiculos/Marcas');
    const result = await response.json();
    if (!result.success)
        return;
    const select = document.getElementById("idVehCatMarcaVehiculo");
    if (!select)
        return;
    select.innerHTML = '<option value="">Seleccionar...</option>';
    result.data.forEach(registro => {
        const option = document.createElement("option");
        option.value = registro.id;
        option.textContent = registro.strValor;
        option.title = registro.strDescripcion;
        select.appendChild(option);

    });

}


async function loadingColorVehiculos() {

    const response = await fetch('/Vehiculos/Color');
    const result = await response.json();
    if (!result.success)
        return;
    const select = document.getElementById("idVehCatColor");
    if (!select)
        return;
    select.innerHTML = '<option value="">Seleccionar...</option>';
    result.data.forEach(registro => {
        const option = document.createElement("option");
        option.value = registro.id;
        option.textContent = registro.strValor;
        option.title = registro.strDescripcion;
        select.appendChild(option);

    });

}

async function loadingTipoVehiculos() {
    const response = await fetch('/Vehiculos/TipoVehiculo');
    const result = await response.json();
    if (!result.success)
        return;
    const select = document.getElementById("idVehCatTipoVehiculo");
    if (!select)
        return;
    select.innerHTML = '<option value="">Seleccionar...</option>';
    result.data.forEach(registro => {
        const option = document.createElement("option");
        option.value = registro.id;
        option.textContent = registro.strValor;
        option.title = registro.strDescripcion;
        select.appendChild(option);

    });
}

async function loadingCapacidad() {

    const response = await fetch('/Vehiculos/Capacidad');
    const result = await response.json();
    if (!result.success)
        return;
    const select = document.getElementById("idVehCatCapacidad");
    if (!select)
        return;
    select.innerHTML = '<option value="">Seleccionar...</option>';
    result.data.forEach(registro => {
        const option = document.createElement("option");
        option.value = registro.id;
        option.textContent = registro.strValor;
        option.title = registro.strDescripcion;
        select.appendChild(option);

    });

}

async function loadingTipoCombustible() {

    const response = await fetch('/Vehiculos/Combustible');
    const result = await response.json();
    if (!result.success)
        return;
    const select = document.getElementById("idVehCatTipoCombustible");
    if (!select)
        return;
    select.innerHTML = '<option value="">Seleccionar...</option>';
    result.data.forEach(registro => {
        const option = document.createElement("option");
        option.value = registro.id;
        option.textContent = registro.strValor;
        option.title = registro.strDescripcion;
        select.appendChild(option);

    });

}

///Inicializador de la funcion que se encarga de Realizar la fecha de registro
function inicializarFechaRegistro() {
    const fecha = document.getElementById("dteFechaRegistro");
    if (!fecha) return;
    const hoy = new Date();
    fecha.value = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().split("T")[0];
}

// Mantiene serie y placa en el formato admitido por las columnas varchar, establece el formato adecuado de la placa y
//numero de serie.
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

//metodo que se encarga de validar el campo de un vehiculo, recibe el nombre del campo
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

//funcion que se encarga de limpiar un error en caso de ocurrir
function limpiarErrorCampo(campo) {
    campo.classList.remove("is-invalid", "is-valid");
    campo.removeAttribute("aria-invalid");
    document.getElementById(`${campo.id}Error`)?.classList.remove("d-block");
}
function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function escapeHtml(text) {
    return String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

///funcion que se encarga de valdiar el formulario  con todos los campos
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
///funcion que se encarga de establecer los datos capturados en los elementos del lado derecho de la pantalla
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