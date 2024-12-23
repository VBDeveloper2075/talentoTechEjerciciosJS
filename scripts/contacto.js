document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contacto-form");
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const mensajeInput = document.getElementById("mensaje");


    const errorNombre = document.getElementById("error-nombre");
    const errorEmail = document.getElementById("error-email");
    const errorMensaje = document.getElementById("error-mensaje");
    const formMsg = document.getElementById("form-msg");

    form.addEventListener("submit", (e) => {
        let valid = true;
        errorNombre.textContent = "";
        errorEmail.textContent = "";
        errorMensaje.textContent = "";
        formMsg.textContent = "";

        //validar campo nombre
        if (nombreInput.value.trim() === "") {
        errorNombre.textContent = "El nombre es requerido.";
            valid = false;
        }
        //validar campo email
        if (emailInput.value.trim() === "") {
            errorEmail.textContent = "El correo electronico es requerido.";
            valid = false
        }else if (!validarEmail(emailInput.value)) {
            errorEmail.textContent ="El formato del correo electronico no es valido.";
            valid = false;
        }
        if (numero && isNaN(numero)) {
            errorNumero.textContent = "El telefono debe ser un numero valido.";
            valid = false;
        }
        if (!acepto) {
            errorAcepto.textContent = "Debes aceptar los terminos y condiciones.";
            valid = false
        }
        if (!valid) {
            e.preventDefault();
            return;
    }
    formMsg.textContent = "Enviando mensaje...";
    });
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);  
    }
});