const nombreInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');

const listadoCitas = document.querySelector('#citas');

let edicion = false;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

class Citas{
    constructor(){
        this.citas = [];
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    BuscarCita(id){
        return  this.citas.filter(cita => cita.id === id);
        
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    editarCita(citaEditada){
        console.log(citaEditada);
        this.citas = this.citas.map( cita => cita.id === citaEditada.id ? {...citaEditada} : cita );
        console.log(this.citas);
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        const div = document.createElement('DIV');
        div.textContent = mensaje;
        div.classList.add('text-center', 'alert', 'd-block', 'col-12', tipo);

        document.querySelector('#contenido').insertBefore(div, document.querySelector('.agregar-cita'));
        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    imprimirCitas({citas}){
        
        while(listadoCitas.firstChild){
            listadoCitas.removeChild(listadoCitas.firstChild);
        }

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const divCita = document.createElement('DIV');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">telefono:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;

            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora:</span> ${hora}
            `;

            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
            `;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2', 'eliminar');
            btnEliminar.innerHTML = `Eliminar X`;

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info', 'editar');
            btnEditar.innerHTML = `Editar |`;

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            listadoCitas.appendChild(divCita);
        });
    }
}

const ui = new UI();
const administrarCitas = new Citas();

document.addEventListener('DOMContentLoaded', () => {
    nombreInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
    listadoCitas.addEventListener('click', eliminarEditarCitas);
});

function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e){
    e.preventDefault();

    const comprueba = Object.values(citaObj).some(valor => valor === '');
    if(comprueba){
        ui.imprimirAlerta("Todos los campos son obligatorios", 'alert-danger');
        return;
    }

    if(edicion){
        administrarCitas.editarCita({...citaObj});
        document.querySelector('#nueva-cita button').textContent = "Crear Cita";
        edicion = false;
    }else{    
        citaObj.id = Date.now();
        administrarCitas.agregarCita({...citaObj});
    }

    reiniciarObjeto();
    formulario.reset();
    ui.imprimirCitas(administrarCitas);

}

function reiniciarObjeto(){
    citaObj.mascota ='',
    citaObj.propietario = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.sintomas = '';
}

function eliminarEditarCitas(e){
    const id = Number(e.target.parentElement.dataset.id);
    if(e.target.classList.contains('eliminar')){ 
        administrarCitas.eliminarCita(id);
        ui.imprimirAlerta("La cia se elimino correctamente  son ", 'alert-success');
        ui.imprimirCitas(administrarCitas);
    }

    if(e.target.classList.contains('editar')){ 
        const cita = administrarCitas.BuscarCita(id)[0];

        nombreInput.value = cita.mascota;
        propietarioInput.value = cita.propietario;
        telefonoInput.value = cita.telefono;
        fechaInput.value = cita.fecha;
        horaInput.value = cita.hora;
        sintomasInput.value = cita.sintomas;

        citaObj.mascota = cita.mascota,
        citaObj.propietario = cita.propietario;
        citaObj.telefono = cita.telefono;
        citaObj.fecha = cita.fecha ;
        citaObj.hora = cita.hora;
        citaObj.sintomas = cita.sintomas;
        citaObj.id = cita.id;
        document.querySelector('#nueva-cita button').textContent = "Guardar Cambios";
        edicion = true;
    }
}