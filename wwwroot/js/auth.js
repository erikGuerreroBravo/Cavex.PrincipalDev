// Funciones globales de autenticación
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === "password") {
        input.type = "text";
        btn.classList.add("visible");
    } else {
        input.type = "password";
        btn.classList.remove("visible");
    }
}

// Funcion para validar el dominio del correo
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("strEmail");
    const registerForm = document.querySelector(".login-form");


    if (emailInput) {
        const checkEmail = () => {
            const val = emailInput.value.trim();
            if (val === '') {
                emailInput.setCustomValidity('');
                return;
            }
            if (validateEmailDomain(val)) {
                emailInput.setCustomValidity('');
            } else {
                emailInput.setCustomValidity('Solo se permiten correos de gmail.com, hotmail.com, outlook.com o yahoo.com.');
            }
        };
        emailInput.addEventListener('input', checkEmail);
        emailInput.addEventListener('blur', checkEmail);
        checkEmail();
    }

    // Interceptar submit en la fase de captura para bloquear envíos si el email es inválido
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            if (emailInput) {
                const val = emailInput.value.trim();
                if (val !== '' && !validateEmailDomain(val)) {
                    event.preventDefault();
                    event.stopPropagation();
                    alert("Solo se permiten correos de gmail.com, hotmail.com, outlook.com o yahoo.com.");
                    emailInput.focus();
                }
            }
        }, { capture: true });
    }

    // 1. Lógica de validación de contraseña en Registro
    const passwordInput = document.getElementById("strPassword");
    const confirmInput = document.getElementById("strConfirmPassword");

    // Verificar si estamos en la vista de registro (donde existen los requisitos)
    const passwordReqs = document.getElementById("passwordReqs");

    if (passwordInput && passwordReqs) {
        const reqLength = document.getElementById("req-length");
        const reqUpper = document.getElementById("req-upper");
        const reqLower = document.getElementById("req-lower");
        const reqNumber = document.getElementById("req-number");
        const reqSpecial = document.getElementById("req-special");

        function validatePassword() {
            const value = passwordInput.value;

            // Largo
            const isLengthValid = value.length >= 8;
            toggleReq(reqLength, isLengthValid);

            // Mayúscula
            const isUpperValid = /[A-Z]/.test(value);
            toggleReq(reqUpper, isUpperValid);

            // Minúscula
            const isLowerValid = /[a-z]/.test(value);
            toggleReq(reqLower, isLowerValid);

            // Número
            const isNumberValid = /[0-9]/.test(value);
            toggleReq(reqNumber, isNumberValid);

            // Signo especial
            const isSpecialValid = /[^A-Za-z0-9]/.test(value);
            toggleReq(reqSpecial, isSpecialValid);

            return isLengthValid && isUpperValid && isLowerValid && isNumberValid && isSpecialValid;
        }

        function toggleReq(element, isValid) {
            if (!element) return;
            if (isValid) {
                element.classList.remove("invalid");
                element.classList.add("valid");
            } else {
                element.classList.remove("valid");
                element.classList.add("invalid");
            }
        }

        passwordInput.addEventListener("input", validatePassword);

        if (registerForm) {
            registerForm.addEventListener("submit", function (event) {
                const isValid = validatePassword();
                const doPasswordsMatch = confirmInput ? (passwordInput.value === confirmInput.value) : true;

                if (!isValid) {
                    event.preventDefault();
                    alert("La contraseña no cumple con todos los requisitos de seguridad.");
                    return;
                }

                if (confirmInput && !doPasswordsMatch) {
                    event.preventDefault();
                    alert("Las contraseñas no coinciden.");
                }
            });
        }
    }

    // 2. Lógica de recuperar acceso (Olvidaste tu contraseña)
    const successAlert = document.getElementById("successAlert");
    if (successAlert && registerForm) {
        const submitBtn = registerForm.querySelector("button[type='submit']");
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            successAlert.classList.remove("d-none");
            if (submitBtn) submitBtn.disabled = true;
        });
    }
});
