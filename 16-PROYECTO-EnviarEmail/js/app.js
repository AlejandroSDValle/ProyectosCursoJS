const email = document.querySelector('#email');
const emailExtra = document.querySelector('#emailExtra');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const enviar = document.querySelector('button[type="submit"]');
const reset = document.querySelector('button[type="reset"]');
const formulario = document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded', () => {
    email.addEventListener('input', validarFormulario);
    asunto.addEventListener('input', validarFormulario);
    mensaje.addEventListener('input', validarFormulario);
    formulario.addEventListener('submit', enviarEmail);
    emailExtra.addEventListener('input', () => {
        eliminarError(emailExtra.parentElement);
        let valido = validarEmail(emailExtra);
        if(email.value.trim() !== '' && asunto.value.trim() !== '' && mensaje.value.trim() !== '' && emailExtra.value.trim() !== '' && valido){
            enviar.classList.remove('opacity-50');
            enviar.disabled = false;
        }
}   );
});

function validarEmail(email){
    if(email.value.trim() !== ''){
        const er = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
        if(!er.test(email.value)){
            mensajeError(`El ${email.id} no es valido`, email.parentElement);
            enviar.classList.add('opacity-50');
            enviar.disabled = true;
            console.log(email.parentElement);
            return false;
        }
        return true;
    }
}

function validarFormulario(e){
    
    if(e.target.value.trim() === ''){
        mensajeError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        enviar.classList.add('opacity-50');
        enviar.disabled = true;
        return;
    }

    if(e.target.id === "email"){
        const valido = validarEmail(e.target);
        if(!valido){
            return;
        }
    }

    eliminarError(e.target.parentElement);

    if(email.value.trim() !== '' && asunto.value.trim() !== '' && mensaje.value.trim() !== '' ){
        enviar.classList.remove('opacity-50');
        enviar.disabled = false;
    }

}

function mensajeError(mensaje,referencia, tipo = "bg-red-600"){
    eliminarError(referencia);
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add("text-white", "py-2", `${tipo}`, "text-center", 'error');

    referencia.appendChild(error);
}

function eliminarError(referencia){
    const error = referencia.querySelector('.error');
    if(error){
        error.remove();
    }
}

function enviarEmail(e){
    e.preventDefault();
    const spinner = document.querySelector('.spinner').parentElement;
    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.add('hidden');
        mensajeError(`El Mensaje ha sido enviado correctamente`, formulario, "bg-green-500");
        setTimeout(() => {
            eliminarError(formulario);
            formulario.reset();
        }, 2000);
    }, 2000);
}