const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos .list-group');
let presupuesto;

document.addEventListener('DOMContentLoaded', () => {
    pedirPresupuesto();
    formulario.addEventListener('submit', validarFormulario);
    listaGastos.addEventListener('click', eliminarGasto);
});

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto ) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
        ui.insertarPresupuesto(this);
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter( gasto => gasto.id != id);
        ui.agregarGastoLista(this.gastos);
        this.calcularRestante();
        ui.insertarPresupuesto(this);
        ui.comprobarPresupuesto(this);
    }
}

class UI{
    insertarPresupuesto(cantidad){
        document.querySelector('#total').textContent = cantidad.presupuesto;
        document.querySelector('#restante').textContent = cantidad.restante;
    }

    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('text-center', 'alert', tipo, 'mensaje');
        divMensaje.textContent = mensaje;

        if(!document.querySelector('.mensaje')){
            document.querySelector('.primario').insertBefore(divMensaje, formulario);
        }
        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
   }

    agregarGastoLista(gastos){
        this.limpiarHTML();
        
        gastos.forEach(gasto => {
            const li = document.createElement('LI');
            li.textContent = gasto.nombre;
            li.dataset.id = gasto.id;
            li.className = "list-group-item d-flex justify-content-between align-itemns-center";

            const span = document.createElement('SPAN');
            span.className = "badge badge-primary badge-pill";
            span.textContent = ` $ ${gasto.cantidad}` ;
            li.appendChild(span);

            const btnBorrar = document.createElement('button');
            btnBorrar.className = "btn btn-danger borrar-gasto";
            btnBorrar.innerHTML = "Borrar &times;"

            li.appendChild(btnBorrar);

            listaGastos.appendChild(li);
        });
    
    }

    comprobarPresupuesto({presupuesto, restante}){
        const restanteDiv = document.querySelector('.restante');
        if((presupuesto / 4) > restante){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if ((presupuesto / 2) > restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-warning', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        if(restante <= 0){
            ui.imprimirAlerta("El presupuesto se ha agotado", "alert-danger");
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }

    limpiarHTML(){
        while(listaGastos.firstChild){
            listaGastos.removeChild(listaGastos.firstChild);
        }
    }
}

const ui = new UI();

function pedirPresupuesto(){
    // let presupuestoUsuario = prompt("¿Cuál es tu presupuesto?");
    let presupuestoUsuario = 100;

    if (!/^\d+(\.\d{1,2})?$/.test(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    
    ui.insertarPresupuesto(presupuesto);

}

function validarFormulario(e){
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if( nombre === '' || cantidad === '' ){
        ui.imprimirAlerta("Todos los campos son obligatorios", "alert-danger");
        return;
    }else if (cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta("La cantidad no es valdia", "alert-danger");
        return;
    }

    const gasto = { nombre, cantidad, id: Date.now()}

    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta("Gasto Agregado", "alert-success");

    ui.agregarGastoLista(presupuesto.gastos);

    ui.comprobarPresupuesto(presupuesto);

    formulario.reset();
}   

function eliminarGasto(e){
    if(e.target.classList.contains("borrar-gasto")){
        const id = e.target.parentElement.dataset.id;
        presupuesto.eliminarGasto(id);
    }
}